// Core portfolio data types
export interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  achievements: string[];
  technologies: string[];
  metrics?: {
    label: string;
    value: number;
    unit: string;
  }[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'regulatory' | 'leadership' | 'software';
  level: number; // 1-100
  icon: string;
  description?: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
  color: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  images: string[];
  liveUrl?: string;
  repositoryUrl?: string;
  featured: boolean;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  linkedin: string;
  github?: string;
  website?: string;
}

// Personal information interface
export interface PersonalInfo {
  name: string;
  title: string;
  summary: string;
  headshot?: string;
  resume?: string;
  availability: string;
}

// Form data interfaces
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Navigation and UI interfaces
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  order: number;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

// SEO and meta data interface
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

// Component props interfaces
export interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  startOnView?: boolean;
}

export interface SkillChartProps {
  skills: Skill[];
  category: string;
  animationDelay?: number;
}

export interface TimelineItemProps {
  experience: Experience;
  index: number;
  isVisible?: boolean;
}
