import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SkillsRadar from '../SkillsRadar';

describe('SkillsRadar', () => {
  it('renders the skills radar section', () => {
    render(<SkillsRadar />);

    expect(screen.getByText('Skills Radar Chart')).toBeInTheDocument();
    expect(
      screen.getByText(/Comprehensive competency mapping/)
    ).toBeInTheDocument();
  });

  it('displays the radar chart SVG', () => {
    render(<SkillsRadar />);

    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('shows all skill categories', () => {
    render(<SkillsRadar />);

    expect(screen.getAllByText('Scale-up & Tech Transfer')).toHaveLength(2);
    expect(screen.getAllByText('Risk Assessment')).toHaveLength(2);
    expect(screen.getAllByText('Process Design')).toHaveLength(2);
    expect(screen.getAllByText('Qualification')).toHaveLength(2);
    expect(screen.getAllByText('Project Management')).toHaveLength(2);
    expect(screen.getAllByText('Data Analysis')).toHaveLength(2);
    expect(screen.getAllByText('Statistical Control')).toHaveLength(2);
    expect(screen.getAllByText('HAZOP Study')).toHaveLength(2);
  });

  it('displays the center YOU label', () => {
    render(<SkillsRadar />);

    expect(screen.getByText('YOU')).toBeInTheDocument();
  });

  it('shows hover instruction', () => {
    render(<SkillsRadar />);

    expect(
      screen.getByText('Hover over a skill point to see details')
    ).toBeInTheDocument();
  });
});
