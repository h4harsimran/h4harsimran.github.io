import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { SkipLinks } from '../ui';
import { createLandmarkProps } from '../../utils/accessibility';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section for header
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'hero',
        'impact-metrics',
        'career-timeline',
        'expertise-matrix',
        'process-flow',
        'skills-radar',
        'current-focus',
        'education',
        'tools',
        'contact',
      ];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

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
    handleScroll();

    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <SkipLinks />
      <Header activeSection={activeSection} />
      <main
        className="flex-grow"
        {...createLandmarkProps('main', 'Main content')}
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
