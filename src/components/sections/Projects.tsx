import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GithubIcon } from "@/components/ui/BrandIcons";

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-b border-border py-10 sm:py-12 lg:py-14"
    >
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              headingId="projects-heading"
              title={
                <>
                  <span className="font-serif font-normal italic text-accent">
                    Projects
                  </span>
                </>
              }
              description="Four deployed applications, each with public source code. Every case study covers the problem, the features that exist, and the work I would do next."
            />
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-xl border border-border-strong bg-surface px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:self-auto"
            >
              <GithubIcon aria-hidden="true" className="size-4" />
              All repositories
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal
              key={project.slug}
              delay={(index % 2) * 0.06}
              className="h-full min-w-0"
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
