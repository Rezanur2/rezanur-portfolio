import Link from "next/link";
import { ArrowUpRight, Compass, Lightbulb, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/site";
import { education } from "@/data/education";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const principles = [
  {
    icon: Compass,
    title: "Clarity first",
    description:
      "Readable components and interfaces that explain themselves without a manual.",
  },
  {
    icon: ShieldCheck,
    title: "Accessible by default",
    description:
      "Semantic HTML, visible focus states, and keyboard-friendly controls from the start.",
  },
  {
    icon: Lightbulb,
    title: "Honest scope",
    description:
      "I describe what a project actually does, including what it does not do yet.",
  },
];

const facts = [
  { label: "Role", value: siteConfig.designation },
  { label: "Focus", value: "Frontend Engineering & Responsive UI" },
  { label: "Core stack", value: "React · Next.js · TypeScript · Tailwind CSS" },
  { label: "Learning", value: siteConfig.currentlyLearning.join(" · ") },
  { label: "Education", value: `${education.degree}, Kushtia Govt. College` },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-border py-10 sm:py-12 lg:py-14"
    >
      <div className="container-page">
        <Reveal>
          <SectionHeading
            headingId="about-heading"
            title={
              <>
                About{" "}
                <span className="font-serif font-normal italic text-accent">
                  Me
                </span>
              </>
            }
            description="A junior developer building a foundation in frontend work, one complete project at a time."
          />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div className="flex h-full min-w-0 flex-col justify-between">
            <div className="space-y-4">
              <Reveal>
                <p className="text-pretty text-base leading-7 text-muted">
                  I&apos;m Rezanur, a junior web developer focused on the
                  frontend. Most of my learning happens through projects: I take
                  an idea, build the interface, connect it to real data where I
                  can, and then review what worked and what I would change. It
                  is slower than following a tutorial, but it is how the ideas
                  stick.
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="text-pretty text-base leading-7 text-muted">
                  I enjoy learning new technologies and working through
                  JavaScript problems. My favourite part of a build is the
                  moment a static layout becomes an application — a filter that
                  responds, a route that resolves, a form that tells you exactly
                  what went wrong. Right now I&apos;m expanding my backend
                  knowledge with{" "}
                  <span className="font-medium text-foreground">Node.js</span>{" "}
                  and{" "}
                  <span className="font-medium text-foreground">MongoDB</span>,
                  so I can understand the rest of the stack.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-pretty text-base leading-7 text-muted">
                  My academic background in physics trained me to think
                  methodically: breaking complex problems into modular pieces,
                  testing edge cases, and building structured, predictable code.
                  I bring that same discipline to component design, state
                  management, and responsive layouts.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.12} className="mt-6 border-t border-border pt-6">
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                {principles.map((principle) => (
                  <div
                    key={principle.title}
                    className="flex flex-col justify-between rounded-xl border border-border/80 bg-surface p-4 shadow-[var(--card-shadow)] transition-colors hover:border-accent/40"
                  >
                    <div>
                      <span className="grid size-8 place-items-center rounded-lg bg-accent-soft text-accent">
                        <principle.icon aria-hidden="true" className="size-4" />
                      </span>
                      <h3 className="mt-3 text-xs font-semibold uppercase tracking-wider text-foreground">
                        {principle.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-5 text-muted">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="flex h-full flex-col justify-between gap-4">
            <Reveal delay={0.08} className="flex-1">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-surface p-6 shadow-[var(--card-shadow)]">
                <div>
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                      At a glance
                    </h3>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-0.5 text-[10px] font-semibold text-accent">
                      <span className="size-1.5 rounded-full bg-accent" />
                      Active
                    </span>
                  </div>
                  <dl className="mt-2 divide-y divide-border">
                    {facts.map((fact) => (
                      <div
                        key={fact.label}
                        className="flex flex-col gap-0.5 py-2.5 first:pt-2 last:pb-1"
                      >
                        <dt className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
                          {fact.label}
                        </dt>
                        <dd className="text-xs font-medium text-foreground sm:text-[13px]">
                          {fact.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="rounded-2xl bg-footer p-6 text-footer-foreground">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-400" />
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
                    Open to work
                  </h3>
                </div>
                <p className="mt-2 text-xs leading-5 text-footer-muted sm:text-sm sm:leading-6">
                  Junior web developer and frontend developer roles where I can
                  contribute to real interfaces and keep learning from code
                  review.
                </p>
                <Link
                  href="#contact"
                  className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-xl bg-accent-solid px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1d4ed8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
                >
                  Start a conversation
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
