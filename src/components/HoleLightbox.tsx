import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface LightboxImage {
  src: string;
  alt: string;
}

interface Props {
  images: LightboxImage[];
  index: number | null;
  onChange: (index: number | null) => void;
}

/** Helskärmsvisning av hålbilder – Esc stänger, piltangenterna bläddrar. */
export function HoleLightbox({ images, index, onChange }: Props) {
  const n = images.length;
  const step = (d: number) => index != null && onChange((index + d + n) % n);

  useEffect(() => {
    if (index == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") onChange((index + 1) % n);
      if (e.key === "ArrowLeft") onChange((index - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, n, onChange]);

  return (
    <AnimatePresence>
      {index != null && images[index] && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] grid place-items-center bg-ink/90 p-4 backdrop-blur-xl"
          onClick={() => onChange(null)}
        >
          <motion.img
            key={index}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            src={images[index].src}
            alt={images[index].alt}
            className="max-h-[88svh] rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10" aria-label="Stäng">
            <X />
          </button>
          {n > 1 && (
            <>
              <button
                className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Föregående"
              >
                <ChevronLeft />
              </button>
              <button
                className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Nästa"
              >
                <ChevronRight />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
