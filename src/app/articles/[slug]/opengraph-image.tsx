import { ImageResponse } from "next/og";
import { getAllArticles, getArticle } from "@/lib/content";
import { site } from "@/lib/site";
import { hueFor } from "@/lib/utils";

export const dynamic = "force-static";

export const alt = "Article preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  const title = article?.title ?? site.fullName;
  const authors = article?.authorDetails.map((a) => a.name).join(", ") ?? "";
  const issue = article?.issueDetails;
  const h = hueFor(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          color: "white",
          background: `linear-gradient(135deg, hsl(${h} 70% 38%) 0%, hsl(${(h + 45) % 360} 85% 52%) 60%, hsl(${(h + 90) % 360} 90% 60%) 100%)`,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", opacity: 0.9 }}>
          <span>{site.name}</span>
          <span>{issue ? `${issue.label} · ${issue.year}` : site.tagline}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: title.length > 70 ? 48 : 60, lineHeight: 1.08, fontWeight: 600, letterSpacing: -1.5, maxWidth: 1000 }}>{title}</div>
          <div style={{ fontSize: 26, opacity: 0.9 }}>{authors}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, opacity: 0.85 }}>
          <span>{site.fullName}</span>
          <span>{article?.doi ? `doi:${article.doi}` : `ISSN ${site.issn.online}`}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
