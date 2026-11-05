export function LiveDot({ active = true }: { active?: boolean }) {
  const color = active ? "bg-fairway" : "bg-gold";
  return (
    <span className="relative inline-flex size-2.5">
      {active && <span className={`absolute inset-0 animate-pulse-ring rounded-full ${color}`} />}
      <span className={`relative inline-flex size-2.5 rounded-full ${color}`} />
    </span>
  );
}
