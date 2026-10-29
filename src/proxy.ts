import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/data/projects";

const projectSlugs = new Set(projects.map((project) => project.slug));

/**
 * The project detail route is partially prerendered, so a `notFound()` thrown
 * inside the page happens after the response has started streaming and would
 * keep a 200 status. Rejecting unknown slugs here, before rendering, preserves
 * a real 404 while still showing the custom not-found page.
 */
export function proxy(request: NextRequest) {
  const match = /^\/projects\/([^/]+)\/?$/.exec(request.nextUrl.pathname);

  if (!match) {
    return NextResponse.next();
  }

  let slug = match[1];
  try {
    slug = decodeURIComponent(slug);
  } catch {
    // Keep the raw value; it will not match a real project.
  }

  if (projectSlugs.has(slug)) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL("/not-found", request.url), {
    status: 404,
  });
}

export const config = {
  matcher: "/projects/:path*",
};
