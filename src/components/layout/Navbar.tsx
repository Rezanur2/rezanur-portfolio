"use client";

import Link from "next/link";
import Image from "next/image";
import logoImg from "../../../public/images/logo.png";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { navigation } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { buttonStyles } from "@/components/ui/button-styles";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Guards against scroll spy overriding user click during smooth scrolling
  const isManualScroll = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) {
    if (pathname === "/") {
      if (id === "home") {
        e.preventDefault();
        setActiveSection("home");
        setMenuOpen(false);

        isManualScroll.current = true;
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
          isManualScroll.current = false;
        }, 900);

        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", "#home");
        return;
      }

      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        setActiveSection(id);
        setMenuOpen(false);

        isManualScroll.current = true;
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
          isManualScroll.current = false;
        }, 900);

        const header = document.querySelector("header");
        const navHeight = header ? header.offsetHeight : 64;
        const targetY = Math.max(
          0,
          el.getBoundingClientRect().top + window.scrollY - navHeight,
        );

        window.scrollTo({
          top: targetY,
          behavior: "smooth",
        });
        window.history.pushState(null, "", `#${id}`);
        return;
      }
    }

    setActiveSection(id);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sectionIds = navigation.map((item) => item.id);

    function updateActiveSection() {
      if (isManualScroll.current) {
        return;
      }

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 1. If at or near the very top of the page, always activate "home"
      if (scrollY < 90) {
        setActiveSection("home");
        return;
      }

      // 2. If at or near the very bottom of the page, activate "contact"
      if (windowHeight + scrollY >= documentHeight - 70) {
        setActiveSection("contact");
        return;
      }

      // 3. Header clearance offset (navbar is 64px = 4rem)
      const headerOffset = 80;
      let matchedSection = "";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();

        // Check if section contains the active viewport line
        if (rect.top <= headerOffset && rect.bottom > headerOffset) {
          matchedSection = id;
          break;
        }
      }

      // 4. Fallback: find the section closest to the top of the viewport
      if (!matchedSection) {
        let closestId = "";
        let minDistance = Infinity;

        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top - headerOffset);

          if (rect.top < windowHeight && rect.bottom > 0 && distance < minDistance) {
            minDistance = distance;
            closestId = id;
          }
        }

        if (closestId) {
          matchedSection = closestId;
        }
      }

      if (matchedSection) {
        setActiveSection(matchedSection);
      }
    }

    // Check URL hash on initial load
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      if (sectionIds.includes(hash)) {
        setActiveSection(hash);
      }
    } else {
      updateActiveSection();
    }

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    firstLinkRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    function handleResize() {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  function hrefFor(id: string) {
    return pathname === "/" ? `#${id}` : `/#${id}`;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/#home"
          onClick={(e) => handleNavClick(e, "home")}
          aria-label={`${siteConfig.name} — home`}
          className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span
            aria-hidden="true"
            className="relative size-9 overflow-hidden rounded-xl border border-border shadow-sm ring-1 ring-border/50"
          >
            <Image
              src={logoImg}
              alt=""
              fill
              sizes="36px"
              priority
              className="object-cover"
            />
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:block">
            {siteConfig.shortName}
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {navigation.map((item) => {
            const isActive = pathname === "/" && activeSection === item.id;

            return (
              <Link
                key={item.id}
                href={hrefFor(item.id)}
                onClick={(e) => handleNavClick(e, item.id)}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative rounded-md px-3.5 py-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "font-semibold text-foreground"
                    : "text-muted hover:text-foreground",
                )}
              >
                {item.label}
                {isActive ? (
                  <motion.span
                    layoutId="activeNavIndicator"
                    aria-hidden="true"
                    className="absolute inset-x-2.5 bottom-0 h-[2.5px] rounded-full bg-accent"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 32,
                    }}
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href={hrefFor("contact")}
            onClick={(e) => handleNavClick(e, "contact")}
            className={buttonStyles("primary", "sm", "hidden lg:inline-flex")}
          >
            Let&apos;s Talk
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-lg border border-border-strong bg-surface text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
          >
            {menuOpen ? (
              <X aria-hidden="true" className="size-4" />
            ) : (
              <Menu aria-hidden="true" className="size-4" />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={cn("lg:hidden", menuOpen ? "block" : "hidden")}
      >
        <nav
          aria-label="Mobile navigation"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background px-5 pb-6 pt-2 sm:px-8"
        >
          <ul className="flex flex-col">
            {navigation.map((item, index) => {
              const isActive = pathname === "/" && activeSection === item.id;

              return (
                <li key={item.id}>
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={hrefFor(item.id)}
                    onClick={(e) => handleNavClick(e, item.id)}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "flex min-h-11 items-center justify-between border-b border-border/70 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                      isActive
                        ? "font-semibold text-accent"
                        : "text-muted hover:text-foreground",
                    )}
                  >
                    {item.label}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-3.5 opacity-50"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={hrefFor("contact")}
            onClick={(e) => handleNavClick(e, "contact")}
            className={buttonStyles(
              "primary",
              "md",
              "mt-5 flex w-full no-underline",
            )}
          >
            Let&apos;s Talk
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
