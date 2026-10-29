import type { Project } from "@/types/portfolio";

/**
 * Project content is based on the public repositories and live sites
 * inspected in October 2026. Keep descriptions factual and update them
 * if a project changes.
 */
export const projects: Project[] = [
  {
    slug: "bazar-dor",
    name: "Bazar Dor",
    tagline: "Everyday market prices, gathered in one place.",
    summary:
      "A Bengali-first market price explorer with category browsing, price sorting, product details, and optional accounts.",
    category: "Market price explorer",
    projectType: "Individual learning project",
    role: "Design and development",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "daisyUI",
      "Better Auth",
      "MongoDB",
      "REST API",
    ],
    image: "/images/projects/bazar-dor.png",
    imageAlt:
      "Screenshot of the Bazar Dor homepage showing market product prices in Bengali",
    liveUrl: "https://bazar-dor-sigma-six.vercel.app/",
    githubUrl: "https://github.com/Rezanur2/Bazar-Dor",
    overview: [
      "Bazar Dor is a Next.js application that presents daily market prices for common products in Bangladesh. Visitors can browse categories, see which items have moved up or down, sort the catalog by price, and open a product to compare prices across different markets.",
      "The project also includes an account system: email/password registration with email verification, Google and GitHub sign-in, and a profile page where a signed-in user can update their details.",
    ],
    problem:
      "Market prices for everyday goods are scattered across sources and can be difficult to compare. Bazar Dor brings that information into a single, browsable interface, with clear price movement indicators and product-level details.",
    features: [
      "Bengali-language homepage with rising and falling price sections",
      "Category routes for browsing products by type",
      "Price sorting through URL search parameters",
      "Product detail pages with minimum, maximum, and average market prices",
      "Bengali number and unit formatting helpers",
      "Email/password authentication with email verification",
      "Google and GitHub sign-in, plus profile editing",
      "Loading, empty, and product-not-found states",
    ],
    challenges: [
      {
        title: "Turning readable slugs into API lookups",
        description:
          "Product pages use readable slugs, while the external API looks products up by numeric ID. The page fetches the catalog first, resolves the matching product, then requests its details. It also handles a missing or unavailable product with a dedicated not-found view.",
      },
      {
        title: "Comparing prices across markets",
        description:
          "A single product can have prices from several markets. The detail page normalizes those values, calculates the minimum, maximum, and average, and falls back to today's price when market data is unavailable.",
      },
      {
        title: "Presenting prices in Bengali",
        description:
          "The interface converts numbers and units into Bengali-friendly labels so the price data feels natural to the intended audience.",
      },
      {
        title: "Wiring authentication and email delivery",
        description:
          "Better Auth is connected to MongoDB, with Resend handling verification emails and optional Google/GitHub providers configured through environment variables. Keeping those credentials out of source code was an important part of the setup.",
      },
    ],
    improvements: [
      "Add a search field for finding products directly by name.",
      "Add automated tests around price calculations and slug resolution.",
      "Add a clearer error state for temporary API failures.",
      "Consider replacing the third-party price API with a data source that can be maintained long term.",
    ],
    limitation:
      "The live application depends on an external market-price API and configured authentication credentials.",
  },
  {
    slug: "bangla-news-24",
    name: "Bangla News 24",
    tagline: "A calmer way to read the day's news in Bengali.",
    summary:
      "A responsive Bengali news experience with section-based curation, article pages, and optional account features.",
    category: "News application",
    projectType: "Individual learning project",
    role: "Design and development",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "daisyUI",
      "Better Auth",
      "MongoDB",
      "REST API",
    ],
    image: "/images/projects/bangla-news-24.png",
    imageAlt:
      "Screenshot of the Bangla News 24 homepage with a lead story and news sections",
    liveUrl: "https://bangla-news-24-dusky-eight.vercel.app/",
    githubUrl: "https://github.com/Rezanur2/bangla-news-24",
    overview: [
      "Bangla News 24 is a Next.js news site that organizes articles from a news API into a lead story, themed sections, and a most-read sidebar. Readers can move from the homepage into category pages and full article views.",
      "The project also includes optional accounts. Visitors can sign in with email/password or Google, and signed-in users can edit their profile information.",
    ],
    problem:
      "A news homepage can easily become a wall of links. This project groups stories into clear sections, gives the lead story room to breathe, and keeps a separate most-read list for quick scanning.",
    features: [
      "Lead story with a grid of additional top stories",
      "Multiple curated news sections on the homepage",
      "Most-read sidebar populated from the news API",
      "Category routes for politics, world, economy, sports, technology, and more",
      "Article pages with images, summaries, word count, and Bengali dates",
      "Email/password and Google sign-in",
      "Profile editing for signed-in users",
      "Responsive layouts and a custom 404 page",
    ],
    challenges: [
      {
        title: "Working with a deeply nested article shape",
        description:
          "Article descriptions arrive as nested content blocks rather than a single string. The detail page pulls the text from the first supported block so the summary can be displayed consistently.",
      },
      {
        title: "Formatting dates for Bengali readers",
        description:
          "Publication dates are formatted with the Bengali locale and a long date/time style, rather than leaving the raw API timestamp in the interface.",
      },
      {
        title: "Composing a multi-section homepage",
        description:
          "The homepage receives a list of sections and splits the first section into the lead area while mapping the rest into separate blocks. Each block keeps its own responsive article grid.",
      },
      {
        title: "Adding account features without distracting readers",
        description:
          "Authentication and profile editing live alongside the reading experience. Better Auth connects to MongoDB, with Google sign-in configured through environment variables.",
      },
    ],
    improvements: [
      "Add search and pagination for larger result sets.",
      "Add loading and error states around the news API.",
      "Use caching or revalidation to reduce repeated API requests.",
      "Add stronger shared types for the nested article response.",
    ],
    limitation:
      "News content is supplied by a third-party API, and account features depend on configured MongoDB and Google credentials.",
  },
  {
    slug: "fitlog",
    name: "FitLog",
    tagline: "Plan the session. Log the work. See the totals.",
    summary:
      "A workout library and daily planner built around a five-exercise limit, saved workouts, sorting, and session metrics.",
    category: "Fitness planner",
    projectType: "Individual learning project",
    role: "Design and development",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "daisyUI",
      "React Context",
      "react-icons",
      "react-toastify",
    ],
    image: "/images/projects/fitlog.png",
    imageAlt:
      "Screenshot of the FitLog fitness planner homepage with a dark workout library layout",
    liveUrl: "https://fit-log-gamma-two.vercel.app/",
    githubUrl: "https://github.com/Rezanur2/fit-log",
    overview: [
      "FitLog is a workout library and planning app. Visitors can browse exercises, open a detail page, and add workouts to a plan for the day. The plan has a five-exercise cap and prevents the same workout from being added twice.",
      "A separate saved list holds workouts for later. The plan page can sort exercises by duration, calories, or rating, and it shows totals for the current selection.",
    ],
    problem:
      "Choosing exercises and keeping track of a session can be messy. FitLog focuses on a small, clear workflow: find a workout, understand what it involves, add it to today's plan, and see the combined time and calorie estimates.",
    features: [
      "Workout library with difficulty, duration, calories, and rating",
      "Workout detail pages with instructions and muscle groups",
      "Today's plan with a maximum of five exercises",
      "Duplicate prevention when adding workouts",
      "Save-for-later list managed separately from today's plan",
      "Sorting by duration, calories, or rating",
      "Total exercise, duration, and calorie summaries",
      "Mark-as-done and remove actions with toast feedback",
      "Loading states and a custom 404 page",
    ],
    challenges: [
      {
        title: "Sharing a plan across routes",
        description:
          "The library, workout details, and plan page all need access to the same selections. A React Context provider holds the plan and saved lists so the pages can read and update one shared state.",
      },
      {
        title: "Enforcing the workout limit",
        description:
          "The add action checks both the five-exercise cap and whether the workout is already in the plan. Each case returns a clear toast message instead of silently ignoring the action.",
      },
      {
        title: "Sorting without changing the source list",
        description:
          "The plan page copies the selected workouts before sorting, which keeps the original state intact while presenting a different order.",
      },
      {
        title: "Deriving useful session totals",
        description:
          "Exercise count, total minutes, and total calories are calculated from the active list, so the summary updates whenever an item is added, completed, or removed.",
      },
    ],
    improvements: [
      "Persist today's plan and saved workouts across page refreshes.",
      "Add a workout history view for completed sessions.",
      "Add filtering by muscle group or equipment.",
      "Add tests for the five-item limit, duplicate prevention, and totals.",
    ],
    limitation:
      "The plan and saved workouts currently live in React state only, so they reset on a full page refresh.",
  },
  {
    slug: "devstack",
    name: "DevStack",
    tagline: "Explore technologies. Build your own stack.",
    summary:
      "A React single-page app for browsing a technology catalog and assembling a personal development stack.",
    category: "React single-page app",
    projectType: "Individual learning project",
    role: "Design and development",
    tech: [
      "React",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "daisyUI",
      "react-icons",
      "react-toastify",
    ],
    image: "/images/projects/devstack.png",
    imageAlt:
      "Screenshot of the DevStack homepage showing technology cards and a stack builder",
    liveUrl: "https://devstackrezanur.netlify.app/",
    githubUrl: "https://github.com/Rezanur2/DevStack",
    overview: [
      "DevStack is a React and Vite single-page application. It loads a local JSON catalog of technologies, displays each one as a card, and lets visitors add selections to a personal stack.",
      "Each card shows the technology's category, difficulty, and rating. The stack panel keeps a running count, prevents duplicates, and supports removing one item or clearing the whole selection.",
    ],
    problem:
      "Choosing a set of tools can be overwhelming when every option looks appealing. DevStack turns that decision into a small, visual exercise: browse the catalog, compare the details, and keep only the technologies that belong in your stack.",
    features: [
      "Technology catalog loaded from a local JSON file",
      "Cards showing category, difficulty, rating, and badge",
      "Add-to-stack action with duplicate prevention",
      "Remove individual technologies or clear the entire stack",
      "Selected count and empty-state messaging",
      "Toast feedback for stack changes",
      "Suspense loading fallback while data is prepared",
      "Responsive card grid and stack sidebar",
    ],
    challenges: [
      {
        title: "Using Suspense with a fetched promise",
        description:
          "The app starts loading the JSON data and passes the promise into a component that reads it with React's use API. A Suspense fallback covers the short loading period.",
      },
      {
        title: "Keeping two panels in sync",
        description:
          "The selected stack state lives in a parent component and is passed to both the technology cards and the stack sidebar, so adding or removing an item updates both views immediately.",
      },
      {
        title: "Preventing duplicate selections",
        description:
          "Each card checks whether its technology is already in the selected list before adding it. The add handler returns early when the item is present.",
      },
      {
        title: "Building a usable four-column layout",
        description:
          "The main layout combines a three-column card grid with a one-column stack panel on large screens, then stacks the panels on smaller screens.",
      },
    ],
    improvements: [
      "Persist the selected stack in localStorage or a shareable URL.",
      "Add search and filtering by category or difficulty.",
      "Add unit tests for duplicate prevention and stack removal.",
      "Review keyboard flow and focus states across the card actions.",
    ],
    limitation:
      "The selected stack is kept in memory only, so it resets on a full page refresh.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project {
  const currentIndex = projects.findIndex((project) => project.slug === slug);
  return projects[(currentIndex + 1) % projects.length];
}
