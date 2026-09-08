import { getArticlesForIssue, getCurrentIssue, getFeaturedArticles, getNews, getStats } from "@/lib/content";
import { toSummary } from "@/lib/content/summary";
import { Hero } from "@/components/home/Hero";
import { Partners } from "@/components/home/Partners";
import { CurrentIssue } from "@/components/home/CurrentIssue";
import { FeaturedArticles } from "@/components/home/FeaturedArticles";
import { Stats } from "@/components/home/Stats";
import { NewsPreview } from "@/components/home/NewsPreview";
import { CallForPapers } from "@/components/home/CallForPapers";

export default function HomePage() {
  const issue = getCurrentIssue();
  const issueArticles = getArticlesForIssue(issue);
  const featured = getFeaturedArticles(5).map(toSummary);
  const news = getNews().slice(0, 3);
  const call = getNews().find((n) => n.tag === "call-for-papers");
  const stats = getStats();

  return (
    <>
      <Hero currentIssueHref={`/issues/${issue.slug}`} />
      <Partners />
      <CurrentIssue issue={issue} articles={issueArticles} />
      <FeaturedArticles articles={featured} />
      <Stats stats={stats} />
      <NewsPreview posts={news} />
      <CallForPapers call={call} />
    </>
  );
}
