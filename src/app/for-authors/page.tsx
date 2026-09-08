import type { Metadata } from "next";
import { Download } from "lucide-react";
import { getPage } from "@/lib/content";
import { Mdx } from "@/lib/content/mdx";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/ui/Faq";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = { title: "For authors", description: "Submission guidelines, review process, and FAQ for authors submitting to Scholar." };

const steps = [
  { n: "01", t: "Submit", d: "Email a PDF and cover letter naming the disciplines your work draws on.", time: "Day 0" },
  { n: "02", t: "Editorial screen", d: "The handling editor checks fit with our scope and basic rigour.", time: "≈ 7 days" },
  { n: "03", t: "Cross-disciplinary review", d: "At least two referees from different fields assess the manuscript.", time: "≈ 30 days" },
  { n: "04", t: "Decision", d: "Accept, minor revision, major revision, or reject, with full reviews attached.", time: "≈ 38 days" },
  { n: "05", t: "Revision", d: "Authors respond point by point. Referees see the response.", time: "Author-paced" },
  { n: "06", t: "Publication", d: "Typeset, assigned a DOI, deposited with Crossref, and published with reviews.", time: "≈ 3 weeks after acceptance" },
];

const faq = [
  { q: "Does it cost anything to publish?", a: "No. Scholar charges no submission or article-processing fees. The journal is supported by its publisher and institutional partners." },
  { q: "Can I post a preprint first?", a: "Yes. We encourage preprints and will consider manuscripts already posted on any recognised server." },
  { q: "What does 'interdisciplinary' mean to you?", a: "A referee from a second discipline must be necessary to judge the work. If a single field's referees could fully evaluate it, it belongs in that field's journal." },
  { q: "Will my reviews be published?", a: "Only if you and the referees consent. Referees may sign or stay anonymous. You can opt out at submission or on acceptance." },
  { q: "How long is the review process?", a: "Median time to first decision is 38 days. Revised manuscripts are typically decided within two weeks." },
  { q: "Which citation style should I use?", a: "Any consistent style is fine for review. Accepted manuscripts are converted to house style by our production team." },
];

export default function ForAuthorsPage() {
  const guidelines = getPage("submission-guidelines");
  return (
    <>
      <PageHeader eyebrow="For authors" title="Bring us the paper that doesn't fit." lede="No fees, open review, and referees who read across fields. Here is everything you need to submit." highlight={[5, 6]}>
        <div className="flex flex-wrap gap-3">
          <Button href={`mailto:${site.email}?subject=Submission`} external arrow>
            Submit by email
          </Button>
          <Button href="/pdfs/scholar-template.pdf" variant="outline" download>
            <Download size={16} /> Manuscript template
          </Button>
        </div>
      </PageHeader>

      <Section id="process" tight>
        <Container>
          <Reveal>
            <p className="eyebrow mb-4">Review process</p>
            <h2 className="display-md">From submission to publication</h2>
          </Reveal>
          <StaggerGroup className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
            {steps.map((s) => (
              <StaggerItem key={s.n} className="bg-elevated">
                <div className="group h-full p-7 transition-colors hover:bg-accent-soft">
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-4xl text-fg/20 transition-colors group-hover:text-accent">{s.n}</span>
                    <span className="font-mono text-[0.68rem] uppercase tracking-widest text-muted">{s.time}</span>
                  </div>
                  <p className="mt-6 text-xl font-medium">{s.t}</p>
                  <p className="mt-2 text-[0.92rem] text-muted">{s.d}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </Section>

      <Section id="guidelines" className="bg-elevated/60">
        <Container className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <p className="eyebrow mb-4">Guidelines</p>
            <h2 className="display-md">Preparing your manuscript</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="prose">{guidelines && <Mdx source={guidelines.body} />}</div>
          </Reveal>
        </Container>
      </Section>

      <Section id="faq">
        <Container className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <p className="eyebrow mb-4">FAQ</p>
            <h2 className="display-md">Common questions</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Faq items={faq} />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
