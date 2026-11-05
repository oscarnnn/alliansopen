import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { ADMIN_EMAILS, DEMO_FORCED, SEASON_ID, auth, db, googleProvider } from "./firebase";
import { createInitialTournament, normalizeTournament } from "./players";
import { computeOdds, type OddsResult } from "./odds";
import type { Tournament } from "./types";

type Source = "loading" | "live" | "demo";

interface StoreValue {
  data: Tournament;
  odds: OddsResult;
  source: Source;
  demoReason: string | null;
  publish: (next: Tournament, label: string) => Promise<void>;
  // auth
  user: User | null;
  isAdmin: boolean;
  signIn: () => Promise<void>;
  signOutAdmin: () => Promise<void>;
}

const StoreContext = createContext<StoreValue | null>(null);
const LS_KEY = "ssr-2026-demo";
const LS_ADMIN = "ssr-2026-demo-admin";

function readLocal(): Tournament {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return normalizeTournament(raw ? JSON.parse(raw) : null);
  } catch {
    return createInitialTournament();
  }
}

function writeLocal(t: Tournament) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(t));
  } catch {
    /* privat läge e.d. – kör vidare i minnet */
  }
}

export function TournamentProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Tournament>(() => createInitialTournament());
  const [source, setSource] = useState<Source>(DEMO_FORCED ? "demo" : "loading");
  const [demoReason, setDemoReason] = useState<string | null>(
    DEMO_FORCED ? "VITE_DEMO=true" : null,
  );
  const [user, setUser] = useState<User | null>(null);
  const [demoAdmin, setDemoAdmin] = useState(() => {
    try {
      return sessionStorage.getItem(LS_ADMIN) === "1";
    } catch {
      return false;
    }
  });

  // Data: Firestore live, med fallback till lokalt demoläge.
  useEffect(() => {
    if (source === "demo") {
      setData(readLocal());
      const onStorage = (e: StorageEvent) => e.key === LS_KEY && setData(readLocal());
      window.addEventListener("storage", onStorage);
      return () => window.removeEventListener("storage", onStorage);
    }
    const unsub = onSnapshot(
      doc(db, "seasons", SEASON_ID),
      (snap) => {
        setData(normalizeTournament(snap.exists() ? (snap.data() as Tournament) : null));
        setSource("live");
      },
      (err) => {
        console.warn("[SSR] Firestore otillgängligt, kör demoläge:", err);
        setDemoReason(err.code === "permission-denied" ? "Firestore-reglerna är inte deployade" : err.message);
        setSource("demo");
      },
    );
    return unsub;
  }, [source === "demo"]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (DEMO_FORCED) return;
    return onAuthStateChanged(auth, setUser);
  }, []);

  const odds = useMemo(() => computeOdds(data), [data]);

  const isAdmin =
    source === "demo"
      ? demoAdmin
      : !!user && (ADMIN_EMAILS.length === 0 || ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? ""));

  const publish = useCallback(
    async (next: Tournament, label: string) => {
      const { probs } = computeOdds(next);
      const stamped: Tournament = {
        ...next,
        updatedAt: Date.now(),
        history: [...next.history, { ts: Date.now(), label, probs }].slice(-80),
      };
      if (source === "demo") {
        writeLocal(stamped);
        setData(stamped);
        return;
      }
      await setDoc(doc(db, "seasons", SEASON_ID), JSON.parse(JSON.stringify(stamped)));
    },
    [source],
  );

  const signIn = useCallback(async () => {
    if (source === "demo") {
      try {
        sessionStorage.setItem(LS_ADMIN, "1");
      } catch {
        /* ignore */
      }
      setDemoAdmin(true);
      return;
    }
    await signInWithPopup(auth, googleProvider);
  }, [source]);

  const signOutAdmin = useCallback(async () => {
    try {
      sessionStorage.removeItem(LS_ADMIN);
    } catch {
      /* ignore */
    }
    setDemoAdmin(false);
    if (!DEMO_FORCED) await signOut(auth);
  }, []);

  const value = useMemo<StoreValue>(
    () => ({ data, odds, source, demoReason, publish, user, isAdmin, signIn, signOutAdmin }),
    [data, odds, source, demoReason, publish, user, isAdmin, signIn, signOutAdmin],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useTournament() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useTournament måste användas inom TournamentProvider");
  return ctx;
}
