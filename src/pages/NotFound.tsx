import { ArrowLeft, Compass, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SiteShell } from "@/components/SiteShell";
import { siteConfig } from "@/config/site";

export function NotFound(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();

  const [isReturning, setIsReturning] = useState<boolean>(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const attemptedUrl =
    location.pathname + location.search + location.hash;

  useEffect(() => {
    document.title = `404 — Page not found | ${siteConfig.name}`;
    setIsReturning(false);
    headingRef.current?.focus();
  }, [attemptedUrl]);

  const handleReturn = (): void => {
    if (isReturning) return;

    setIsReturning(true);
    navigate("/", { replace: true });
  };

  return (
    <SiteShell>
      <section
        aria-labelledby="not-found-heading"
        className="reveal mx-auto w-full max-w-2xl py-8 text-center"
      >
        <div
          aria-hidden="true"
          className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-3xl border border-accent/20 bg-accent/10 text-accent"
        >
          <Compass size={30} strokeWidth={1.5} />
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          A small detour
        </p>

        <p
          aria-hidden="true"
          className="select-none font-display text-[clamp(7rem,22vw,12rem)] leading-none tracking-[-0.08em] text-accent/20"
        >
          404
        </p>

        <h1
          ref={headingRef}
          id="not-found-heading"
          tabIndex={-1}
          className="mt-2 font-display text-4xl tracking-tight outline-none sm:text-5xl"
        >
          Page not found.
        </h1>

        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-muted">
          This little corner of the internet doesn’t exist. But something
          good is still waiting back home.
        </p>

        <div className="mx-auto mt-7 max-w-lg rounded-2xl border border-line bg-panel/75 p-4 text-left">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-muted">
            Attempted URL
          </p>
          <code className="block max-h-36 overflow-auto whitespace-pre-wrap break-all text-sm text-ink">
            {attemptedUrl}
          </code>
        </div>

        <button
          type="button"
          onClick={handleReturn}
          disabled={isReturning}
          aria-label="Return to the Coming Soon home page"
          aria-busy={isReturning}
          className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-ink px-6 text-sm font-medium text-page transition hover:opacity-85 disabled:cursor-wait disabled:opacity-60"
        >
          {isReturning ? (
            <LoaderCircle
              size={17}
              className="animate-spin motion-reduce:animate-none"
              aria-hidden="true"
            />
          ) : (
            <ArrowLeft size={17} aria-hidden="true" />
          )}
          {isReturning ? "Heading home…" : "Back to the beginning"}
        </button>

        <p className="mt-5 text-xs text-muted">
          Looking for the launch?{" "}
          <Link to="/" className="rounded-sm underline underline-offset-4">
            You’re just one click away.
          </Link>
        </p>
      </section>
    </SiteShell>
  );
}