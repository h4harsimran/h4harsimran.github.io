import { useEffect, useRef, useCallback } from 'react';
import { cleanupGSAPAnimations } from '../utils/animationHelpers';

/**
 * Hook for managing GSAP animation cleanup
 * Automatically cleans up animations on component unmount
 */
export const useGSAPCleanup = (selector?: string) => {
  const animationsRef = useRef<any[]>([]);
  const timelineRef = useRef<any | null>(null);

  // Register animation for cleanup
  const registerAnimation = (animation: any) => {
    animationsRef.current.push(animation);
    return animation;
  };

  // Register timeline for cleanup
  const registerTimeline = (timeline: any) => {
    timelineRef.current = timeline;
    return timeline;
  };

  // Manual cleanup function
  const cleanup = useCallback(() => {
    try {
      // Kill individual animations
      animationsRef.current.forEach(animation => {
        if (animation && animation.kill) {
          animation.kill();
        }
      });

      // Kill timeline
      if (timelineRef.current && timelineRef.current.kill) {
        timelineRef.current.kill();
      }

      // Clear references
      animationsRef.current = [];
      timelineRef.current = null;

      // Clean up by selector if provided
      if (selector) {
        cleanupGSAPAnimations(selector);
      }
    } catch (error) {
      console.warn('Error during GSAP cleanup:', error);
    }
  }, [selector]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    registerAnimation,
    registerTimeline,
    cleanup,
  };
};

/**
 * Hook for performance monitoring of animations
 */
export const useAnimationPerformance = () => {
  const performanceRef = useRef({
    startTime: 0,
    frameCount: 0,
    lastFrameTime: 0,
  });

  const startMonitoring = () => {
    performanceRef.current.startTime = performance.now();
    performanceRef.current.frameCount = 0;
  };

  const recordFrame = () => {
    const now = performance.now();
    performanceRef.current.frameCount++;
    performanceRef.current.lastFrameTime = now;
  };

  const getMetrics = () => {
    const { startTime, frameCount, lastFrameTime } = performanceRef.current;
    const duration = lastFrameTime - startTime;
    const fps = frameCount / (duration / 1000);

    return {
      duration,
      frameCount,
      averageFPS: fps,
      isPerformant: fps > 30, // Consider 30+ FPS as performant
    };
  };

  return {
    startMonitoring,
    recordFrame,
    getMetrics,
  };
};
