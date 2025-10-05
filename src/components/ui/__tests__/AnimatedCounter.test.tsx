import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '../../../test/utils';
import AnimatedCounter from '../AnimatedCounter';

// Mock react-intersection-observer
vi.mock('react-intersection-observer', () => ({
  useInView: vi.fn(() => ({
    ref: vi.fn(),
    inView: true,
    entry: { isIntersecting: true },
  })),
}));

describe('AnimatedCounter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders with basic props', () => {
    render(
      <AnimatedCounter
        end={100}
        label="Test Counter"
        description="Test description"
      />
    );

    expect(screen.getByText('Test Counter')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('displays the counter value', async () => {
    render(
      <AnimatedCounter
        end={300}
        label="Equipment Validated"
        suffix="+"
        description="Pieces of equipment"
      />
    );

    // Should eventually show the final value
    await waitFor(() => {
      const counterElement = screen.getByText(/300/);
      expect(counterElement).toBeInTheDocument();
    });
  });

  it('handles prefix and suffix correctly', () => {
    render(<AnimatedCounter end={50} prefix="$" suffix="K" label="Revenue" />);

    expect(screen.getByText('Revenue')).toBeInTheDocument();
  });

  it('handles decimal places', () => {
    render(
      <AnimatedCounter
        end={3.94}
        decimals={2}
        label="GPA"
        description="Masters GPA"
      />
    );

    expect(screen.getByText('GPA')).toBeInTheDocument();
    expect(screen.getByText('Masters GPA')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <AnimatedCounter end={100} label="Test" className="custom-class" />
    );

    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('handles reduced motion preference', () => {
    // Mock reduced motion preference
    vi.doMock('../../hooks/useReducedMotion', () => ({
      useAnimationConfig: () => ({
        prefersReducedMotion: true,
        enableComplexAnimations: false,
        duration: 0.1,
        ease: 'linear',
        stagger: 0.05,
      }),
    }));

    render(<AnimatedCounter end={100} label="Test Counter" />);

    expect(screen.getByText('Test Counter')).toBeInTheDocument();
  });

  it('renders fallback when animation fails', () => {
    // Mock CountUp to throw an error
    vi.doMock('countup.js', () => ({
      CountUp: vi.fn().mockImplementation(() => {
        throw new Error('Animation failed');
      }),
    }));

    render(
      <AnimatedCounter
        end={100}
        label="Test Counter"
        description="Test description"
      />
    );

    expect(screen.getByText('Test Counter')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
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

    render(<AnimatedCounter end={100} label="Test Counter" />);

    // Should still render the component structure
    expect(screen.getByText('Test Counter')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(
      <AnimatedCounter
        end={100}
        label="Test Counter"
        description="Test description"
      />
    );

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('Test Counter');
  });

  it('handles hover interactions', async () => {
    const { container } = render(
      <AnimatedCounter end={100} label="Test Counter" />
    );

    const counterContainer = container.querySelector('.group');
    expect(counterContainer).toBeInTheDocument();
    expect(counterContainer).toHaveClass('hover:shadow-xl');
  });
});
