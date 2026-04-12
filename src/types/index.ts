export interface SiteConfig {
  name: string;
  title: string;
  tagline: string;
  description: string;
  email: string;
  linkedIn: string;
  github: string;
  twitter?: string;
  calendly?: string;
  resumeUrl: string;
  openToWork: boolean;
  workAuthorization?: string;
  currentlyLearning: string;
  lastUpdated: string;
}

export interface Skill {
  name: string;
  proficiency: number; // 0-100
}

export interface SkillCategory {
  title: string;
  icon: string; // Lucide icon name
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  metrics?: string;
  category: 'llm' | 'rag' | 'ner' | 'sentiment' | 'transformer' | 'mlops';
}

export interface ExperienceEntry {
  id: string;
  dateRange: string;
  role: string;
  organization: string;
  description: string;
  type: 'work' | 'research' | 'opensource' | 'competition';
}

export interface Publication {
  id: string;
  title: string;
  date: string;
  source: string;
  url: string;
  type: 'article' | 'paper' | 'talk';
}

export interface GitHubStats {
  totalStars: number;
  totalForks: number;
  topLanguages: { name: string; percentage: number }[];
  contributionGraphUrl?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerLogo: 'google' | 'nvidia' | 'coursera' | 'udemy' | 'meta' | 'aws' | 'other';
  date?: string;
  credentialUrl?: string;
}
