import type { ComponentType } from "react";

// Project types
export interface Project {
  id: number;
  title: string;
  url: string;
  image: string;
  description: string;
  tags: string[];
}

// Skills types
export interface Skill {
  icon: ComponentType<{ className?: string }>;
  name: string;
  url: string;
  color: string;
}

export interface SkillsData {
  development: Skill[];
  frontend: Skill[];
  backend: Skill[];
  tools: Skill[];
}

// Form types
export interface FormState {
  success: boolean;
  error?: Record<string, { errors: string[] }>;
  data?: {
    name?: string;
    email?: string;
    message?: string;
  };
}

export interface FormActionState {
  success: boolean;
  error?: Record<string, { errors: string[] }>;
  data?: {
    name?: string;
    email?: string;
    message?: string;
  };
}

// Component prop types
export interface ProjectCardProps {
  title: string;
  url: string;
  image: string;
  description: string;
  tags: string[];
}

export interface SkillLinkProps {
  icon: ComponentType<{ className?: string }>;
  name: string;
  url: string;
  color: string;
}

export interface SkillColumnProps {
  title: string;
  skills: Skill[];
}
