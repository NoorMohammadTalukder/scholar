import { Container } from "@/components/layout/Container";
import { Counter } from "@/components/motion/Counter";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export function Stats({ stats }: { stats: { articles: number; authors: number; issues: number; countries: number } }) {
  const items = [
    { label: "Articles published", value: stats.articles },
    { label: "Contributing authors", value: stats.authors },
    { label: "Countries represented", value: stats.countries },
    { label: "Days to first decision", value: 38, suffix: "" },
  ];
  return (
    <div className="border-y border-line">
      <Container>
        <StaggerGroup className="grid grid-cols-2 divide-line lg:grid-cols-4 lg:divide-x" stagger={0.12}>
          {items.map((s) => (
            <StaggerItem key={s.label} className="px-2 py-10 lg:px-8 lg:py-14 first:lg:pl-0">
              <p className="font-display text-[3.4rem] leading-none tracking-tight sm:text-[4.5rem]">
                <Counter value={s.value} suffix={s.suffix} className="text-gradient" />
              </p>
              <p className="mt-3 text-[0.9rem] text-muted">{s.label}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </div>
  );
}
