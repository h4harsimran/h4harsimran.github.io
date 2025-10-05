import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CareerTimeline from '../CareerTimeline';

// Mock GSAP and ScrollTrigger
vi.mock('gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
    context: vi.fn(() => ({
      revert: vi.fn(),
    })),
    fromTo: vi.fn(),
    to: vi.fn(),
  },
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {},
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

// Mock intersection observer
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

describe('CareerTimeline', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the career timeline section', () => {
    render(<CareerTimeline />);

    expect(screen.getByText('Career Timeline')).toBeInTheDocument();
    expect(
      screen.getByText(/Professional journey from India to Canada/)
    ).toBeInTheDocument();
  });

  it('displays geographic transition visualization', () => {
    render(<CareerTimeline />);

    expect(screen.getByText('India')).toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();
    expect(
      screen.getByText('Professional Journey: India → Canada')
    ).toBeInTheDocument();
  });

  it('renders timeline nodes for each career stage', () => {
    render(<CareerTimeline />);

    // Check for timeline years
    expect(screen.getByText('2017')).toBeInTheDocument();
    expect(screen.getByText('2019')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('2025')).toBeInTheDocument();
  });

  it('displays career progression information', () => {
    render(<CareerTimeline />);

    // Check for company names
    expect(screen.getByText('Ind-Swift Laboratories')).toBeInTheDocument();
    expect(screen.getByText('University of Alberta')).toBeInTheDocument();
    expect(screen.getByText('Sanofi')).toBeInTheDocument();
    expect(screen.getByText('OmniaBio Inc')).toBeInTheDocument();
  });

  it('shows summary statistics', () => {
    render(<CareerTimeline />);

    expect(screen.getByText('8+')).toBeInTheDocument();
    expect(screen.getByText('Years Experience')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Companies')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Countries')).toBeInTheDocument();
  });

  it('has proper section structure and accessibility', () => {
    render(<CareerTimeline />);

    const section = screen.getByRole('region', { name: /career timeline/i });
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'career-timeline');
  });
});
