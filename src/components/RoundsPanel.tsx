import { motion } from "motion/react";
import { Shuffle } from "lucide-react";
import { useTournament } from "../lib/store";
import { MINI_KEYS, MINI_LABELS } from "../lib/players";
import { miniBonusForRank, scrambleBonusForPlace, scramblePlaces, teamHcp, teamNet, teamStrokes } from "../lib/scoring";
import { colorFor } from "../lib/view";
import { Avatar } from "./Avatar";
import { SectionHeading } from "./SectionHeading";

const MEDALS = ["🥇", "🥈", "🥉"];

function Card({ children, i, className = "" }: { children: React.ReactNode; i: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`glass rounded-3xl p-5 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function RoundsPanel() {
  const { data } = useTournament();
  const places = scramblePlaces(data);
  const name = (id: string) => data.players.find((p) => p.id === id)?.name ?? id;

  return (
    <section id="omgangar" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-8">
      <SectionHeading
        eyebrow="Spelomgång 1 & 2"
        title={
          <>
            Där bonusslagen <em className="gold-text not-italic">föds</em>
          </>
        }
      >
        Scrambeln och småtävlingarna avgör inte vem som vinner – de avgör hur många extra slag du får med dig
        in i finalrundan.
      </SectionHeading>

      {/* Scramble */}
      <div className="mt-12">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-3xl">2-manna scramble · 9 hål</h3>
          <span className="font-mono text-xs text-mute">+3 / +2 / +1 / 0</span>
        </div>
        {!data.teams ? (
          <Card i={0} className="flex flex-col items-center gap-3 py-12 text-center">
            <Shuffle className="size-8 text-gold" />
            <div className="font-display text-2xl">Lagen är inte lottade än</div>
            <p className="max-w-sm text-sm text-mute">
              Lottningen sker på plats. Lagets hcp räknas enligt svenska regler: spelaren med lägre hcp × 0,5 plus spelaren med högre × 0,2. På nio hål räknas varje spelares hcp om till nio hål först, och summan avrundas till närmaste heltal.
            </p>
          </Card>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {data.teams.map((team, i) => {
              const place = places[i];
              const net = teamNet(data, i);
              return (
                <Card key={i} i={i} className={place === 1 ? "border-gold/40! bg-gold/[0.06]!" : ""}>
                  <div className="flex items-center justify-between">
                    <span className="eyebrow">Lag {i + 1}</span>
                    <span className="text-2xl">{place ? MEDALS[place - 1] ?? `#${place}` : "⛳"}</span>
                  </div>
                  <div className="mt-4 flex -space-x-3">
                    {team.members.map((m) => (
                      <Avatar key={m} name={name(m)} color={colorFor(data, m)} size={52} ring />
                    ))}
                  </div>
                  <div className="mt-3 font-display text-2xl leading-tight">{team.members.map(name).join(" & ")}</div>
                  <div className="mt-4 grid grid-cols-3 gap-2 font-mono text-xs">
                    <Stat label="Lag-hcp" value={teamHcp(team, data.players).toFixed(1)} sub={`${teamStrokes(team, data.players)} slag på 9 hål`} />
                    <Stat label="Brutto" value={data.scramble.gross[i] ?? "–"} />
                    <Stat label="Netto" value={net ?? "–"} sub={net != null ? `brutto − ${teamStrokes(team, data.players)}` : undefined} />
                  </div>
                  {place && (
                    <div className="mt-4 rounded-xl bg-fairway/10 px-3 py-2 text-center font-mono text-sm text-fairway">
                      Plats {place} · +{scrambleBonusForPlace(place)} hcp var
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Småtävlingar */}
      <div className="mt-16">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-3xl">Småtävlingar</h3>
          <span className="font-mono text-xs text-mute">1:a +1 · 7:e–8:e −1</span>
        </div>
        <div className="grid gap-3 lg:grid-cols-3">
          {MINI_KEYS.map((key, i) => {
            const ranking = data.players
              .map((p) => ({ p, rank: data.minis[key][p.id] }))
              .filter((r): r is { p: typeof r.p; rank: number } => r.rank != null)
              .sort((a, b) => a.rank - b.rank);
            return (
              <Card key={key} i={i}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-display text-3xl">{MINI_LABELS[key].title}</div>
                    <div className="text-sm text-mute">{MINI_LABELS[key].blurb}</div>
                  </div>
                  <span className="text-4xl">{MINI_LABELS[key].emoji}</span>
                </div>
                {ranking.length === 0 ? (
                  <div className="mt-6 rounded-xl border border-dashed border-line py-8 text-center text-sm text-mute">
                    Ej avgjord
                  </div>
                ) : (
                  <ol className="mt-5 space-y-1.5">
                    {ranking.map(({ p, rank }) => {
                      const bonus = miniBonusForRank(rank, data.players.length);
                      return (
                        <li
                          key={p.id}
                          className={`flex items-center gap-3 rounded-xl px-2.5 py-1.5 ${
                            bonus > 0 ? "bg-gold/10" : bonus < 0 ? "bg-flag/[0.07]" : ""
                          }`}
                        >
                          <span className="w-5 font-mono text-xs text-mute">{rank}</span>
                          <Avatar name={p.name} color={colorFor(data, p.id)} size={26} />
                          <span className="flex-1 text-sm">{p.name}</span>
                          <span
                            className={`font-mono text-xs ${bonus > 0 ? "text-gold" : bonus < 0 ? "text-flag" : "text-mute/50"}`}
                          >
                            {bonus > 0 ? "+1" : bonus < 0 ? "−1" : "0"}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, sub }: { label: string; value: React.ReactNode; sub?: string }) {
  return (
    <div className="rounded-xl bg-white/[0.03] px-2 py-2 text-center">
      <div className="text-[9px] uppercase tracking-widest text-mute">{label}</div>
      <div className="mt-0.5 text-base text-cream">{value}</div>
      {sub && <div className="text-[10px] text-mute">{sub}</div>}
    </div>
  );
}
