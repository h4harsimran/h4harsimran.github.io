import { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { AllTheProviders } from './TestProviders';

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
