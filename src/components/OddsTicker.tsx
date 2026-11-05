import { TrendingDown, TrendingUp } from "lucide-react";
import { useTournament } from "../lib/store";
import { buildRows } from "../lib/view";
import { decimalOdds } from "../lib/odds";

export function OddsTicker() {
  const { data, odds } = useTournament();
  const rows = buildRows(data, odds).sort((a, b) => b.prob - a.prob);
  const items = [...rows, ...rows];

  return (
    <div className="relative overflow-hidden border-y border-line bg-ink-2/80 py-3 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max animate-marquee gap-10 pr-10 hover:[animation-play-state:paused]">
        {items.map((r, i) => {
          const delta = r.prevProb == null ? 0 : r.prob - r.prevProb;
          return (
            <div key={i} className="flex items-center gap-3 font-mono text-sm whitespace-nowrap">
              <span className="size-1.5 rounded-full" style={{ background: r.color }} />
              <span className="uppercase tracking-widest text-cream/80">{r.player.name}</span>
              <span className="font-semibold tabular-nums text-gold">{decimalOdds(r.prob)}</span>
              {Math.abs(delta) > 0.002 &&
                (delta > 0 ? (
                  <TrendingUp className="size-4 text-fairway" />
                ) : (
                  <TrendingDown className="size-4 text-flag" />
                ))}
              <span className="text-line">◆</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
