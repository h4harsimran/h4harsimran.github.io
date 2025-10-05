import { useState, useEffect } from 'react';

/**
 * Hook to detect user's reduced motion preference
 * Returns true if user prefers reduced motion
 */
export const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if window is available (SSR safety)
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Set initial value
    setPrefersReducedMotion(mediaQuery?.matches || false);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
};

/**
 * Hook to get animation configuration based on reduced motion preference
 */
export const useAnimationConfig = () => {
  const prefersReducedMotion = useReducedMotion();

  return {
    prefersReducedMotion,
    // Reduced animation durations for accessibility
    duration: prefersReducedMotion ? 0.1 : 0.6,
    // Simplified easing for reduced motion
    ease: prefersReducedMotion ? 'linear' : 'power2.out',
    // Disable complex animations
    enableComplexAnimations: !prefersReducedMotion,
    // Reduce stagger delays
    stagger: prefersReducedMotion ? 0.05 : 0.1,
  };
};
