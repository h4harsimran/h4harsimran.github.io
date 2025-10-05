import React, { useEffect, useRef, useState } from 'react';
import { CountUp } from 'countup.js';
import { useInView } from 'react-intersection-observer';
import { useAnimationConfig } from '../../hooks/useReducedMotion';
import { AnimationErrorBoundary } from './AnimationErrorBoundary';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  description?: string;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  label,
  description,
  className = '',
}) => {
  const countRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const { prefersReducedMotion, enableComplexAnimations } =
    useAnimationConfig();

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && !hasAnimated && countRef.current) {
      try {
        // If reduced motion is preferred, show final value immediately
        if (prefersReducedMotion) {
          countRef.current.textContent = `${prefix}${end.toLocaleString()}${suffix}`;
          setHasAnimated(true);

          // Show progress bar immediately
          if (progressRef.current) {
            progressRef.current.style.transform = 'scaleX(1)';
            progressRef.current.style.transition = 'none';
          }
          return;
        }

        const countUp = new CountUp(countRef.current, end, {
          startVal: 0,
          duration: enableComplexAnimations ? duration : 0.3,
          decimalPlaces: decimals,
          prefix,
          suffix,
          useEasing: enableComplexAnimations,
          useGrouping: true,
          separator: ',',
        });

        if (!countUp.error) {
          countUp.start();
          setHasAnimated(true);

          // Animate progress bar
          if (progressRef.current) {
            progressRef.current.style.transform = 'scaleX(1)';
          }
        }
      } catch (error) {
        console.warn('CountUp animation error:', error);
        // Fallback to static display
        if (countRef.current) {
          countRef.current.textContent = `${prefix}${end.toLocaleString()}${suffix}`;
        }
        setHasAnimated(true);
      }
    }
  }, [
    inView,
    hasAnimated,
    end,
    duration,
    decimals,
    prefix,
    suffix,
    prefersReducedMotion,
    enableComplexAnimations,
  ]);

  const counterComponent = (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-6 shadow-lg ${
        prefersReducedMotion
          ? 'transition-none'
          : 'transition-all duration-300 hover:scale-105 hover:shadow-xl'
      } dark:from-slate-800 dark:to-slate-900 ${className}`}
    >
      {/* Progress bar background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
        <div
          ref={progressRef}
          className={`h-full w-full origin-left scale-x-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 ${
            prefersReducedMotion
              ? 'transition-none'
              : 'transition-transform duration-2000 ease-out'
          }`}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Counter */}
        <div className="mb-2">
          <span
            ref={countRef}
            className="text-3xl font-bold text-slate-900 md:text-4xl dark:text-slate-100"
          >
            0
          </span>
        </div>

        {/* Label */}
        <h3 className="mb-1 text-lg font-semibold text-slate-800 dark:text-slate-200">
          {label}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {description}
          </p>
        )}

        {/* Decorative element */}
        <div
          className={`absolute -top-2 -right-2 h-16 w-16 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-0 ${
            prefersReducedMotion
              ? 'transition-none'
              : 'transition-opacity duration-300 group-hover:opacity-100'
          }`}
        />
      </div>
    </div>
  );

  return (
    <AnimationErrorBoundary
      fallback={
        <div
          className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-6 shadow-lg dark:from-slate-800 dark:to-slate-900 ${className}`}
        >
          <div className="relative z-10">
            <div className="mb-2">
              <span className="text-3xl font-bold text-slate-900 md:text-4xl dark:text-slate-100">
                {prefix}
                {end.toLocaleString()}
                {suffix}
              </span>
            </div>
            <h3 className="mb-1 text-lg font-semibold text-slate-800 dark:text-slate-200">
              {label}
            </h3>
            {description && (
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {description}
              </p>
            )}
          </div>
        </div>
      }
    >
      {counterComponent}
    </AnimationErrorBoundary>
  );
};

export default AnimatedCounter;
