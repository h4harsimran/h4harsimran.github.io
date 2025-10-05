import type { Skill, SkillCategory } from '../types/portfolio';

export const mockSkills: Skill[] = [
  // Technical Skills
  {
    id: 'skill-1',
    name: 'TFF (Tangential Flow Filtration)',
    category: 'technical',
    level: 95,
    icon: 'FaFilter',
    description:
      'Expert in tangential flow filtration systems for biotech manufacturing',
  },
  {
    id: 'skill-2',
    name: 'Chromatography',
    category: 'technical',
    level: 90,
    icon: 'FaFlask',
    description: 'Advanced expertise in chromatographic purification processes',
  },
  {
    id: 'skill-3',
    name: 'Sterile Filtration',
    category: 'technical',
    level: 92,
    icon: 'FaShieldAlt',
    description:
      'Specialized in sterile filtration systems and aseptic processing',
  },
  {
    id: 'skill-4',
    name: 'Viral Filtration',
    category: 'technical',
    level: 88,
    icon: 'FaVirus',
    description: 'Proficient in viral clearance and filtration technologies',
  },
  {
    id: 'skill-5',
    name: 'Formulation',
    category: 'technical',
    level: 85,
    icon: 'FaVial',
    description: 'Experience in drug product formulation and stability',
  },
  {
    id: 'skill-6',
    name: 'Reactors',
    category: 'technical',
    level: 87,
    icon: 'FaCogs',
    description: 'Skilled in bioreactor operations and cell culture processes',
  },
  // Regulatory Skills
  {
    id: 'skill-7',
    name: 'US FDA',
    category: 'regulatory',
    level: 90,
    icon: 'FaGavel',
    description: 'Deep understanding of US FDA regulations and compliance',
  },
  {
    id: 'skill-8',
    name: 'EU GMP',
    category: 'regulatory',
    level: 88,
    icon: 'FaEuroSign',
    description: 'Proficient in European Good Manufacturing Practices',
  },
  {
    id: 'skill-9',
    name: 'Health Canada',
    category: 'regulatory',
    level: 92,
    icon: 'FaMapleLeaf',
    description: 'Expert knowledge of Health Canada regulatory requirements',
  },
  {
    id: 'skill-10',
    name: 'ASME',
    category: 'regulatory',
    level: 85,
    icon: 'FaCertificate',
    description:
      'Familiar with ASME standards for pressure vessels and equipment',
  },
  {
    id: 'skill-11',
    name: 'ICH',
    category: 'regulatory',
    level: 87,
    icon: 'FaGlobe',
    description:
      'Knowledge of International Council for Harmonisation guidelines',
  },
  {
    id: 'skill-12',
    name: 'ASTM',
    category: 'regulatory',
    level: 83,
    icon: 'FaClipboardCheck',
    description: 'Understanding of ASTM standards for materials and testing',
  },
  // Leadership Skills
  {
    id: 'skill-13',
    name: 'Team Lead 300+ Equipment',
    category: 'leadership',
    level: 95,
    icon: 'FaUsers',
    description: 'Led validation and commissioning of 300+ pieces of equipment',
  },
  {
    id: 'skill-14',
    name: '10+ Direct Reports',
    category: 'leadership',
    level: 88,
    icon: 'FaUserTie',
    description: 'Experience managing teams of 10+ direct reports',
  },
  {
    id: 'skill-15',
    name: 'Cross-functional Coordination',
    category: 'leadership',
    level: 92,
    icon: 'FaProjectDiagram',
    description: 'Expert in coordinating across multiple functional areas',
  },
  // Software Skills
  {
    id: 'skill-16',
    name: 'Excel',
    category: 'software',
    level: 95,
    icon: 'FaFileExcel',
    description: 'Advanced Excel skills for data analysis and process modeling',
  },
  {
    id: 'skill-17',
    name: 'Visio',
    category: 'software',
    level: 88,
    icon: 'FaSitemap',
    description: 'Proficient in creating process flow diagrams and P&IDs',
  },
  {
    id: 'skill-18',
    name: 'Veeva',
    category: 'software',
    level: 85,
    icon: 'FaDatabase',
    description: 'Experience with Veeva Vault for document management',
  },
  {
    id: 'skill-19',
    name: 'Lucidchart',
    category: 'software',
    level: 82,
    icon: 'FaChartLine',
    description: 'Skilled in creating technical diagrams and flowcharts',
  },
  {
    id: 'skill-20',
    name: 'Fieldwire',
    category: 'software',
    level: 80,
    icon: 'FaTools',
    description: 'Project management and field coordination using Fieldwire',
  },
  {
    id: 'skill-21',
    name: 'Trackwise',
    category: 'software',
    level: 87,
    icon: 'FaClipboardList',
    description: 'Quality management system and deviation tracking',
  },
  {
    id: 'skill-22',
    name: 'Statistical Tools',
    category: 'software',
    level: 85,
    icon: 'FaChartBar',
    description: 'Statistical analysis tools for process optimization',
  },
  {
    id: 'skill-23',
    name: 'Laboratory Equipment',
    category: 'software',
    level: 90,
    icon: 'FaMicroscope',
    description: 'Operation and maintenance of various laboratory instruments',
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: 'Technical',
    skills: mockSkills.filter(skill => skill.category === 'technical'),
    color: '#1E3A8A', // Deep blue
  },
  {
    name: 'Regulatory',
    skills: mockSkills.filter(skill => skill.category === 'regulatory'),
    color: '#06B6D4', // Cyan
  },
  {
    name: 'Leadership',
    skills: mockSkills.filter(skill => skill.category === 'leadership'),
    color: '#10B981', // Green
  },
  {
    name: 'Software',
    skills: mockSkills.filter(skill => skill.category === 'software'),
    color: '#F59E0B', // Amber
  },
];

export const getSkillsByCategory = (category: string): Skill[] => {
  return mockSkills.filter(skill => skill.category === category);
};

export const getTopSkills = (limit: number = 6): Skill[] => {
  return mockSkills.sort((a, b) => b.level - a.level).slice(0, limit);
};

export const getSkillById = (id: string): Skill | undefined => {
  return mockSkills.find(skill => skill.id === id);
};

export const getAverageSkillLevel = (category?: string): number => {
  const filteredSkills = category
    ? mockSkills.filter(skill => skill.category === category)
    : mockSkills;

  const total = filteredSkills.reduce((sum, skill) => sum + skill.level, 0);
  return Math.round(total / filteredSkills.length);
};
