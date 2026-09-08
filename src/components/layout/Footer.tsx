import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line bg-elevated">
      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <p className="font-display text-3xl tracking-tight">
              {site.name}
              <span className="text-gradient">.</span>
            </p>
            <p className="mt-4 max-w-sm text-[0.95rem] text-muted">{site.description}</p>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-[0.72rem] uppercase tracking-widest text-muted">
              <div>
                <dt>ISSN (online)</dt>
                <dd className="text-fg">{site.issn.online}</dd>
              </div>
              <div>
                <dt>ISSN (print)</dt>
                <dd className="text-fg">{site.issn.print}</dd>
              </div>
              <div>
                <dt>Publisher</dt>
                <dd className="text-fg">{site.publisher}</dd>
              </div>
              <div>
                <dt>License</dt>
                <dd>
                  <a href={site.license.url} className="text-fg underline" target="_blank" rel="noreferrer">
                    {site.license.name}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          {Object.entries(footerNav).map(([heading, links]) => (
            <div key={heading}>
              <p className="eyebrow mb-4">{heading}</p>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-underline text-[0.95rem] text-fg/85 hover:text-fg">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 text-[0.8rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.publisher}. Open access under {site.license.name}.
          </p>
          <p>{site.address}</p>
        </div>
      </Container>
      <div
        aria-hidden
        className="font-display pointer-events-none absolute -bottom-[0.32em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[22vw] leading-none tracking-tighter text-fg/[0.035]"
      >
        {site.name}
      </div>
    </footer>
  );
}
