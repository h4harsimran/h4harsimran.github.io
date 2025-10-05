import type { Experience } from '../types/portfolio';

export const mockExperience: Experience[] = [
  {
    id: 'exp-1',
    position: 'Scientific Lead',
    company: 'OmniaBio Inc',
    location: 'Hamilton, ON',
    startDate: '2025-01',
    endDate: null,
    description:
      'Leading CAR-T manufacturing technology transfer and process optimization initiatives. Spearheading chain of identity development and risk assessment using FMEA methodology.',
    achievements: [
      'Leading CAR-T tech transfer for new manufacturing processes',
      'Developed Chain of Identity & Chain of Custody procedures for autologous therapies',
      'Implemented process & aseptic risk assessment using FMEA methodology',
      'Managing cross-functional teams for technology transfer projects',
    ],
    technologies: [
      'CAR-T Manufacturing',
      'Technology Transfer',
      'Chain of Identity',
      'FMEA Risk Assessment',
      'Process Optimization',
      'Aseptic Processing',
    ],
    metrics: [
      {
        label: 'Tech Transfer Projects',
        value: 3,
        unit: 'active',
      },
      {
        label: 'Risk Assessments',
        value: 5,
        unit: 'completed',
      },
    ],
  },
  {
    id: 'exp-2',
    position: 'Associate Scientist II',
    company: 'OmniaBio Inc',
    location: 'Hamilton, ON',
    startDate: '2023-01',
    endDate: '2024-12',
    description:
      'Advanced manufacturing sciences role focusing on process development, equipment qualification, and regulatory compliance for biotech manufacturing.',
    achievements: [
      'Validated 150+ pieces of manufacturing equipment',
      'Led 5+ process development projects',
      'Achieved 99.9% compliance rate in regulatory audits',
      'Mentored junior scientists and technicians',
    ],
    technologies: [
      'Equipment Qualification',
      'Process Development',
      'Regulatory Compliance',
      'Statistical Process Control',
      'GMP Manufacturing',
    ],
    metrics: [
      {
        label: 'Equipment Validated',
        value: 150,
        unit: 'pieces',
      },
      {
        label: 'Projects Led',
        value: 5,
        unit: 'projects',
      },
      {
        label: 'Compliance Rate',
        value: 99.9,
        unit: '%',
      },
    ],
  },
  {
    id: 'exp-3',
    position: 'Specialist',
    company: 'Resilience Biotechnologies',
    location: 'Mississauga, ON',
    startDate: '2021-06',
    endDate: '2022-12',
    description:
      'Manufacturing specialist role focusing on biotech process optimization, scale-up activities, and technology transfer for biopharmaceutical production.',
    achievements: [
      'Executed scale-up activities for 3 biopharmaceutical products',
      'Optimized downstream purification processes',
      'Supported technology transfer from development to manufacturing',
      'Validated 100+ pieces of process equipment',
    ],
    technologies: [
      'Scale-up Operations',
      'Downstream Processing',
      'Technology Transfer',
      'Process Optimization',
      'Biopharmaceutical Manufacturing',
    ],
    metrics: [
      {
        label: 'Scale-up Projects',
        value: 3,
        unit: 'products',
      },
      {
        label: 'Equipment Validated',
        value: 100,
        unit: 'pieces',
      },
    ],
  },
  {
    id: 'exp-4',
    position: 'CQV Specialist',
    company: 'Sanofi',
    location: 'Toronto, ON',
    startDate: '2021-01',
    endDate: '2021-05',
    description:
      'Commissioning, Qualification, and Validation specialist supporting pharmaceutical manufacturing facility startup and equipment qualification.',
    achievements: [
      'Commissioned new pharmaceutical manufacturing facility',
      'Qualified 50+ pieces of critical manufacturing equipment',
      'Developed and executed validation protocols',
      'Ensured regulatory compliance for facility startup',
    ],
    technologies: [
      'Commissioning',
      'Qualification',
      'Validation',
      'Pharmaceutical Manufacturing',
      'Regulatory Compliance',
    ],
    metrics: [
      {
        label: 'Equipment Qualified',
        value: 50,
        unit: 'pieces',
      },
      {
        label: 'Validation Protocols',
        value: 25,
        unit: 'protocols',
      },
    ],
  },
  {
    id: 'exp-5',
    position: 'MEng Chemical Engineering (Process Control)',
    company: 'University of Alberta',
    location: 'Edmonton, AB',
    startDate: '2019-09',
    endDate: '2021-04',
    description:
      'Master of Engineering in Chemical Engineering with specialization in Process Control. Achieved 3.94 GPA while conducting research in advanced process control systems.',
    achievements: [
      'Achieved 3.94 GPA in Master of Engineering program',
      'Specialized in Process Control systems and optimization',
      'Conducted research in advanced manufacturing control systems',
      'Completed thesis on bioprocess optimization',
    ],
    technologies: [
      'Process Control',
      'Advanced Manufacturing',
      'Bioprocess Optimization',
      'Statistical Analysis',
      'Research Methodology',
    ],
    metrics: [
      {
        label: 'GPA',
        value: 3.94,
        unit: '/4.0',
      },
      {
        label: 'Research Projects',
        value: 2,
        unit: 'projects',
      },
    ],
  },
  {
    id: 'exp-6',
    position: 'Process Engineer',
    company: 'Ind-Swift Laboratories',
    location: 'Chandigarh, India',
    startDate: '2017-01',
    endDate: '2019-08',
    description:
      'Entry-level process engineer role in pharmaceutical manufacturing, focusing on process optimization, equipment maintenance, and quality assurance.',
    achievements: [
      'Optimized manufacturing processes for pharmaceutical products',
      'Maintained and troubleshot production equipment',
      'Supported quality assurance and regulatory compliance',
      'Gained foundational experience in pharmaceutical manufacturing',
    ],
    technologies: [
      'Pharmaceutical Manufacturing',
      'Process Optimization',
      'Equipment Maintenance',
      'Quality Assurance',
      'Regulatory Compliance',
    ],
    metrics: [
      {
        label: 'Process Improvements',
        value: 8,
        unit: 'initiatives',
      },
      {
        label: 'Equipment Maintained',
        value: 30,
        unit: 'pieces',
      },
    ],
  },
];

export const getExperienceById = (id: string): Experience | undefined => {
  return mockExperience.find(exp => exp.id === id);
};

export const getExperienceByCompany = (company: string): Experience[] => {
  return mockExperience.filter(exp =>
    exp.company.toLowerCase().includes(company.toLowerCase())
  );
};

export const getCurrentExperience = (): Experience | undefined => {
  return mockExperience.find(exp => exp.endDate === null);
};

export const getTotalExperienceYears = (): number => {
  const startYear = 2018; // First job start year
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
};
