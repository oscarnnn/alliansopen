import { MINI_KEYS } from "./players";
import { effectiveThru, miniBonusForRank, scrambleBonusForPlace, scramblePlaces, shuffle } from "./scoring";
import type { MiniKey, Player, PlayerId, Team, Tournament } from "./types";

/**
 * Oddsmotor – Monte Carlo-simulering av allt som återstår.
 *
 * Modell (medvetet enkel, men rimlig för amatörgolf):
 *  - Okända scramble-placeringar slumpas bland de lag som inte fått plats.
 *  - Okända småtävlingar avgörs av "skicklighet + tur": lägre hcp ger en liten fördel.
 *  - Finalrundan är slaggolf: netto = bruttoslag − spel-hcp, lägst vinner.
 *    Förväntade bruttoslag ≈ par + 1,05·hcp + 3 (amatörer spelar sällan på sitt hcp),
 *    spridning ≈ 3,5 + 0,12·hcp slag (högre hcp = mer kaos, åt båda hållen).
 *    Varje bonusslag i hcp drar alltså av exakt ett slag på nettot.
 *  - Pågående runda: spelade slag + förväntade slag på kvarvarande hål.
 */

export const SIMULATIONS = 20000;
export const BOOKIE_MARGIN = 0.08;

export interface OddsResult {
  probs: Record<PlayerId, number>;
  /** Förväntat netto mot par efter 18 hål */
  expected: Record<PlayerId, number>;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function gaussian(rand: () => number): number {
  let u = 0;
  while (u === 0) u = rand();
  const v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export const expectedGross = (hcp: number, par: number) => par + 1.05 * hcp + 3;
export const strokesSpread = (hcp: number) => 3.5 + 0.12 * hcp;

function pairUp(ids: PlayerId[]): Team[] {
  const teams: Team[] = [];
  for (let i = 0; i < ids.length; i += 2) teams.push({ members: ids.slice(i, i + 2) });
  return teams;
}

export function computeOdds(t: Tournament, sims = SIMULATIONS): OddsResult {
  const players = t.players;
  const n = players.length;
  // Deterministisk seed => alla besökare ser exakt samma odds för samma läge.
  const seedSource = JSON.stringify({
    p: players,
    par: t.par,
    te: t.teams,
    s: t.scramble,
    m: t.minis,
    f: t.final,
  });
  const rand = mulberry32(hashString(seedSource));

  const knownPlaces = t.teams ? scramblePlaces(t) : [];
  const wins: Record<PlayerId, number> = Object.fromEntries(players.map((p) => [p.id, 0]));
  const totals: Record<PlayerId, number> = Object.fromEntries(players.map((p) => [p.id, 0]));
  const idx = new Map(players.map((p, i) => [p.id, i]));

  for (let s = 0; s < sims; s++) {
    const bonus = new Array<number>(n).fill(0);

    // --- Spelomgång 1: scramble ---
    const teams = t.teams ?? pairUp(shuffle(players.map((p) => p.id), rand));
    const places = teams.map((_, i) => knownPlaces[i] ?? null);
    const taken = new Set(places.filter((p): p is number => p != null));
    const free = shuffle(
      Array.from({ length: teams.length }, (_, i) => i + 1).filter((p) => !taken.has(p)),
      rand,
    );
    teams.forEach((team, i) => {
      const place = places[i] ?? free.pop() ?? teams.length;
      const b = scrambleBonusForPlace(place);
      for (const id of team.members) {
        const k = idx.get(id);
        if (k != null) bonus[k] += b;
      }
    });

    // --- Spelomgång 2: småtävlingar ---
    for (const key of MINI_KEYS) {
      simulateMini(t, key, players, rand).forEach((rank, k) => {
        bonus[k] += miniBonusForRank(rank, n);
      });
    }

    // --- Spelomgång 3: finalrundan (slaggolf, lägst netto vinner) ---
    let best = Infinity;
    let leaders: number[] = [];
    for (let k = 0; k < n; k++) {
      const p = players[k];
      const f = t.final[p.id];
      const thru = effectiveThru(f);
      const remaining = (18 - thru) / 18;
      let gross = f?.strokes ?? 0;
      if (remaining > 0) {
        gross += expectedGross(p.hcp, t.par) * remaining;
        gross += gaussian(rand) * strokesSpread(p.hcp) * Math.sqrt(remaining);
        gross = Math.round(gross);
      }
      const net = gross - (p.hcp + bonus[k]);
      totals[p.id] += net - t.par;
      if (net < best - 1e-9) {
        best = net;
        leaders = [k];
      } else if (Math.abs(net - best) < 1e-9) {
        leaders.push(k);
      }
    }
    // Delad seger = delad vinst (särspel avgörs på banan, inte här).
    for (const k of leaders) wins[players[k].id] += 1 / leaders.length;
  }

  const probs: Record<PlayerId, number> = {};
  const expected: Record<PlayerId, number> = {};
  for (const p of players) {
    probs[p.id] = wins[p.id] / sims;
    expected[p.id] = totals[p.id] / sims;
  }
  return { probs, expected };
}

/** Returnerar simulerad placering per spelare (index = spelarordning). */
function simulateMini(t: Tournament, key: MiniKey, players: Player[], rand: () => number): number[] {
  const ranks = players.map((p) => t.minis[key][p.id] ?? null);
  if (ranks.every((r) => r != null)) return ranks as number[];
  const taken = new Set(ranks.filter((r): r is number => r != null));
  const freeRanks = Array.from({ length: players.length }, (_, i) => i + 1).filter(
    (r) => !taken.has(r),
  );
  const unranked = players
    .map((p, k) => ({ k, perf: -p.hcp / 10 + gaussian(rand) }))
    .filter(({ k }) => ranks[k] == null)
    .sort((a, b) => b.perf - a.perf);
  const out = [...ranks] as (number | null)[];
  unranked.forEach(({ k }, i) => {
    out[k] = freeRanks[i] ?? players.length;
  });
  return out as number[];
}

export function decimalOdds(prob: number): string {
  if (prob <= 0) return "—";
  if (prob <= 0.002) return "500";
  const odds = Math.max(1.01, (1 - BOOKIE_MARGIN) / prob);
  if (odds >= 100) return odds.toFixed(0);
  return odds.toFixed(2);
}

export function formatPct(prob: number): string {
  const pct = prob * 100;
  if (pct > 0 && pct < 0.1) return "<0.1%";
  if (pct >= 99.95 && pct < 100) return ">99.9%";
  return `${pct.toFixed(1)}%`;
}
