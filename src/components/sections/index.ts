// Export only components that are not dynamically imported
import Hero from './Hero';
export { Hero };
export { default as ImpactMetrics } from './ImpactMetrics';

// For backward compatibility
export { Hero as HeroSection };
