import { BookOpen, GraduationCap, Languages } from "lucide-react";
import { education, languages } from "@/data/education";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="border-b border-border py-10 sm:py-12 lg:py-14"
    >
      <div className="container-page">
        <Reveal>
          <SectionHeading
            headingId="education-heading"
            title={
              <>
                <span className="font-serif font-normal italic text-accent">
                  Education
                </span>
              </>
            }
            description="A science background, and a web development practice built alongside it."
          />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <article className="flex h-full min-w-0 flex-col rounded-2xl border border-border bg-surface p-6 shadow-[var(--card-shadow)] sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <span className="grid size-11 place-items-center rounded-xl border border-border bg-background text-accent">
                  <GraduationCap aria-hidden="true" className="size-5" />
                </span>
                <span className="rounded-full border border-border bg-background px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
                  {education.level}
                </span>
              </div>

              <div className="mt-6">
                <h3 className="text-balance text-xl font-semibold tracking-tight sm:text-2xl">
                  {education.degree}
                </h3>
                {education.institution ? (
                  <p className="mt-2 text-sm font-medium text-foreground">
                    {education.institution}
                  </p>
                ) : null}
                {education.university ? (
                  <p className="mt-1 text-sm text-muted">
                    {education.university}
                  </p>
                ) : null}
                {education.period ? (
                  <p className="mt-3 inline-flex items-center gap-2 rounded-lg bg-accent-soft px-3 py-1.5 text-xs font-semibold text-accent">
                    {education.period}
                  </p>
                ) : null}
              </div>

              <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
                {education.description}
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col gap-5">
              <div className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--card-shadow)] sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg border border-border bg-background text-accent">
                    <Languages aria-hidden="true" className="size-4" />
                  </span>
                  <h3 className="text-sm font-semibold tracking-tight">
                    Languages
                  </h3>
                </div>
                <dl className="mt-4">
                  {languages.map((language) => (
                    <div
                      key={language.name}
                      className="flex items-baseline justify-between gap-4 border-b border-border py-2.5 last:border-b-0 last:pb-0"
                    >
                      <dt className="text-sm font-medium text-foreground">
                        {language.name}
                      </dt>
                      <dd className="text-xs text-muted">{language.level}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="flex flex-1 flex-col rounded-2xl border border-border bg-surface p-5 shadow-[var(--card-shadow)] sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg border border-border bg-background text-accent">
                    <BookOpen aria-hidden="true" className="size-4" />
                  </span>
                  <h3 className="text-sm font-semibold tracking-tight">
                    Self-directed learning
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted">
                  My web development knowledge comes from focused practice:
                  reading documentation, rebuilding interfaces, and working
                  through the problems that appear in real projects. The four
                  case studies on this site are the clearest record of that
                  work.
                </p>
                <a
                  href="#projects"
                  className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-4 text-xs font-semibold text-accent transition-colors hover:text-foreground"
                >
                  Jump to projects
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
