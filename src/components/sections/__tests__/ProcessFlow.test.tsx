import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProcessFlow from '../ProcessFlow';

describe('ProcessFlow', () => {
  it('renders the process flow section', () => {
    render(<ProcessFlow />);

    expect(screen.getByText('Process Flow Visualization')).toBeInTheDocument();
    expect(
      screen.getByText(/CAR-T manufacturing pipeline/)
    ).toBeInTheDocument();
  });

  it('displays all process stages', () => {
    render(<ProcessFlow />);

    expect(screen.getByText('UPSTREAM')).toBeInTheDocument();
    expect(screen.getByText('DOWNSTREAM')).toBeInTheDocument();
    expect(screen.getByText('FORMULATION')).toBeInTheDocument();
    expect(screen.getByText('RELEASE')).toBeInTheDocument();
  });

  it('shows process metrics', () => {
    render(<ProcessFlow />);

    expect(screen.getByText('300+')).toBeInTheDocument();
    expect(screen.getByText('Equipment Validated')).toBeInTheDocument();
    expect(screen.getByText('10+')).toBeInTheDocument();
    expect(screen.getByText('Process Transfers')).toBeInTheDocument();
  });

  it('displays technical details sections', () => {
    render(<ProcessFlow />);

    expect(screen.getByText('Critical Process Parameters')).toBeInTheDocument();
    expect(screen.getByText('Quality Assurance')).toBeInTheDocument();
  });
});
