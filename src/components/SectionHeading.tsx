import type { ReactNode } from "react";
import { motion } from "motion/react";

interface Props {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}

export function SectionHeading({ eyebrow, title, children, aside }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
    >
      <div className="max-w-2xl">
        <div className="eyebrow mb-3 flex items-center gap-3">
          <span className="h-px w-8 bg-gold/60" />
          {eyebrow}
        </div>
        <h2 className="font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl">{title}</h2>
        {children && <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/65">{children}</p>}
      </div>
      {aside}
    </motion.div>
  );
}
