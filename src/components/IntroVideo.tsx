import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { Play, X } from "lucide-react";

const SRC = "/intro-2026.mp4";
const POSTER = "/intro-2026.jpg";

export function IntroVideo() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="glass group mt-6 flex w-full max-w-sm items-center gap-4 rounded-2xl p-2 pr-5 text-left transition hover:border-gold/40"
      >
        <span className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-xl">
          <img src={POSTER} alt="" className="size-full object-cover transition duration-500 group-hover:scale-105" />
          <span className="absolute inset-0 grid place-items-center bg-ink/30 transition group-hover:bg-ink/10">
            <span className="grid size-10 place-items-center rounded-full bg-gold text-ink shadow-[0_0_30px_-4px_var(--color-gold)] transition group-hover:scale-110">
              <Play className="ml-0.5 size-4 fill-current" />
            </span>
          </span>
        </span>
        <span>
          <span className="eyebrow block">Film</span>
          <span className="font-display text-2xl leading-tight text-cream">Se introt 2026</span>
        </span>
      </button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Introfilm 2026"
              className="fixed inset-0 z-[70] grid place-items-center bg-ink/90 p-4 backdrop-blur-md sm:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Stäng"
                className="btn btn-ghost absolute right-4 top-4 size-11 p-0 sm:right-6 sm:top-6"
              >
                <X className="size-5" />
              </button>
              <motion.video
                src={SRC}
                poster={POSTER}
                controls
                autoPlay
                playsInline
                preload="auto"
                onClick={(e) => e.stopPropagation()}
                className="aspect-video max-h-[85svh] w-full max-w-6xl rounded-2xl bg-black shadow-2xl"
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
