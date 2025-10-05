import { useEffect, useRef, type MutableRefObject } from 'react';
import { gsap } from 'gsap';

interface AnimationConfig {
  delay?: number;
  duration?: number;
  ease?: string;
  stagger?: number;
}

interface TextRevealConfig extends AnimationConfig {
  splitType?: 'chars' | 'words' | 'lines';
}

export const useGSAPAnimation = () => {
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const contextRefCurrent = contextRef.current;
    return () => {
      if (contextRefCurrent) {
        contextRefCurrent.revert();
      }
    };
  }, []);

  const createTimeline = (config?: AnimationConfig) => {
    const tl = gsap.timeline({
      delay: config?.delay || 0,
      ease: config?.ease || 'power2.out',
    });
    return tl;
  };

  const animateTextReveal = (
    element: MutableRefObject<HTMLElement | null>,
    config?: TextRevealConfig
  ) => {
    if (!element.current) return;

    gsap.set(element.current, { opacity: 0 });
    gsap.to(element.current, {
      opacity: 1,
      duration: config?.duration || 0.8,
      ease: config?.ease || 'power2.out',
      delay: config?.delay || 0,
    });
  };

  const animateSlideUp = (
    elements:
      | MutableRefObject<HTMLElement | null>[]
      | MutableRefObject<HTMLElement | null>,
    config?: AnimationConfig
  ) => {
    const elementsArray = Array.isArray(elements) ? elements : [elements];

    elementsArray.forEach((element, index) => {
      if (!element.current) return;

      gsap.set(element.current, { opacity: 0, y: 30 });
      gsap.to(element.current, {
        opacity: 1,
        y: 0,
        duration: config?.duration || 0.8,
        ease: config?.ease || 'power2.out',
        delay: (config?.delay || 0) + (config?.stagger || 0) * index,
      });
    });
  };

  const animateChildren = (
    parentElement: MutableRefObject<HTMLElement | null>,
    config?: AnimationConfig
  ) => {
    if (!parentElement.current) return;

    gsap.set(parentElement.current.children, { opacity: 0, y: 30 });
    gsap.to(parentElement.current.children, {
      opacity: 1,
      y: 0,
      duration: config?.duration || 0.6,
      stagger: config?.stagger || 0.2,
      ease: config?.ease || 'power2.out',
      delay: config?.delay || 0,
    });
  };

  const animateBounce = (
    element: MutableRefObject<HTMLElement | null>,
    config?: AnimationConfig
  ) => {
    if (!element.current) return;

    gsap.to(element.current, {
      y: 10,
      duration: config?.duration || 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      delay: config?.delay || 0,
    });
  };

  return {
    createTimeline,
    animateTextReveal,
    animateSlideUp,
    animateChildren,
    animateBounce,
    contextRef,
  };
};

export default useGSAPAnimation;
