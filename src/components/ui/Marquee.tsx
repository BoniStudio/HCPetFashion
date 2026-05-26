type MarqueeProps = {
  items: string[];
  className?: string;
};

export function Marquee({ items, className = "" }: MarqueeProps) {
  const track = [...items, ...items];

  return (
    <div
      className={`overflow-hidden border-y border-ink/5 bg-white/20 py-3 backdrop-blur-sm ${className}`}
      aria-hidden
    >
      <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display text-[10px] tracking-[0.45em] text-muted uppercase"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
