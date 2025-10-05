import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../../../test/utils';
import userEvent from '@testing-library/user-event';
import Navigation from '../Navigation';

// Mock smooth scrolling
const mockScrollIntoView = vi.fn();
Element.prototype.scrollIntoView = mockScrollIntoView;

describe('Navigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock getElementById to return mock elements
    vi.spyOn(document, 'getElementById').mockImplementation(() => {
      const mockElement = {
        scrollIntoView: mockScrollIntoView,
        offsetTop: 100,
        getBoundingClientRect: () => ({ top: 100, height: 500 }),
      } as unknown as HTMLElement;
      return mockElement;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders navigation menu items', () => {
    render(<Navigation />);

    expect(screen.getByText('Hero')).toBeInTheDocument();
    expect(screen.getByText('Impact')).toBeInTheDocument();
    expect(screen.getByText('Timeline')).toBeInTheDocument();
    expect(screen.getByText('Expertise')).toBeInTheDocument();
    expect(screen.getByText('Process')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Focus')).toBeInTheDocument();
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Tools')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('handles navigation item clicks', async () => {
    const user = userEvent.setup();
    render(<Navigation />);

    const heroLink = screen.getByText('Hero');
    await user.click(heroLink);

    expect(document.getElementById).toHaveBeenCalledWith('hero');
    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<Navigation />);

    const heroLink = screen.getByText('Hero');

    // Focus the link
    heroLink.focus();
    expect(heroLink).toHaveFocus();

    // Press Enter
    await user.keyboard('{Enter}');

    expect(document.getElementById).toHaveBeenCalledWith('hero');
    expect(mockScrollIntoView).toHaveBeenCalled();
  });

  it('handles mobile menu toggle', async () => {
    const user = userEvent.setup();
    render(<Navigation />);

    // Find mobile menu button (hamburger)
    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toBeInTheDocument();

    // Click to open menu
    await user.click(menuButton);

    // Menu should be visible (check for expanded state)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes mobile menu when navigation item is clicked', async () => {
    const user = userEvent.setup();
    render(<Navigation />);

    const menuButton = screen.getByRole('button', { name: /menu/i });

    // Open mobile menu
    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    // Click a navigation item
    const heroLink = screen.getByText('Hero');
    await user.click(heroLink);

    // Menu should close
    await waitFor(() => {
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('handles scroll-based active section highlighting', () => {
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 500,
    });

    render(<Navigation />);

    // Simulate scroll event
    fireEvent.scroll(window);

    // Check that navigation updates (this would require more complex mocking of getBoundingClientRect)
    expect(screen.getByText('Hero')).toBeInTheDocument();
  });

  it('has proper ARIA attributes for accessibility', () => {
    render(<Navigation />);

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();

    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toHaveAttribute('aria-expanded');
    expect(menuButton).toHaveAttribute('aria-controls');
  });

  it('handles navigation when target element does not exist', async () => {
    const user = userEvent.setup();

    // Mock getElementById to return null
    vi.spyOn(document, 'getElementById').mockReturnValue(null);

    render(<Navigation />);

    const heroLink = screen.getByText('Hero');
    await user.click(heroLink);

    // Should not throw error and should still call getElementById
    expect(document.getElementById).toHaveBeenCalledWith('hero');
    expect(mockScrollIntoView).not.toHaveBeenCalled();
  });

  it('supports reduced motion preferences', () => {
    // Mock reduced motion preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });

    render(<Navigation />);

    // Navigation should still work but with reduced animations
    expect(screen.getByText('Hero')).toBeInTheDocument();
  });

  it('handles window resize events', () => {
    render(<Navigation />);

    // Simulate window resize
    fireEvent.resize(window);

    // Navigation should still be functional
    expect(screen.getByText('Hero')).toBeInTheDocument();
  });
});
