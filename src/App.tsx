import React, { Suspense } from 'react';
import { Layout } from './components/layout';
import { HeroSection, ImpactMetrics } from './components/sections';
import SEO from './components/SEO';

// Lazy load sections for better performance
const CareerTimelineSection = React.lazy(
  () => import('./components/sections/CareerTimeline')
);
const ExpertiseMatrixSection = React.lazy(
  () => import('./components/sections/ExpertiseMatrix')
);
const ProcessFlowSection = React.lazy(
  () => import('./components/sections/ProcessFlow')
);
const SkillsRadarSection = React.lazy(
  () => import('./components/sections/SkillsRadar')
);
const CurrentFocusSection = React.lazy(
  () => import('./components/sections/CurrentFocus')
);
const EducationSection = React.lazy(
  () => import('./components/sections/Education')
);
const ToolsSection = React.lazy(() => import('./components/sections/Tools'));
const ContactSection = React.lazy(
  () => import('./components/sections/Contact')
);

// Loading component
const SectionLoader: React.FC = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-50">
    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <>
      <SEO />
      <Layout>
        <HeroSection />
        <ImpactMetrics />
        <Suspense fallback={<SectionLoader />}>
          <CareerTimelineSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ExpertiseMatrixSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ProcessFlowSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <SkillsRadarSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <CurrentFocusSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <EducationSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ToolsSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
