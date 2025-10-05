import { vi } from 'vitest';

// Mock data for tests
export const mockPersonalData = {
  name: 'Harsimranjeet Singh',
  title: 'Manufacturing Sciences & Technology Leader',
  email: 'harsimranjeetsingh4@gmail.com',
  phone: '5879373631',
  location: 'Hamilton, ON',
  linkedin: 'https://linkedin.com/in/hs10',
};

export const mockEducationData = [
  {
    id: 'edu-1',
    degree: 'MEng',
    field: 'Chemical Engineering (Process Control)',
    institution: 'University of Alberta',
    location: 'Edmonton, AB',
    country: 'Canada',
    startDate: '2019-09',
    endDate: '2021-04',
    gpa: 3.94,
    maxGpa: 4.0,
    achievements: [
      'Graduated with 3.94 GPA',
      'Specialized in Process Control systems',
    ],
  },
];

export const mockCareerData = [
  {
    id: 'career-1',
    title: 'Scientific Lead',
    company: 'OmniaBio Inc',
    location: 'Hamilton, ON',
    startDate: '2025-01',
    endDate: 'Present',
    description: 'Leading CAR-T manufacturing processes',
    achievements: ['Led 10+ projects', 'Validated 300+ equipment'],
  },
];

// Mock GSAP
export const mockGSAP = {
  timeline: vi.fn(() => ({
    fromTo: vi.fn().mockReturnThis(),
    to: vi.fn().mockReturnThis(),
    kill: vi.fn(),
  })),
  fromTo: vi.fn(),
  to: vi.fn(),
  killTweensOf: vi.fn(),
  registerPlugin: vi.fn(),
};

// Mock Intersection Observer
export const mockIntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
}));

// Mock ResizeObserver
export const mockResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock matchMedia
export const mockMatchMedia = vi.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// Setup global mocks
export const setupGlobalMocks = () => {
  global.IntersectionObserver = mockIntersectionObserver;
  global.ResizeObserver = mockResizeObserver;
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: mockMatchMedia,
  });
};
