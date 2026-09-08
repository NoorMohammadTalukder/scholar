import type { Article } from "./index";

/** Serializable subset of an article, safe to pass to client components. */
export type ArticleSummary = {
  slug: string;
  title: string;
  subtitle?: string;
  authors: { slug: string; name: string }[];
  issue: { slug: string; label: string; year: number } | null;
  abstract: string;
  keywords: string[];
  type: Article["type"];
  published: string;
  pages: string;
  featured: boolean;
  doi?: string;
};

export function toSummary(a: Article): ArticleSummary {
  return {
    slug: a.slug,
    title: a.title,
    subtitle: a.subtitle,
    authors: a.authorDetails.map((x) => ({ slug: x.slug, name: x.name })),
    issue: a.issueDetails ? { slug: a.issueDetails.slug, label: a.issueDetails.label, year: a.issueDetails.year } : null,
    abstract: a.abstract,
    keywords: a.keywords,
    type: a.type,
    published: a.published,
    pages: a.pages,
    featured: a.featured,
    doi: a.doi,
  };
}
