import { lazy, Suspense, useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { Archive as ArchiveIcon, FlaskConical, Menu, Shield, X } from "lucide-react";
import Home from "./pages/Home";
import { useTournament } from "./lib/store";

const Archive = lazy(() => import("./pages/Archive"));
const Admin = lazy(() => import("./pages/Admin"));

const links = [
  { to: "/#liveboard", label: "Liveboard" },
  { to: "/#odds", label: "Odds" },
  { to: "/#omgangar", label: "Omgångar" },
  { to: "/#format", label: "Format" },
  { to: "/#banor", label: "Banor" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { isAdmin } = useTournament();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [location]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500 sm:px-4 ${
          open
            ? "border border-line bg-ink-2 shadow-2xl shadow-black/60"
            : scrolled
              ? "glass shadow-2xl shadow-black/40"
              : "border border-transparent"
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-full bg-gold font-display text-lg italic text-ink">S</span>
          <span className="hidden font-display text-xl leading-none sm:block">
            Shaft-Shank <span className="italic text-gold">Redemption</span>
          </span>
          <span className="font-mono text-xs text-mute">'26</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="rounded-full px-3.5 py-2 text-sm text-cream/70 transition hover:bg-white/5 hover:text-cream">
              {l.label}
            </Link>
          ))}
          <NavLink
            to="/arkiv"
            className={({ isActive }) =>
              `inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm transition hover:bg-white/5 ${isActive ? "text-gold" : "text-cream/70"}`
            }
          >
            <ArchiveIcon className="size-4" /> Arkivet
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `ml-2 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition ${
                isActive || isAdmin ? "border-gold/50 text-gold" : "border-line text-cream/70 hover:text-cream"
              }`
            }
          >
            <Shield className="size-4" /> Admin
          </NavLink>
        </div>

        <button className="grid size-10 place-items-center rounded-full md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Meny">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-2 max-w-6xl rounded-3xl border border-line bg-ink-2 p-3 shadow-2xl shadow-black/60 md:hidden"
          >
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 font-display text-2xl">
                {l.label}
              </Link>
            ))}
            <Link to="/arkiv" className="block rounded-2xl px-4 py-3 font-display text-2xl">
              Arkivet
            </Link>
            <Link to="/admin" className="block rounded-2xl px-4 py-3 font-display text-2xl text-gold">
              Admin
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function DemoBanner() {
  const { source, demoReason } = useTournament();
  if (source !== "demo") return null;
  return (
    <div
      title={demoReason ?? undefined}
      className="fixed bottom-3 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-gold/30 bg-ink-2/90 px-4 py-2 font-mono text-[11px] text-gold shadow-xl backdrop-blur"
    >
      <FlaskConical className="size-3.5 shrink-0" />
      Demoläge<span className="hidden sm:inline"> – data sparas bara i den här webbläsaren{demoReason ? ` (${demoReason})` : ""}</span>
    </div>
  );
}

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function Footer() {
  return (
    <footer className="mx-auto mt-10 max-w-6xl border-t border-line px-4 py-12 sm:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="font-display text-4xl leading-none">
            Shaft-Shank <span className="gold-text italic">Redemption</span>
          </div>
          <p className="mt-2 text-sm text-mute">En trött liten tour för några av Göteborgs sämsta golflirare. Sedan 2020.</p>
        </div>
        <div className="flex gap-4 font-mono text-xs text-mute">
          <Link to="/arkiv" className="hover:text-cream">Arkivet</Link>
          <Link to="/admin" className="hover:text-cream">Admin</Link>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-svh">
      <ScrollManager />
      <Nav />
      <main>
        <Suspense fallback={<div className="min-h-svh" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/arkiv" element={<Archive />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
        </Suspense>
      </main>
      <Footer />
      <DemoBanner />
    </div>
  );
}
