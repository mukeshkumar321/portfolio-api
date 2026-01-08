// Service Types
export interface IService {
  title: string;
  description: string;
  icon?: string;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Certification Types
export interface ICertification {
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Experience Types
export interface IExperience {
  company: string;
  position: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  isCurrent?: boolean;
  description: string;
  responsibilities?: string[];
  technologies?: string[];
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Education Types
export interface IEducation {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  isCurrent?: boolean;
  grade?: string;
  description?: string;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Skill Types
export interface ISkill {
  name: string;
  category: string;
  proficiency?: number;
  icon?: string;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Profile Types
export interface IProfile {
  name: string;
  title: string;
  email: string;
  phone: string;
  bio: string;
  profileImage?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
    portfolio?: string;
  };
  resume?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Project Types
export interface IProject {
  title: string;
  shortDescription: string;
  longDescription?: string;
  techStack: string[];
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  isFeatured?: boolean;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Contact Types
export interface IContact {
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}
