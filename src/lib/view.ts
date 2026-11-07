import { PLAYER_COLORS } from "./players";
import { breakdownFor, currentPhase, effectiveThru, netScore, netToPar, type Breakdown } from "./scoring";
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
  /** Förväntat netto mot par efter 18 hål */
  expected: number;
  /** Bruttoslag hittills */
  strokes: number | null;
  thru: number;
  /** Netto mot par hittills (null = ej startad) */
  toPar: number | null;
  /** Nettoscore när rundan är klar */
  net: number | null;
  position: number;
}

export function buildRows(t: Tournament, odds: OddsResult): Row[] {
  const phase = currentPhase(t);
  const prev = t.history.length >= 2 ? t.history[t.history.length - 2] : null;
  const rows: Row[] = t.players.map((player) => {
    const f = t.final[player.id];
    return {
      player,
      color: colorFor(t, player.id),
      breakdown: breakdownFor(t, player),
      prob: odds.probs[player.id] ?? 0,
      prevProb: prev ? prev.probs[player.id] ?? null : null,
      expected: odds.expected[player.id] ?? 0,
      strokes: f?.strokes ?? null,
      thru: effectiveThru(f),
      toPar: netToPar(t, player),
      net: netScore(t, player),
      position: 0,
    };
  });

  // Under finalen: lägst netto mot par leder. Annars: störst vinstchans.
  const finalStarted = phase === "final" || phase === "done";
  rows.sort((a, b) => {
    if (finalStarted) {
      const pa = a.toPar ?? Infinity;
      const pb = b.toPar ?? Infinity;
      if (pa !== pb) return pa - pb;
    }
    return b.prob - a.prob || a.player.hcp - b.player.hcp;
  });

  // Placering (delad placering får samma siffra)
  rows.forEach((r, i) => {
    const prevRow = rows[i - 1];
    const same =
      prevRow && (finalStarted ? r.toPar != null && prevRow.toPar === r.toPar : prevRow.prob === r.prob);
    r.position = same ? prevRow.position : i + 1;
  });
  return rows;
}

export function formatThru(thru: number): string {
  if (thru >= 18) return "F";
  if (thru > 0) return `${thru}`;
  return "–";
}

export function relativeTime(ts: number): string {
  const diff = Math.round((Date.now() - ts) / 1000);
  if (diff < 45) return "nyss";
  if (diff < 3600) return `${Math.round(diff / 60)} min sedan`;
  if (diff < 86400) return `${Math.round(diff / 3600)} h sedan`;
  return new Date(ts).toLocaleDateString("sv-SE", { day: "numeric", month: "short" });
}
