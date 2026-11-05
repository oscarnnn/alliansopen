import { PLAYER_COLORS } from "./players";
import { breakdownFor, currentPhase, type Breakdown } from "./scoring";
import type { OddsResult } from "./odds";
import type { Player, Tournament } from "./types";

export function colorFor(t: Tournament, id: string): string {
  const i = t.players.findIndex((p) => p.id === id);
  return PLAYER_COLORS[(i < 0 ? 0 : i) % PLAYER_COLORS.length];
}

export interface Row {
  player: Player;
  color: string;
  breakdown: Breakdown;
  prob: number;
  prevProb: number | null;
  expected: number;
  points: number | null;
  thru: number;
  position: number;
}

export function buildRows(t: Tournament, odds: OddsResult): Row[] {
  const phase = currentPhase(t);
  const prev = t.history.length >= 2 ? t.history[t.history.length - 2] : null;
  const rows = t.players.map((player) => {
    const f = t.final[player.id] ?? { points: null, thru: 0 };
    return {
      player,
      color: colorFor(t, player.id),
      breakdown: breakdownFor(t, player),
      prob: odds.probs[player.id] ?? 0,
      prevProb: prev ? prev.probs[player.id] ?? null : null,
      expected: odds.expected[player.id] ?? 0,
      points: f.points,
      thru: f.thru,
      position: 0,
    };
  });

  const finalStarted = phase === "final" || phase === "done";
  rows.sort((a, b) => {
    if (finalStarted) {
      const pa = a.points ?? -1;
      const pb = b.points ?? -1;
      if (pb !== pa) return pb - pa;
    }
    return b.prob - a.prob || a.player.hcp - b.player.hcp;
  });

  // Placering (delad placering får samma siffra)
  rows.forEach((r, i) => {
    const prevRow = rows[i - 1];
    const same = prevRow && (finalStarted ? prevRow.points === r.points : prevRow.prob === r.prob);
    r.position = same ? prevRow.position : i + 1;
  });
  return rows;
}

export function formatThru(thru: number, points: number | null): string {
  if (thru >= 18) return "F";
  if (thru > 0) return `${thru}`;
  return points != null ? "–" : "–";
}

export function relativeTime(ts: number): string {
  const diff = Math.round((Date.now() - ts) / 1000);
  if (diff < 45) return "nyss";
  if (diff < 3600) return `${Math.round(diff / 60)} min sedan`;
  if (diff < 86400) return `${Math.round(diff / 3600)} h sedan`;
  return new Date(ts).toLocaleDateString("sv-SE", { day: "numeric", month: "short" });
}
