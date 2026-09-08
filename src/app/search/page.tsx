import type { Metadata } from "next";
import { Suspense } from "react";
import { buildSearchIndex } from "@/lib/search-index";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";
import { SearchClient } from "@/components/ui/SearchClient";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = { title: "Search", description: "Search articles, authors, issues, and news." };

export default function SearchPage() {
  const docs = buildSearchIndex();
  return (
    <>
      <PageHeader eyebrow="Search" title="Find what you're looking for." highlight={[1]} />
      <Container className="pb-24">
        <Reveal delay={0.2}>
          <Suspense fallback={<div className="h-20 rounded-full border border-line bg-elevated" />}>
            <SearchClient docs={docs} />
          </Suspense>
        </Reveal>
      </Container>
    </>
  );
}
