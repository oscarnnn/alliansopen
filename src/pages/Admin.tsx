import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Check,
  Flag,
  LogIn,
  LogOut,
  Minus,
  Plus,
  RotateCcw,
  Send,
  Settings,
  Shuffle,
  Target,
  Users,
  UserRound,
} from "lucide-react";
import { useTournament } from "../lib/store";
import { createInitialTournament, MINI_KEYS, MINI_LABELS } from "../lib/players";
import { computeOdds, decimalOdds, formatPct } from "../lib/odds";
import {
  breakdownFor,
  drawTeams,
  effectiveThru,
  formatToPar,
  netToPar,
  scramblePlaces,
  teamHcp,
  teamNet,
  teamStrokes,
} from "../lib/scoring";
import { colorFor } from "../lib/view";
import type { MiniKey, Tournament } from "../lib/types";
import { Avatar } from "../components/Avatar";

type Tab = "final" | "scramble" | "minis" | "players" | "settings";

const TABS: { id: Tab; label: string; icon: typeof Flag }[] = [
  { id: "scramble", label: "Scramble", icon: Users },
  { id: "minis", label: "Småtävlingar", icon: Target },
  { id: "final", label: "Finalrunda", icon: Flag },
  { id: "players", label: "Spelare", icon: UserRound },
  { id: "settings", label: "Inställningar", icon: Settings },
];

const clone = (t: Tournament): Tournament => JSON.parse(JSON.stringify(t));
const num = (v: string): number | null => (v.trim() === "" || Number.isNaN(Number(v)) ? null : Number(v));

function Login() {
  const { signIn, source, user, isAdmin } = useTournament();
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="mx-auto grid min-h-[80svh] max-w-md place-items-center px-4 pt-28">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass w-full rounded-[2rem] p-8 text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-gold/15">
          <LogIn className="size-7 text-gold" />
        </div>
        <h1 className="mt-6 font-display text-5xl">Admin</h1>
        <p className="mt-3 text-sm text-mute">
          Här förs resultaten in efter varje avslutad omgång. Alla andra ser liveboarden direkt.
        </p>
        {user && !isAdmin && (
          <p className="mt-4 rounded-xl bg-flag/10 p-3 text-sm text-flag">
            {user.email} är inte admin för den här touren.
          </p>
        )}
        <button
          className="btn btn-gold mt-8 w-full"
          onClick={() => signIn().catch((e: Error) => setError(e.message))}
        >
          {source === "demo" ? "Gå in som admin (demoläge)" : "Logga in med Google"}
        </button>
        {error && <p className="mt-4 text-xs text-flag">{error}</p>}
      </motion.div>
    </div>
  );
}

function NumberStepper({
  value,
  onChange,
  min = 0,
  max = 99,
  placeholder = "–",
  start,
}: {
  value: number | null;
  onChange: (v: number | null) => void;
  min?: number;
  max?: number;
  placeholder?: string;
  /** Värde att hoppa till första gången man trycker +/− på ett tomt fält */
  start?: number;
}) {
  const step = (d: number) => {
    if (value == null && start != null) return onChange(start);
    onChange(Math.min(max, Math.max(min, (value ?? (d > 0 ? min - 1 : min + 1)) + d)));
  };
  return (
    <div className="flex items-center rounded-xl border border-line bg-white/[0.03]">
      <button type="button" className="grid size-10 place-items-center text-mute hover:text-cream" onClick={() => step(-1)} aria-label="Minska">
        <Minus className="size-4" />
      </button>
      <input
        inputMode="numeric"
        type="number"
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(num(e.target.value))}
        className="w-12 bg-transparent text-center font-mono text-lg tabular-nums outline-none placeholder:text-mute/40"
      />
      <button type="button" className="grid size-10 place-items-center text-mute hover:text-cream" onClick={() => step(1)} aria-label="Öka">
        <Plus className="size-4" />
      </button>
    </div>
  );
}

function ScrambleTab({ draft, set }: { draft: Tournament; set: (fn: (t: Tournament) => void) => void }) {
  const [spinning, setSpinning] = useState(false);
  const places = scramblePlaces(draft);
  const name = (id: string) => draft.players.find((p) => p.id === id)?.name ?? "?";

  const draw = () => {
    setSpinning(true);
    let n = 0;
    const id = setInterval(() => {
      const teams = drawTeams(draft.players);
      set((t) => {
        t.teams = teams;
      });
      if (++n >= 12) {
        clearInterval(id);
        setSpinning(false);
      }
    }, 90);
  };

  return (
    <div className="space-y-4">
      <div className="glass flex flex-col gap-4 rounded-3xl p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-display text-3xl">Lottning</h3>
          <p className="text-sm text-mute">Slumpar fyra 2-mannalag. Du kan också byta spelare manuellt nedan.</p>
        </div>
        <button className="btn btn-gold" onClick={draw} disabled={spinning}>
          <Shuffle className={`size-4 ${spinning ? "animate-spin" : ""}`} /> {draft.teams ? "Lotta om" : "Lotta lag"}
        </button>
      </div>

      {draft.teams && (
        <div className="grid gap-3 md:grid-cols-2">
          {draft.teams.map((team, i) => (
            <motion.div layout key={i} className="glass rounded-3xl p-5">
              <div className="flex items-center justify-between">
                <span className="eyebrow">Lag {i + 1}</span>
                <span className="font-mono text-xs text-mute">
                  hcp {teamHcp(team, draft.players).toFixed(1)} · {teamStrokes(team, draft.players)} slag på 9 hål
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {team.members.map((m, slot) => (
                  <label key={slot} className="flex items-center gap-2 rounded-xl bg-white/[0.03] p-2">
                    <Avatar name={name(m)} color={colorFor(draft, m)} size={32} />
                    <select
                      value={m}
                      onChange={(e) =>
                        set((t) => {
                          const other = e.target.value;
                          // byt plats med spelaren som redan finns i ett annat lag
                          for (const tm of t.teams!) {
                            const j = tm.members.indexOf(other);
                            if (j >= 0) tm.members[j] = m;
                          }
                          t.teams![i].members[slot] = other;
                        })
                      }
                      className="w-full bg-transparent text-sm outline-none"
                    >
                      {draft.players.map((p) => (
                        <option key={p.id} value={p.id} className="bg-ink">
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 items-end gap-3">
                <div>
                  <div className="mb-1 text-[11px] uppercase tracking-wider text-mute">Bruttoslag</div>
                  <input
                    type="number"
                    inputMode="numeric"
                    className="field font-mono"
                    placeholder="t.ex. 38"
                    value={draft.scramble.gross[i] ?? ""}
                    onChange={(e) =>
                      set((t) => {
                        t.scramble.gross[i] = num(e.target.value);
                      })
                    }
                  />
                </div>
                <div className="pb-2.5 text-center font-mono text-sm">
                  <div className="text-[11px] uppercase tracking-wider text-mute">Netto</div>
                  {teamNet(draft, i) ?? "–"}
                </div>
                <div>
                  <div className="mb-1 text-[11px] uppercase tracking-wider text-mute">Placering</div>
                  <select
                    className="field"
                    value={draft.scramble.place[i] ?? ""}
                    onChange={(e) =>
                      set((t) => {
                        t.scramble.place[i] = num(e.target.value);
                      })
                    }
                  >
                    <option value="" className="bg-ink">
                      Auto{places[i] ? ` (${places[i]})` : ""}
                    </option>
                    {draft.teams!.map((_, p) => (
                      <option key={p} value={p + 1} className="bg-ink">
                        {p + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      <p className="px-2 text-xs text-mute">
        Placering räknas automatiskt på nettoslag när alla lag har resultat. Vid delad plats får båda lagen den bättre
        placeringen – välj placering manuellt om ni avgör på annat sätt.
      </p>
    </div>
  );
}

function MinisTab({ draft, set }: { draft: Tournament; set: (fn: (t: Tournament) => void) => void }) {
  const n = draft.players.length;
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      {MINI_KEYS.map((key: MiniKey) => {
        const ranks = draft.minis[key];
        const counts = new Map<number, number>();
        Object.values(ranks).forEach((r) => r && counts.set(r, (counts.get(r) ?? 0) + 1));
        const nextFree = () => {
          for (let r = 1; r <= n; r++) if (!counts.has(r)) return r;
          return null;
        };
        return (
          <div key={key} className="glass rounded-3xl p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl">
                {MINI_LABELS[key].emoji} {MINI_LABELS[key].title}
              </h3>
              <button
                className="text-xs text-mute hover:text-flag"
                onClick={() =>
                  set((t) => {
                    for (const p of t.players) t.minis[key][p.id] = null;
                  })
                }
              >
                Rensa
              </button>
            </div>
            <p className="mt-1 text-xs text-mute">Tryck på spelarna i ordning från bäst, eller välj plats.</p>
            <ul className="mt-4 space-y-1.5">
              {draft.players.map((p) => {
                const r = ranks[p.id];
                const dup = r != null && (counts.get(r) ?? 0) > 1;
                return (
                  <li key={p.id} className="flex items-center gap-2">
                    <button
                      className={`flex flex-1 items-center gap-2 rounded-xl px-2 py-1.5 text-left text-sm transition ${
                        r === 1 ? "bg-gold/15" : r && r >= n - 1 ? "bg-flag/10" : "bg-white/[0.03] hover:bg-white/[0.07]"
                      }`}
                      onClick={() =>
                        set((t) => {
                          t.minis[key][p.id] = r ? null : nextFree();
                        })
                      }
                    >
                      <Avatar name={p.name} color={colorFor(draft, p.id)} size={26} />
                      {p.name}
                    </button>
                    <select
                      value={r ?? ""}
                      onChange={(e) =>
                        set((t) => {
                          t.minis[key][p.id] = num(e.target.value);
                        })
                      }
                      className={`w-16 rounded-xl border bg-white/[0.03] px-2 py-1.5 font-mono text-sm outline-none ${
                        dup ? "border-flag text-flag" : "border-line"
                      }`}
                    >
                      <option value="" className="bg-ink">
                        –
                      </option>
                      {Array.from({ length: n }, (_, i) => (
                        <option key={i} value={i + 1} className="bg-ink">
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function FinalTab({ draft, set }: { draft: Tournament; set: (fn: (t: Tournament) => void) => void }) {
  return (
    <div className="space-y-2">
      <p className="px-2 pb-2 text-sm text-mute">
        Slaggolf: fyll i bruttoslag och antal spelade hål. Netto = slag − spel-hcp, lägst netto vinner. Uppdatera
        gärna under rundan för live-odds, eller bara en gång när rundan är klar (fyller du i slag utan hål räknas
        rundan som klar).
      </p>
      {draft.players.map((p) => {
        const f = draft.final[p.id];
        const b = breakdownFor(draft, p);
        const thru = effectiveThru(f);
        const toPar = netToPar(draft, p);
        return (
          <div key={p.id} className="glass flex flex-wrap items-center gap-3 rounded-2xl p-3 sm:flex-nowrap sm:gap-5 sm:px-5">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <Avatar name={p.name} color={colorFor(draft, p.id)} size={40} />
              <div className="min-w-0">
                <div className="font-medium">{p.name}</div>
                <div className="font-mono text-[11px] text-mute">
                  spel-hcp {b.adjustedHcp.toFixed(1)}
                  {f.strokes != null && (
                    <>
                      {" · "}
                      <span className={toPar != null && toPar < 0 ? "text-fairway" : "text-cream"}>
                        {thru >= 18
                          ? `netto ${(f.strokes - b.adjustedHcp).toFixed(1)} (${formatToPar(toPar)})`
                          : `${formatToPar(toPar)} efter ${thru}`}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-mute">Slag</span>
              <NumberStepper
                value={f.strokes}
                max={250}
                start={f.thru > 0 ? Math.round(((draft.par + p.hcp) * f.thru) / 18) : draft.par + Math.round(p.hcp)}
                onChange={(v) =>
                  set((t) => {
                    t.final[p.id].strokes = v;
                  })
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-mute">Hål</span>
              <NumberStepper
                value={f.thru || null}
                max={18}
                placeholder="0"
                onChange={(v) =>
                  set((t) => {
                    t.final[p.id].thru = v ?? 0;
                  })
                }
              />
              <button
                className={`grid size-10 place-items-center rounded-xl border font-mono text-xs ${
                  thru >= 18 ? "border-fairway/50 bg-fairway/15 text-fairway" : "border-line text-mute hover:text-cream"
                }`}
                onClick={() =>
                  set((t) => {
                    t.final[p.id].thru = 18;
                  })
                }
                title="Rundan klar"
              >
                F
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PlayersTab({ draft, set }: { draft: Tournament; set: (fn: (t: Tournament) => void) => void }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {draft.players.map((p, i) => (
        <div key={p.id} className="glass flex items-center gap-3 rounded-2xl p-3">
          <Avatar name={p.name} color={colorFor(draft, p.id)} size={40} />
          <input
            className="field flex-1"
            value={p.name}
            onChange={(e) =>
              set((t) => {
                t.players[i].name = e.target.value;
              })
            }
          />
          <input
            type="number"
            step="0.1"
            inputMode="decimal"
            className="field w-24 font-mono"
            value={p.hcp}
            onChange={(e) =>
              set((t) => {
                t.players[i].hcp = Number(e.target.value) || 0;
              })
            }
          />
        </div>
      ))}
    </div>
  );
}

function SettingsTab({ draft, set }: { draft: Tournament; set: (fn: (t: Tournament) => void) => void }) {
  const [armed, setArmed] = useState<string | null>(null);
  return (
    <div className="space-y-3">
      <div className="glass grid gap-4 rounded-3xl p-5 sm:grid-cols-2">
        <label>
          <div className="mb-1 text-[11px] uppercase tracking-wider text-mute">Datum & tid (nedräkning)</div>
          <input
            type="datetime-local"
            className="field"
            value={draft.eventDate ?? ""}
            onChange={(e) =>
              set((t) => {
                t.eventDate = e.target.value || null;
              })
            }
          />
        </label>
        <label>
          <div className="mb-1 text-[11px] uppercase tracking-wider text-mute">Bana</div>
          <input
            className="field"
            placeholder="t.ex. Hulta GK"
            value={draft.venue}
            onChange={(e) =>
              set((t) => {
                t.venue = e.target.value;
              })
            }
          />
        </label>
        <label>
          <div className="mb-1 text-[11px] uppercase tracking-wider text-mute">Banans par (finalrundan)</div>
          <input
            type="number"
            inputMode="numeric"
            className="field font-mono"
            value={draft.par}
            onChange={(e) =>
              set((t) => {
                t.par = Number(e.target.value) || 72;
              })
            }
          />
        </label>
      </div>
      <div className="glass flex flex-wrap gap-3 rounded-3xl p-5">
        <button
          className="btn btn-ghost"
          onClick={() => {
            if (armed !== "history") return setArmed("history");
            set((t) => {
              t.history = [];
            });
            setArmed(null);
          }}
        >
          <RotateCcw className="size-4" /> {armed === "history" ? "Säker? Klicka igen" : "Nollställ oddshistorik"}
        </button>
        <button
          className="btn border border-flag/40 text-flag hover:bg-flag/10"
          onClick={() => {
            if (armed !== "all") return setArmed("all");
            set((t) => {
              const fresh = createInitialTournament();
              Object.assign(t, { ...fresh, players: t.players, eventDate: t.eventDate, venue: t.venue });
            });
            setArmed(null);
          }}
        >
          <RotateCcw className="size-4" /> {armed === "all" ? "Säker? Allt raderas" : "Nollställ alla resultat"}
        </button>
      </div>
      <p className="px-2 text-xs text-mute">Nollställningar gäller först när du publicerar.</p>
    </div>
  );
}

const DEFAULT_LABEL: Record<Tab, string> = {
  scramble: "Scramble uppdaterad",
  minis: "Småtävlingar uppdaterade",
  final: "Finalrundan uppdaterad",
  players: "Spelare uppdaterade",
  settings: "Inställningar uppdaterade",
};

export default function Admin() {
  const { data, odds, isAdmin, publish, signOutAdmin, user, source } = useTournament();
  const [draft, setDraft] = useState<Tournament>(() => clone(data));
  const [dirty, setDirty] = useState(false);
  const [tab, setTab] = useState<Tab>("scramble");
  const [label, setLabel] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!dirty) setDraft(clone(data));
  }, [data, dirty]);

  const set = (fn: (t: Tournament) => void) => {
    setDraft((d) => {
      const next = clone(d);
      fn(next);
      return next;
    });
    setDirty(true);
  };

  const preview = useMemo(() => (dirty ? computeOdds(draft, 6000) : odds), [draft, dirty, odds]);

  if (!isAdmin) return <Login />;

  const onPublish = async () => {
    setStatus("saving");
    setError(null);
    try {
      await publish(draft, label.trim() || DEFAULT_LABEL[tab]);
      setDirty(false);
      setLabel("");
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2200);
    } catch (e) {
      setStatus("error");
      setError((e as Error).message);
    }
  };

  const ranked = [...draft.players].sort((a, b) => (preview.probs[b.id] ?? 0) - (preview.probs[a.id] ?? 0));

  return (
    <div className="mx-auto max-w-6xl px-4 pb-40 pt-28 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="eyebrow mb-2">Kontrollrummet</div>
          <h1 className="font-display text-6xl leading-none">Admin</h1>
        </div>
        <div className="flex items-center gap-3 text-sm text-mute">
          <span className="hidden sm:inline">{source === "demo" ? "Demoläge" : user?.email}</span>
          <button className="btn btn-ghost" onClick={() => signOutAdmin()}>
            <LogOut className="size-4" /> Logga ut
          </button>
        </div>
      </div>

      <div className="mt-8 flex gap-1 overflow-x-auto rounded-full border border-line bg-white/[0.02] p-1 [scrollbar-width:none]">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`relative inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
              tab === t.id ? "text-ink" : "text-cream/70 hover:text-cream"
            }`}
          >
            {tab === t.id && <motion.span layoutId="tab" className="absolute inset-0 rounded-full bg-gold" />}
            <t.icon className="relative size-4" />
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {tab === "scramble" && <ScrambleTab draft={draft} set={set} />}
            {tab === "minis" && <MinisTab draft={draft} set={set} />}
            {tab === "final" && <FinalTab draft={draft} set={set} />}
            {tab === "players" && <PlayersTab draft={draft} set={set} />}
            {tab === "settings" && <SettingsTab draft={draft} set={set} />}
          </motion.div>
        </AnimatePresence>

        <aside className="glass h-fit rounded-3xl p-5 lg:sticky lg:top-24">
          <div className="eyebrow">{dirty ? "Förhandsvisning" : "Aktuella odds"}</div>
          <ul className="mt-4 space-y-2">
            {ranked.map((p) => {
              const now = preview.probs[p.id] ?? 0;
              const before = odds.probs[p.id] ?? 0;
              const d = now - before;
              return (
                <li key={p.id} className="flex items-center gap-2 text-sm">
                  <span className="size-2 rounded-full" style={{ background: colorFor(draft, p.id) }} />
                  <span className="flex-1">{p.name}</span>
                  {dirty && Math.abs(d) > 0.005 && (
                    <span className={`font-mono text-[11px] ${d > 0 ? "text-fairway" : "text-flag"}`}>
                      {d > 0 ? "+" : ""}
                      {(d * 100).toFixed(1)}
                    </span>
                  )}
                  <span className="w-14 text-right font-mono text-xs text-mute">{formatPct(now)}</span>
                  <span className="w-12 text-right font-mono text-gold">{decimalOdds(now)}</span>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>

      {/* Publiceringsbar */}
      <AnimatePresence>
        {(dirty || status !== "idle") && (
          <motion.div
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            exit={{ y: 120 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl"
          >
            <div className="glass flex flex-col gap-2 rounded-3xl bg-ink-2/90 p-3 shadow-2xl shadow-black/60 sm:flex-row sm:items-center">
              <input
                className="field flex-1"
                placeholder={`Händelse (visas i oddsgrafen) – "${DEFAULT_LABEL[tab]}"`}
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  className="btn btn-ghost"
                  onClick={() => {
                    setDirty(false);
                    setDraft(clone(data));
                  }}
                  disabled={!dirty}
                >
                  Ångra
                </button>
                <button className="btn btn-gold flex-1" onClick={onPublish} disabled={!dirty || status === "saving"}>
                  {status === "saved" ? <Check className="size-4" /> : <Send className="size-4" />}
                  {status === "saving" ? "Publicerar…" : status === "saved" ? "Publicerat!" : "Publicera"}
                </button>
              </div>
            </div>
            {error && <p className="mt-2 rounded-xl bg-flag/15 px-3 py-2 text-center text-xs text-flag">{error}</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
