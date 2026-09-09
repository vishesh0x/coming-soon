import { ArrowUpRight, CalendarDays, PartyPopper } from "lucide-react";
import { useId } from "react";
import { useCountdown } from "@/hooks/useCountdown";
import type { CountdownConfig } from "@/config/site";

export interface CountdownProps {
  config: CountdownConfig;
}

interface CountdownUnit {
  label: string;
  value: number;
}

export function Countdown({ config }: CountdownProps): JSX.Element {
  const headingId = useId();
  const countdown = useCountdown(config.targetDate);

  const units: readonly CountdownUnit[] = [
    { label: "Days", value: countdown.days },
    { label: "Hours", value: countdown.hours },
    { label: "Minutes", value: countdown.minutes },
    { label: "Seconds", value: countdown.seconds },
  ];

  const formattedDate =
    countdown.status === "invalid"
      ? ""
      : new Intl.DateTimeFormat(undefined, {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          timeZoneName: "short",
        }).format(new Date(config.targetDate));

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-[1.75rem] border border-line bg-panel/85 p-5 shadow-card backdrop-blur-xl sm:p-7"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2
          id={headingId}
          className="text-xs font-semibold uppercase tracking-[0.17em] text-muted"
        >
          {config.label}
        </h2>
        <ArrowUpRight size={18} className="text-accent" aria-hidden="true" />
      </div>

      {countdown.status === "running" ? (
        <div
          role="timer"
          aria-live="off"
          aria-label={`${countdown.days} days, ${countdown.hours} hours, ${countdown.minutes} minutes, ${countdown.seconds} seconds until launch`}
          className="grid grid-cols-4 gap-2 sm:gap-3"
        >
          {units.map(({ label, value }) => (
            <div
              key={label}
              aria-hidden="true"
              className="min-w-0 rounded-2xl border border-line bg-page/70 px-1 py-5 text-center"
            >
              <div className="overflow-hidden text-2xl font-medium tracking-[-0.05em] tabular-nums sm:text-4xl">
                {String(value).padStart(2, "0")}
              </div>
              <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.1em] text-muted">
                {label}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          role="status"
          className="flex min-h-28 items-center justify-center gap-3 rounded-2xl bg-accent/10 px-5 text-center text-xl font-medium text-accent"
        >
          {countdown.status === "live" && (
            <PartyPopper size={24} aria-hidden="true" />
          )}
          {countdown.status === "live"
            ? config.liveMessage
            : "Launch date to be announced."}
        </div>
      )}

      {countdown.status !== "invalid" && (
        <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-muted">
          <CalendarDays size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
          <p>
            <time dateTime={config.targetDate}>{formattedDate}</time>
            <span className="ml-1">· Your local time</span>
          </p>
        </div>
      )}
    </section>
  );
}