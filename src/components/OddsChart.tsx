import { useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { LineChart } from "lucide-react";
import { useTournament } from "../lib/store";
import { colorFor } from "../lib/view";
import { formatPct } from "../lib/odds";
import { SectionHeading } from "./SectionHeading";

const W = 1000;
const H = 360;
const PAD = { t: 16, r: 16, b: 28, l: 44 };

export function OddsChart() {
  const { data } = useTournament();
  const history = data.history;
  const [hover, setHover] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [focus, setFocus] = useState<string | null>(null);

  const maxP = useMemo(() => {
    const m = Math.max(0.2, ...history.flatMap((h) => Object.values(h.probs)));
    return Math.min(1, Math.ceil(m * 10) / 10);
  }, [history]);

  const x = (i: number) => PAD.l + (history.length <= 1 ? 0 : (i / (history.length - 1)) * (W - PAD.l - PAD.r));
  const y = (p: number) => PAD.t + (1 - p / maxP) * (H - PAD.t - PAD.b);

  const onMove = (e: React.PointerEvent) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect || history.length < 2) return;
    const rel = ((e.clientX - rect.left) / rect.width) * W;
    const i = Math.round(((rel - PAD.l) / (W - PAD.l - PAD.r)) * (history.length - 1));
    setHover(Math.max(0, Math.min(history.length - 1, i)));
  };

  const active = hover ?? history.length - 1;
  const snap = history[active];
  const ticks = Array.from({ length: 5 }, (_, i) => (maxP / 4) * i);

  return (
    <section id="odds" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-8">
      <SectionHeading
        eyebrow="Oddsrörelser"
        title={
          <>
            Marknaden <em className="text-cream/60">svänger</em>
          </>
        }
      >
        Varje gång admin publicerar ett resultat sparas vinstchansen för alla. Här ser du vem som tappat
        nerverna – och vem som hittat formen efter lunchen.
      </SectionHeading>

      <div className="glass mt-10 rounded-3xl p-4 sm:p-6">
        {history.length < 2 ? (
          <div className="grid h-64 place-items-center text-center text-mute">
            <div>
              <LineChart className="mx-auto mb-3 size-8 text-gold/60" />
              Grafen vaknar när de första resultaten publicerats.
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
              <div className="font-mono text-xs text-mute">
                {new Date(snap.ts).toLocaleString("sv-SE", { hour: "2-digit", minute: "2-digit", day: "numeric", month: "short" })}
              </div>
              <div className="text-sm text-cream/80">{snap.label}</div>
            </div>
            <svg
              ref={svgRef}
              viewBox={`0 0 ${W} ${H}`}
              className="h-auto w-full touch-none select-none"
              onPointerMove={onMove}
              onPointerLeave={() => setHover(null)}
            >
              {ticks.map((t) => (
                <g key={t}>
                  <line x1={PAD.l} x2={W - PAD.r} y1={y(t)} y2={y(t)} stroke="rgba(255,255,255,0.06)" />
                  <text x={PAD.l - 10} y={y(t) + 4} textAnchor="end" className="fill-mute font-mono text-[11px]">
                    {Math.round(t * 100)}%
                  </text>
                </g>
              ))}
              <line x1={x(active)} x2={x(active)} y1={PAD.t} y2={H - PAD.b} stroke="rgba(232,200,114,0.35)" strokeDasharray="3 4" />
              {data.players.map((p) => {
                const color = colorFor(data, p.id);
                const d = history
                  .map((h, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(h.probs[p.id] ?? 0).toFixed(1)}`)
                  .join(" ");
                const dim = focus && focus !== p.id;
                return (
                  <g key={p.id} opacity={dim ? 0.12 : 1} style={{ transition: "opacity .3s" }}>
                    <motion.path
                      d={d}
                      fill="none"
                      stroke={color}
                      strokeWidth={focus === p.id ? 3.5 : 2.2}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <circle cx={x(active)} cy={y(snap.probs[p.id] ?? 0)} r={4.5} fill={color} stroke="#050a07" strokeWidth={2} />
                  </g>
                );
              })}
            </svg>
            <div className="mt-4 flex flex-wrap gap-2">
              {[...data.players]
                .sort((a, b) => (snap.probs[b.id] ?? 0) - (snap.probs[a.id] ?? 0))
                .map((p) => (
                  <button
                    key={p.id}
                    onMouseEnter={() => setFocus(p.id)}
                    onMouseLeave={() => setFocus(null)}
                    onClick={() => setFocus((f) => (f === p.id ? null : p.id))}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs transition ${
                      focus === p.id ? "border-cream/40 bg-white/10" : "border-line"
                    }`}
                  >
                    <span className="size-2 rounded-full" style={{ background: colorFor(data, p.id) }} />
                    {p.name}
                    <span className="text-mute">{formatPct(snap.probs[p.id] ?? 0)}</span>
                  </button>
                ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
