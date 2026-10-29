import Image from "next/image";
import type { Project } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface ProjectThumbnailProps {
  project: Project;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

function hostnameFor(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return "live preview";
  }
}

/**
 * Screenshot presented in a light browser frame. The image is a real capture
 * of the deployed project, not a mockup.
 */
export function ProjectThumbnail({
  project,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw",
}: ProjectThumbnailProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-background",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface px-3 py-2">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-1.5 rounded-full bg-muted/40" />
          <span className="size-1.5 rounded-full bg-muted/40" />
          <span className="size-1.5 rounded-full bg-muted/40" />
        </span>
        <span className="mx-auto flex min-w-0 items-center gap-1.5 rounded-md bg-background px-2 py-0.5 font-mono text-[10px] text-muted">
          <span
            aria-hidden="true"
            className="size-1.5 shrink-0 rounded-full bg-emerald-500"
          />
          <span className="truncate">{hostnameFor(project.liveUrl)}</span>
        </span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
      </div>
    </div>
  );
}
