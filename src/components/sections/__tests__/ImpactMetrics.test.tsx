import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '../../../test/utils';
import ImpactMetrics from '../ImpactMetrics';

// Mock react-intersection-observer
vi.mock('react-intersection-observer', () => ({
  useInView: vi.fn(() => ({
    ref: vi.fn(),
    inView: true,
    entry: { isIntersecting: true },
  })),
}));

describe('ImpactMetrics', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all impact metrics', () => {
    render(<ImpactMetrics />);

    expect(screen.getByText('Equipment Validated')).toBeInTheDocument();
    expect(screen.getByText('Projects Led')).toBeInTheDocument();
    expect(screen.getByText('Years Experience')).toBeInTheDocument();
    expect(screen.getByText('Masters GPA')).toBeInTheDocument();
  });

  it('displays metric values correctly', async () => {
    render(<ImpactMetrics />);

    // Should eventually show the counter values
    await waitFor(() => {
      expect(screen.getByText(/300/)).toBeInTheDocument();
      expect(screen.getByText(/10/)).toBeInTheDocument();
      expect(screen.getByText(/8/)).toBeInTheDocument();
      expect(screen.getByText(/3\.94/)).toBeInTheDocument();
    });
  });

  it('has proper section structure', () => {
    render(<ImpactMetrics />);

    const section = document.querySelector('#impact-metrics');
    expect(section).toBeInTheDocument();
    expect(section?.tagName.toLowerCase()).toBe('section');
  });

  it('displays metric descriptions', () => {
    render(<ImpactMetrics />);

    expect(
      screen.getByText(/Pieces of equipment validated/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Successful project completions/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Years in biotech\/pharma/)).toBeInTheDocument();
    expect(screen.getByText(/University of Alberta/)).toBeInTheDocument();
  });

  it('renders in a responsive grid layout', () => {
    const { container } = render(<ImpactMetrics />);

    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass('grid-cols-1');
    expect(gridContainer).toHaveClass('md:grid-cols-2');
    expect(gridContainer).toHaveClass('lg:grid-cols-4');
  });

  it('handles intersection observer not triggering', () => {
    // Mock intersection observer to not trigger
    vi.doMock('react-intersection-observer', () => ({
      useInView: () => ({
        ref: vi.fn(),
        inView: false,
        entry: { isIntersecting: false },
      }),
    }));

    render(<ImpactMetrics />);

    // Should still render the component structure
    expect(screen.getByText('Equipment Validated')).toBeInTheDocument();
  });

  it('has proper heading hierarchy', () => {
    render(<ImpactMetrics />);

    // Should have a section heading
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('applies proper styling classes', () => {
    const { container } = render(<ImpactMetrics />);

    const section = container.querySelector('#impact-metrics');
    expect(section).toHaveClass('py-20');
    expect(section).toHaveClass('bg-gradient-to-br');
  });

  it('renders AnimatedCounter components', () => {
    render(<ImpactMetrics />);

    // Check that counter components are rendered
    const counters = document.querySelectorAll('.group');
    expect(counters.length).toBe(4);
  });

  it('handles reduced motion preferences', () => {
    // Mock reduced motion preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });

    render(<ImpactMetrics />);

    // Content should still render
    expect(screen.getByText('Equipment Validated')).toBeInTheDocument();
  });
});
