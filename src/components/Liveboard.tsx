import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Crown, TrendingDown, TrendingUp } from "lucide-react";
import { useTournament } from "../lib/store";
import { buildRows, formatThru, relativeTime, type Row } from "../lib/view";
import { decimalOdds, formatPct } from "../lib/odds";
import { currentPhase } from "../lib/scoring";
import { MINI_KEYS, MINI_LABELS } from "../lib/players";
import { Avatar } from "./Avatar";
import { LiveDot } from "./LiveDot";
import { SectionHeading } from "./SectionHeading";

function signed(n: number) {
  return n > 0 ? `+${n}` : `${n}`;
}

function BonusChip({ label, value, pending, title }: { label: string; value: number; pending: boolean; title: string }) {
  const tone = pending
    ? "border-line text-mute/60"
    : value > 0
      ? "border-fairway/40 bg-fairway/10 text-fairway"
      : value < 0
        ? "border-flag/40 bg-flag/10 text-flag"
        : "border-line text-cream/60";
  return (
    <span title={title} className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[11px] ${tone}`}>
      <span>{label}</span>
      <span className="tabular-nums">{pending ? "·" : signed(value)}</span>
    </span>
  );
}

function Movement({ row }: { row: Row }) {
  if (row.prevProb == null) return null;
  const d = row.prob - row.prevProb;
  if (Math.abs(d) < 0.002) return <span className="font-mono text-[11px] text-mute">±0</span>;
  const up = d > 0;
  const Icon = up ? TrendingUp : TrendingDown;
  return (
    <span className={`inline-flex items-center gap-1 font-mono text-[11px] ${up ? "text-fairway" : "text-flag"}`}>
      <Icon className="size-3.5" />
      {(Math.abs(d) * 100).toFixed(1)}
    </span>
  );
}

function LiveRow({ row, leader, finalStarted, maxProb }: { row: Row; leader: boolean; finalStarted: boolean; maxProb: number }) {
  const [open, setOpen] = useState(false);
  const b = row.breakdown;
  const { data } = useTournament();

  return (
    <motion.li
      layout
      transition={{ type: "spring", stiffness: 300, damping: 32 }}
      className={`group relative overflow-hidden rounded-2xl border transition-colors ${
        leader ? "border-gold/40 bg-gold/[0.06]" : "border-line bg-white/[0.02] hover:bg-white/[0.04]"
      }`}
    >
      {leader && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(232,200,114,0.18),transparent_55%)]" />
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative grid w-full grid-cols-[2rem_1fr_auto] items-center gap-3 px-3 py-3 text-left sm:grid-cols-[2.5rem_minmax(0,1.1fr)_minmax(15rem,1.1fr)_5rem_minmax(0,1fr)_5.5rem] sm:gap-4 sm:px-5 sm:py-4"
        aria-expanded={open}
      >
        {/* Placering */}
        <div className="font-display text-3xl leading-none text-cream/70 sm:text-4xl">
          {leader ? <Crown className="size-6 text-gold" /> : row.position}
        </div>

        {/* Spelare */}
        <div className="flex min-w-0 items-center gap-3">
          <Avatar name={row.player.name} color={row.color} size={44} ring={leader} />
          <div className="min-w-0">
            <div className="truncate text-lg font-medium leading-tight">{row.player.name}</div>
            <div className="font-mono text-[11px] text-mute">
              hcp {row.player.hcp.toFixed(1)}
              {b.total !== 0 && (
                <>
                  {" "}→ <span className={b.total > 0 ? "text-fairway" : "text-flag"}>{b.adjustedHcp.toFixed(1)}</span>
                </>
              )}
            </div>
            {/* Mobil: prob-bar */}
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/5 sm:hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: row.color }}
                initial={{ width: 0 }}
                animate={{ width: `${(row.prob / Math.max(maxProb, 0.0001)) * 100}%` }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </div>

        {/* Bonusar */}
        <div className="hidden flex-wrap gap-1 sm:flex">
          <BonusChip
            label="SCR"
            value={b.scramble}
            pending={b.scramblePlace == null}
            title={b.scramblePlace ? `Scramble: plats ${b.scramblePlace}` : "Scramble ej avgjord"}
          />
          {MINI_KEYS.map((k) => (
            <BonusChip
              key={k}
              label={MINI_LABELS[k].emoji}
              value={b.minis[k]}
              pending={b.miniRanks[k] == null}
              title={`${MINI_LABELS[k].title}${b.miniRanks[k] ? `: plats ${b.miniRanks[k]}` : " – ej avgjord"}`}
            />
          ))}
        </div>

        {/* Finalrunda */}
        <div className="hidden text-center sm:block">
          <div className={`font-mono text-2xl tabular-nums ${finalStarted ? "" : "text-cream/40"}`}>
            {finalStarted ? row.points ?? "–" : row.expected.toFixed(0)}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-mute">
            {finalStarted ? `hål ${formatThru(row.thru, row.points)}` : "poäng"}
          </div>
        </div>

        {/* Sannolikhet */}
        <div className="hidden sm:block">
          <div className="mb-1.5 flex items-baseline justify-between font-mono text-xs">
            <span className="tabular-nums text-cream">{formatPct(row.prob)}</span>
            <Movement row={row} />
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, color-mix(in oklab, ${row.color} 40%, transparent), ${row.color})` }}
              initial={{ width: 0 }}
              animate={{ width: `${(row.prob / Math.max(maxProb, 0.0001)) * 100}%` }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        {/* Odds */}
        <div className="flex items-center justify-end gap-2">
          <div className="text-right">
            <div
              className={`rounded-xl px-2.5 py-1 font-mono text-lg font-semibold tabular-nums sm:text-xl ${
                leader ? "bg-gold text-ink" : "bg-white/5 text-gold"
              }`}
            >
              {decimalOdds(row.prob)}
            </div>
            <div className="mt-1 font-mono text-[10px] text-mute sm:hidden">
              {finalStarted ? `${row.points ?? "–"} p · ${formatThru(row.thru, row.points)}` : formatPct(row.prob)}
            </div>
          </div>
          <ChevronDown className={`hidden size-4 text-mute transition sm:block ${open ? "rotate-180" : ""}`} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden"
          >
            <div className="grid gap-3 border-t border-line px-4 py-4 text-sm sm:grid-cols-4 sm:px-5">
              <Detail label="Grund-hcp" value={row.player.hcp.toFixed(1)} />
              <Detail
                label="Scramble"
                value={b.scramblePlace ? `Plats ${b.scramblePlace} · ${signed(b.scramble)}` : "Ej avgjord"}
                sub={
                  data.teams
                    ? `Lag med ${data.teams
                        .find((t) => t.members.includes(row.player.id))
                        ?.members.filter((m) => m !== row.player.id)
                        .map((m) => data.players.find((p) => p.id === m)?.name)
                        .join(", ")}`
                    : "Lagen ej lottade"
                }
              />
              {MINI_KEYS.map((k) => (
                <Detail
                  key={k}
                  label={`${MINI_LABELS[k].emoji} ${MINI_LABELS[k].title}`}
                  value={b.miniRanks[k] ? `Plats ${b.miniRanks[k]} · ${signed(b.minis[k])}` : "Ej avgjord"}
                />
              ))}
              <Detail
                label="Spel-hcp till finalen"
                value={b.adjustedHcp.toFixed(1)}
                sub={`${signed(b.total)} i bonus`}
                highlight
              />
              <Detail label="Förväntade poäng" value={`${row.expected.toFixed(1)} p`} sub="enligt simuleringen" />
              <Detail label="Finalrunda" value={row.points != null ? `${row.points} p` : "–"} sub={row.thru ? `efter ${row.thru} hål` : "ej startad"} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

function Detail({ label, value, sub, highlight }: { label: string; value: string; sub?: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl p-3 ${highlight ? "bg-gold/10" : "bg-white/[0.03]"}`}>
      <div className="text-[11px] uppercase tracking-wider text-mute">{label}</div>
      <div className={`mt-1 font-mono text-base ${highlight ? "text-gold" : "text-cream"}`}>{value}</div>
      {sub && <div className="mt-0.5 text-xs text-mute">{sub}</div>}
    </div>
  );
}

export function Liveboard() {
  const { data, odds, source } = useTournament();
  const rows = buildRows(data, odds);
  const phase = currentPhase(data);
  const finalStarted = phase === "final" || phase === "done";
  const maxProb = Math.max(...rows.map((r) => r.prob));
  const leaderId = [...rows].sort((a, b) => b.prob - a.prob)[0]?.player.id;

  return (
    <section id="liveboard" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-8">
      <SectionHeading
        eyebrow="Liveboard"
        title={
          <>
            Vem tar <em className="gold-text not-italic">pokalen</em>?
          </>
        }
        aside={
          <div className="flex items-center gap-2 font-mono text-xs text-mute">
            <LiveDot active={source === "live" && phase !== "done"} />
            {source === "loading" ? "Ansluter…" : `Uppdaterad ${relativeTime(data.updatedAt)}`}
          </div>
        }
      >
        Sannolikheten räknas om efter varje inmatat resultat genom att hela resten av turneringen simuleras
        20 000 gånger. Oddsen är decimalodds med 8 % husmarginal – för husets äras skull.
      </SectionHeading>

      <div className="mt-10 hidden grid-cols-[2.5rem_minmax(0,1.1fr)_minmax(15rem,1.1fr)_5rem_minmax(0,1fr)_5.5rem] gap-4 px-5 pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-mute sm:grid">
        <span>#</span>
        <span>Spelare</span>
        <span>Bonus-hcp</span>
        <span className="text-center">{finalStarted ? "Poäng" : "Prognos"}</span>
        <span>Vinstchans</span>
        <span className="pr-6 text-right">Odds</span>
      </div>
      <ul className="mt-6 space-y-2 sm:mt-0">
        {rows.map((row) => (
          <LiveRow
            key={row.player.id}
            row={row}
            leader={row.player.id === leaderId}
            finalStarted={finalStarted}
            maxProb={maxProb}
          />
        ))}
      </ul>
    </section>
  );
}
