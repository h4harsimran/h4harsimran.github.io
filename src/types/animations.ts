// Animation-related type definitions
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
}

export interface ScrollAnimationConfig extends AnimationConfig {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean;
  pin?: boolean;
}

export interface CountUpConfig {
  start?: number;
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export interface MotionVariants {
  hidden: {
    opacity?: number;
    x?: number;
    y?: number;
    scale?: number;
    rotate?: number;
  };
  visible: {
    opacity?: number;
    x?: number;
    y?: number;
    scale?: number;
    rotate?: number;
    transition?: {
      duration?: number;
      delay?: number;
      ease?: string;
      staggerChildren?: number;
      delayChildren?: number;
    };
  };
}

// GSAP Timeline configuration
export interface GSAPTimelineConfig {
  paused?: boolean;
  delay?: number;
  repeat?: number;
  repeatDelay?: number;
  yoyo?: boolean;
  onComplete?: () => void;
  onStart?: () => void;
  onUpdate?: () => void;
}

// GSAP Tween configuration
export interface GSAPTweenConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  x?: number | string;
  y?: number | string;
  opacity?: number;
  scale?: number;
  rotation?: number;
  transformOrigin?: string;
  onComplete?: () => void;
  onStart?: () => void;
}

// ScrollTrigger specific configuration
export interface ScrollTriggerConfig {
  trigger: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean | string | Element;
  pinSpacing?: boolean;
  snap?: boolean | number | object;
  markers?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  onToggle?: (_self: unknown) => void;
}

// Framer Motion gesture configuration
export interface MotionGestureConfig {
  whileHover?: object;
  whileTap?: object;
  whileFocus?: object;
  whileDrag?: object;
  drag?: boolean | 'x' | 'y';
  dragConstraints?: object;
  dragElastic?: number;
  dragMomentum?: boolean;
}

// Animation state management
export interface AnimationState {
  isPlaying: boolean;
  progress: number;
  direction: 'forward' | 'reverse';
  currentAnimation?: string;
}

// Intersection Observer configuration
export interface IntersectionConfig {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  skip?: boolean;
}
