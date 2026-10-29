import {
  ArrowUpRight,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { ContactForm } from "@/components/contact/ContactForm";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const formEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim() ?? "";

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-10 sm:py-12 lg:py-14"
    >
      <div className="container-page">
        <Reveal>
          <SectionHeading
            headingId="contact-heading"
            title={
              <>
                <span className="font-serif font-normal italic text-accent">
                  Contact
                </span>
              </>
            }
            description="Have a junior role, a project, or a question? Send a message with the form, or reach me directly using the details beside it."
          />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          <div className="flex min-w-0 flex-col gap-3">
            <Reveal>
              <div className="flex flex-col gap-3">
                {/* 1. Email Card */}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex min-h-16 items-center gap-4 rounded-2xl border border-border bg-surface p-4 shadow-[var(--card-shadow)] transition-colors hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                    <Mail aria-hidden="true" className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
                      Email
                    </span>
                    <span className="mt-0.5 block break-all text-sm font-semibold text-foreground">
                      {siteConfig.email}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </a>

                {/* 2. Merged Phone & WhatsApp Card */}
                <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-4 shadow-[var(--card-shadow)] transition-colors hover:border-accent/50">
                  <div className="flex min-w-0 items-center gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                      <Phone aria-hidden="true" className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <span className="block text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
                        Phone & WhatsApp
                      </span>
                      <span className="mt-0.5 block break-all text-sm font-semibold text-foreground">
                        {siteConfig.phoneDisplay}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${siteConfig.phone}`}
                      aria-label={`Call ${siteConfig.phoneDisplay}`}
                      title="Call Phone"
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Phone aria-hidden="true" className="size-3.5" />
                      <span>Call</span>
                    </a>
                    <a
                      href={siteConfig.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Message on WhatsApp (opens in a new tab)`}
                      title="Chat on WhatsApp"
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <MessageCircle aria-hidden="true" className="size-3.5" />
                      <span>WhatsApp</span>
                      <ArrowUpRight aria-hidden="true" className="size-3" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-border bg-surface p-4 shadow-[var(--card-shadow)]">
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
                  Prefer to copy it?
                </p>
                <p className="mt-1 break-all text-sm font-semibold text-foreground">
                  {siteConfig.email}
                </p>
                <CopyEmailButton email={siteConfig.email} className="mt-3" />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl bg-footer p-5 text-footer-foreground">
                <h3 className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60 sm:text-left">
                  Elsewhere
                </h3>
                <SocialLinks
                  variant="labeled"
                  tone="inverse"
                  className="mt-3 flex-wrap items-center justify-center gap-2.5 sm:flex-nowrap"
                  itemClassName="flex justify-center sm:flex-1"
                  linkClassName="min-w-[105px] justify-center sm:w-full"
                />
                <p className="mt-4 border-t border-white/10 pt-4 text-center text-xs leading-5 text-footer-muted sm:text-left">
                  Email is the most reliable way to reach me. Phone and WhatsApp
                  are listed above.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--card-shadow)] sm:p-7">
              <h3 className="text-lg font-semibold tracking-tight">
                Send a message
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-muted">
                Share the role, project, or question. Name, email, and message
                are required.
              </p>
              <ContactForm endpoint={formEndpoint} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
