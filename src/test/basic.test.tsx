import { describe, it, expect } from 'vitest';
import { render, screen } from './utils';

// Simple test component
const TestComponent = () => (
  <div>
    <h1>Test Component</h1>
    <p>This is a test</p>
  </div>
);

describe('Basic Test Setup', () => {
  it('should render a simple component', () => {
    render(<TestComponent />);

    expect(screen.getByText('Test Component')).toBeInTheDocument();
    expect(screen.getByText('This is a test')).toBeInTheDocument();
  });

  it('should have matchMedia available', () => {
    expect(window.matchMedia).toBeDefined();
    expect(typeof window.matchMedia).toBe('function');

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    expect(mediaQuery).toBeDefined();
    expect(mediaQuery.matches).toBe(false);
  });
});
