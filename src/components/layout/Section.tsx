import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
  tight = false,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tight?: boolean;
}) {
  return (
    <section id={id} className={cn(tight ? "py-12 sm:py-16" : "py-20 sm:py-28", "scroll-mt-20", className)}>
      {children}
    </section>
  );
}
