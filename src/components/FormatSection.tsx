import { motion } from "motion/react";
import { Beer, Crosshair, Flag, Trophy, Users } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const steps = [
  {
    icon: Users,
    tag: "Spelomgång 1",
    title: "2-manna scramble",
    body: "Nio hål. Lagen lottas. Lagets hcp = medelvärdet av spelarnas hcp.",
    rules: [
      ["1:a plats", "+3 hcp"],
      ["2:a plats", "+2 hcp"],
      ["3:e plats", "+1 hcp"],
      ["4:e plats", "±0"],
    ],
  },
  {
    icon: Crosshair,
    tag: "Spelomgång 2",
    title: "Småtävlingar",
    body: "Längsta drive, närmast flagg och träffsäkerhet. Alla mot alla.",
    rules: [
      ["1:a plats", "+1 hcp"],
      ["2:a–6:e", "±0"],
      ["7:e–8:e", "−1 hcp"],
    ],
  },
  {
    icon: Beer,
    tag: "Paus",
    title: "Lunch",
    body: "Med tillgång till alkohol. Strategiskt viktigaste momentet på hela dagen.",
    rules: [["Rekommendation", "Lagom"]],
  },
  {
    icon: Flag,
    tag: "Spelomgång 3",
    title: "Individuell 18-hålsrunda",
    body: "Ditt vanliga hcp plus/minus allt du kammat ihop under dagen. Bäst poäng vinner. Inget annat räknas.",
    rules: [["Vinnare", "Flest poäng"]],
  },
];

export function FormatSection() {
  return (
    <section id="format" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-8">
      <SectionHeading
        eyebrow="Formatet"
        title={
          <>
            Tre omgångar. <em className="text-cream/60">En</em> vinnare.
          </>
        }
      >
        Prestera tidigt så får du fler slag på sista rundan. Shanka tidigt så får du… lära dig leva med det.
      </SectionHeading>

      <div className="relative mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="glass group relative flex flex-col overflow-hidden rounded-3xl p-6"
          >
            <div className="absolute -right-6 -top-8 font-display text-[9rem] leading-none text-white/[0.03] transition group-hover:text-gold/[0.07]">
              {i + 1}
            </div>
            <s.icon className="size-6 text-gold" />
            <div className="eyebrow mt-6">{s.tag}</div>
            <h3 className="mt-1 font-display text-3xl leading-tight">{s.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-cream/65">{s.body}</p>
            <dl className="mt-5 space-y-1.5 border-t border-line pt-4 font-mono text-xs">
              {s.rules.map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <dt className="text-mute">{k}</dt>
                  <dd className="text-cream">{v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mt-3 overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-gold/15 via-gold/5 to-transparent p-6 sm:p-8"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Trophy className="size-10 shrink-0 text-gold" />
          <p className="font-display text-2xl leading-snug sm:text-3xl">
            Spel-hcp i finalen = ditt hcp + scramblebonus + småtävlingsbonus. Den som har bäst poäng på sista
            rundan tar med sig pokalen hem.
          </p>
        </div>
      </motion.div>

      <details className="glass group mt-3 rounded-3xl p-6 open:pb-6">
        <summary className="cursor-pointer list-none font-mono text-xs uppercase tracking-[0.2em] text-mute marker:hidden">
          <span className="text-gold">+</span> Hur räknas oddsen?
        </summary>
        <div className="mt-4 grid gap-4 text-sm leading-relaxed text-cream/70 md:grid-cols-3">
          <p>
            <b className="text-cream">Monte Carlo.</b> Allt som inte spelats än simuleras 20 000 gånger: lottning,
            scrambleplaceringar, småtävlingar och finalrundan.
          </p>
          <p>
            <b className="text-cream">Finalrundan.</b> Förväntade poäng ≈ 34 − 0,08 × hcp + bonusslagen. Spridningen
            växer med hcp – en 30-banare kan göra 45 poäng. Eller 19.
          </p>
          <p>
            <b className="text-cream">Live.</b> Under finalen räknas spelade poäng plus förväntade poäng på de hål som
            återstår. Oddsen = 0,92 / sannolikheten.
          </p>
        </div>
      </details>
    </section>
  );
}
