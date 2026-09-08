import { cache } from "react";
import { getAllArticles, getAuthors, getIssues, getNews, plainText } from "@/lib/content";
import type { SearchDoc } from "@/lib/search";

export const buildSearchIndex = cache((): SearchDoc[] => {
  const docs: SearchDoc[] = [];
  for (const a of getAllArticles()) {
    docs.push({
      id: `article:${a.slug}`,
      kind: "article",
      title: a.title,
      href: `/articles/${a.slug}`,
      subtitle: a.authorDetails.map((x) => x.name).join(", "),
      body: `${a.abstract} ${plainText(a.body).slice(0, 4000)}`,
      keywords: a.keywords,
      date: a.published,
    });
  }
  for (const au of getAuthors()) {
    docs.push({
      id: `author:${au.slug}`,
      kind: "author",
      title: au.name,
      href: `/authors/${au.slug}`,
      subtitle: au.affiliation,
      body: plainText(au.body),
      keywords: [],
    });
  }
  for (const n of getNews()) {
    docs.push({
      id: `news:${n.slug}`,
      kind: "news",
      title: n.title,
      href: `/news/${n.slug}`,
      subtitle: n.summary,
      body: plainText(n.body),
      keywords: [n.tag],
      date: n.date,
    });
  }
  for (const i of getIssues()) {
    docs.push({
      id: `issue:${i.slug}`,
      kind: "issue",
      title: `${i.label}: ${i.title}`,
      href: `/issues/${i.slug}`,
      subtitle: `${i.season} ${i.year}`,
      body: i.summary,
      keywords: [],
      date: i.published,
    });
  }
  return docs;
});
