export type PlayerId = string;

export interface Player {
  id: PlayerId;
  name: string;
  hcp: number;
}

export type MiniKey = "longestDrive" | "closestPin" | "accuracy";

export interface FinalScore {
  /** Stablefordpoäng hittills */
  points: number | null;
  /** Antal spelade hål (0–18) */
  thru: number;
}

export interface Snapshot {
  ts: number;
  label: string;
  probs: Record<PlayerId, number>;
}

export interface Tournament {
  name: string;
  eventDate: string | null; // ISO-datum, t.ex. "2026-05-30T09:00"
  venue: string;
  players: Player[];
  /** Lottade 2-mannalag (spelar-id:n). Null = inte lottat än. */
  teams: Team[] | null;
  scramble: {
    /** Bruttoslag per lag (9 hål), index = lag */
    gross: (number | null)[];
    /** Manuell placering (vid delad plats eller överstyrning) */
    place: (number | null)[];
  };
  /** Placering per spelare, 1 = bäst */
  minis: Record<MiniKey, Record<PlayerId, number | null>>;
  final: Record<PlayerId, FinalScore>;
  history: Snapshot[];
  updatedAt: number;
}

/** Lottat 2-mannalag. (Objekt istället för nästlad array – Firestore stödjer inte array-i-array.) */
export interface Team {
  members: PlayerId[];
}
