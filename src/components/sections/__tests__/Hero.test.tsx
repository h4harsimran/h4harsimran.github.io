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
    expect(screen.getByText(/Hamilton, ON/)).toBeInTheDocument();
    expect(
      screen.getByText(/harsimranjeetsingh4@gmail.com/)
    ).toBeInTheDocument();

    // Check for portrait image
    expect(screen.getByAltText(/Harsimranjeet Singh/)).toBeInTheDocument();
  });

  it('renders DNA Helix animation component', () => {
    render(<Hero />);

    // Check for DNA Helix component
    expect(screen.getByTestId('dna-helix')).toBeInTheDocument();
  });

  it('renders specialization tags', () => {
    render(<Hero />);

    // Check for specialization tags
    expect(screen.getByText('Process Engineering')).toBeInTheDocument();
    expect(screen.getByText('Risk Assessment')).toBeInTheDocument();
    expect(screen.getByText('Technology Transfer')).toBeInTheDocument();
    expect(screen.getByText('Equipment Validation')).toBeInTheDocument();
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
