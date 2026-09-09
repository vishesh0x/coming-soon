export interface NewsletterResponse {
  success: true;
}

export interface NewsletterRequestOptions {
  signal: AbortSignal;
}

export async function subscribeToNewsletter(
  email: string,
  { signal }: NewsletterRequestOptions,
): Promise<NewsletterResponse> {
  if (!email.trim()) {
    throw new Error("An email address is required.");
  }

  // Replace this mock with your backend request:
  //
  // const response = await fetch("/api/newsletter", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ email }),
  //   signal,
  // });
  //
  // if (!response.ok) throw new Error("Subscription failed.");
  // return { success: true };

  return new Promise<NewsletterResponse>((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("Request aborted", "AbortError"));
      return;
    }

    const onAbort = (): void => {
      window.clearTimeout(timeout);
      signal.removeEventListener("abort", onAbort);
      reject(new DOMException("Request aborted", "AbortError"));
    };

    const timeout = window.setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve({ success: true });
    }, 2000);

    signal.addEventListener("abort", onAbort, { once: true });
  });
}