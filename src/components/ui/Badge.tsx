import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "neutral",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "neutral" | "accent" | "warm" | "outline";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.14em]",
        tone === "neutral" && "bg-fg/[0.06] text-fg/80",
        tone === "accent" && "bg-accent-soft text-accent",
        tone === "warm" && "bg-accent-2/15 text-accent-2",
        tone === "outline" && "border border-line-strong text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export const typeLabel: Record<string, string> = {
  research: "Research article",
  review: "Review",
  editorial: "Editorial",
  "short-communication": "Short communication",
  perspective: "Perspective",
};
