import type { SkillCategory } from "@/types/portfolio";

/**
 * Only list tools that have been used in a project or are an active learning
 * focus. No proficiency scores or invented years of experience.
 */
export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    description:
      "The tools I use to build responsive layouts, interactive interfaces, and accessible web experiences.",
    status: "Working knowledge",
    icon: "code",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend & Database",
    description:
      "Server-side REST APIs, database queries, and business logic applied in full-stack projects.",
    status: "Project experience",
    icon: "database",
    items: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
  },
  {
    title: "Application patterns",
    description:
      "Architectural patterns applied across React, Next.js, and Express full-stack applications.",
    status: "Project experience",
    icon: "react",
    items: [
      "React Context API",
      "Dynamic routing",
      "REST API integration",
      "Component-based architecture",
    ],
  },
  {
    title: "Authentication & Security",
    description:
      "Secure authentication flows and token verification configured in deployed projects.",
    status: "Project experience",
    icon: "shield",
    items: [
      "Better Auth",
      "Email/password authentication",
      "Google OAuth",
      "JWT verification (JWKS)",
    ],
    note: "All authentication flows and token verification patterns listed above are implemented in Book Nook, Bazar Dor, and Bangla News 24.",
  },
  {
    title: "Tools & Deployment",
    description:
      "The everyday setup I use for writing code, version control, and deploying applications.",
    status: "Working knowledge",
    icon: "wrench",
    items: ["Git", "GitHub", "VS Code", "Vercel", "Netlify"],
  },
  {
    title: "Currently expanding",
    description:
      "Areas where I am actively continuing to grow and deepen my full-stack engineering skills.",
    status: "In progress",
    icon: "code",
    learning: true,
    items: ["Backend Architecture", "System Design"],
  },
];
