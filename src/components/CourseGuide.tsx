import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { courses2026, holeImages, toMeters, type Course, type Hole } from "../lib/courses";
import { HoleLightbox } from "./HoleLightbox";
import { SectionHeading } from "./SectionHeading";

function fallbackTip(h: Hole, holes: number) {
  if (h.index <= Math.ceil(holes / 3)) return "Ett av banans tuffaste hål. Spela på mitten och ta din bogey.";
  if (h.index > 12) return "Ett av de snällare hålen. Här ska slag tas tillbaka.";
  return undefined;
}

function Scorecard({ course, tee }: { course: Course; tee: number }) {
  const halves =
    course.holes.length === 18
      ? [
          { label: "Ut", holes: course.holes.slice(0, 9) },
          { label: "In", holes: course.holes.slice(9) },
        ]
      : [{ label: "In", holes: course.holes }];
  const sum = (hs: Hole[], f: (h: Hole) => number) => hs.reduce((a, h) => a + f(h), 0);
  const all = course.holes;

  const row = (label: string, f: (h: Hole) => number | string, total?: (hs: Hole[]) => number | string) => (
    <tr className="border-b border-line/60 last:border-0">
      <th className="sticky left-0 bg-ink-2 px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.2em] text-mute">{label}</th>
      {halves.map((half) => [
        ...half.holes.map((h) => (
          <td key={h.hole} className="px-2 py-2 text-center tabular-nums">
            {f(h)}
          </td>
        )),
        <td key={half.label} className="bg-white/[0.03] px-2 py-2 text-center font-medium tabular-nums text-gold">
          {total?.(half.holes) ?? ""}
        </td>,
      ])}
      {halves.length > 1 && (
        <td className="bg-gold/[0.08] px-3 py-2 text-center font-medium tabular-nums text-gold">{total?.(all) ?? ""}</td>
      )}
    </tr>
  );

  return (
    <div className="glass overflow-x-auto rounded-3xl">
      <table className="w-full font-mono text-xs text-cream/80">
        <thead>
          <tr className="border-b border-line">
            <th className="sticky left-0 bg-ink-2 px-3 py-3 text-left font-mono text-[10px] uppercase tracking-[0.2em] text-mute">Hål</th>
            {halves.map((half) => [
              ...half.holes.map((h) => (
                <th key={h.hole} className="px-2 py-3 text-center font-display text-lg font-normal text-cream">
                  {h.hole}
                </th>
              )),
              <th key={half.label} className="bg-white/[0.03] px-2 py-3 text-center text-[10px] uppercase tracking-[0.2em] text-mute">
                {half.label}
              </th>,
            ])}
            {halves.length > 1 && <th className="bg-gold/[0.08] px-3 py-3 text-[10px] uppercase tracking-[0.2em] text-mute">Tot</th>}
          </tr>
        </thead>
        <tbody>
          {row("Par", (h) => h.par, (hs) => sum(hs, (h) => h.par))}
          {row("Index", (h) => h.index)}
          {row(`Meter`, (h) => toMeters(h.yards[tee]), (hs) => sum(hs, (h) => toMeters(h.yards[tee])))}
        </tbody>
      </table>
    </div>
  );
}

function HoleCard({ course, hole, tee, image, onOpen }: { course: Course; hole: Hole; tee: number; image?: string; onOpen: () => void }) {
  const tip = hole.tip ?? fallbackTip(hole, course.holes.length);
  const meta = (
    <div className="flex items-baseline justify-between font-mono text-xs">
      <span className="text-cream">Par {hole.par}</span>
      <span className="text-mute">Index {hole.index}</span>
      <span className="text-gold">{toMeters(hole.yards[tee])} m</span>
    </div>
  );

  if (image) {
    return (
      <button onClick={onOpen} className="group relative w-48 shrink-0 snap-start overflow-hidden rounded-2xl border border-line text-left sm:w-56">
        <img src={image} alt={`${course.short} hål ${hole.hole}`} loading="lazy" className="aspect-[2/3] w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 space-y-1 bg-gradient-to-t from-ink via-ink/80 to-transparent p-3 pt-10">
          <span className="font-display text-4xl">{hole.hole}</span>
          {meta}
        </div>
      </button>
    );
  }

  return (
    <div className="glass relative flex aspect-[2/3] w-48 shrink-0 snap-start flex-col overflow-hidden rounded-2xl p-4 sm:w-56">
      <div className="pointer-events-none absolute -right-3 -top-6 font-display text-[9rem] leading-none text-white/[0.04]">{hole.hole}</div>
      <div className="eyebrow">Hål</div>
      <div className="font-display text-6xl leading-none">{hole.hole}</div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-cream/70">{tip}</p>
      <div className="border-t border-line pt-3">{meta}</div>
    </div>
  );
}

export function CourseGuide() {
  const [active, setActive] = useState(0);
  const [tee, setTee] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const course = courses2026[active];

  const images = useMemo(() => holeImages(course.slug), [course.slug]);
  const lightboxImages = course.holes
    .filter((h) => images[h.hole])
    .map((h) => ({ hole: h.hole, src: images[h.hole], alt: `${course.short} hål ${h.hole}` }));

  return (
    <section id="banor" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-8">
      <SectionHeading
        eyebrow="Banguide"
        title={
          <>
            Två banor, <em className="text-cream/60">hål för hål</em>
          </>
        }
      >
        Back nine på Pebble Beach i scrambeln, hela Stadium Course på TPC Sawgrass i finalen. Par, index och längd
        för varje hål.
      </SectionHeading>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid grid-cols-2 gap-2 sm:flex">
          {courses2026.map((c, i) => (
            <button
              key={c.slug}
              onClick={() => {
                setActive(i);
                setLightbox(null);
              }}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                i === active ? "border-gold/50 bg-gold/10" : "border-line hover:bg-white/[0.04]"
              }`}
            >
              <div className="font-display text-2xl leading-tight">{c.short}</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">{c.round}</div>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">Tee</span>
          {course.tees.map((t, i) => (
            <button
              key={t}
              onClick={() => setTee(i)}
              className={`rounded-full px-3.5 py-1.5 text-sm transition ${
                i === tee ? "bg-cream text-ink" : "text-cream/70 hover:bg-white/5"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <motion.div key={course.slug} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mt-4">
          <Scorecard course={course} tee={tee} />
        </div>
        <div className="mt-4 flex snap-x gap-3 overflow-x-auto pb-4 [scrollbar-width:thin]">
          {course.holes.map((h) => (
            <HoleCard
              key={h.hole}
              course={course}
              hole={h}
              tee={tee}
              image={images[h.hole]}
              onOpen={() => setLightbox(lightboxImages.findIndex((l) => l.hole === h.hole))}
            />
          ))}
        </div>
      </motion.div>

      <HoleLightbox images={lightboxImages} index={lightbox} onChange={setLightbox} />
    </section>
  );
}
