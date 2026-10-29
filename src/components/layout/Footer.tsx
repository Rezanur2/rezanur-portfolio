import Link from "next/link";
import Image from "next/image";
import logoImg from "../../../public/images/logo.png";
import { cacheLife } from "next/cache";
import { navigation } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { SocialLinks } from "@/components/ui/SocialLinks";

async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

const linkClass =
  "inline-flex min-h-11 items-center justify-center text-sm text-footer-muted transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-footer md:justify-start";

export async function Footer() {
  const year = await getCurrentYear();

  return (
    <footer
      id="site-footer"
      className="bg-footer text-footer-foreground"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      <div className="container-page grid grid-cols-1 gap-8 py-8 md:grid-cols-3 md:gap-10 lg:grid-cols-[1.4fr_1fr_1.15fr_0.85fr] lg:gap-12 lg:py-10">
        {/* Column 1: Brand & Profile */}
        <div className="col-span-1 flex flex-col items-center pb-8 text-center md:col-span-3 lg:items-start md:border-b md:border-white/10 md:pb-10 lg:text-left lg:col-span-1 lg:border-b-0 lg:pb-0">
          <Link
            href="/#home"
            className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
          >
            <span
              aria-hidden="true"
              className="relative size-9 overflow-hidden rounded-xl border border-white/20 shadow-sm ring-1 ring-white/10"
            >
              <Image
                src={logoImg}
                alt=""
                fill
                sizes="36px"
                className="object-cover"
              />
            </span>
            <span className="text-sm font-semibold tracking-tight">
              {siteConfig.name}
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-footer-muted md:max-w-md">
            {siteConfig.designation} · Building responsive interfaces with
            React, Next.js, and TypeScript.
          </p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium text-footer-muted">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-emerald-400"
            />
            {siteConfig.availability}
          </p>
          <SocialLinks
            tone="inverse"
            className="mt-5 justify-center md:justify-start"
          />
        </div>

        {/* Column 2: Sections */}
        <nav
          aria-labelledby="footer-sections"
          className="max-md:hidden flex flex-col items-center text-center md:items-start md:text-left"
        >
          <h3
            id="footer-sections"
            className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60"
          >
            Sections
          </h3>
          <ul className="mt-3 flex flex-col items-center md:items-start">
            {navigation.map((item) => (
              <li key={item.id}>
                <Link href={`/#${item.id}`} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Column 3: Contact */}
        <div className="max-md:hidden flex flex-col items-center text-center md:items-start md:text-left">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
            Contact
          </h3>
          <ul className="mt-3 flex flex-col items-center md:items-start">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className={`${linkClass} break-all`}
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={`tel:${siteConfig.phone}`} className={linkClass}>
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Elsewhere */}
        <div className="max-md:hidden flex flex-col items-center text-center md:items-start md:text-left">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
            Elsewhere
          </h3>
          <ul className="mt-3 flex flex-col items-center md:items-start">
            <li>
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                GitHub
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <Link href="/#projects" className={linkClass}>
                Case studies
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-center gap-2 py-4 text-center text-xs text-footer-muted md:flex-row md:items-center md:justify-between md:text-left">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>Built with Next.js and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
