import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { motion } from "motion/react";
import { Trophy } from "lucide-react";
import { Hero } from "../components/Hero";
import { Liveboard } from "../components/Liveboard";
import { OddsChart } from "../components/OddsChart";
import { RoundsPanel } from "../components/RoundsPanel";
import { FormatSection } from "../components/FormatSection";
import { Avatar } from "../components/Avatar";
import { useTournament } from "../lib/store";
import { currentPhase, formatToPar } from "../lib/scoring";
import { buildRows } from "../lib/view";

function Champion() {
  const { data, odds } = useTournament();
  const rows = buildRows(data, odds);
  const top = rows.filter((r) => r.toPar === rows[0]?.toPar);
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    fired.current = true;
    const colors = ["#e8c872", "#f4ecd8", "#3ddc84"];
    const end = Date.now() + 2500;
    const frame = () => {
      confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  if (!rows[0]) return null;
  const tie = top.length > 1;

  return (
    <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2rem] border border-gold/40 bg-gradient-to-br from-gold/20 via-ink-2 to-ink p-8 text-center sm:p-14"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(232,200,114,0.35),transparent_60%)]" />
        <div className="relative">
          <Trophy className="mx-auto size-12 text-gold" />
          <div className="eyebrow mt-4">{tie ? "Delad ledning – särspel!" : "Mästare 2026"}</div>
          <div className="mt-6 flex justify-center gap-4">
            {top.map((r) => (
              <Avatar key={r.player.id} name={r.player.name} color={r.color} size={112} ring />
            ))}
          </div>
          <h2 className="mt-6 font-display text-6xl sm:text-8xl">
            <span className="gold-text">{top.map((r) => r.player.name).join(" & ")}</span>
          </h2>
          <p className="mt-3 font-mono text-sm text-cream/70">
            {rows[0].strokes} slag · netto {rows[0].net} ({formatToPar(rows[0].toPar)}) · spel-hcp{" "}
            {rows[0].breakdown.adjustedHcp.toFixed(1)}
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  const { data } = useTournament();
  const done = currentPhase(data) === "done";
  return (
    <>
      <Hero />
      {done && <Champion />}
      <Liveboard />
      <OddsChart />
      <RoundsPanel />
      <FormatSection />
    </>
  );
}
