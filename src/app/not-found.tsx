import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-start justify-center pt-32">
      <p className="eyebrow mb-4">Error 404</p>
      <TextReveal text="This page slipped through peer review." as="h1" className="display-lg max-w-3xl" highlight={[3, 4]} />
      <Reveal delay={0.5}>
        <p className="mt-6 max-w-xl text-lg text-muted">The page you asked for does not exist or has moved. Try the archive or search.</p>
        <div className="mt-8 flex gap-3">
          <Button href="/articles" arrow>
            Browse articles
          </Button>
          <Button href="/search" variant="outline">
            Search
          </Button>
        </div>
      </Reveal>
    </Container>
  );
}
