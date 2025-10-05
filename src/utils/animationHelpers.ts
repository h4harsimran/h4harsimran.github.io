import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Animation configuration based on reduced motion preferences
 */
export interface AnimationConfig {
  duration: number;
  ease: string;
  enableComplexAnimations: boolean;
  stagger: number;
}

/**
 * Safe animation wrapper that respects reduced motion preferences
 */
export const createSafeAnimation = (
  target: gsap.TweenTarget,
  vars: gsap.TweenVars,
  config: AnimationConfig
): gsap.core.Tween => {
  // If reduced motion is preferred, create minimal animation
  if (!config.enableComplexAnimations) {
    return gsap.set(target, {
      ...vars,
      duration: 0,
      ease: 'none',
    });
  }

  // Apply configuration to animation variables
  const safeVars = {
    ...vars,
    duration: vars.duration || config.duration,
    ease: vars.ease || config.ease,
  };

  return gsap.to(target, safeVars);
};

/**
 * Safe timeline creation with reduced motion support
 */
export const createSafeTimeline = (
  config: AnimationConfig,
  vars?: gsap.TimelineVars
): gsap.core.Timeline => {
  const timeline = gsap.timeline(vars);

  // If reduced motion is preferred, set timeScale to complete instantly
  if (!config.enableComplexAnimations) {
    timeline.timeScale(100); // Complete animations very quickly
  }

  return timeline;
};

/**
 * Cleanup function for GSAP animations
 */
export const cleanupGSAPAnimations = (selector?: string) => {
  try {
    if (selector) {
      gsap.killTweensOf(selector);
    } else {
      gsap.killTweensOf('*');
    }
  } catch (error) {
    console.warn('Error cleaning up GSAP animations:', error);
  }
};

/**
 * Safe scroll trigger creation with error handling
 */
export const createSafeScrollTrigger = (
  config: AnimationConfig,
  scrollTriggerConfig: ScrollTrigger.StaticVars
) => {
  try {
    // If reduced motion is preferred, disable scroll triggers
    if (!config.enableComplexAnimations) {
      return null;
    }

    return ScrollTrigger.create(scrollTriggerConfig);
  } catch (error) {
    console.warn('Error creating ScrollTrigger:', error);
    return null;
  }
};

/**
 * Performance optimized animation settings
 */
export const getOptimizedAnimationSettings = (config: AnimationConfig) => ({
  // Force hardware acceleration
  force3D: true,
  // Optimize for performance
  transformOrigin: 'center center',
  // Use will-change for better performance
  willChange: config.enableComplexAnimations ? 'transform, opacity' : 'auto',
  // Reduce motion blur
  motionBlur: config.enableComplexAnimations,
});
