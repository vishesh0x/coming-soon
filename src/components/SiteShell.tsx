import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";
import { SocialLinks } from "@/components/SocialLinks";
import { ThemeToggle } from "@/components/ThemeToggle";

export interface SiteShellProps {
  children: ReactNode;
}

export function SiteShell({ children }: SiteShellProps): JSX.Element {
  return (
    <div className="site-background relative isolate flex min-h-screen flex-col overflow-x-clip">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-50 -translate-y-24 rounded-xl bg-ink px-5 py-3 text-page focus:translate-y-0"
      >
        Skip to content
      </a>

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-7 sm:px-10 lg:px-12">
        <Link
          to="/"
          aria-label={`${siteConfig.name} home`}
          className="inline-flex items-center gap-3 rounded-xl"
        >
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-ink text-page">
            <Sparkles size={21} strokeWidth={1.7} aria-hidden="true" />
          </span>

          <span className="text-2xl font-semibold tracking-[-0.06em]">
            {siteConfig.name}
          </span>
        </Link>

        <div className="flex items-center gap-5">
          <span className="hidden text-xs font-medium tracking-wide text-muted md:inline">
            A little anticipation looks good on you.
          </span>

          <ThemeToggle />
        </div>
      </header>

      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-12 outline-none sm:px-10 lg:px-12 lg:py-16"
      >
        {children}
      </main>

      <footer className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-5 border-t border-line py-7 text-center sm:flex-row sm:text-left">
          <p className="text-xs leading-6 text-muted">
            © {new Date().getFullYear()} {siteConfig.name}
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            {siteConfig.footerNote}
          </p>

          {siteConfig.socials !== "NA" && (
            <SocialLinks links={siteConfig.socials} />
          )}
        </div>
      </footer>
    </div>
  );
}