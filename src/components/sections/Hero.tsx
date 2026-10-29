import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { siteConfig } from "@/data/site";
import { ProfilePortrait } from "@/components/ui/ProfilePortrait";
import { ResumeActions } from "@/components/ui/ResumeButton";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { buttonStyles } from "@/components/ui/button-styles";

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="border-b border-border"
    >
      <div className="container-page grid grid-cols-1 gap-10 pb-10 pt-7 sm:gap-12 sm:pt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-14 lg:pb-14 lg:pt-12">
        <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-emerald-500"
            />
            {siteConfig.availability}
          </p>

          <h1
            id="hero-heading"
            className="mt-5 text-3xl font-bold leading-[1.05] tracking-[-0.035em] sm:text-5xl sm:leading-[1] lg:text-6xl lg:leading-[0.98] xl:text-[4.25rem]"
          >
            Md. Rezanur{" "}
            <span className="mt-1 block font-serif font-normal italic tracking-[-0.02em] text-accent">
              Rahman
            </span>
          </h1>

          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            {siteConfig.designation}
          </p>

          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-7 text-muted lg:mx-0">
            {siteConfig.intro}
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <ResumeActions className="justify-center lg:justify-start" />
            <Link href="#contact" className={buttonStyles("secondary", "md")}>
              Let&apos;s talk
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 border-t border-border pt-6 sm:flex-row sm:justify-between lg:justify-between">
            <SocialLinks className="justify-center sm:justify-start" />
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 break-all text-sm text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:justify-start"
            >
              <Mail aria-hidden="true" className="size-4 shrink-0" />
              {siteConfig.email}
            </a>
          </div>

          <p className="mt-4 text-center text-xs leading-5 text-muted lg:text-left">
            Currently learning{" "}
            <span className="font-medium text-foreground">
              {siteConfig.currentlyLearning.join(" and ")}
            </span>
            .
          </p>
        </div>

        <ProfilePortrait className="lg:justify-self-end" />
      </div>
    </section>
  );
}
