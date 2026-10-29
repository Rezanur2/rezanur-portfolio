# Md. Rezanur Rahman — Portfolio

A personal portfolio for a junior web developer, built with Next.js App Router, TypeScript, Tailwind CSS v4, Framer Motion, and Lucide React.

The site presents four real, deployed learning projects with screenshots captured from the live applications, honest feature descriptions, and links to both the live demo and the public source code.

## What is included

- Single-page homepage with Home, About, Skills, Education, Projects, and Contact sections
- Four case-study routes:
  - `/projects/bazar-dor`
  - `/projects/bangla-news-24`
  - `/projects/fitlog`
  - `/projects/devstack`
- Light-first editorial design with a saved light/dark toggle
- Responsive navigation with an accessible mobile menu, active-section highlighting, and a "Let's Talk" link that scrolls to Contact
- Contact form with validation, loading and error states, an optional Formspree endpoint, and an honest pre-filled email fallback when online delivery is not configured
- Portrait photo, resume download/view links that appear only when the files exist, and an email fallback otherwise
- Floating Back to Top control that stays clear of the contact form and footer
- SEO metadata, canonical URLs, per-project social images, JSON-LD, `robots.txt`, and `sitemap.xml`
- Custom 404 page with a real `404` status for unknown project slugs, reduced-motion support, skip link, visible focus states, and keyboard-friendly navigation

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Cache Components, Partial Prefetching) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | Lucide React + local brand SVGs |
| Fonts | Geist, Geist Mono, Instrument Serif via `next/font` |
| Deployment target | Vercel (any Node host that supports Next.js also works) |

No UI kit or theme library is used. The design tokens live in `src/app/globals.css`.

## Getting started

Requirements: Node.js 20.9 or newer (22 LTS recommended) and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>.

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Public production URL used for canonical links, Open Graph URLs, `robots.txt`, and `sitemap.xml`. Falls back to `VERCEL_PROJECT_PRODUCTION_URL`, then `http://localhost:3000`. |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Optional | Formspree form endpoint such as `https://formspree.io/f/xxxxxxxx`. When empty, the contact form opens a pre-filled email draft instead of sending online. |

Both variables are public values. Do not put API keys or private tokens in `NEXT_PUBLIC_*` variables.

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Production build and type-check |
| `npm run start` | Serve the production build |

## Project structure

```text
src/
  app/
    layout.tsx              Root layout, metadata, theme script
    page.tsx                Homepage composition + Person schema
    globals.css             Design tokens, theme variants, utilities
    not-found.tsx           Custom 404 page
    icon.svg                The only favicon source
    opengraph-image.tsx     Generated 1200×630 social image
    robots.ts               robots.txt
    sitemap.ts              sitemap.xml
    projects/[slug]/page.tsx  Case-study template
  components/
    layout/                 Navbar, Footer, BackToTop, ThemeScript, ThemeToggle
    sections/               Hero, About, Skills, Education, Projects, Contact
    projects/               ProjectCard, ProjectThumbnail
    contact/                ContactForm
    ui/                     Buttons, headings, reveal, portrait, resume, social links, copy email
  data/                     All editable content
  lib/                      Theme, asset checks, site URL, utilities
  proxy.ts                  Rejects unknown project slugs before rendering
  types/                    Shared TypeScript types
public/
  images/Rezanur.jpg        Portrait used in the hero
  images/projects/          Real screenshots of the four live sites
  resume.pdf                Optional — add your resume here
```

## Editing content

All copy is kept in `src/data/` so the components rarely need to change.

| File | What it controls |
| --- | --- |
| `src/data/site.ts` | Name, role, email, phone, WhatsApp, intro, GitHub/LinkedIn URLs |
| `src/data/navigation.ts` | Section labels and anchor IDs |
| `src/data/skills.ts` | Skill groups, items, notes, and learning status |
| `src/data/education.ts` | Degree, institution, university, year, languages |
| `src/data/projects.ts` | Every project's copy, features, challenges, links, and screenshot |
| `src/data/projects.ts` → `getProjectBySlug` | Case-study lookup |
| `src/data/projects.ts` → `getNextProject` | "Next project" footer link |

### Replace the profile photo

The hero uses `public/images/Rezanur.jpg`. Replace that file with a portrait of the same name (ideally 4:5, at least 800×1000). The `ProfilePortrait` component checks for the file at render time; if it is missing, a designed monogram keeps the layout intact.

After adding or replacing the file, restart the dev server or rebuild for production so the server-side file check runs again.

### Add the resume

Add your PDF at `public/resume.pdf`. The hero and contact section then render **Download Resume** (downloads as `Md-Rezanur-Rahman-Resume.pdf`) and **View Resume** links. Until the file exists, visitors see an honest note offering to email a copy instead — no link to a missing file is emitted.

The file check runs at build/render time, so restart the dev server or rebuild after adding the PDF.

### Configure the contact form

1. Create a form at [Formspree](https://formspree.io/).
2. Copy the endpoint URL, which looks like `https://formspree.io/f/xxxxxxxx`.
3. Add it to `.env.local` (and to your host's environment variables):

   ```bash
   NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
   ```

4. Restart the dev server or redeploy.

Without an endpoint, the form still validates the fields and then opens a pre-filled email draft in the visitor's mail app. The page states clearly that online delivery is not configured and that nothing has been sent automatically. There is no fake success state.

The form also includes a hidden honeypot field; submissions that fill it are ignored.

### Add or edit a project

1. Add a 1440×900 screenshot to `public/images/projects/`.
2. Add an entry to the `projects` array in `src/data/projects.ts`.
3. Use a URL-safe `slug`; the case-study route is generated from it automatically.

Required project fields are defined in `src/types/portfolio.ts`:

- `name`, `tagline`, `summary`, `category`, `projectType`, `role`
- `tech`, `image`, `imageAlt`, `liveUrl`, `githubUrl`
- `overview`, `problem`, `features`, `challenges`, `improvements`
- `limitation` (optional, shown in an amber callout)

`src/proxy.ts` reads the same project list, so a new slug gets a real case-study route and unknown slugs return a genuine `404` response. Keep descriptions factual. If a project's behavior changes, update the copy and replace the screenshot.

## Theme behavior

- On the first visit, the inline script in `src/lib/theme.ts` reads `prefers-color-scheme`.
- Light is the fallback when the media query is unavailable.
- A manual toggle stores `light` or `dark` under the key `rezanur-portfolio-theme` in `localStorage`.
- The script runs before the first paint, so there is no flash of the wrong theme.
- The toggle updates `data-theme` on `<html>`, which drives the `dark:` Tailwind variant and all CSS variables.

## Favicon

The only favicon source is `src/app/icon.svg`, following the App Router file convention. There is deliberately no `public/favicon.ico` or extra `icon.png`, so Next.js does not emit conflicting icon tags.

To replace the icon, edit `src/app/icon.svg` or delete it and add an `icon.png` / `icon.ico` in `src/app/` instead. Use one approach at a time. The navbar monogram is a separate component and is not tied to the favicon.

## Back to Top and footer

The floating Back to Top button appears after scrolling and hides while the Contact section or footer is visible, so it never covers the form or footer links. It uses the accent colour, a Lucide arrow, a 44×44px target, and honours reduced-motion preferences.

The footer is always a dark contrast surface. It contains section navigation, contact details, social links, and an availability note.

## SEO and site URL

Set the public production URL before deploying:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Copy `.env.example` as a starting point. This value is used for canonical URLs, Open Graph URLs, `robots.txt`, and `sitemap.xml`.

On Vercel, `VERCEL_PROJECT_PRODUCTION_URL` is used as a fallback when `NEXT_PUBLIC_SITE_URL` is not set. Set the explicit variable once a custom domain is connected so canonical URLs are stable.

Metadata lives in `src/app/layout.tsx`; each case study generates its own title, description, canonical URL, and social image from the project data. The homepage and each case study also emit JSON-LD structured data.

## Deployment

### Vercel

1. Push the repository to GitHub.
2. Import the repository in Vercel. The framework preset is detected automatically.
3. Add `NEXT_PUBLIC_SITE_URL` under **Settings → Environment Variables** with the production URL.
4. Optionally add `NEXT_PUBLIC_FORMSPREE_ENDPOINT` to enable online form delivery.
5. Deploy.
6. Verify `/`, all four `/projects/*` routes, `/robots.txt`, `/sitemap.xml`, and a random URL (which should show the custom 404 with a `404` status).

Build command: `npm run build`. No extra configuration is required.

### Any Node host

Run `npm install`, then `npm run build`, then `npm run start`. The default port is `3000`; most hosts provide a `PORT` environment variable. Set the environment variables in the host's settings.

## Accessibility and performance notes

- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page, and ordered headings
- Skip link as the first focusable element
- `aria-expanded` / `aria-controls` on the mobile menu, Escape to close, focus moved into and returned from the menu
- Visible focus rings and large touch targets
- `prefers-reduced-motion` respected by both CSS and Framer Motion
- Screenshots and the portrait use `next/image` with responsive `sizes`
- Text contrast was checked against the page background in both themes
- No horizontal overflow down to 320px

## Content and asset notes

- Project screenshots were captured from the deployed sites in October 2026.
- The four repositories and live links were verified at the same time.
- Bazar Dor and Bangla News 24 depend on external APIs and configured authentication credentials.
- Password reset is listed in the skills section with a note that it is not implemented in the current deployed builds.
- FitLog and DevStack keep their state in memory, so selections reset on a full refresh; this is stated on their case-study pages.
- The source repositories are public under the `Rezanur2` GitHub account.

## Maintenance checklist

- [x] Professional resume PDF generated and active at `public/resume.pdf`
- [ ] Replace `public/images/Rezanur.jpg` if the portrait changes
- [ ] Configure `NEXT_PUBLIC_FORMSPREE_ENDPOINT` or `RESEND_API_KEY` for online form delivery
- [ ] Set `NEXT_PUBLIC_SITE_URL` before going live
- [ ] Update availability wording as circumstances change
- [ ] Re-capture screenshots if a project's UI changes
- [ ] Run `npm run lint` and `npm run build` after content edits
