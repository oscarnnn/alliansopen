import { MINI_KEYS } from "./players";
import type { FinalScore, MiniKey, Player, PlayerId, Team, Tournament } from "./types";

/** Bonus i hcp-slag för placering i scramblen (index 0 = 1:a plats). */
export const SCRAMBLE_BONUS = [3, 2, 1, 0];

export function scrambleBonusForPlace(place: number | null | undefined): number {
  if (!place) return 0;
  return SCRAMBLE_BONUS[place - 1] ?? 0;
}

/** 1:a = +1, de två sista (7:e och 8:e vid 8 spelare) = −1, övriga 0. */
export function miniBonusForRank(rank: number | null | undefined, playerCount: number): number {
  if (!rank) return 0;
  if (rank === 1) return 1;
  if (playerCount >= 4 && rank >= playerCount - 1) return -1;
  return 0;
}

export const round1 = (n: number) => Math.round(n * 10) / 10;

export function teamHcp(team: Team, players: Player[]): number {
  const hcps = team.members.map((id) => players.find((p) => p.id === id)?.hcp ?? 0);
  return round1(hcps.reduce((a, b) => a + b, 0) / Math.max(1, hcps.length));
}

/** 9 hål → laget får halva medel-hcp:t i slag. */
export function teamStrokes(team: Team, players: Player[]): number {
  return round1(teamHcp(team, players) / 2);
}

export function teamNet(t: Tournament, teamIndex: number): number | null {
  const team = t.teams?.[teamIndex];
  const gross = t.scramble.gross[teamIndex];
  if (!team || gross == null) return null;
  return round1(gross - teamStrokes(team, t.players));
}

/**
 * Placering per lag. Manuell placering vinner. Annars rankas lagen på nettoslag
 * när alla lag har ett resultat (delad plats får den bättre placeringen).
 */
export function scramblePlaces(t: Tournament): (number | null)[] {
  if (!t.teams) return [];
  const nets = t.teams.map((_, i) => teamNet(t, i));
  const allIn = nets.every((n) => n != null);
  return t.teams.map((_, i) => {
    const manual = t.scramble.place[i];
    if (manual) return manual;
    if (!allIn) return null;
    const mine = nets[i]!;
    return 1 + nets.filter((n) => n! < mine).length;
  });
}

export function teamIndexOf(t: Tournament, id: PlayerId): number {
  return t.teams?.findIndex((team) => team.members.includes(id)) ?? -1;
}

export interface Breakdown {
  scramble: number;
  scramblePlace: number | null;
  minis: Record<MiniKey, number>;
  miniRanks: Record<MiniKey, number | null>;
  total: number;
  adjustedHcp: number;
}

export function breakdownFor(t: Tournament, player: Player): Breakdown {
  const places = scramblePlaces(t);
  const ti = teamIndexOf(t, player.id);
  const scramblePlace = ti >= 0 ? places[ti] ?? null : null;
  const scramble = scrambleBonusForPlace(scramblePlace);
  const minis = {} as Record<MiniKey, number>;
  const miniRanks = {} as Record<MiniKey, number | null>;
  for (const key of MINI_KEYS) {
    const rank = t.minis[key][player.id] ?? null;
    miniRanks[key] = rank;
    minis[key] = miniBonusForRank(rank, t.players.length);
  }
  const total = scramble + minis.longestDrive + minis.closestPin + minis.accuracy;
  return {
    scramble,
    scramblePlace,
    minis,
    miniRanks,
    total,
    adjustedHcp: round1(player.hcp + total),
  };
}

/** Slag ifyllda men inga hål angivna = rundan räknas som klar. */
export function effectiveThru(f: FinalScore | undefined): number {
  if (!f) return 0;
  const thru = Math.min(18, Math.max(0, f.thru || 0));
  return thru === 0 && f.strokes != null ? 18 : thru;
}

/** Netto mot par hittills: slag − (par + spel-hcp) × andel spelade hål. */
export function netToPar(t: Tournament, player: Player): number | null {
  const f = t.final[player.id];
  if (!f || f.strokes == null) return null;
  const share = effectiveThru(f) / 18;
  const { adjustedHcp } = breakdownFor(t, player);
  return round1(f.strokes - (t.par + adjustedHcp) * share);
}

/** Nettoscore för en färdig runda: slag − spel-hcp. */
export function netScore(t: Tournament, player: Player): number | null {
  const f = t.final[player.id];
  if (!f || f.strokes == null || effectiveThru(f) < 18) return null;
  return round1(f.strokes - breakdownFor(t, player).adjustedHcp);
}

export function formatToPar(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return "–";
  const v = round1(n);
  if (v === 0) return "±0";
  const abs = Number.isInteger(v) ? String(Math.abs(v)) : Math.abs(v).toFixed(1);
  return v > 0 ? `+${abs}` : `−${abs}`;
}

export type Phase = "pre" | "scramble" | "minis" | "final" | "done";

export function currentPhase(t: Tournament): Phase {
  const finals = t.players.map((p) => t.final[p.id]);
  if (finals.every((f) => f && f.strokes != null && effectiveThru(f) >= 18)) return "done";
  if (finals.some((f) => f && (f.thru > 0 || f.strokes != null))) return "final";
  const anyMini = MINI_KEYS.some((k) => Object.values(t.minis[k]).some((r) => r != null));
  const placesDone = scramblePlaces(t).length > 0 && scramblePlaces(t).every((p) => p != null);
  if (anyMini || placesDone) return "minis";
  if (t.teams) return "scramble";
  return "pre";
}

export const PHASE_LABEL: Record<Phase, string> = {
  pre: "Inväntar lottning",
  scramble: "Spelomgång 1 · Scramble",
  minis: "Spelomgång 2 · Småtävlingar & lunch",
  final: "Spelomgång 3 · Finalrundan pågår",
  done: "Avgjort",
};

export function shuffle<T>(arr: T[], rand: () => number = Math.random): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function drawTeams(players: Player[]): Team[] {
  const ids = shuffle(players.map((p) => p.id));
  const teams: Team[] = [];
  for (let i = 0; i < ids.length; i += 2) teams.push({ members: ids.slice(i, i + 2) });
  return teams;
}
