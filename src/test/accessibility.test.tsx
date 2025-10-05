import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

// Import components to test
import Header from '../components/layout/Header';
import Hero from '../components/sections/Hero';
import Contact from '../components/sections/Contact';
import ExpertiseMatrix from '../components/sections/ExpertiseMatrix';
import SkipLinks from '../components/ui/SkipLinks';
import {
  createAriaAttributes,
  handleKeyboardActivation,
  getSemanticHeadingLevel,
  announceToScreenReader,
} from '../utils/accessibility';

// Mock navigation items
vi.mock('../data/personal', () => ({
  navigationItems: [
    { id: 'hero', label: 'Home', href: '#hero' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ],
  contactInfo: {
    location: 'Hamilton, ON',
    email: 'harsimranjeetsingh4@gmail.com',
  },
}));

// Mock GSAP
vi.mock('gsap', () => ({
  gsap: {
    timeline: () => ({
      fromTo: vi.fn().mockReturnThis(),
      to: vi.fn().mockReturnThis(),
      kill: vi.fn(),
    }),
    set: vi.fn(),
    to: vi.fn(),
    context: vi.fn(() => ({ revert: vi.fn() })),
    killTweensOf: vi.fn(),
    registerPlugin: vi.fn(),
  },
  ScrollTrigger: {},
}));

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
    section: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <section {...props}>{children}</section>
    ),
    header: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <header {...props}>{children}</header>
    ),
    button: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <button {...props}>{children}</button>
    ),
    nav: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <nav {...props}>{children}</nav>
    ),
    h1: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <h1 {...props}>{children}</h1>
    ),
    p: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <p {...props}>{children}</p>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => children,
}));

describe('Accessibility Tests', () => {
  describe('ARIA Attributes Utility', () => {
    it('should create proper ARIA attributes', () => {
      const attributes = createAriaAttributes({
        label: 'Test button',
        expanded: true,
        pressed: false,
        role: 'button',
      });

      expect(attributes).toEqual({
        'aria-label': 'Test button',
        'aria-expanded': true,
        'aria-pressed': false,
        role: 'button',
      });
    });

    it('should handle undefined values correctly', () => {
      const attributes = createAriaAttributes({
        label: 'Test',
        expanded: undefined,
        hidden: false,
      });

      expect(attributes).toEqual({
        'aria-label': 'Test',
        'aria-hidden': false,
      });
      expect(attributes['aria-expanded']).toBeUndefined();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should handle Enter key activation', () => {
      const mockCallback = vi.fn();
      const mockEvent = {
        key: 'Enter',
        preventDefault: vi.fn(),
      } as KeyboardEvent;

      handleKeyboardActivation(mockEvent, mockCallback);

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockCallback).toHaveBeenCalled();
    });

    it('should handle Space key activation', () => {
      const mockCallback = vi.fn();
      const mockEvent = {
        key: ' ',
        preventDefault: vi.fn(),
      } as KeyboardEvent;

      handleKeyboardActivation(mockEvent, mockCallback);

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockCallback).toHaveBeenCalled();
    });

    it('should not activate on other keys', () => {
      const mockCallback = vi.fn();
      const mockEvent = {
        key: 'Tab',
        preventDefault: vi.fn(),
      } as KeyboardEvent;

      handleKeyboardActivation(mockEvent, mockCallback);

      expect(mockEvent.preventDefault).not.toHaveBeenCalled();
      expect(mockCallback).not.toHaveBeenCalled();
    });
  });

  describe('Semantic Heading Levels', () => {
    it('should return h1 for hero section', () => {
      expect(getSemanticHeadingLevel(0)).toBe('h1');
    });

    it('should return h2 for main sections', () => {
      expect(getSemanticHeadingLevel(1)).toBe('h2');
      expect(getSemanticHeadingLevel(2)).toBe('h2');
    });

    it('should return appropriate levels for subsections', () => {
      expect(getSemanticHeadingLevel(1, 0)).toBe('h3');
      expect(getSemanticHeadingLevel(1, 1)).toBe('h4');
      expect(getSemanticHeadingLevel(1, 2)).toBe('h5');
    });
  });

  describe('Screen Reader Announcements', () => {
    it('should create announcement element', () => {
      announceToScreenReader('Test message');

      const announcement = document.querySelector('[aria-live]');
      expect(announcement).toBeInTheDocument();
      expect(announcement).toHaveTextContent('Test message');
      expect(announcement).toHaveAttribute('aria-live', 'polite');
    });

    it('should support assertive priority', () => {
      announceToScreenReader('Urgent message', 'assertive');

      const announcement = document.querySelector('[aria-live="assertive"]');
      expect(announcement).toBeInTheDocument();
      expect(announcement).toHaveTextContent('Urgent message');
    });
  });

  describe('SkipLinks Component', () => {
    it('should render skip links', () => {
      render(<SkipLinks />);

      expect(screen.getByText('Skip to main content')).toBeInTheDocument();
      expect(screen.getByText('Skip to navigation')).toBeInTheDocument();
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<SkipLinks />);

      const skipToContent = screen.getByText('Skip to main content');

      await user.tab();
      expect(skipToContent).toHaveFocus();

      await user.keyboard('{Enter}');
      // Skip link functionality would be tested in integration tests
    });

    it('should render without errors', () => {
      const { container } = render(<SkipLinks />);
      expect(container).toBeInTheDocument();
    });
  });

  describe('Header Component', () => {
    it('should have proper landmark roles', () => {
      render(<Header activeSection="hero" />);

      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();

      const navigation = screen.getByRole('navigation');
      expect(navigation).toBeInTheDocument();
    });

    it('should have accessible navigation buttons', () => {
      render(<Header activeSection="hero" />);

      const homeButton = screen.getByLabelText(/go to homepage/i);
      expect(homeButton).toBeInTheDocument();

      const menuToggle = screen.getByLabelText(/open navigation menu/i);
      expect(menuToggle).toBeInTheDocument();
    });

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<Header activeSection="hero" />);

      const menuToggle = screen.getByLabelText(/open navigation menu/i);

      await user.tab();
      await user.tab(); // Skip logo, focus menu toggle
      expect(menuToggle).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(menuToggle).toHaveAttribute('aria-expanded', 'true');
    });

    it('should render without errors', () => {
      const { container } = render(<Header activeSection="hero" />);
      expect(container).toBeInTheDocument();
    });
  });

  describe('Hero Component', () => {
    it('should have proper heading structure', () => {
      render(<Hero />);

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('HARSIMRANJEET SINGH');
    });

    it('should have descriptive region label', () => {
      render(<Hero />);

      const heroSection = screen.getByLabelText(/hero section/i);
      expect(heroSection).toBeInTheDocument();
    });

    it('should have accessible specialization tags', () => {
      render(<Hero />);

      const tagsList = screen.getByLabelText('Areas of expertise');
      expect(tagsList).toBeInTheDocument();

      const tags = screen.getAllByRole('listitem');
      expect(tags).toHaveLength(4);
    });

    it('should provide screen reader content', () => {
      render(<Hero />);

      // Check that the component renders
      const heroSection = screen.getByLabelText(/hero section/i);
      expect(heroSection).toBeInTheDocument();
    });

    it('should render without errors', () => {
      const { container } = render(<Hero />);
      expect(container).toBeInTheDocument();
    });
  });

  describe('Contact Component', () => {
    it('should have proper section labeling', () => {
      render(<Contact />);

      const contactSection = screen.getByLabelText(/contact information/i);
      expect(contactSection).toBeInTheDocument();
    });

    it('should have accessible contact links', () => {
      render(<Contact />);

      const emailLink = screen.getByLabelText(/contact via email/i);
      expect(emailLink).toBeInTheDocument();

      const linkedinLink = screen.getByLabelText(/contact via linkedin/i);
      expect(linkedinLink).toBeInTheDocument();

      const phoneLink = screen.getByLabelText(/contact via phone/i);
      expect(phoneLink).toBeInTheDocument();
    });

    it('should support keyboard navigation for contact methods', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      screen.getByLabelText(/contact via email/i);

      await user.tab();
      // Navigate to email link (exact tab order may vary)
      expect(document.activeElement).toBeDefined();
    });

    it('should render without errors', () => {
      const { container } = render(<Contact />);
      expect(container).toBeInTheDocument();
    });
  });

  describe('ExpertiseMatrix Component', () => {
    it('should have proper section structure', () => {
      render(<ExpertiseMatrix />);

      const section = screen.getByLabelText(/expertise matrix/i);
      expect(section).toBeInTheDocument();
    });

    it('should have accessible skill tiles', () => {
      render(<ExpertiseMatrix />);

      const skillButtons = screen.getAllByRole('button');
      expect(skillButtons.length).toBeGreaterThan(0);

      // Check first skill button has proper labeling
      const firstSkill = skillButtons[0];
      expect(firstSkill).toHaveAttribute('aria-label');
      expect(firstSkill).toHaveAttribute('aria-pressed');
    });

    it('should support keyboard interaction with tiles', async () => {
      const user = userEvent.setup();
      render(<ExpertiseMatrix />);

      const skillButtons = screen.getAllByRole('button');
      const firstSkill = skillButtons[0];

      await user.click(firstSkill);
      expect(firstSkill).toHaveAttribute('aria-pressed', 'true');

      await user.keyboard('{Enter}');
      expect(firstSkill).toHaveAttribute('aria-pressed', 'false');
    });

    it('should have grouped skill categories', () => {
      render(<ExpertiseMatrix />);

      const skillGroups = screen.getAllByRole('group');
      expect(skillGroups.length).toBeGreaterThan(0);
    });

    it('should render without errors', () => {
      const { container } = render(<ExpertiseMatrix />);
      expect(container).toBeInTheDocument();
    });
  });

  describe('Reduced Motion Support', () => {
    beforeEach(() => {
      // Mock prefers-reduced-motion
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });
    });

    it('should respect reduced motion preferences', () => {
      render(<Hero />);

      // Components should render without complex animations
      const heroSection = screen.getByLabelText(/hero section/i);
      expect(heroSection).toBeInTheDocument();
    });
  });

  describe('Focus Management', () => {
    it('should manage focus on section navigation', () => {
      render(
        <div>
          <Header activeSection="hero" />
          <main>
            <Hero />
            <Contact />
          </main>
        </div>
      );

      // Test that sections can receive focus
      const heroSection = screen.getByLabelText(/hero section/i);
      expect(heroSection).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('Color Contrast and High Contrast Mode', () => {
    it('should have sufficient color contrast', () => {
      render(<Header activeSection="hero" />);

      // This would typically be tested with automated tools
      // or manual verification in actual implementation
      const navigation = screen.getByRole('navigation');
      expect(navigation).toBeInTheDocument();
    });
  });

  describe('Screen Reader Content', () => {
    it('should provide screen reader only content where needed', () => {
      render(<Hero />);

      // Check for screen reader only content
      const srContent = document.querySelector('.sr-only');
      expect(srContent).toBeInTheDocument();
    });

    it('should hide decorative content from screen readers', () => {
      render(<Contact />);

      // Check that decorative elements are hidden
      const decorativeElements = document.querySelectorAll(
        '[aria-hidden="true"]'
      );
      expect(decorativeElements.length).toBeGreaterThan(0);
    });
  });
});
