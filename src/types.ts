export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  duration?: string;
  location?: string;
  type?: 'Current' | 'Past';
  category: 'Accounting' | 'Financial Systems' | 'Education & Management' | 'Operations';
  highlights: string[];
  skillsUsed: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  qualification: string;
  period: string;
  grade?: string;
  status?: string;
  details?: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year?: string;
  badgeCode?: string;
  verified?: boolean;
  category: 'Accounting Software' | 'Enterprise ERP' | 'Finance & Payroll' | 'General';
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  period: string;
  status: string;
  category: 'Finance Platform' | 'Personal Finance' | 'Consultancy' | 'Automation / EdTech';
  url?: string;
  githubUrl?: string;
  skills: string[];
  mediaTabs: {
    label: string;
    description: string;
    details: string[];
    metrics?: { label: string; value: string }[];
  }[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: 'Expert' | 'Advanced' | 'Proficient';
    description: string;
    tags?: string[];
  }[];
}

export interface LanguageItem {
  language: string;
  proficiency: string;
  fluencyScore: number; // 0-100
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
}

export interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: {
    name: string;
    url: string;
  };
}

export interface HeatmapDay {
  date: Date;
  key: string;
  count: number;
  level: number;
  dayOfWeek: number;
  formattedDate: string;
}
