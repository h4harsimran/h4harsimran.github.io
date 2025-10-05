import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type {
  AnimationConfig,
  ScrollAnimationConfig,
} from '../types/animations';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Animation utility functions
export const createFadeInAnimation = (
  element: string | Element,
  config: AnimationConfig = {}
) => {
  const { duration = 0.6, delay = 0, ease = 'power2.out' } = config;

  return gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration, delay, ease }
  );
};

export const createSlideInAnimation = (
  element: string | Element,
  direction: 'left' | 'right' | 'up' | 'down' = 'up',
  config: AnimationConfig = {}
) => {
  const { duration = 0.6, delay = 0, ease = 'power2.out' } = config;
  const distance = 50;

  const fromProps = { opacity: 0, x: 0, y: 0 };
  const toProps = { opacity: 1, x: 0, y: 0, duration, delay, ease };

  switch (direction) {
    case 'left':
      fromProps.x = -distance;
      break;
    case 'right':
      fromProps.x = distance;
      break;
    case 'up':
      fromProps.y = distance;
      break;
    case 'down':
      fromProps.y = -distance;
      break;
  }

  return gsap.fromTo(element, fromProps, toProps);
};

export const createScrollAnimation = (
  element: string | Element,
  config: ScrollAnimationConfig = {}
) => {
  const {
    duration = 0.6,
    delay = 0,
    ease = 'power2.out',
    trigger,
    start = 'top 80%',
    end = 'bottom 20%',
  } = config;

  return gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: trigger || element,
        start,
        end,
        toggleActions: 'play none none reverse',
      },
    }
  );
};

export const createStaggerAnimation = (
  elements: string | Element[],
  config: AnimationConfig = {}
) => {
  const {
    duration = 0.6,
    delay = 0,
    ease = 'power2.out',
    stagger = 0.1,
  } = config;

  return gsap.fromTo(
    elements,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration, delay, ease, stagger }
  );
};

// Utility to respect reduced motion preferences
export const shouldReduceMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Create animation with reduced motion support
export const createAccessibleAnimation = (
  animationFn: () => gsap.core.Timeline | gsap.core.Tween,
  fallbackFn?: () => void
) => {
  if (shouldReduceMotion()) {
    if (fallbackFn) {
      fallbackFn();
    }
    return null;
  }
  return animationFn();
};
