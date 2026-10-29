import Image from "next/image";
import { siteConfig } from "@/data/site";
import { publicFileExists } from "@/lib/assets";
import { cn } from "@/lib/utils";

const PROFILE_PHOTO = "images/Rezanur.jpg";

interface ProfilePortraitProps {
  className?: string;
  priority?: boolean;
}

/**
 * Displays `public/images/Rezanur.jpg` when it exists. If the file is ever
 * removed, a designed monogram keeps the layout intact instead of breaking.
 */
export function ProfilePortrait({
  className,
  priority = true,
}: ProfilePortraitProps) {
  const hasPhoto = publicFileExists(PROFILE_PHOTO);

  return (
    <div className={cn("relative mx-auto w-full max-w-sm", className)}>
      <div
        aria-hidden="true"
        className="absolute inset-x-6 -bottom-3 top-10 rounded-[1.75rem] border border-accent/25"
      />
      <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-surface p-2 shadow-[var(--card-shadow)]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.1rem] bg-background">
          {hasPhoto ? (
            <Image
              src={`/${PROFILE_PHOTO}`}
              alt={`Portrait of ${siteConfig.name}, ${siteConfig.designation}`}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 60vw, 82vw"
              className="object-cover object-[center_28%]"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 bg-surface">
              <span className="grid size-16 place-items-center rounded-full border border-border bg-accent-soft font-serif text-2xl italic text-accent">
                {siteConfig.initials}
              </span>
              <p className="px-6 text-center text-xs leading-5 text-muted">
                Portrait photo not found in the project assets.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 px-2 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight">
              {siteConfig.shortName}
            </p>
            <p className="truncate text-[11px] text-muted">
              {siteConfig.designation}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[10px] font-medium text-muted">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-emerald-500"
            />
            Open to work
          </span>
        </div>
      </div>
    </div>
  );
}
