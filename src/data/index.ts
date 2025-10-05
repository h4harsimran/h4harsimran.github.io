// Export all data modules
export * from './experience';
export * from './skills';
export * from './projects';
export * from './personal';
export * from './education';

// Export all types
export * from '../types/portfolio';
export * from '../types/animations';
export * from '../types/validation';

// Utility function to get all portfolio data
export const getPortfolioData = async () => {
  const [personal, experience, skills, projects, education] = await Promise.all(
    [
      import('./personal'),
      import('./experience'),
      import('./skills'),
      import('./projects'),
      import('./education'),
    ]
  );

  return {
    personal,
    experience,
    skills,
    projects,
    education,
  };
};
