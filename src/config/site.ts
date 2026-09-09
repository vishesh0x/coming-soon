export type OptionalBlock<T> = T | "NA";

export interface ProjectConfig {
  title: string;
  summary: string;
  eyebrow: string;
}

export interface NewsletterConfig {
  heading: string;
  description: string;
  buttonLabel: string;
  privacyNote: string;
}

export interface CountdownConfig {
  targetDate: string;
  label: string;
  liveMessage: string;
}

export interface PreviewConfig {
  label: string;
  title: string;
  description: string;
}

export type SocialPlatform = "github" | "instagram" | "linkedin";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  documentTitle: string;
  description: string;
  footerNote: string;
  project: ProjectConfig;
  newsletter: OptionalBlock<NewsletterConfig>;
  countdown: OptionalBlock<CountdownConfig>;
  preview: OptionalBlock<PreviewConfig>;
  socials: OptionalBlock<readonly SocialLink[]>;
}

export const siteConfig: SiteConfig = {
  name: "Vishesh0x",
  documentTitle: "Coming Soon",
  description:
    "A little less noise. A lot more possibility. Get early access to the Project.",
  footerNote: "Made with intention. Coming with possibility.",

  project: {
    eyebrow: "A new beginning",
    title: "Good things are\ntaking shape.",
    summary:
      "We’re creating a little less noise and a lot more possibility. " +
      "Something thoughtful, useful, and just a little unexpected.",
  },

  newsletter: {
    heading: "Be here for the beginning.",
    description: "Join the list. You’ll be the first to know when we’re ready.",
    buttonLabel: "Get early access",
    privacyNote: "Only the good stuff. No spam, ever.",
  },

  countdown: {
    targetDate: "NA",
    label: "The next chapter begins in",
    liveMessage: "We are live!",
  },

  preview: {
    label: "A glimpse of what’s next",
    title: "Room for something better.",
    description:
      "Thoughtfully built. Beautifully simple. Designed around what matters.",
  },

  // Replace these with your actual social profiles before publishing.
  // Set socials: "NA" to hide the entire social section.
  socials: [
    {
      platform: "github",
      label: "GitHub",
      href: "https://github.com/vishesh0x",
    },
    {
      platform: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/thevisheshraghuvanshi",
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/vishesh0x",
    },
  ],
};