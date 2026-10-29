import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  TriangleAlert,
} from "lucide-react";
import { getNextProject, getProjectBySlug, projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { ProjectThumbnail } from "@/components/projects/ProjectThumbnail";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { buttonStyles } from "@/components/ui/button-styles";

const sectionHeading = "text-xl font-semibold tracking-[-0.02em] sm:text-2xl";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  const title = `${project.name} — ${project.category}`;

  return {
    title,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      type: "article",
      title: `${title} · ${siteConfig.name}`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      images: [
        {
          url: project.image,
          width: 1440,
          height: 900,
          alt: project.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${siteConfig.name}`,
      description: project.summary,
      images: [project.image],
    },
  };
}

function ProjectDetailSkeleton() {
  return (
    <div className="container-page py-6 sm:py-8 animate-pulse">
      <div className="h-4 w-48 rounded bg-border/60" />
      <div className="mt-8 max-w-4xl space-y-4">
        <div className="h-3 w-32 rounded bg-border/60" />
        <div className="h-10 w-3/4 rounded-lg bg-border/70" />
        <div className="h-6 w-1/2 rounded bg-border/50" />
        <div className="h-16 w-full rounded bg-border/40" />
        <div className="flex gap-3 pt-4">
          <div className="h-10 w-32 rounded-xl bg-border/60" />
          <div className="h-10 w-32 rounded-xl bg-border/60" />
        </div>
      </div>
      <div className="mt-10 aspect-[16/10] w-full rounded-2xl bg-border/40 sm:mt-12" />
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-6">
          <div className="h-40 rounded-2xl bg-border/40" />
          <div className="h-32 rounded-2xl bg-border/40" />
          <div className="h-48 rounded-2xl bg-border/40" />
        </div>
        <div className="h-64 rounded-2xl bg-border/40" />
      </div>
    </div>
  );
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <Suspense fallback={<ProjectDetailSkeleton />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(project.slug);

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.summary,
    url: project.liveUrl,
    codeRepository: project.githubUrl,
    image: project.image,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.githubUrl,
    },
    keywords: project.tech.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectSchema).replace(/</g, "\\u003c"),
        }}
      />

      <article className="container-page py-6 sm:py-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <li>
              <Link
                href="/"
                className="inline-flex min-h-6 items-center transition-colors hover:text-foreground"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/#projects"
                className="inline-flex min-h-6 items-center transition-colors hover:text-foreground"
              >
                Projects
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              {project.name}
            </li>
          </ol>
        </nav>

        <header className="mt-8 max-w-4xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
            {project.category} · {project.projectType}
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.035em] sm:text-5xl lg:text-6xl">
            {project.name}
          </h1>
          <p className="mt-4 font-serif text-2xl italic leading-snug text-muted sm:text-3xl">
            {project.tagline}
          </p>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-muted">
            {project.summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles("primary")}
            >
              Visit live site
              <ArrowUpRight aria-hidden="true" className="size-4" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles("secondary")}
            >
              <GithubIcon aria-hidden="true" className="size-4" />
              View source
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <Link
              href="/#projects"
              className="inline-flex min-h-11 items-center gap-1.5 px-2 text-xs font-semibold text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ArrowLeft aria-hidden="true" className="size-3.5" />
              All projects
            </Link>
          </div>
        </header>

        <div className="mt-10 sm:mt-12">
          <ProjectThumbnail
            project={project}
            priority
            sizes="(min-width: 1280px) 1152px, 100vw"
            className="shadow-[var(--card-shadow)]"
          />
          <p className="mt-3 text-center text-[11px] text-muted">
            Live screenshot of {project.name}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-14">
          <div className="min-w-0 space-y-12">
            <section aria-labelledby="overview-heading">
              <h2 id="overview-heading" className={sectionHeading}>
                Overview
              </h2>
              <div className="mt-4 space-y-4 text-pretty text-sm leading-7 text-muted sm:text-base">
                {project.overview.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                  The problem
                </h3>
                <p className="mt-2.5 text-sm leading-7 text-muted">
                  {project.problem}
                </p>
              </div>
            </section>

            <section aria-labelledby="stack-heading">
              <h2 id="stack-heading" className={sectionHeading}>
                Technology stack
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="features-heading">
              <h2 id="features-heading" className={sectionHeading}>
                Key implemented features
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                Features that exist in the current version.
              </p>
              <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 rounded-xl border border-border bg-surface px-3.5 py-3"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                    />
                    <span className="text-sm leading-6 text-muted">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="challenges-heading">
              <h2 id="challenges-heading" className={sectionHeading}>
                Development challenges
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                Decisions and obstacles from the build, described as they appear
                in the source.
              </p>
              <div className="mt-5 space-y-3">
                {project.challenges.map((challenge) => (
                  <div
                    key={challenge.title}
                    className="rounded-2xl border border-border bg-surface p-5"
                  >
                    <h3 className="text-sm font-semibold tracking-tight text-foreground">
                      {challenge.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted">
                      {challenge.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section aria-labelledby="next-heading">
              <h2 id="next-heading" className={sectionHeading}>
                Potential improvements and future plans
              </h2>
              <ul className="mt-4 space-y-2.5">
                {project.improvements.map((improvement) => (
                  <li
                    key={improvement}
                    className="flex items-start gap-2.5 text-sm leading-6 text-muted"
                  >
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-1 size-3.5 shrink-0 text-accent"
                    />
                    {improvement}
                  </li>
                ))}
              </ul>
            </section>

            {project.limitation ? (
              <section aria-labelledby="limitation-heading">
                <div className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
                  <TriangleAlert
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400"
                  />
                  <div>
                    <h2
                      id="limitation-heading"
                      className="text-sm font-semibold tracking-tight text-foreground"
                    >
                      Current limitation
                    </h2>
                    <p className="mt-1.5 text-sm leading-6 text-muted">
                      {project.limitation}
                    </p>
                  </div>
                </div>
              </section>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--card-shadow)]">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                Project details
              </h2>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.12em] text-muted">
                    Role
                  </dt>
                  <dd className="mt-1 text-sm font-medium">{project.role}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.12em] text-muted">
                    Type
                  </dt>
                  <dd className="mt-1 text-sm font-medium">
                    {project.projectType}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.12em] text-muted">
                    Built by
                  </dt>
                  <dd className="mt-1 text-sm font-medium">
                    {siteConfig.name}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-col gap-1 border-t border-border pt-4">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center justify-between gap-2 text-xs font-semibold text-foreground transition-colors hover:text-accent"
                >
                  Live site
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center justify-between gap-2 text-xs font-semibold text-foreground transition-colors hover:text-accent"
                >
                  Source code
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </div>
          </aside>
        </div>

        <aside
          aria-label="Next project"
          className="mt-16 border-t border-border pt-8"
        >
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/50 sm:flex-row sm:items-center sm:justify-between sm:p-6"
          >
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                Next project
              </p>
              <p className="mt-1.5 text-lg font-semibold tracking-tight">
                {nextProject.name}
              </p>
              <p className="mt-1 text-sm text-muted">{nextProject.tagline}</p>
            </div>
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border text-muted transition-colors group-hover:border-accent/50 group-hover:text-accent">
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </aside>
      </article>
    </>
  );
}
