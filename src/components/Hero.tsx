import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, CalendarDays, MapPin } from "lucide-react";
import { useTournament } from "../lib/store";
import { currentPhase, PHASE_LABEL } from "../lib/scoring";
import { buildRows } from "../lib/view";
import { decimalOdds, formatPct } from "../lib/odds";
import { Avatar } from "./Avatar";
import { LiveDot } from "./LiveDot";
import { IntroVideo } from "./IntroVideo";

const ease = [0.16, 1, 0.3, 1] as const;

function SplitWord({ word, delay, className }: { word: string; delay: number; className?: string }) {
  return (
    <span className={`inline-block whitespace-nowrap ${className ?? ""}`}>
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "110%", opacity: 0, rotate: 6 }}
          animate={{ y: "0%", opacity: 1, rotate: 0 }}
          transition={{ duration: 1, delay: delay + i * 0.035, ease }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function useCountdown(target: string | null) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!target) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  if (!target) return null;
  const diff = new Date(target).getTime() - now;
  if (Number.isNaN(diff) || diff <= 0) return null;
  const s = Math.floor(diff / 1000);
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

export function Hero() {
  const { data, odds } = useTournament();
  const phase = currentPhase(data);
  const favourite = buildRows(data, odds).slice().sort((a, b) => b.prob - a.prob)[0];
  const countdown = useCountdown(data.eventDate);
  const dateLabel = data.eventDate
    ? new Date(data.eventDate).toLocaleDateString("sv-SE", { weekday: "long", day: "numeric", month: "long" })
    : null;

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden px-4 pb-10 pt-28 sm:px-8">
      {/* Bakgrund */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-[20%] -top-[30%] h-[80vmax] w-[80vmax] animate-float rounded-full bg-[radial-gradient(circle,rgba(61,220,132,0.22),transparent_60%)] blur-3xl" />
        <div className="absolute -right-[25%] top-[10%] h-[70vmax] w-[70vmax] animate-float rounded-full bg-[radial-gradient(circle,rgba(232,200,114,0.18),transparent_60%)] blur-3xl [animation-delay:-4s]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="mb-8 flex flex-wrap items-center gap-3"
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs">
            <LiveDot active={phase !== "done"} />
            <span className="font-mono uppercase tracking-[0.2em] text-cream/90">{PHASE_LABEL[phase]}</span>
          </span>
        </motion.div>

        <h1 className="font-display leading-[0.86] tracking-tight">
          <span className="block overflow-hidden pb-2 text-[clamp(3rem,11vw,9.5rem)] italic text-cream/90">
            <SplitWord word="Shaft-Shank" delay={0.1} />
          </span>
          <span className="block overflow-hidden pb-4 text-[clamp(3.4rem,13.5vw,12rem)]">
            <motion.span
              className="gold-text inline-block pr-[0.06em]"
              initial={{ y: "100%", opacity: 0, filter: "blur(12px)" }}
              animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.4, ease }}
            >
              Redemption
            </motion.span>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease }}
          className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end"
        >
          <div>
            <p className="max-w-xl text-lg leading-relaxed text-cream/75 sm:text-xl">
              Åtta spelare. Tre spelomgångar. En lunch med tillgång till alkohol.
              <span className="text-cream"> Och en vandringspokal.</span>
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-mute">
              {dateLabel && (
                <span className="inline-flex items-center gap-2 capitalize">
                  <CalendarDays className="size-4 text-gold" /> {dateLabel}
                </span>
              )}
              {data.venue && (
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-4 text-gold" /> {data.venue}
                </span>
              )}
            </div>
            {countdown && (
              <div className="mt-6 flex gap-2 font-mono">
                {(
                  [
                    ["dagar", countdown.d],
                    ["tim", countdown.h],
                    ["min", countdown.m],
                    ["sek", countdown.s],
                  ] as const
                ).map(([label, v]) => (
                  <div key={label} className="glass min-w-16 rounded-2xl px-3 py-2 text-center">
                    <div className="text-2xl tabular-nums text-cream">{String(v).padStart(2, "0")}</div>
                    <div className="text-[10px] uppercase tracking-widest text-mute">{label}</div>
                  </div>
                ))}
              </div>
            )}
            <IntroVideo />
          </div>

          {favourite && (
            <a
              href="#liveboard"
              className="glass group relative overflow-hidden rounded-3xl p-5 transition hover:border-gold/40"
            >
              <div className="absolute -right-10 -top-10 size-40 rounded-full bg-gold/10 blur-2xl transition group-hover:bg-gold/20" />
              <div className="eyebrow mb-4">{phase === "done" ? "Mästare 2026" : "Favorit just nu"}</div>
              <div className="flex items-center gap-4">
                <Avatar name={favourite.player.name} color={favourite.color} size={64} ring />
                <div className="min-w-0 flex-1">
                  <div className="font-display text-4xl leading-none">{favourite.player.name}</div>
                  <div className="mt-1 font-mono text-xs text-mute">
                    hcp {favourite.player.hcp.toFixed(1)} → spel-hcp{" "}
                    <span className="text-cream">{favourite.breakdown.adjustedHcp.toFixed(1)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-3xl font-semibold tabular-nums text-gold">
                    {decimalOdds(favourite.prob)}
                  </div>
                  <div className="font-mono text-xs text-mute">{formatPct(favourite.prob)}</div>
                </div>
              </div>
            </a>
          )}
        </motion.div>
      </div>

      <motion.a
        href="#liveboard"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="mx-auto mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-mute hover:text-cream"
      >
        Liveboard <ArrowDown className="size-4 animate-bounce" />
      </motion.a>
    </section>
  );
}
