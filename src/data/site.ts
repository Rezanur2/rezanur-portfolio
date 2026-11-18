import type { SocialLink } from "@/types/portfolio";

export const siteConfig = {
  name: "Md. Rezanur Rahman",
  shortName: "Rezanur",
  initials: "MR",
  designation: "Junior Full-Stack Web Developer",
  specialty: "Full-Stack Web Development",
  email: "mdrezanurrahman2@gmail.com",
  phone: "+8801551986848",
  phoneDisplay: "+880 1551-986848",
  whatsappUrl: "https://wa.me/8801551986848",
  githubUrl: "https://github.com/Rezanur2",
  linkedinUrl: "https://www.linkedin.com/in/md-rezanur-rahman/",
  availability: "Available for Junior Full-Stack & Frontend Roles",
  description:
    "Portfolio of Md. Rezanur Rahman, Junior Full-Stack Web Developer. Building responsive, accessible web applications with React, Next.js, TypeScript, Node.js, and MongoDB.",
  intro:
    "I am a junior full-stack web developer. I enjoy building responsive interfaces with React, Next.js, and TypeScript, and developing reliable backend services with Node.js, Express, and MongoDB. I focus on writing clean, maintainable code and solving real application problems.",
  currentlyLearning: ["Backend Architecture", "System Design"],
  coreFocus: ["React", "Next.js", "Node.js", "TypeScript"],
} as const;

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: siteConfig.githubUrl,
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedinUrl,
    icon: "linkedin",
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    icon: "mail",
  },
];
