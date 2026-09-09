import {
  ArrowRight,
  Check,
  CheckCircle2,
  LoaderCircle,
  Mail,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { NewsletterConfig } from "@/config/site";
import { subscribeToNewsletter } from "@/lib/newsletter";

export type FormStatus = "idle" | "submitting" | "success" | "error";

export interface EmailFormProps {
  config: NewsletterConfig;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(value: string): string | null {
  if (!value.trim()) return "Please enter your email address.";
  if (value.trim().length > 254) return "Your email address is too long.";
  if (!EMAIL_PATTERN.test(value.trim())) {
    return "Please enter a valid email address, like you@example.com.";
  }
  return null;
}

export function EmailForm({ config }: EmailFormProps): JSX.Element {
  const id = useId();
  const inputId = `${id}-email`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const headingId = `${id}-heading`;

  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => controllerRef.current?.abort();
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    // Ref guard also prevents duplicate submissions before React rerenders.
    if (controllerRef.current || status === "success") return;

    const validationError = validateEmail(email);

    if (validationError) {
      setError(validationError);
      setStatus("error");
      inputRef.current?.focus();
      return;
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    setError("");
    setStatus("submitting");

    try {
      await subscribeToNewsletter(email.trim(), {
        signal: controller.signal,
      });

      if (!controller.signal.aborted) {
        setStatus("success");
      }
    } catch {
      if (!controller.signal.aborted) {
        setError("Something went wrong. Please try again in a moment.");
        setStatus("error");
      }
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null;
      }
    }
  };

  return (
    <section aria-labelledby={headingId} className="max-w-xl">
      <h2 id={headingId} className="text-base font-semibold tracking-tight">
        {config.heading}
      </h2>

      <p className="mt-2 text-sm leading-6 text-muted">
        {config.description}
      </p>

      {status === "success" ? (
        <div
          ref={successRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className="mt-5 flex gap-4 rounded-2xl border border-emerald-600/20 bg-emerald-500/10 p-5 outline-none"
        >
          <CheckCircle2
            size={24}
            className="mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-300"
            aria-hidden="true"
          />
          <div>
            <p className="font-semibold text-emerald-800 dark:text-emerald-200">
              You’re on the list.
            </p>
            <p className="mt-1 break-words text-sm leading-6 text-muted">
              Thanks for joining us! We’ll keep{" "}
              <span className="font-medium text-ink">{email.trim()}</span>{" "}
              in the loop.
            </p>
          </div>
        </div>
      ) : (
        <form
          noValidate
          onSubmit={handleSubmit}
          aria-labelledby={headingId}
          aria-busy={status === "submitting"}
          className="mt-5"
        >
          <label htmlFor={inputId} className="sr-only">
            Email address
          </label>

          <div className="flex flex-col gap-2 rounded-2xl border border-line bg-panel p-2 shadow-sm focus-within:border-accent/60 focus-within:ring-4 focus-within:ring-accent/10 sm:flex-row">
            <div className="relative min-w-0 flex-1">
              <Mail
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                aria-hidden="true"
              />

              <input
                ref={inputRef}
                id={inputId}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                required
                maxLength={254}
                value={email}
                disabled={status === "submitting"}
                aria-label="Email address"
                aria-invalid={status === "error"}
                aria-describedby={
                  status === "error" ? `${hintId} ${errorId}` : hintId
                }
                placeholder="Your email address"
                onChange={(event) => {
                  setEmail(event.target.value);

                  if (status === "error") {
                    setError("");
                    setStatus("idle");
                  }
                }}
                className="h-12 w-full rounded-xl bg-transparent pl-10 pr-3 text-sm text-ink outline-none placeholder:text-muted disabled:opacity-60 focus-visible:outline-none focus-visible:ring-0"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              aria-label={
                status === "submitting"
                  ? "Submitting your email"
                  : config.buttonLabel
              }
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-ink px-5 text-sm font-medium text-page transition hover:opacity-85 disabled:cursor-wait disabled:opacity-65"
            >
              {status === "submitting" ? (
                <>
                  Joining…
                  <LoaderCircle
                    size={17}
                    className="animate-spin motion-reduce:animate-none"
                    aria-hidden="true"
                  />
                </>
              ) : (
                <>
                  {config.buttonLabel}
                  <ArrowRight size={17} aria-hidden="true" />
                </>
              )}
            </button>
          </div>

          {status === "error" && (
            <p
              id={errorId}
              role="alert"
              className="mt-3 text-sm text-rose-700 dark:text-rose-300"
            >
              {error}
            </p>
          )}

          <p className="sr-only" role="status" aria-live="polite">
            {status === "submitting" ? "Submitting your email. Please wait." : ""}
          </p>

          <p
            id={hintId}
            className="mt-3 flex items-center gap-2 text-xs leading-5 text-muted"
          >
            <Check size={14} className="text-accent" aria-hidden="true" />
            {config.privacyNote}
          </p>
        </form>
      )}
    </section>
  );
}