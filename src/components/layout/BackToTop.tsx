"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Floating return-to-top button. Stays visible when scrolled down so visitors
 * can smoothly return to the top from any section, including contact and footer.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      // Show button after scrolling past hero (~400px)
      setVisible(window.scrollY > 400);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "group fixed bottom-5 right-4 z-40 grid size-11 place-items-center rounded-full bg-accent-solid text-white shadow-[0_12px_28px_-12px_rgba(37,99,235,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1d4ed8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-6 sm:right-6",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <ArrowUp
        aria-hidden="true"
        className="size-5 transition-transform group-hover:-translate-y-0.5"
      />
      <span className="sr-only">Back to top</span>
    </button>
  );
}
