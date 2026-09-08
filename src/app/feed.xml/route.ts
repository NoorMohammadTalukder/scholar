import { getAllArticles, getNews } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function GET() {
  const items = [
    ...getAllArticles().map((a) => ({
      title: a.title,
      link: `${site.url}/articles/${a.slug}`,
      date: a.published,
      description: a.abstract,
      author: a.authorDetails.map((x) => x.name).join(", "),
      category: "Article",
    })),
    ...getNews().map((n) => ({
      title: n.title,
      link: `${site.url}/news/${n.slug}`,
      date: n.date,
      description: n.summary,
      author: site.name,
      category: "News",
    })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(site.fullName)}</title>
    <link>${site.url}</link>
    <description>${esc(site.description)}</description>
    <language>en</language>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>
${items
  .map(
    (i) => `    <item>
      <title>${esc(i.title)}</title>
      <link>${i.link}</link>
      <guid>${i.link}</guid>
      <pubDate>${new Date(i.date).toUTCString()}</pubDate>
      <dc:creator>${esc(i.author)}</dc:creator>
      <category>${i.category}</category>
      <description>${esc(i.description)}</description>
    </item>`,
  )
  .join("\n")}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
