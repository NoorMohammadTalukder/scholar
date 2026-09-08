import type { Metadata } from "next";
import Link from "next/link";
import { getArticlesByAuthor, getAuthors } from "@/lib/content";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";
import { Avatar } from "@/components/ui/Avatar";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = { title: "Authors", description: "Researchers who have published in Scholar." };

export default function AuthorsPage() {
  const authors = getAuthors();
  return (
    <>
      <PageHeader eyebrow="People" title="The authors behind the work." highlight={[1]} lede="Every contributor, with their affiliation and the articles they have published with us." />
      <Container className="pb-24">
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {authors.map((a) => {
            const n = getArticlesByAuthor(a.slug).length;
            return (
              <StaggerItem key={a.slug}>
                <Link href={`/authors/${a.slug}`} className="card-shine group flex h-full items-start gap-4 rounded-[1.25rem] border border-line bg-elevated p-6 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-card" data-cursor="View">
                  <Avatar name={a.name} size={56} />
                  <div className="min-w-0">
                    <p className="text-xl font-medium leading-tight transition-colors group-hover:text-accent">{a.name}</p>
                    <p className="mt-1 text-[0.9rem] text-muted">{a.affiliation}</p>
                    <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-widest text-muted">
                      {n} article{n === 1 ? "" : "s"}{a.country ? ` · ${a.country}` : ""}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </>
  );
}
