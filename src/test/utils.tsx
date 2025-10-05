import { vi } from 'vitest';

// Mock data for tests
export const mockPersonalData = {
  name: 'Harsimranjeet Singh',
  title: 'Manufacturing Sciences & Technology Leader',
  location: 'Hamilton, ON',
  email: 'harsimranjeetsingh4@gmail.com',
  phone: '5879373631',
  linkedin: 'http://www.linkedin.com/in/hs10',
};

export const mockExperienceData = [
  {
    id: '1',
    position: 'Scientific Lead',
    company: 'OmniaBio Inc',
    location: 'Hamilton, ON',
    startDate: '2025-01',
    endDate: null,
    description: 'Leading CAR-T manufacturing processes',
    achievements: ['Led 10+ projects', 'Validated 300+ equipment'],
    technologies: ['TFF', 'Chromatography', 'Sterile Filtration'],
  },
];

export const mockSkillsData = [
  {
    id: '1',
    name: 'Scale-up & Tech Transfer',
    category: 'technical' as const,
    level: 95,
    icon: '⚗️',
    description: 'Process optimization and manufacturing scale-up',
  },
  {
    id: '2',
    name: 'Risk Assessment',
    category: 'technical' as const,
    level: 90,
    icon: '⚠️',
    description: 'FMEA and HAZOP studies',
  },
];

export const mockMetricsData = [
  {
    end: 300,
    label: 'Equipment Validated',
    suffix: '+',
    description: 'Pieces of equipment validated and commissioned',
  },
  {
    end: 10,
    label: 'Projects Led',
    suffix: '+',
    description: 'Successful project completions',
  },
  {
    end: 8,
    label: 'Years Experience',
    description: 'Years in biotech/pharma industry',
  },
  {
    end: 3.94,
    label: 'Masters GPA',
    decimals: 2,
    description: 'University of Alberta',
  },
];

// Helper function to wait for animations
export const waitForAnimation = (duration = 100) =>
  new Promise(resolve => setTimeout(resolve, duration));

// Helper to trigger intersection observer
export const mockIntersectionObserver = (isIntersecting = true) => {
  const mockObserver = {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  };

  // Mock the hook return value
  vi.doMock('react-intersection-observer', () => ({
    useInView: () => ({
      ref: vi.fn(),
      inView: isIntersecting,
      entry: { isIntersecting },
    }),
  }));

  return mockObserver;
};

export * from './testUtils';
export * from './renderUtils';
