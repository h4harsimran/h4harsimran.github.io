import React from 'react';
import { motion } from 'framer-motion';
import type { MotionProps, Variants } from 'framer-motion';
import { useAnimationConfig } from '../../hooks/useReducedMotion';
import { accessibleVariants } from './MotionVariants';

interface MotionWrapperProps
  extends Omit<MotionProps, 'variants' | 'initial' | 'animate' | 'exit'> {
  children: React.ReactNode;
  variants?: Variants;
  initial?: string | boolean;
  animate?: string;
  exit?: string;
  fallback?: React.ReactNode;
  className?: string;
}

/**
 * Wrapper component for Framer Motion that respects reduced motion preferences
 */
export const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  variants,
  initial = false,
  animate,
  exit,
  fallback,
  className,
  ...props
}) => {
  const { prefersReducedMotion } = useAnimationConfig();

  // If reduced motion is preferred, render static content
  if (prefersReducedMotion) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div
        className={className}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    );
  }

  // Use provided variants or fallback to accessible variants
  const finalVariants = variants || accessibleVariants.fadeIn;

  try {
    return (
      <motion.div
        variants={finalVariants}
        initial={initial}
        animate={animate}
        exit={exit}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  } catch (error) {
    console.warn('Framer Motion error:', error);
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div
        className={className}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    );
  }
};

/**
 * Accessible stagger container
 */
export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <MotionWrapper
      variants={accessibleVariants.stagger}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </MotionWrapper>
  );
};

/**
 * Accessible fade in component
 */
export const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className }) => {
  return (
    <MotionWrapper
      variants={accessibleVariants.fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className={className}
    >
      {children}
    </MotionWrapper>
  );
};
