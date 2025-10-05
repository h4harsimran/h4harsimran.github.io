import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { navigationItems } from '../../data/personal';
import type { NavigationItem } from '../../types/portfolio';
import { useKeyboardNavigation, useFocusManagement } from '../../hooks';
import {
  createAriaAttributes,
  handleKeyboardActivation,
  focusVisibleClass,
} from '../../utils/accessibility';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface HeaderProps {
  activeSection?: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection = 'hero' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Keyboard navigation for mobile menu
  const { containerRef: mobileMenuRef } = useKeyboardNavigation({
    enableArrowKeys: true,
    enableTabTrapping: isMenuOpen,
    enableEscapeKey: true,
    onEscape: () => setIsMenuOpen(false),
  });

  // Focus management for mobile menu
  const { storePreviousFocus, restorePreviousFocus } = useFocusManagement();

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on link
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isMenuOpen &&
        !target.closest('.mobile-menu') &&
        !target.closest('.menu-toggle')
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleNavClick = (
    href: string,
    event?: React.MouseEvent | React.KeyboardEvent
  ) => {
    if (event) {
      event.preventDefault();
    }

    setIsMenuOpen(false);

    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });

      // Focus the section for screen readers
      const targetElement = element as HTMLElement;
      const originalTabIndex = targetElement.getAttribute('tabindex');
      if (!originalTabIndex) {
        targetElement.setAttribute('tabindex', '-1');
      }

      setTimeout(
        () => {
          targetElement.focus();
          if (!originalTabIndex) {
            targetElement.removeAttribute('tabindex');
          }
        },
        prefersReducedMotion ? 0 : 500
      );
    }
  };

  const toggleMenu = () => {
    if (!isMenuOpen) {
      storePreviousFocus();
    } else {
      restorePreviousFocus();
    }
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header
      initial={prefersReducedMotion ? {} : { y: -100, opacity: 0 }}
      animate={prefersReducedMotion ? {} : { y: 0, opacity: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.6,
        ease: 'easeOut',
      }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-gray-100 bg-white/95 shadow-lg backdrop-blur-md'
          : 'bg-transparent'
      }`}
      role="banner"
      aria-label="Site header with navigation"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo/Brand */}
          <motion.div
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            className="flex-shrink-0"
          >
            <button
              onClick={e => handleNavClick('#hero', e)}
              onKeyDown={e =>
                handleKeyboardActivation(e, () => handleNavClick('#hero', e))
              }
              className={`font-sans text-xl font-bold transition-colors duration-300 lg:text-2xl ${focusVisibleClass} ${
                isScrolled
                  ? 'text-blue-900 hover:text-cyan-600'
                  : 'text-white hover:text-cyan-300'
              }`}
              aria-label="Go to homepage - Harsimranjeet Singh, Manufacturing Sciences & Technology Leader"
            >
              <div className="flex flex-col">
                <span className="leading-tight">HARSIMRANJEET SINGH</span>
                <span
                  className={`text-xs font-medium tracking-wide ${
                    isScrolled ? 'text-blue-600' : 'text-cyan-300'
                  }`}
                >
                  MANUFACTURING SCIENCES & TECHNOLOGY LEADER
                </span>
              </div>
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center space-x-8 md:flex"
            role="navigation"
            aria-label="Main navigation"
          >
            {navigationItems.map((item: NavigationItem) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <motion.button
                  key={item.id}
                  onClick={e => handleNavClick(item.href, e)}
                  onKeyDown={e =>
                    handleKeyboardActivation(e, () =>
                      handleNavClick(item.href, e)
                    )
                  }
                  whileHover={prefersReducedMotion ? {} : { y: -2 }}
                  whileTap={prefersReducedMotion ? {} : { y: 0 }}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 lg:text-base ${focusVisibleClass} ${
                    isActive
                      ? 'text-cyan-600'
                      : isScrolled
                        ? 'text-gray-700 hover:text-cyan-600'
                        : 'text-white hover:text-cyan-300'
                  }`}
                  {...createAriaAttributes({
                    current: isActive ? 'page' : undefined,
                    label: `Navigate to ${item.label} section`,
                  })}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-cyan-600"
                      initial={false}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0.01 }
                          : { type: 'spring', stiffness: 380, damping: 30 }
                      }
                      aria-hidden="true"
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            onClick={toggleMenu}
            onKeyDown={e => handleKeyboardActivation(e, toggleMenu)}
            className={`menu-toggle rounded-lg p-2 transition-colors duration-300 md:hidden ${focusVisibleClass} ${
              isScrolled
                ? 'text-gray-700 hover:bg-gray-100 hover:text-cyan-600'
                : 'text-white hover:bg-white/10 hover:text-cyan-300'
            }`}
            {...createAriaAttributes({
              label: `${isMenuOpen ? 'Close' : 'Open'} navigation menu`,
              expanded: isMenuOpen,
              pressed: isMenuOpen,
            })}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaTimes className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaBars className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.nav
              ref={mobileMenuRef}
              initial={prefersReducedMotion ? {} : { x: '100%' }}
              animate={prefersReducedMotion ? {} : { x: 0 }}
              exit={prefersReducedMotion ? {} : { x: '100%' }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.01 }
                  : { type: 'spring', stiffness: 300, damping: 30 }
              }
              className="mobile-menu fixed top-16 right-0 bottom-0 z-50 w-80 max-w-[80vw] overflow-y-auto bg-white shadow-2xl lg:top-20"
              role="navigation"
              aria-label="Mobile navigation menu"
            >
              <div className="p-6">
                <div className="space-y-4">
                  {navigationItems.map((item: NavigationItem, index) => {
                    const isActive = activeSection === item.href.substring(1);
                    return (
                      <motion.button
                        key={item.id}
                        onClick={e => handleNavClick(item.href, e)}
                        onKeyDown={e =>
                          handleKeyboardActivation(e, () =>
                            handleNavClick(item.href, e)
                          )
                        }
                        initial={
                          prefersReducedMotion ? {} : { x: 50, opacity: 0 }
                        }
                        animate={
                          prefersReducedMotion ? {} : { x: 0, opacity: 1 }
                        }
                        transition={
                          prefersReducedMotion
                            ? { duration: 0.01 }
                            : { delay: index * 0.1, duration: 0.3 }
                        }
                        whileHover={prefersReducedMotion ? {} : { x: 10 }}
                        whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                        className={`block w-full rounded-lg px-4 py-3 text-left text-lg font-medium transition-all duration-300 ${focusVisibleClass} ${
                          isActive
                            ? 'border-l-4 border-cyan-600 bg-cyan-50 text-cyan-600'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-cyan-600'
                        }`}
                        {...createAriaAttributes({
                          current: isActive ? 'page' : undefined,
                          label: `Navigate to ${item.label} section`,
                        })}
                      >
                        {item.label}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Mobile Menu Footer */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="mt-8 border-t border-gray-200 pt-6"
                >
                  <p className="text-center text-sm text-gray-500">
                    Harsimranjeet Singh
                  </p>
                  <p className="mt-1 text-center text-xs text-gray-400">
                    Manufacturing Sciences & Technology Leader
                  </p>
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
