import { avatarFor } from "../lib/players";

interface Props {
  name: string;
  color?: string;
  size?: number;
  ring?: boolean;
  className?: string;
}

export function Avatar({ name, color = "#e8c872", size = 48, ring, className = "" }: Props) {
  const src = avatarFor(name);
  const style = {
    width: size,
    height: size,
    boxShadow: ring ? `0 0 0 2px var(--color-ink), 0 0 0 4px ${color}, 0 0 30px -4px ${color}` : undefined,
  };
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        loading="lazy"
        style={style}
        className={`shrink-0 rounded-full object-cover ${className}`}
      />
    );
  }
  return (
    <div
      aria-label={name}
      style={{
        ...style,
        background: `radial-gradient(circle at 30% 25%, ${color}, color-mix(in oklab, ${color} 35%, #050a07) 75%)`,
        fontSize: size * 0.42,
      }}
      className={`grid shrink-0 place-items-center rounded-full font-display italic text-ink ${className}`}
    >
      {name.slice(0, 1)}
    </div>
  );
}
