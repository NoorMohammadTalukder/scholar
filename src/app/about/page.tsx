import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import { Mdx } from "@/lib/content/mdx";
import { editorialBoard, site } from "@/lib/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Avatar } from "@/components/ui/Avatar";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { TiltCard } from "@/components/motion/TiltCard";

export const metadata: Metadata = { title: "About", description: `${site.fullName}: aims and scope, editorial board, and policies.` };

export default function AboutPage() {
  const aims = getPage("aims-and-scope");
  const policies = getPage("policies");
  const facts = [
    { k: "Founded", v: String(site.founded) },
    { k: "Frequency", v: "Two issues per year" },
    { k: "Access", v: "Open, no fees" },
    { k: "License", v: site.license.name },
    { k: "ISSN (online)", v: site.issn.online },
    { k: "ISSN (print)", v: site.issn.print },
    { k: "Publisher", v: site.publisher },
    { k: "Peer review", v: "Open, cross-disciplinary" },
  ];

  return (
    <>
      <PageHeader eyebrow="About the journal" title="Rigorous work, open to everyone." lede={site.description} highlight={[3]} />

      <Section id="aims" tight>
        <Container className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow mb-4">At a glance</p>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-[0.9rem]">
                {facts.map((f) => (
                  <div key={f.k} className="border-t border-line pt-3">
                    <dt className="text-muted">{f.k}</dt>
                    <dd className="mt-0.5 font-medium">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-md mb-8">{aims?.title ?? "Aims and scope"}</h2>
            <div className="prose">{aims && <Mdx source={aims.body} />}</div>
          </Reveal>
        </Container>
      </Section>

      <Section id="editorial-board" className="bg-elevated/60">
        <Container>
          <Reveal>
            <p className="eyebrow mb-4">Editorial board</p>
            <h2 className="display-md max-w-2xl">Editors from eight fields on four continents</h2>
          </Reveal>
          <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {editorialBoard.map((m) => (
              <StaggerItem key={m.name}>
                <div className="group h-full">
                  <TiltCard max={6} className="h-full rounded-[1.25rem]">
                    <div className="card-shine flex h-full flex-col rounded-[1.25rem] border border-line bg-elevated p-6">
                      <Avatar name={m.name} size={64} />
                      <p className="mt-5 text-lg font-medium leading-tight">{m.name}</p>
                      <p className="mt-1 text-[0.85rem] text-accent">{m.role}</p>
                      <p className="mt-auto pt-4 text-[0.85rem] text-muted">{m.affiliation}</p>
                    </div>
                  </TiltCard>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </Section>

      <Section id="policies">
        <Container className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <p className="eyebrow mb-4">Policies</p>
            <h2 className="display-md">How we operate</h2>
            <p className="mt-4 text-muted">Peer review, open access, data sharing, ethics, and archiving.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="prose">{policies && <Mdx source={policies.body} />}</div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
