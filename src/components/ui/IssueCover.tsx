import { hueFor } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/** A generated, typographic cover so issues need no image assets. */
export function IssueCover({
  volume,
  number,
  title,
  season,
  year,
  className,
  compact = false,
}: {
  volume: number;
  number: number;
  title: string;
  season: string;
  year: number;
  className?: string;
  compact?: boolean;
}) {
  const h = hueFor(`${volume}-${number}-${title}`);
  return (
    <div
      className={cn("noise relative aspect-[3/4] w-full overflow-hidden rounded-[1.25rem] text-white", className)}
      style={{
        background: `linear-gradient(160deg, hsl(${h} 75% 45%) 0%, hsl(${(h + 40) % 360} 85% 55%) 55%, hsl(${(h + 80) % 360} 90% 62%) 100%)`,
      }}
    >
      <div
        aria-hidden
        className="absolute -right-1/4 -top-1/4 h-[70%] w-[70%] rounded-full opacity-50 blur-2xl"
        style={{ background: `hsl(${(h + 120) % 360} 90% 70%)` }}
      />
      <div className="relative flex h-full flex-col justify-between p-[7%]">
        <div className="flex items-start justify-between font-mono text-[0.6em] uppercase tracking-[0.2em] opacity-90" style={{ fontSize: compact ? "0.55rem" : "0.7rem" }}>
          <span>{site.name}</span>
          <span>
            {season} {year}
          </span>
        </div>
        <div>
          <p className="font-display leading-[0.85] tracking-tighter" style={{ fontSize: compact ? "4.2rem" : "clamp(4.5rem, 12vw, 9rem)" }}>
            {volume}
            <span className="opacity-70" style={{ fontSize: "0.4em" }}>
              .{number}
            </span>
          </p>
          <p className="font-display mt-[4%] leading-tight" style={{ fontSize: compact ? "1rem" : "clamp(1.1rem, 2.2vw, 1.6rem)" }}>
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}
