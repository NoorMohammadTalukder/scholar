import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/ui/ContactForm";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with the Scholar editorial office." };

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Talk to the editors." highlight={[3]} lede="Questions about scope, submissions, reviewing, or indexing. We reply within five working days." />
      <Container className="grid gap-12 pb-24 lg:grid-cols-[1fr_1.5fr]">
        <Reveal>
          <dl className="space-y-6">
            <div>
              <dt className="eyebrow">Editorial office</dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`} className="font-display text-2xl text-accent underline-offset-4 hover:underline">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Post</dt>
              <dd className="mt-1 text-muted">
                {site.publisher}
                <br />
                {site.address}
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Social</dt>
              <dd className="mt-1 text-muted">{site.twitter}</dd>
            </div>
          </dl>
        </Reveal>
        <Reveal delay={0.15}>
          <ContactForm to={site.email} />
        </Reveal>
      </Container>
    </>
  );
}
