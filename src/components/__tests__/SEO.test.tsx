import React from 'react';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { vi, describe, it } from 'vitest';
import SEO from '../SEO';

// Mock the SEO utilities
vi.mock('../../utils/seo', () => ({
  generateMetaTags: vi.fn(() => ({
    title: 'Test Title',
    meta: [
      { name: 'description', content: 'Test description' },
      { name: 'keywords', content: 'test, keywords' },
      { property: 'og:title', content: 'Test Title' },
    ],
  })),
  generateStructuredData: vi.fn(() =>
    JSON.stringify({ '@type': 'Person', name: 'Test' })
  ),
  defaultSEOConfig: {
    title: 'Test Title',
    description: 'Test description',
    keywords: ['test'],
  },
}));

describe('SEO Component', () => {
  const renderWithHelmet = (component: React.ReactElement) => {
    return render(<HelmetProvider>{component}</HelmetProvider>);
  };

  it('renders without crashing', () => {
    renderWithHelmet(<SEO />);
  });

  it('accepts custom config', () => {
    const customConfig = {
      title: 'Custom Title',
      description: 'Custom description',
    };

    renderWithHelmet(<SEO config={customConfig} />);
  });

  it('renders with default config when no config provided', () => {
    renderWithHelmet(<SEO />);
  });
});
