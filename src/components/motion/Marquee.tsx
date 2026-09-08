import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
  duration = 40,
  reverse = false,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  reverse?: boolean;
}) {
  return (
    <div
      className={cn("group relative flex w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]", className)}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      <div className={cn("animate-marquee flex w-max shrink-0 items-center", reverse && "[animation-direction:reverse]")}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
