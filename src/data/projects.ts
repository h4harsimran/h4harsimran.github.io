import type { Project } from '../types/portfolio';

// Current Focus Projects - CAR-T Manufacturing and Technology Transfer
export const currentFocusProjects: Project[] = [
  {
    id: 'project-1',
    title: 'CAR-T Tech Transfer',
    description:
      'Leading new manufacturing process implementation at OmniaBio for CAR-T cell therapy production. Overseeing technology transfer from development to commercial manufacturing scale.',
    technologies: [
      'CAR-T Manufacturing',
      'Technology Transfer',
      'Process Scale-up',
      'Cell Culture',
      'Aseptic Processing',
      'Quality Systems',
    ],
    category: 'CAR-T Manufacturing',
    images: [],
    featured: true,
  },
  {
    id: 'project-2',
    title: 'Chain of Identity',
    description:
      'Developed comprehensive Chain of Identity & Chain of Custody procedures for autologous therapies, ensuring patient safety and regulatory compliance throughout the manufacturing process.',
    technologies: [
      'Chain of Identity',
      'Chain of Custody',
      'Autologous Therapies',
      'Patient Safety',
      'Regulatory Compliance',
      'Process Documentation',
    ],
    category: 'Quality Systems',
    images: [],
    featured: true,
  },
  {
    id: 'project-3',
    title: 'Risk Assessment',
    description:
      'Implementing comprehensive process & aseptic risk assessment using FMEA (Failure Mode and Effects Analysis) methodology to identify and mitigate manufacturing risks.',
    technologies: [
      'FMEA',
      'Risk Assessment',
      'Process Risk Analysis',
      'Aseptic Risk Assessment',
      'Quality Risk Management',
      'Mitigation Strategies',
    ],
    category: 'Risk Management',
    images: [],
    featured: true,
  },
];

// Historical Projects Portfolio
export const portfolioProjects: Project[] = [
  {
    id: 'project-4',
    title: 'Biopharmaceutical Scale-up',
    description:
      'Successfully executed scale-up activities for 3 biopharmaceutical products at Resilience Biotechnologies, optimizing downstream purification processes.',
    technologies: [
      'Scale-up Operations',
      'Downstream Processing',
      'Purification Optimization',
      'Technology Transfer',
      'Process Development',
    ],
    category: 'Process Development',
    images: [],
    featured: false,
  },
  {
    id: 'project-5',
    title: 'Equipment Qualification Program',
    description:
      'Led comprehensive equipment qualification program validating 300+ pieces of manufacturing equipment across multiple facilities.',
    technologies: [
      'Equipment Qualification',
      'Validation Protocols',
      'Commissioning',
      'IQ/OQ/PQ',
      'Regulatory Compliance',
    ],
    category: 'Validation',
    images: [],
    featured: false,
  },
  {
    id: 'project-6',
    title: 'Pharmaceutical Facility Startup',
    description:
      'Commissioned new pharmaceutical manufacturing facility at Sanofi, ensuring regulatory compliance and operational readiness.',
    technologies: [
      'Facility Commissioning',
      'Startup Operations',
      'Regulatory Compliance',
      'GMP Implementation',
      'Quality Systems',
    ],
    category: 'Facility Management',
    images: [],
    featured: false,
  },
];

// All projects combined
export const allProjects: Project[] = [
  ...currentFocusProjects,
  ...portfolioProjects,
];

// Utility functions
export const getProjectById = (id: string): Project | undefined => {
  return allProjects.find(project => project.id === id);
};

export const getProjectsByCategory = (category: string): Project[] => {
  return allProjects.filter(project =>
    project.category.toLowerCase().includes(category.toLowerCase())
  );
};

export const getFeaturedProjects = (): Project[] => {
  return allProjects.filter(project => project.featured);
};

export const getCurrentFocusProjects = (): Project[] => {
  return currentFocusProjects;
};
