import type { Player, Tournament } from "./types";

export const INITIAL_PLAYERS: Player[] = [
  { id: "anton", name: "Anton", hcp: 12.4 },
  { id: "jonis", name: "Jonis", hcp: 30.2 },
  { id: "hasse", name: "Hasse", hcp: 11.7 },
  { id: "ogge", name: "Ogge", hcp: 20.1 },
  { id: "putte", name: "Putte", hcp: 20.0 },
  { id: "axel", name: "Axel", hcp: 24.6 },
  { id: "perra", name: "Perra", hcp: 14.4 },
  { id: "ferdie", name: "Ferdie", hcp: 15.1 },
];

export const MINI_LABELS = {
  longestDrive: { title: "Längsta drive", emoji: "🚀", blurb: "Rå kraft. Fairway valfritt." },
  closestPin: { title: "Närmast flagg", emoji: "🎯", blurb: "Ett slag, en flagga, noll ursäkter." },
  accuracy: { title: "Träffsäkerhet", emoji: "🏹", blurb: "Rakt är det nya långt." },
} as const;

export const MINI_KEYS = ["longestDrive", "closestPin", "accuracy"] as const;

export const PLAYER_COLORS = [
  "#e8c872", "#5eead4", "#f472b6", "#60a5fa",
  "#a3e635", "#fb923c", "#c084fc", "#f87171",
];

// 2026-bilder går före; de gamla från 2021 är reserv.
const avatarModules = {
  ...import.meta.glob<string>("../assets/players/*.png", { eager: true, import: "default" }),
  ...import.meta.glob<string>("../assets/players-2026/*.jpg", { eager: true, import: "default" }),
};

const avatarByName = new Map<string, string>();
for (const [path, url] of Object.entries(avatarModules)) {
  const name = path.split("/").pop()!.replace(/\.\w+$/, "").toLowerCase();
  if (path.includes("players-2026") || !avatarByName.has(name)) avatarByName.set(name, url);
}

export function avatarFor(name: string): string | undefined {
  return avatarByName.get(name.toLowerCase());
}

export function createInitialTournament(): Tournament {
  const empty = Object.fromEntries(INITIAL_PLAYERS.map((p) => [p.id, null]));
  return {
    name: "Shaft-Shank Redemption 2026",
    eventDate: null,
    venue: "",
    par: 72,
    players: INITIAL_PLAYERS,
    teams: null,
    scramble: { gross: [null, null, null, null], place: [null, null, null, null] },
    minis: { longestDrive: { ...empty }, closestPin: { ...empty }, accuracy: { ...empty } },
    final: Object.fromEntries(INITIAL_PLAYERS.map((p) => [p.id, { strokes: null, thru: 0 }])),
    history: [],
    updatedAt: Date.now(),
  };
}

/** Säkerställer att ett (ev. äldre/ofullständigt) dokument har alla fält. */
export function normalizeTournament(raw: Partial<Tournament> | undefined | null): Tournament {
  const base = createInitialTournament();
  if (!raw) return base;
  const players = raw.players?.length ? raw.players : base.players;
  const fill = <T,>(rec: Record<string, T> | undefined, def: T) =>
    Object.fromEntries(players.map((p) => [p.id, rec?.[p.id] ?? def]));
  const teamCount = Math.ceil(players.length / 2);
  const pad = (arr: (number | null)[] | undefined) =>
    Array.from({ length: teamCount }, (_, i) => arr?.[i] ?? null);
  return {
    ...base,
    ...raw,
    players,
    teams: raw.teams ?? null,
    scramble: { gross: pad(raw.scramble?.gross), place: pad(raw.scramble?.place) },
    minis: {
      longestDrive: fill(raw.minis?.longestDrive, null),
      closestPin: fill(raw.minis?.closestPin, null),
      accuracy: fill(raw.minis?.accuracy, null),
    },
    par: typeof raw.par === "number" && raw.par > 0 ? raw.par : base.par,
    final: Object.fromEntries(
      players.map((p) => {
        const f = raw.final?.[p.id];
        return [p.id, { strokes: f?.strokes ?? null, thru: f?.thru ?? 0 }];
      }),
    ),
    history: raw.history ?? [],
  };
}
