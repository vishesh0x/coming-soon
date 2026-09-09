import { ArrowUpRight, Sparkles } from "lucide-react";
import { useId } from "react";
import type { PreviewConfig } from "@/config/site";

export interface LaunchPreviewProps {
  config: PreviewConfig;
}

export function LaunchPreview({ config }: LaunchPreviewProps): JSX.Element {
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      className="preview-card relative overflow-hidden rounded-[1.75rem] border border-line p-6 sm:p-8"
    >
      <div className="relative z-10 flex items-center justify-between gap-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
          {config.label}
        </p>
        <span className="rounded-full border border-line bg-panel/60 px-3 py-1 text-[10px] font-medium text-muted">
          In the making
        </span>
      </div>

      <div className="orbital-scene" aria-hidden="true">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="orbit orbit-three" />
        <div className="orbital-core">
          <Sparkles size={46} strokeWidth={1.2} />
        </div>
        <span className="orbit-dot orbit-dot-one" />
        <span className="orbit-dot orbit-dot-two" />
        <span className="orbit-star">✦</span>
      </div>

      <div className="relative z-10 flex items-end justify-between gap-4">
        <div>
          <h2 id={headingId} className="font-display text-2xl tracking-tight">
            {config.title}
          </h2>
          <p className="mt-2 max-w-xs text-sm leading-6 text-muted">
            {config.description}
          </p>
        </div>

        <span
          aria-hidden="true"
          className="hidden h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-panel/60 sm:grid"
        >
          <ArrowUpRight size={18} />
        </span>
      </div>
    </section>
  );
}