const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

/**
 * Prefer the explicit public URL. On Vercel, fall back to the production
 * deployment URL so canonical links and the sitemap are still valid before
 * a custom domain is configured.
 */
const resolvedUrl = configuredUrl
  ? configuredUrl
  : vercelUrl
    ? `https://${vercelUrl}`
    : "http://localhost:3000";

export const siteUrl = resolvedUrl.replace(/\/$/, "");

export const hasConfiguredSiteUrl = Boolean(configuredUrl || vercelUrl);
