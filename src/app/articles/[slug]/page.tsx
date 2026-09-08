import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, ExternalLink } from "lucide-react";
import { getAllArticles, getArticle, getRelatedArticles, plainText } from "@/lib/content";
import { toSummary } from "@/lib/content/summary";
import { extractToc, Mdx } from "@/lib/content/mdx";
import { apa, bibtex, ris } from "@/lib/cite";
import { site } from "@/lib/site";
import { formatDate, readingTime } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { Badge, typeLabel } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AuthorList } from "@/components/article/AuthorList";
import { CiteDrawer } from "@/components/article/CiteDrawer";
import { Toc } from "@/components/article/Toc";
import { ArticleCard } from "@/components/article/ArticleCard";
import { ProgressBar } from "@/components/motion/ProgressBar";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/articles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const issue = article.issueDetails;
  const [firstpage, lastpage] = article.pages.split("-");
  const url = `${site.url}/articles/${article.slug}`;

  // Google Scholar indexing tags (Highwire Press format).
  const scholar: Record<string, string | string[]> = {
    citation_title: article.title,
    citation_author: article.authorDetails.map((a) => a.name),
    citation_publication_date: article.published.replace(/-/g, "/"),
    citation_online_date: article.published.replace(/-/g, "/"),
    citation_journal_title: site.fullName,
    citation_publisher: site.publisher,
    citation_issn: site.issn.online,
    citation_firstpage: firstpage,
    citation_language: "en",
    citation_abstract_html_url: url,
    citation_keywords: article.keywords.join("; "),
  };
  if (lastpage) scholar.citation_lastpage = lastpage;
  if (issue) {
    scholar.citation_volume = String(issue.volume);
    scholar.citation_issue = String(issue.number);
  }
  if (article.doi) scholar.citation_doi = article.doi;
  if (article.pdf) scholar.citation_pdf_url = `${site.url}${article.pdf}`;
  scholar["dc.identifier"] = article.doi ? `doi:${article.doi}` : url;

  return {
    title: article.title,
    description: article.abstract,
    keywords: article.keywords,
    authors: article.authorDetails.map((a) => ({ name: a.name, url: `${site.url}/authors/${a.slug}` })),
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.abstract,
      url,
      publishedTime: article.published,
      authors: article.authorDetails.map((a) => a.name),
      tags: article.keywords,
    },
    other: scholar,
  };
}

export default async function ArticlePage({ params }: PageProps<"/articles/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const issue = article.issueDetails;
  const toc = extractToc(article.body);
  const related = getRelatedArticles(article, 3).map(toSummary);
  const minutes = readingTime(plainText(article.body) + article.abstract);
  const url = `${site.url}/articles/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: article.title,
    name: article.title,
    abstract: article.abstract,
    keywords: article.keywords.join(", "),
    datePublished: article.published,
    dateReceived: article.received,
    inLanguage: "en",
    url,
    ...(article.doi ? { identifier: { "@type": "PropertyValue", propertyID: "DOI", value: article.doi }, sameAs: `https://doi.org/${article.doi}` } : {}),
    license: site.license.url,
    isAccessibleForFree: true,
    pageStart: article.pages.split("-")[0],
    pageEnd: article.pages.split("-")[1],
    author: article.authorDetails.map((a) => ({
      "@type": "Person",
      name: a.name,
      url: `${site.url}/authors/${a.slug}`,
      affiliation: { "@type": "Organization", name: a.affiliation },
      ...(a.orcid ? { identifier: `https://orcid.org/${a.orcid}` } : {}),
    })),
    publisher: { "@type": "Organization", name: site.publisher },
    isPartOf: issue
      ? {
          "@type": "PublicationIssue",
          issueNumber: issue.number,
          datePublished: issue.published,
          isPartOf: {
            "@type": "PublicationVolume",
            volumeNumber: issue.volume,
            isPartOf: { "@type": "Periodical", name: site.fullName, issn: site.issn.online },
          },
        }
      : { "@type": "Periodical", name: site.fullName, issn: site.issn.online },
  };

  const meta = [
    { k: "Received", v: formatDate(article.received) },
    { k: "Accepted", v: formatDate(article.accepted) },
    { k: "Published", v: formatDate(article.published) },
    { k: "Pages", v: article.pages },
    { k: "License", v: article.license },
    ...(article.funding ? [{ k: "Funding", v: article.funding }] : []),
  ];

  return (
    <>
      <ProgressBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>
        <header className="relative overflow-hidden pb-14 pt-32 sm:pt-44">
          <div aria-hidden className="animate-blob pointer-events-none absolute -right-48 -top-48 h-[36rem] w-[36rem] rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, var(--accent), transparent 65%)" }} />
          <Container className="relative">
            <Reveal y={12}>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <Badge tone={article.type === "research" ? "accent" : "warm"}>{typeLabel[article.type]}</Badge>
                {issue && (
                  <Link href={`/issues/${issue.slug}`} className="eyebrow link-underline hover:text-fg">
                    {issue.label} · {issue.season} {issue.year}
                  </Link>
                )}
                <span className="eyebrow">{minutes} min read</span>
              </div>
            </Reveal>
            <TextReveal text={article.title} as="h1" className="display-lg max-w-5xl" delay={0.15} stagger={0.04} />
            {article.subtitle && (
              <Reveal delay={0.4} y={16}>
                <p className="mt-5 max-w-3xl font-display text-2xl text-muted sm:text-3xl">{article.subtitle}</p>
              </Reveal>
            )}
            <Reveal delay={0.5} y={16}>
              <div className="mt-10">
                <AuthorList authors={article.authorDetails} />
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                {article.pdf && (
                  <Button href={article.pdf} arrow={false} download>
                    <Download size={16} /> Download PDF
                  </Button>
                )}
                <CiteDrawer title={article.title} citations={{ APA: apa(article), BibTeX: bibtex(article), RIS: ris(article) }} />
                {article.doi && (
                  <a href={`https://doi.org/${article.doi}`} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full px-4 font-mono text-[0.8rem] text-muted transition-colors hover:text-accent">
                    doi:{article.doi} <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </Reveal>
          </Container>
        </header>

        <Container className="grid gap-14 pb-24 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-20">
          <aside className="order-2 lg:order-1">
            <div className="space-y-10 lg:sticky lg:top-28">
              <Toc items={toc} />
              <dl className="space-y-3 text-[0.88rem]">
                {meta.map((m) => (
                  <div key={m.k} className="flex justify-between gap-4 border-b border-line pb-2">
                    <dt className="text-muted">{m.k}</dt>
                    <dd className="text-right">{m.v}</dd>
                  </div>
                ))}
              </dl>
              <div>
                <p className="eyebrow mb-3">Keywords</p>
                <div className="flex flex-wrap gap-1.5">
                  {article.keywords.map((k) => (
                    <span key={k} className="rounded-full border border-line px-2.5 py-0.5 text-[0.78rem] text-muted">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="order-1 min-w-0 lg:order-2">
            <Reveal>
              <section aria-labelledby="abstract" className="rounded-[1.5rem] border border-line bg-elevated p-7 sm:p-10">
                <h2 id="abstract" className="eyebrow !font-mono !text-[0.72rem]">Abstract</h2>
                <p className="mt-4 font-display text-[1.35rem] leading-snug sm:text-[1.55rem]">{article.abstract}</p>
              </section>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="prose mt-12 max-w-none lg:max-w-[70ch]">
                <Mdx source={article.body} />
              </div>
            </Reveal>
            <Reveal>
              <div className="mt-14 rounded-[1.25rem] border border-line p-6 text-[0.88rem] text-muted">
                <p>
                  <strong className="text-fg">How to cite:</strong> {apa(article)}
                </p>
                <p className="mt-3">
                  © {article.published.slice(0, 4)} the authors. Published by {site.publisher} under{" "}
                  <a href={site.license.url} className="underline" target="_blank" rel="noreferrer">
                    {article.license}
                  </a>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </Container>

        {related.length > 0 && (
          <div className="border-t border-line bg-elevated/60 py-20">
            <Container>
              <Reveal>
                <p className="eyebrow mb-3">Related</p>
                <h2 className="display-md">Keep reading</h2>
              </Reveal>
              <StaggerGroup className="mt-10 grid gap-5 md:grid-cols-3" stagger={0.1}>
                {related.map((r) => (
                  <StaggerItem key={r.slug}>
                    <ArticleCard article={r} />
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </Container>
          </div>
        )}
      </article>
    </>
  );
}
