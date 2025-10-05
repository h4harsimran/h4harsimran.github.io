import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Hero from '../Hero';

// Mock GSAP
vi.mock('gsap', () => ({
  gsap: {
    timeline: vi.fn(() => ({
      fromTo: vi.fn().mockReturnThis(),
      kill: vi.fn(),
    })),
    fromTo: vi.fn(),
    to: vi.fn(),
    killTweensOf: vi.fn(),
  },
}));

// Mock the UI components
vi.mock('../../ui/DNAHelix', () => ({
  default: () => <div data-testid="dna-helix">DNA Helix</div>,
}));

vi.mock('../../ui/ParticleSystem', () => ({
  default: () => <div data-testid="particle-system">Particle System</div>,
}));

vi.mock('../../ui/ExpertiseNodes', () => ({
  default: ({
    onNodePositionsChange,
  }: {
    onNodePositionsChange: (positions: Array<{ x: number; y: number }>) => void;
  }) => {
    // Simulate node positions update immediately
    setTimeout(() => {
      onNodePositionsChange([
        { x: 100, y: 100 },
        { x: 200, y: 200 },
      ]);
    }, 0);

    return <div data-testid="expertise-nodes">Expertise Nodes</div>;
  },
}));

// Mock contact info
vi.mock('../../../data/personal', () => ({
  contactInfo: {
    location: 'Hamilton, ON',
    email: 'harsimranjeetsingh4@gmail.com',
  },
}));

describe('Hero', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the hero section with correct content', () => {
    render(<Hero />);

    // Check for main heading
    expect(screen.getByText('HARSIMRANJEET SINGH')).toBeInTheDocument();

    // Check for subtitle
    expect(
      screen.getByText('Manufacturing Sciences & Technology Leader')
    ).toBeInTheDocument();

    // Check for contact information
    expect(screen.getByText('Hamilton, ON')).toBeInTheDocument();
    expect(
      screen.getByText('harsimranjeetsingh4@gmail.com')
    ).toBeInTheDocument();
  });

  it('renders all animation components', () => {
    render(<Hero />);

    // Check for DNA Helix component
    expect(screen.getByTestId('dna-helix')).toBeInTheDocument();

    // Check for Particle System component
    expect(screen.getByTestId('particle-system')).toBeInTheDocument();

    // Check for Expertise Nodes component
    expect(screen.getByTestId('expertise-nodes')).toBeInTheDocument();
  });

  it('renders specialization tags', () => {
    render(<Hero />);

    // Check for specialization tags
    expect(screen.getByText('CAR-T Manufacturing')).toBeInTheDocument();
    expect(screen.getByText('Scale-up Expert')).toBeInTheDocument();
    expect(screen.getByText('Tech Transfer')).toBeInTheDocument();
    expect(screen.getByText('Process Engineering')).toBeInTheDocument();
  });

  it('has proper section structure', () => {
    render(<Hero />);

    // Check for hero section
    const heroSection = screen.getByRole('region');
    expect(heroSection).toHaveAttribute('id', 'hero');
    expect(heroSection).toHaveClass('min-h-screen');
  });

  it('renders scientific icons', () => {
    const { container } = render(<Hero />);

    // Check that scientific icons are present in the DOM
    const icons = container.querySelectorAll('.animate-bounce-gentle');
    expect(icons.length).toBeGreaterThan(0);
  });
});
