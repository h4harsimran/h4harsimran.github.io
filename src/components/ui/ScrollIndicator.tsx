import React from 'react';
import { motion } from 'framer-motion';

interface ScrollIndicatorProps {
  targetId: string;
  className?: string;
  label?: string;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  targetId,
  className = '',
  label = 'Scroll to explore',
}) => {
  const scrollToTarget = () => {
    const element = document.getElementById(targetId);
    if (element) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.button
      onClick={scrollToTarget}
      className={`flex flex-col items-center gap-2 text-white/80 transition-colors duration-300 hover:text-white ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
      whileHover={{ y: -5 }}
      aria-label={`${label} - ${targetId}`}
    >
      <span className="text-sm font-medium tracking-wide">{label}</span>
      <motion.div
        className="flex h-10 w-6 justify-center rounded-full border-2 border-white/60"
        whileHover={{ borderColor: 'rgba(255, 255, 255, 1)' }}
      >
        <motion.div
          className="mt-2 h-3 w-1 rounded-full bg-white/80"
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
      <motion.div
        className="text-xl"
        animate={{ y: [0, 5, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.2,
        }}
      >
        ↓
      </motion.div>
    </motion.button>
  );
};

export default ScrollIndicator;
