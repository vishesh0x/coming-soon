import { Github, Instagram, Linkedin } from "lucide-react";
import type { SocialLink, SocialPlatform } from "@/config/site";

export interface SocialLinksProps {
  links: readonly SocialLink[];
}

const icons: Record<SocialPlatform, typeof Github> = {
  github: Github,
  instagram: Instagram,
  linkedin: Linkedin,
};

export function SocialLinks({ links }: SocialLinksProps): JSX.Element {
  return (
    <nav aria-label="Social media">
      <ul className="flex items-center gap-2">
        {links.map((link) => {
          const Icon = icons[link.platform];

          return (
            <li key={`${link.platform}-${link.href}`}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label} — opens in a new tab`}
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/10 hover:text-accent motion-reduce:transform-none"
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}