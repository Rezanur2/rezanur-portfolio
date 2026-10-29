import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/portfolio";
import { ProjectThumbnail } from "./ProjectThumbnail";
import { GithubIcon } from "@/components/ui/BrandIcons";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const caseStudyUrl = `/projects/${project.slug}`;
  const visibleTech = project.tech.slice(0, 4);
  const remainingTech = project.tech.length - visibleTech.length;

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--card-shadow)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-accent/40">
      <Link
        href={caseStudyUrl}
        tabIndex={-1}
        aria-hidden="true"
        className="block p-3 pb-0"
      >
        <ProjectThumbnail project={project} />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
          {project.category}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight">
          <Link
            href={caseStudyUrl}
            className="rounded-sm transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            {project.name}
          </Link>
        </h3>
        <p className="mt-2 text-pretty text-sm leading-6 text-muted">
          {project.summary}
        </p>

        <ul
          aria-label={`${project.name} technology stack`}
          className="mt-4 flex flex-wrap gap-1.5"
        >
          {visibleTech.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-border bg-background px-2 py-1 text-[11px] font-medium text-muted"
            >
              {tech}
            </li>
          ))}
          {remainingTech > 0 ? (
            <li className="rounded-md border border-border bg-background px-2 py-1 text-[11px] font-medium text-muted">
              +{remainingTech}
            </li>
          ) : null}
        </ul>

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <Link
              href={caseStudyUrl}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-xl bg-accent-soft px-3.5 py-2 text-xs font-semibold text-accent transition-all duration-200 hover:bg-accent-solid hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface active:scale-[0.98]"
            >
              View Details
              <ArrowRight
                aria-hidden="true"
                className="size-3.5 transition-transform group-hover:translate-x-0.5"
              />
            </Link>

            <div className="flex items-center gap-2">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit the ${project.name} live site (opens in a new tab)`}
                title="Visit live site"
                className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <span>Live</span>
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View the ${project.name} source on GitHub (opens in a new tab)`}
                title="View source on GitHub"
                className="grid size-10 place-items-center rounded-xl border border-border bg-background text-foreground transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <GithubIcon aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
