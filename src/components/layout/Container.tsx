import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        size === "default" && "max-w-7xl",
        size === "narrow" && "max-w-3xl",
        size === "wide" && "max-w-[96rem]",
        className,
      )}
    >
      {children}
    </div>
  );
}
