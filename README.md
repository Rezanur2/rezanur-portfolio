# Md. Rezanur Rahman — Portfolio

A modern, responsive, and accessible personal portfolio for a Junior Web Developer & Frontend Developer. Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, and **Lucide React**.

The site presents four real, deployed learning projects with authentic screenshots captured from the live applications, honest feature descriptions, problem-solving breakdowns, and direct links to both live demos and GitHub repositories.

---

## 🌟 Highlights & Features

- **Responsive Single-Page Layout**: Smooth scroll navigation across Home, About, Skills, Education, Projects, and Contact sections.
- **Four In-Depth Project Case Studies**:
  - [`/projects/bazar-dor`](file:///c:/Durbar/portfolio-design-with-ai/rezanur-portfolio/src/data/projects.ts) — Daily commodity market tracker with dynamic filtering and crowd-sourced reporting.
  - [`/projects/bangla-news-24`](file:///c:/Durbar/portfolio-design-with-ai/rezanur-portfolio/src/data/projects.ts) — Curated Bangla news aggregator with categorical feeds and responsive reading mode.
  - [`/projects/fitlog`](file:///c:/Durbar/portfolio-design-with-ai/rezanur-portfolio/src/data/projects.ts) — Workout and routine tracker with localized exercise state management.
  - [`/projects/devstack`](file:///c:/Durbar/portfolio-design-with-ai/rezanur-portfolio/src/data/projects.ts) — Developer tooling directory with search, bookmarking, and category exploration.
- **Editorial Design with Light/Dark Mode**:
  - Automatically matches system preference (`prefers-color-scheme`).
  - Manual toggle with preference saved in `localStorage`.
  - Zero theme-flash on initial page load via an inline head script.
- **Server-Side Contact Form (Resend API)**:
  - Backed by Next.js App Router API route (`/api/contact`).
  - Direct inbox delivery via Resend API (`RESEND_API_KEY`).
  - Client-side validation, anti-bot honeypot protection, responsive loading, error states, and pre-filled mail client fallback.
- **Brand Identity & Multi-Format Icons**:
  - Geometric blue brand monogram in Navbar and Footer.
  - Multi-resolution `public/favicon.ico` (16×16, 32×32, 48×48).
  - High-res Next.js App Router icon (`src/app/icon.png`) and Apple touch icon (`src/app/apple-icon.png`).
- **Always Accessible Navigation**:
  - Floating Back-to-Top button visible across the viewport.
  - Mobile navigation drawer with keyboard focus management and escape-key handling.
- **SEO & Social Sharing Ready**:
  - Dynamic Open Graph social preview cards (`1200×630`) generated via `next/og`.
  - Canonical URLs, JSON-LD structured data schema (`Person`), `robots.txt`, and automated `sitemap.xml`.

---

## 🛠️ Tech Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) | App Router, Turbopack, Partial Prefetching |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Strict type-checking and interface models |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | CSS variables, custom themes, utility tokens |
| **Motion & Animation** | [Framer Motion](https://www.framer.com/motion/) | Subtle entrance reveals and scroll-triggered animations |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, accessible vector icons |
| **Email Delivery** | [Resend](https://resend.com/) | Server-side transactional email API |
| **Typography** | `next/font` | Geist Sans, Geist Mono, and Instrument Serif |
| **Deployment Target** | [Vercel](https://vercel.com/) | Edge optimization, continuous deployment |

---

## 📁 Project Structure

```text
rezanur-portfolio/
├── public/
│   ├── favicon.ico             # Multi-size browser icon (16, 32, 48)
│   ├── resume.pdf              # Downloadable curriculum vitae
│   └── images/
│       ├── logo.png            # High-resolution brand logo
│       ├── logo.jpg            # Brand logo image
│       ├── favicon.png         # Web app icon
│       ├── Rezanur.jpg         # Profile portrait photo
│       └── projects/           # High-resolution project screenshots
│           ├── bazar-dor.png
│           ├── bangla-news-24.png
│           ├── fitlog.png
│           └── devstack.png
├── src/
│   ├── app/
│   │   ├── api/contact/        # Server-side contact email endpoint (Resend)
│   │   ├── projects/[slug]/    # Case-study dynamic detail pages
│   │   ├── apple-icon.png      # 180x180 Apple touch icon
│   │   ├── icon.png            # 512x512 App Router web icon
│   │   ├── globals.css         # Tailwind tokens & dark/light theme definitions
│   │   ├── layout.tsx          # Root layout, metadata & font definitions
│   │   ├── not-found.tsx       # Custom branded 404 page
│   │   ├── opengraph-image.tsx # Automated social share image generator
│   │   ├── page.tsx            # Main single-page portfolio view
│   │   ├── robots.ts           # Search engine crawling rules
│   │   └── sitemap.ts          # Automated XML sitemap
│   ├── components/
│   │   ├── contact/            # Contact form component
│   │   ├── layout/             # Navbar, Footer, BackToTop, ThemeToggle
│   │   ├── projects/           # Project card & thumbnail previews
│   │   ├── sections/           # Hero, About, Skills, Education, Projects
│   │   └── ui/                 # Reusable buttons, badges, portrait, headings
│   ├── data/                   # Content files (site, projects, skills, education)
│   ├── lib/                    # Asset helpers, site URL utilities, theme scripts
│   ├── proxy.ts                # Route validation proxy for invalid project slugs
│   └── types/                  # TypeScript interfaces & types
├── .env.example                # Example environment variables
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 20.9+** (22 LTS recommended) and **npm** installed.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Rezanur2/rezanur-portfolio.git
   cd rezanur-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Add your credentials:
   ```env
   # Public site URL (for metadata, sitemap & OG tags)
   NEXT_PUBLIC_SITE_URL=http://localhost:3000

   # Direct email delivery via Resend (https://resend.com)
   RESEND_API_KEY=your_resend_api_key_here
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local Next.js development server with Turbopack |
| `npm run build` | Builds optimized production bundle with typechecking |
| `npm run start` | Serves the production build locally |
| `npm run lint` | Runs ESLint to check code quality and rules |

---

## 🌐 Deployment on Vercel

1. Push your repository to **GitHub**.
2. Visit **[vercel.com](https://vercel.com)** and log in with your GitHub account.
3. Click **"Add New..."** → **"Project"** and select `rezanur-portfolio`.
4. Under **Environment Variables**, configure:
   - `RESEND_API_KEY` = `your_resend_api_key`
   - `NEXT_PUBLIC_SITE_URL` = `https://your-portfolio.vercel.app`
5. Click **"Deploy"**. Your site will be live within a minute with automatic SSL and CI/CD on every push.

---

## 👨‍💻 Author

**Md. Rezanur Rahman**
- **Role**: Junior Web Developer / Frontend Developer
- **Email**: [mdrezanurrahman2@gmail.com](mailto:mdrezanurrahman2@gmail.com)
- **GitHub**: [@Rezanur2](https://github.com/Rezanur2)
- **LinkedIn**: [Md. Rezanur Rahman](https://www.linkedin.com/in/md-rezanur-rahman/)
- **WhatsApp**: [+880 1551-986848](https://wa.me/8801551986848)

---

## 📄 License

This project is licensed under the **MIT License**.
