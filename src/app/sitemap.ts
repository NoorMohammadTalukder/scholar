import type { MetadataRoute } from "next";
import { getAllArticles, getAuthors, getIssues, getNews } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const statics = ["", "/issues", "/articles", "/authors", "/about", "/for-authors", "/news", "/search", "/contact"].map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  return [
    ...statics,
    ...getIssues().map((i) => ({ url: `${site.url}/issues/${i.slug}`, lastModified: i.published, priority: 0.8 })),
    ...getAllArticles().map((a) => ({ url: `${site.url}/articles/${a.slug}`, lastModified: a.published, priority: 0.9 })),
    ...getAuthors().map((a) => ({ url: `${site.url}/authors/${a.slug}`, priority: 0.5 })),
    ...getNews().map((n) => ({ url: `${site.url}/news/${n.slug}`, lastModified: n.date, priority: 0.6 })),
  ];
}
