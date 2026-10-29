import {
  Blocks,
  CircleAlert,
  CodeXml,
  ShieldCheck,
  Sprout,
  Wrench,
} from "lucide-react";
import { skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const categoryIcons = {
  code: CodeXml,
  react: Blocks,
  shield: ShieldCheck,
  wrench: Wrench,
  database: Sprout,
} as const;

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-b border-border py-10 sm:py-12 lg:py-14"
    >
      <div className="container-page">
        <Reveal>
          <SectionHeading
            headingId="skills-heading"
            title={
              <>
                Technical{" "}
                <span className="font-serif font-normal italic text-accent">
                  Skills
                </span>
              </>
            }
            description="A working set of frontend tools, the patterns I apply in React projects, and the topics I'm studying next. No ratings or invented years of experience."
          />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => {
            const Icon = categoryIcons[category.icon];

            return (
              <Reveal
                key={category.title}
                delay={(index % 3) * 0.05}
                className={cn(
                  "h-full",
                  index === 0 ? "md:col-span-2 lg:col-span-2" : undefined,
                )}
              >
                <article
                  className={cn(
                    "flex h-full min-w-0 flex-col rounded-2xl border border-border bg-surface p-5 shadow-[var(--card-shadow)] sm:p-6",
                    category.learning && "border-accent/25 bg-accent-soft/50",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-background text-accent">
                        <Icon aria-hidden="true" className="size-4" />
                      </span>
                      <h3 className="min-w-0 text-pretty text-sm font-semibold tracking-tight sm:text-base">
                        {category.title}
                      </h3>
                    </div>
                    <span className="hidden shrink-0 rounded-full border border-border bg-accent-soft px-2.5 py-1 text-[10px] font-medium text-accent sm:inline">
                      {category.status}
                    </span>
                  </div>

                  <p className="mt-4 text-xs leading-6 text-muted">
                    {category.description}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-[12px] font-medium text-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  {category.note ? (
                    <div className="mt-auto pt-5">
                      <p className="flex items-start gap-2 border-t border-border pt-4 text-[11px] leading-5 text-muted">
                        <CircleAlert
                          aria-hidden="true"
                          className="mt-0.5 size-3.5 shrink-0 text-amber-600 dark:text-amber-400"
                        />
                        <span>{category.note}</span>
                      </p>
                    </div>
                  ) : null}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
