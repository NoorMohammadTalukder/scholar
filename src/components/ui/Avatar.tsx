import { hueFor, initials } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Avatar({ name, size = 40, className }: { name: string; size?: number; className?: string }) {
  const h = hueFor(name);
  return (
    <span
      aria-hidden
      className={cn("inline-grid shrink-0 place-items-center rounded-full font-display text-white", className)}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background: `linear-gradient(135deg, hsl(${h} 70% 50%), hsl(${(h + 50) % 360} 80% 58%))`,
      }}
    >
      {initials(name)}
    </span>
  );
}
