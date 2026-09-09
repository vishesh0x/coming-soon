import { useEffect } from "react";
import { Countdown } from "@/components/Countdown";
import { EmailForm } from "@/components/EmailForm";
import { LaunchPreview } from "@/components/LaunchPreview";
import { SiteShell } from "@/components/SiteShell";
import { siteConfig } from "@/config/site";

export function Home(): JSX.Element {
  const hasSideContent =
    siteConfig.preview !== "NA" || siteConfig.countdown !== "NA";

  useEffect(() => {
    document.title = siteConfig.documentTitle;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", siteConfig.description);
  }, []);

  return (
    <SiteShell>
      <div
        className={[
          "grid items-center gap-14 lg:gap-16",
          hasSideContent ? "lg:grid-cols-[1.15fr_1fr]" : "",
        ].join(" ")}
      >
        <div className="reveal max-w-2xl">
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent/[0.06] px-3.5 py-2">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              {siteConfig.project.eyebrow}
            </p>
          </div>

          <h1 className="hero-title whitespace-pre-line font-display text-[clamp(3.3rem,6.6vw,6rem)] leading-[1.04] tracking-[-0.065em]">
            {siteConfig.project.title}
          </h1>

          <p className="mt-7 max-w-lg text-base leading-8 text-muted sm:text-lg">
            {siteConfig.project.summary}
          </p>

          <div className="my-9 h-px w-16 bg-accent/45" aria-hidden="true" />

          {siteConfig.newsletter !== "NA" && (
            <EmailForm config={siteConfig.newsletter} />
          )}
        </div>

        {hasSideContent && (
          <div className="reveal reveal-delayed mx-auto grid w-full max-w-xl gap-4 lg:max-w-none">
            {siteConfig.preview !== "NA" && (
              <LaunchPreview config={siteConfig.preview} />
            )}

            {siteConfig.countdown !== "NA" && (
              <Countdown config={siteConfig.countdown} />
            )}
          </div>
        )}
      </div>
    </SiteShell>
  );
}