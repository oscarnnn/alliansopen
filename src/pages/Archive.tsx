import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, ExternalLink, Play, X } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import amtLogo from "../assets/archive/logos/AMTLogo.png";
import antonImg from "../assets/players/Anton.png";

const hultaModules = import.meta.glob<string>("../assets/archive/hulta/*.jpg", { eager: true, import: "default" });
const hultaHoles = Object.entries(hultaModules)
  .map(([path, src]) => ({ hole: Number(path.match(/Hulta(\d+)\.jpg$/)?.[1] ?? 0), src }))
  .sort((a, b) => a.hole - b.hole);

const faceModules = import.meta.glob<string>("../assets/players/*.png", { eager: true, import: "default" });
const oldFaces = Object.entries(faceModules)
  .map(([path, src]) => ({ name: path.split("/").pop()!.replace(".png", ""), src }))
  .filter((f) => f.name !== "Perra") // Perra var aldrig med 2021 – han debuterar 2026
  .sort((a, b) => a.name.localeCompare(b.name, "sv"));

// Resultat 2020 – första upplagan (slag/poäng per bana)
const results2020 = [
  { name: "Oscar", sisjon: "104/27", torrekulla: "93/35", hulta: "100/35", pin: 2, strokes: 297, points: 101 },
  { name: "Axel", sisjon: "104/34", torrekulla: "116/26", hulta: "111/34", pin: 2, strokes: 331, points: 98 },
  { name: "Patrick", sisjon: "112/24", torrekulla: "101/34", hulta: "128/19", pin: 2, strokes: 341, points: 81 },
  { name: "Ljubo", sisjon: "131/22", torrekulla: "150/19", hulta: "133/28", pin: 1, strokes: 414, points: 71 },
  { name: "Jonathan", sisjon: "150/16", torrekulla: "125/23", hulta: "149/15", pin: 0, strokes: 424, points: 54 },
  { name: "Ludvig", sisjon: "162/7", torrekulla: "142/16", hulta: "162/9", pin: 1, strokes: 466, points: 34 },
];

// Ställning 2021 – senast uppdaterad på gamla sajten (Hulta-rundan aldrig inlagd)
const results2021 = [
  { name: "Anton Adielsson", sisjon: "95/27", torrekulla: "84/41", pin: 1, strokes: 179, points: 70 },
  { name: "Jesper Leinonen", sisjon: "106/25", torrekulla: "98/36", pin: 1, strokes: 204, points: 63 },
  { name: "Axel Esborn", sisjon: "107/23", torrekulla: "92/35", pin: 0, strokes: 199, points: 58 },
  { name: "Joakim Hammarström", sisjon: "86/27", torrekulla: "84/27", pin: 1, strokes: 170, points: 56 },
  { name: "Oscar Nilsson", sisjon: "106/21", torrekulla: "89/33", pin: 1, strokes: 195, points: 56 },
  { name: "Patrick Marklund", sisjon: "118/25", torrekulla: "115/25", pin: 1, strokes: 233, points: 52 },
  { name: "Martin Hansson", sisjon: "85/28", torrekulla: "–", pin: 0, strokes: 85, points: 28 },
  { name: "Jonathan Karrin", sisjon: "–", torrekulla: "132/17", pin: 0, strokes: 132, points: 17 },
];

const gamebook2020 = [
  { name: "Hulta GK", url: "https://online.golfgamebook.com/leaderboard/2u8-amdo" },
  { name: "Torrekulla GK", url: "https://online.golfgamebook.com/leaderboard/2ue-f1w3" },
  { name: "Sisjö GK", url: "https://online.golfgamebook.com/leaderboard/2ud-ha79" },
];

function Video({ src, title }: { src: string; title: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="glass relative aspect-video overflow-hidden rounded-3xl">
      {play ? (
        <iframe
          src={`${src}${src.includes("?") ? "&" : "?"}autoplay=1`}
          title={title}
          className="absolute inset-0 size-full"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button onClick={() => setPlay(true)} className="group absolute inset-0 grid place-items-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(61,220,132,0.18),transparent_60%)]" />
          <div className="relative flex flex-col items-center gap-4">
            <span className="grid size-20 place-items-center rounded-full bg-gold text-ink shadow-[0_0_60px_-10px_var(--color-gold)] transition group-hover:scale-110">
              <Play className="size-8 translate-x-0.5 fill-current" />
            </span>
            <span className="font-display text-3xl">{title}</span>
          </div>
        </button>
      )}
    </div>
  );
}

function Table({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
  return (
    <div className="glass overflow-x-auto rounded-3xl">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-line font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
            <th className="px-5 py-4">#</th>
            {head.map((h) => (
              <th key={h} className="px-4 py-4">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={`border-b border-line/60 last:border-0 ${i === 0 ? "bg-gold/[0.07]" : ""}`}>
              <td className="px-5 py-3.5 font-display text-2xl text-cream/60">{i === 0 ? "🏆" : i + 1}</td>
              {r.map((c, j) => (
                <td
                  key={j}
                  className={`px-4 py-3.5 ${j === 0 ? "font-medium" : "font-mono tabular-nums text-cream/75"} ${
                    j === r.length - 1 ? "text-gold!" : ""
                  }`}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function HultaGallery() {
  const [index, setIndex] = useState<number | null>(null);
  useEffect(() => {
    if (index == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((i) => (i! + 1) % hultaHoles.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i! - 1 + hultaHoles.length) % hultaHoles.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  return (
    <>
      <div className="flex snap-x gap-3 overflow-x-auto pb-4 [scrollbar-width:thin]">
        {hultaHoles.map((h, i) => (
          <button
            key={h.hole}
            onClick={() => setIndex(i)}
            className="group relative w-40 shrink-0 snap-start overflow-hidden rounded-2xl border border-line sm:w-48"
          >
            <img src={h.src} alt={`Hulta hål ${h.hole}`} loading="lazy" className="aspect-[2/3] w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-3 text-left">
              <span className="font-display text-3xl">{h.hole}</span>
            </div>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {index != null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-ink/90 p-4 backdrop-blur-xl"
            onClick={() => setIndex(null)}
          >
            <motion.img
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              src={hultaHoles[index].src}
              alt={`Hulta hål ${hultaHoles[index].hole}`}
              className="max-h-[88svh] rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10" aria-label="Stäng">
              <X />
            </button>
            <button
              className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10"
              onClick={(e) => {
                e.stopPropagation();
                setIndex((i) => (i! - 1 + hultaHoles.length) % hultaHoles.length);
              }}
              aria-label="Föregående"
            >
              <ChevronLeft />
            </button>
            <button
              className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10"
              onClick={(e) => {
                e.stopPropagation();
                setIndex((i) => (i! + 1) % hultaHoles.length);
              }}
              aria-label="Nästa"
            >
              <ChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Year({ year, children }: { year: string; children: React.ReactNode }) {
  return (
    <section id={`ar-${year}`} className="relative mx-auto max-w-6xl px-4 py-16 sm:px-8">
      {children}
    </section>
  );
}

export default function Archive() {
  return (
    <div className="pt-28">
      <section className="mx-auto max-w-6xl px-4 pb-6 sm:px-8">
        <div className="grid items-end gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <div className="eyebrow mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" /> Arkivet
            </div>
            <h1 className="font-display text-6xl leading-[0.9] sm:text-8xl">
              Där allt <em className="gold-text">började</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cream/65">
              Intron, resultaten, banguiden och de tveksamma profilbilderna från 2020 och 2021.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
            animate={{ opacity: 1, rotate: -6, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto grid size-44 place-items-center rounded-full bg-cream p-6 shadow-[0_0_0_6px_var(--color-ink),0_0_0_8px_var(--color-gold),0_30px_80px_-20px_var(--color-gold)]"
          >
            <img src={amtLogo} alt="Gamla loggan" className="w-full mix-blend-multiply" />
            <span className="sr-only">Originalloggan från 2020</span>
          </motion.div>
        </div>
      </section>

      <Year year="2020">
        <SectionHeading eyebrow="Upplaga I" title={<>Första <em className="text-cream/60">touren</em></>}>
          Sisjön, Torrekulla och Hulta. Mest poäng totalt vinner. Oscar tog hem det med tre poängs marginal före Axel.
        </SectionHeading>
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Video src="https://www.youtube.com/embed/vq5evQkb_0w" title="Intro 2020" />
          <div className="glass flex flex-col justify-between rounded-3xl p-6">
            <div>
              <div className="eyebrow">Mästare 2020</div>
              <div className="mt-2 font-display text-7xl gold-text">Oscar</div>
              <div className="mt-2 font-mono text-sm text-mute">101 poäng · 297 slag</div>
            </div>
            <div className="mt-6 space-y-2">
              <div className="eyebrow mb-2">Golf GameBook</div>
              {gamebook2020.map((g) => (
                <a
                  key={g.name}
                  href={g.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3 py-2 text-sm transition hover:bg-white/[0.07]"
                >
                  {g.name} <ExternalLink className="size-3.5 text-mute" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Table
            head={["Spelare", "Sisjön", "Torrekulla", "Hulta", "Närmast pin", "Slag", "Poäng"]}
            rows={results2020.map((r) => [r.name, r.sisjon, r.torrekulla, r.hulta, r.pin, r.strokes, r.points])}
          />
        </div>
      </Year>

      <Year year="2021">
        <SectionHeading eyebrow="Upplaga II" title={<>Antons <em className="text-cream/60">år</em></>}>
          ”Shaft-Shank Redemption är en trött liten tour som några av Göteborgs sämsta golflirare dragit igång.” Banor:
          Sisjö GK 25/5, Torrekulla GK 8/6 och Hulta GK 12/9. Anton tog ledningen tidigt och släppte den aldrig.
        </SectionHeading>
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Video src="https://player.vimeo.com/video/534384659" title="Intro 2021" />
          <div className="glass flex flex-col items-start justify-between gap-6 rounded-3xl p-6">
            <div>
              <div className="eyebrow">Mästare 2021</div>
              <div className="mt-2 font-display text-7xl gold-text">Anton</div>
              <div className="mt-2 font-mono text-sm text-mute">Vann touren 2021</div>
            </div>
            <img src={antonImg} alt="Anton" className="size-28 rounded-full object-cover ring-2 ring-gold/60" />
          </div>
        </div>
        <div className="mt-4">
          <Table
            head={["Spelare", "Sisjön", "Torrekulla", "Närmast pin", "Slag", "Poäng"]}
            rows={results2021.map((r) => [r.name, r.sisjon, r.torrekulla, r.pin, r.strokes, r.points])}
          />
          <p className="mt-3 px-2 font-mono text-xs text-mute">Ställning efter två av tre banor – Hulta-rundan fördes aldrig in på sajten, men Anton vann till slut.</p>
        </div>
      </Year>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        <SectionHeading eyebrow="Banguide" title={<>Hulta GK, <em className="text-cream/60">hål för hål</em></>}>
          Alla 18 hål från gamla sajten. Klicka för att förstora – piltangenterna funkar.
        </SectionHeading>
        <div className="mt-10">
          <HultaGallery />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        <SectionHeading eyebrow="Profilbilderna" title={<>Tävlande, <em className="text-cream/60">typ</em></>}>
          De officiella spelarporträtten från 2021. Likheten är slående.
        </SectionHeading>
        <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {oldFaces.map((f, i) => (
            <motion.figure
              key={f.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05 }}
              className="group overflow-hidden rounded-2xl border border-line"
            >
              <img src={f.src} alt={f.name} loading="lazy" className="aspect-square w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" />
              <figcaption className="px-3 py-2 font-display text-xl">{f.name}</figcaption>
            </motion.figure>
          ))}
        </div>
      </section>
    </div>
  );
}
