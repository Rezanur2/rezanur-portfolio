import type { SocialLink } from "@/types/portfolio";

export const siteConfig = {
  name: "Md. Rezanur Rahman",
  shortName: "Rezanur",
  initials: "MR",
  designation: "Junior Web Developer / Frontend Developer",
  specialty: "Frontend Engineering",
  email: "mdrezanurrahman2@gmail.com",
  phone: "+8801551986848",
  phoneDisplay: "+880 1551-986848",
  whatsappUrl: "https://wa.me/8801551986848",
  githubUrl: "https://github.com/Rezanur2",
  linkedinUrl: "https://www.linkedin.com/in/md-rezanur-rahman/",
  availability: "Available for Junior Web & Frontend Roles",
  description:
    "Portfolio of Md. Rezanur Rahman, Junior Web Developer & Frontend Developer. Building responsive, accessible web applications with React, Next.js, and TypeScript.",
  intro:
    "I am a junior web developer and frontend developer. I enjoy learning new technologies, solving JavaScript problems, and building responsive, accessible interfaces with React, Next.js, and TypeScript. I am currently expanding my backend knowledge with Node.js and MongoDB.",
  currentlyLearning: ["Node.js", "MongoDB"],
  coreFocus: ["React", "Next.js", "TypeScript"],
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
