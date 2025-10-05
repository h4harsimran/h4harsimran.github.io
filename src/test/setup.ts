import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock GSAP
vi.mock('gsap', () => ({
  gsap: {
    context: vi.fn(fn => {
      fn();
      return { revert: vi.fn() };
    }),
    set: vi.fn(),
    to: vi.fn(),
    timeline: vi.fn(() => ({
      to: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      fromTo: vi.fn().mockReturnThis(),
      set: vi.fn().mockReturnThis(),
      add: vi.fn().mockReturnThis(),
      call: vi.fn().mockReturnThis(),
      delay: vi.fn().mockReturnThis(),
      duration: vi.fn().mockReturnThis(),
      ease: vi.fn().mockReturnThis(),
      repeat: vi.fn().mockReturnThis(),
      yoyo: vi.fn().mockReturnThis(),
      stagger: vi.fn().mockReturnThis(),
      kill: vi.fn(),
      progress: vi.fn(),
      totalProgress: vi.fn(),
      isActive: vi.fn(() => false),
      invalidate: vi.fn(),
      restart: vi.fn(),
      pause: vi.fn(),
      resume: vi.fn(),
      reverse: vi.fn(),
      seek: vi.fn(),
      time: vi.fn(),
      totalTime: vi.fn(),
    })),
    registerPlugin: vi.fn(),
    getProperty: vi.fn(),
    quickSetter: vi.fn(),
    utils: {
      toArray: vi.fn(target => (Array.isArray(target) ? target : [target])),
      selector: vi.fn(),
      random: vi.fn(() => Math.random()),
      snap: vi.fn(),
      normalize: vi.fn(),
      getUnit: vi.fn(),
      clamp: vi.fn(),
      splitColor: vi.fn(),
      interpolate: vi.fn(),
      mapRange: vi.fn(),
      pipe: vi.fn(),
      unitize: vi.fn(),
      wrap: vi.fn(),
      wrapYoyo: vi.fn(),
    },
  },
  ScrollTrigger: {
    create: vi.fn(),
    refresh: vi.fn(),
    update: vi.fn(),
    kill: vi.fn(),
    killAll: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    batch: vi.fn(),
    defaults: vi.fn(),
    disable: vi.fn(),
    enable: vi.fn(),
    getAll: vi.fn(() => []),
    getById: vi.fn(),
    isInViewport: vi.fn(() => true),
    matchMedia: vi.fn(),
    normalizeScroll: vi.fn(),
    observe: vi.fn(),
    positionInViewport: vi.fn(),
    saveStyles: vi.fn(),
    sort: vi.fn(),
    unobserve: vi.fn(),
  },
}));

// Mock CountUp.js
vi.mock('countup.js', () => ({
  CountUp: vi.fn().mockImplementation(() => ({
    start: vi.fn(),
    error: false,
  })),
}));

// Mock Intersection Observer
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock ResizeObserver
const mockResizeObserver = vi.fn();
mockResizeObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
window.ResizeObserver = mockResizeObserver;

// Mock matchMedia
const mockMatchMedia = vi.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(), // deprecated
  removeListener: vi.fn(), // deprecated
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
});

// Ensure matchMedia is available globally
global.matchMedia = mockMatchMedia;

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn(cb =>
  setTimeout(cb, 16)
) as unknown as typeof requestAnimationFrame;
global.cancelAnimationFrame = vi.fn();

// Suppress console warnings in tests
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('GSAP') ||
      args[0].includes('ScrollTrigger') ||
      args[0].includes('CountUp'))
  ) {
    return;
  }
  originalConsoleWarn(...args);
};
