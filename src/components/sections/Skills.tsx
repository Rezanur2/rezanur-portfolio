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
import type { SkillCategory } from "@/types/portfolio";

const categoryIcons = {
  code: CodeXml,
  react: Blocks,
  shield: ShieldCheck,
  wrench: Wrench,
  database: Sprout,
} as const;

function SkillCard({
  category,
  compact = false,
}: {
  category: SkillCategory;
  compact?: boolean;
}) {
  const Icon = categoryIcons[category.icon];

  return (
    <article
      className={cn(
        "flex h-full min-w-0 flex-col rounded-2xl border border-border bg-surface p-5 shadow-[var(--card-shadow)] sm:p-6",
        compact && "p-4.5 sm:p-5",
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

      <p
        className={cn(
          "text-xs leading-6 text-muted",
          compact ? "mt-3" : "mt-4",
        )}
      >
        {category.description}
      </p>

      <ul className={cn("flex flex-wrap gap-1.5", compact ? "mt-3.5" : "mt-5")}>
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
  );
}

export function Skills() {
  const [frontend, backend, appPatterns, authSecurity, toolsDeploy, expanding] =
    skillCategories;

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
            description="A working set of frontend and backend tools, the patterns I apply in full-stack projects, and the topics I'm studying next. No ratings or invented years of experience."
          />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Row 1: Frontend (spans 2 columns) */}
          {frontend ? (
            <Reveal
              delay={0}
              className="h-full md:col-span-2 lg:col-span-2"
            >
              <SkillCard category={frontend} />
            </Reveal>
          ) : null}

          {/* Row 1: Backend & Database (1 column) */}
          {backend ? (
            <Reveal delay={0.05} className="h-full">
              <SkillCard category={backend} />
            </Reveal>
          ) : null}

          {/* Row 2: Application patterns (1 column) */}
          {appPatterns ? (
            <Reveal delay={0.1} className="h-full">
              <SkillCard category={appPatterns} />
            </Reveal>
          ) : null}

          {/* Row 2: Authentication & Security (1 column) */}
          {authSecurity ? (
            <Reveal delay={0.15} className="h-full">
              <SkillCard category={authSecurity} />
            </Reveal>
          ) : null}

          {/* Row 2: Tools & Deployment + Currently expanding stacked in column 3 */}
          {toolsDeploy || expanding ? (
            <Reveal delay={0.2} className="h-full">
              <div className="flex h-full flex-col gap-4">
                {toolsDeploy ? (
                  <div className="flex-1">
                    <SkillCard category={toolsDeploy} compact />
                  </div>
                ) : null}
                {expanding ? (
                  <div className="flex-1">
                    <SkillCard category={expanding} compact />
                  </div>
                ) : null}
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
