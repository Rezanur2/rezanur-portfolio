import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  headingId?: string;
}

export function SectionHeading({
  title,
  description,
  align = "left",
  className,
  headingId,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <h2
        id={headingId}
        className="text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-pretty text-sm leading-7 text-muted sm:text-base",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
