import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { navigationItems } from '../../data/personal';
import type { NavigationItem } from '../../types/portfolio';

interface NavigationProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  showActiveIndicator?: boolean;
  onNavigate?: (_sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  className = '',
  orientation = 'horizontal',
  showActiveIndicator = true,
  onNavigate,
}) => {
  const [activeSection, setActiveSection] = useState('hero');

  // Smooth scroll to section
  const scrollToSection = useCallback(
    (href: string) => {
      const sectionId = href.substring(1); // Remove the '#'
      const element = document.querySelector(href);

      if (element) {
        // Calculate offset for fixed header
        const headerHeight = 80; // Adjust based on your header height
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        setActiveSection(sectionId);
        onNavigate?.(sectionId);
      }
    },
    [onNavigate]
  );

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100; // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);
    handleScroll(); // Set initial active section

    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, []);

  const containerClasses =
    orientation === 'horizontal'
      ? 'flex items-center space-x-6'
      : 'flex flex-col space-y-2';

  const linkBaseClasses =
    orientation === 'horizontal'
      ? 'relative px-3 py-2 text-sm lg:text-base font-medium transition-all duration-300'
      : 'block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg';

  return (
    <nav className={`${containerClasses} ${className}`} role="navigation">
      {navigationItems.map((item: NavigationItem) => {
        const isActive = activeSection === item.href.substring(1);

        return (
          <motion.button
            key={item.id}
            onClick={() => scrollToSection(item.href)}
            whileHover={{
              scale: 1.05,
              y: orientation === 'horizontal' ? -2 : 0,
              x: orientation === 'vertical' ? 5 : 0,
            }}
            whileTap={{ scale: 0.95 }}
            className={` ${linkBaseClasses} ${
              isActive ? 'text-cyan-600' : 'text-gray-700 hover:text-cyan-600'
            } ${
              orientation === 'vertical' && isActive
                ? 'border-l-4 border-cyan-600 bg-cyan-50'
                : ''
            } `}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.label}

            {/* Active indicator for horizontal navigation */}
            {showActiveIndicator &&
              orientation === 'horizontal' &&
              isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-cyan-600"
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
          </motion.button>
        );
      })}
    </nav>
  );
};

export default Navigation;
