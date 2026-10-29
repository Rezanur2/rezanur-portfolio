import { Download, ExternalLink, FileText } from "lucide-react";
import { buttonStyles } from "@/components/ui/button-styles";
import { siteConfig } from "@/data/site";
import { publicFileExists } from "@/lib/assets";
import { cn } from "@/lib/utils";

const RESUME_PATH = "/resume.pdf";
const RESUME_DOWNLOAD_NAME = "Md-Rezanur-Rahman-Resume.pdf";

interface ResumeActionsProps {
  className?: string;
  align?: "start" | "center";
}

/**
 * Only renders real resume links when `public/resume.pdf` exists. Without the
 * file, an honest email fallback is shown instead of a dead download link.
 */
export function ResumeActions({
  className,
  align = "start",
}: ResumeActionsProps) {
  const hasResume = publicFileExists("resume.pdf");

  if (!hasResume) {
    return (
      <div
        className={cn(
          "inline-flex flex-col gap-1.5 rounded-xl border border-dashed border-border-strong bg-surface/70 px-4 py-2.5 text-xs text-muted",
          align === "center" && "mx-auto text-center items-center",
          className,
        )}
      >
        <p className="leading-snug">
          <span className="font-semibold text-foreground">
            Resume PDF pending upload:
          </span>{" "}
          Will be served from{" "}
          <code className="rounded bg-background px-1.5 py-0.5 font-mono text-[11px] text-foreground">
            public/resume.pdf
          </code>
        </p>
        <p className="leading-snug">
          Need a copy now?{" "}
          <a
            href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Resume request — " + siteConfig.name)}`}
            className="font-medium text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
          >
            Email me directly
          </a>
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3",
        align === "center" && "justify-center",
        className,
      )}
    >
      <a
        href={RESUME_PATH}
        download={RESUME_DOWNLOAD_NAME}
        className={buttonStyles("primary", "md")}
      >
        <Download aria-hidden="true" className="size-4" />
        Download Resume
        <span className="sr-only">(PDF, downloads as {RESUME_DOWNLOAD_NAME})</span>
      </a>
      <a
        href={RESUME_PATH}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonStyles("secondary", "md")}
      >
        <FileText aria-hidden="true" className="size-4" />
        View Resume
        <ExternalLink aria-hidden="true" className="size-3.5" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  );
}
