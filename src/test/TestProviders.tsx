import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

// Custom render function that includes providers
export const AllTheProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <HelmetProvider>{children}</HelmetProvider>;
};
