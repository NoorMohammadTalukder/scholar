import { Marquee } from "@/components/motion/Marquee";
import { indexingPartners } from "@/lib/site";

export function Partners() {
  return (
    <div className="border-y border-line py-6">
      <p className="eyebrow mb-4 text-center">Indexed and abstracted in</p>
      <Marquee duration={36}>
        {indexingPartners.map((p) => (
          <span key={p} className="font-display mx-8 flex items-center gap-8 whitespace-nowrap text-2xl text-fg/60 sm:text-3xl">
            {p}
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
