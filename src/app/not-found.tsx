import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { buttonStyles } from "@/components/ui/button-styles";

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="container-page flex min-h-[55vh] flex-col items-center justify-center py-12 text-center"
    >
      <p className="font-serif text-6xl leading-none text-accent sm:text-7xl">
        404
      </p>
      <h1
        id="not-found-heading"
        className="mt-5 max-w-xl text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl"
      >
        This page took a wrong turn.
      </h1>
      <p className="mt-4 max-w-md text-pretty text-sm leading-6 text-muted sm:text-base">
        The address you followed doesn&apos;t exist, or the page has moved. Try
        the homepage, or jump straight to the project case studies.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className={buttonStyles("primary")}>
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back home
        </Link>
        <Link href="/#projects" className={buttonStyles("secondary")}>
          Explore projects
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </section>
  );
}
