export interface SkillCategory {
  title: string;
  description: string;
  status: string;
  learning?: boolean;
  icon: "code" | "react" | "shield" | "wrench" | "database";
  items: string[];
  note?: string;
}

export interface LanguageEntry {
  name: string;
  level: string;
}

export interface EducationEntry {
  degree: string;
  level: string;
  institution?: string;
  university?: string;
  period?: string;
  description: string;
}

export interface ProjectChallenge {
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  category: string;
  projectType: string;
  role: string;
  tech: string[];
  image: string;
  imageAlt: string;
  liveUrl: string;
  githubUrl: string;
  overview: string[];
  problem: string;
  features: string[];
  challenges: ProjectChallenge[];
  improvements: string[];
  limitation?: string;
}

export interface NavItem {
  label: string;
  id: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail";
}
