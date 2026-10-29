"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type CopyState = "idle" | "copied" | "error";

interface CopyEmailButtonProps {
  email: string;
  className?: string;
}

export function CopyEmailButton({ email, className }: CopyEmailButtonProps) {
  const [state, setState] = useState<CopyState>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function resetLater(nextState: CopyState) {
    setState(nextState);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setState("idle"), 2400);
  }

  async function copyEmail() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for browsers without the async clipboard API.
        const textarea = document.createElement("textarea");
        textarea.value = email;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (!copied) {
          throw new Error("Copy command failed");
        }
      }
      resetLater("copied");
    } catch {
      resetLater("error");
    }
  }

  const Icon =
    state === "copied" ? Check : state === "error" ? TriangleAlert : Copy;

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <button
        type="button"
        onClick={copyEmail}
        className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border-strong bg-surface px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Icon
          aria-hidden="true"
          className={cn(
            "size-4",
            state === "copied" && "text-emerald-600 dark:text-emerald-400",
            state === "error" && "text-amber-600 dark:text-amber-400",
          )}
        />
        {state === "copied"
          ? "Copied"
          : state === "error"
            ? "Copy failed"
            : "Copy email"}
      </button>
      <p aria-live="polite" className="sr-only">
        {state === "copied"
          ? "Email address copied to clipboard."
          : state === "error"
            ? "Could not copy the email address. Please select it manually."
            : ""}
      </p>
    </div>
  );
}
