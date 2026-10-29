import { Mail } from "lucide-react";
import { socialLinks } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { cn } from "@/lib/utils";

const icons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: Mail,
} as const;

interface SocialLinksProps {
  variant?: "icon" | "labeled";
  tone?: "default" | "inverse";
  className?: string;
  itemClassName?: string;
  linkClassName?: string;
}

export function SocialLinks({
  variant = "icon",
  tone = "default",
  className,
  itemClassName,
  linkClassName,
}: SocialLinksProps) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {socialLinks.map((link) => {
        const Icon = icons[link.icon];
        const isExternal = link.href.startsWith("http");

        return (
          <li key={link.label} className={cn(itemClassName)}>
            <a
              href={link.href}
              {...(isExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              aria-label={
                variant === "icon"
                  ? `${link.label}${isExternal ? " (opens in a new tab)" : ""}`
                  : undefined
              }
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                variant === "icon" && "size-11 justify-center border",
                variant === "labeled" && "px-3.5 py-2.5",
                tone === "default" &&
                  "border-border bg-surface text-muted hover:border-accent/50 hover:text-accent",
                tone === "inverse" &&
                  "border-white/15 bg-white/5 text-footer-muted hover:border-white/35 hover:text-white focus-visible:ring-offset-footer",
                linkClassName,
              )}
            >
              <Icon
                aria-hidden="true"
                className={cn(variant === "icon" ? "size-4" : "size-4 shrink-0")}
              />
              {variant === "labeled" ? <span>{link.label}</span> : null}
              {isExternal && variant === "labeled" ? (
                <span className="sr-only">(opens in a new tab)</span>
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
