import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ExpertiseMatrix from '../ExpertiseMatrix';

describe('ExpertiseMatrix', () => {
  it('renders the expertise matrix section', () => {
    render(<ExpertiseMatrix />);

    expect(screen.getByText('Expertise Matrix')).toBeInTheDocument();
    expect(
      screen.getByText(/Three pillars of biotech manufacturing excellence/)
    ).toBeInTheDocument();
  });

  it('displays all three expertise categories', () => {
    render(<ExpertiseMatrix />);

    expect(screen.getByText('Technical')).toBeInTheDocument();
    expect(screen.getByText('Regulatory')).toBeInTheDocument();
    expect(screen.getByText('Leadership')).toBeInTheDocument();
  });

  it('shows technical skills', () => {
    render(<ExpertiseMatrix />);

    expect(screen.getByText('TFF')).toBeInTheDocument();
    expect(screen.getByText('Chromatography')).toBeInTheDocument();
    expect(screen.getByText('Sterile Filtration')).toBeInTheDocument();
  });

  it('shows regulatory skills', () => {
    render(<ExpertiseMatrix />);

    expect(screen.getByText('US FDA')).toBeInTheDocument();
    expect(screen.getByText('EU GMP')).toBeInTheDocument();
    expect(screen.getByText('Health Canada')).toBeInTheDocument();
  });

  it('shows leadership skills', () => {
    render(<ExpertiseMatrix />);

    expect(screen.getByText('Team Lead')).toBeInTheDocument();
    expect(screen.getByText('10+ Direct Reports')).toBeInTheDocument();
    expect(screen.getByText('Cross-functional')).toBeInTheDocument();
  });
});
