import type { SkillCategory } from "@/types/portfolio";

/**
 * Only list tools that have been used in a project or are an active learning
 * focus. No proficiency scores or invented years of experience.
 */
export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    description:
      "The tools I use to build layouts, interfaces, and the interactive parts of a page.",
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
    title: "React and application development",
    description:
      "Patterns I apply in my React and Next.js projects.",
    status: "Project experience",
    icon: "react",
    items: [
      "React Context API",
      "Dynamic routing",
      "REST API integration",
      "Component-based development",
    ],
  },
  {
    title: "Authentication",
    description:
      "Account authentication flows configured with Better Auth in real projects.",
    status: "Project experience",
    icon: "shield",
    items: [
      "Better Auth",
      "Email/password authentication",
      "Google sign-in",
      "GitHub sign-in",
      "Password reset",
    ],
    note: "Password reset is not implemented in the current deployed builds. The other authentication flows above are implemented in Bazar Dor and Bangla News 24.",
  },
  {
    title: "Tools",
    description:
      "The everyday setup I use for writing code, version control, and publishing work.",
    status: "Working knowledge",
    icon: "wrench",
    items: ["Git", "GitHub", "VS Code"],
  },
  {
    title: "Currently learning",
    description:
      "Where I am putting my attention next so I can work beyond the browser.",
    status: "In progress",
    icon: "database",
    learning: true,
    items: ["Node.js", "MongoDB"],
  },
];
