import React from 'react';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

// Export the new components
import Hero from './Hero';
export { Hero as HeroSection };
export { default as ExpertiseMatrix } from './ExpertiseMatrix';
export { default as ProcessFlow } from './ProcessFlow';
export { default as SkillsRadar } from './SkillsRadar';

export const ImpactMetricsSection: React.FC = () => (
  <motion.section
    id="impact-metrics"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-100px' }}
    className="bg-gray-50 py-20"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="mb-8 text-3xl font-bold text-blue-900 md:text-4xl">
          Impact Metrics
        </h2>
        <p className="mx-auto max-w-3xl text-lg text-gray-600">
          Quantified achievements: 300+ Equipment Validated, 10+ Projects Led, 8
          Years Experience, 3.94 Masters GPA
        </p>
      </div>
    </div>
  </motion.section>
);

export const CareerTimelineSection: React.FC = () => (
  <motion.section
    id="career-timeline"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-100px' }}
    className="bg-white py-20"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="mb-8 text-3xl font-bold text-blue-900 md:text-4xl">
          Career Timeline
        </h2>
        <p className="mx-auto max-w-3xl text-lg text-gray-600">
          Professional journey from India to Canada: 2017 → 2019 → 2021 → 2023 →
          2025
        </p>
      </div>
    </div>
  </motion.section>
);

// Use the actual ExpertiseMatrix component
export { default as ExpertiseMatrixSection } from './ExpertiseMatrix';

// Use the actual ProcessFlow component
export { default as ProcessFlowSection } from './ProcessFlow';

// Use the actual SkillsRadar component
export { default as SkillsRadarSection } from './SkillsRadar';

export const CurrentFocusSection: React.FC = () => (
  <motion.section
    id="current-focus"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-100px' }}
    className="bg-white py-20"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="mb-8 text-3xl font-bold text-blue-900 md:text-4xl">
          Current Focus
        </h2>
        <p className="mx-auto max-w-3xl text-lg text-gray-600">
          CAR-T Tech Transfer, Chain of Identity development, and Risk
          Assessment using FMEA
        </p>
      </div>
    </div>
  </motion.section>
);

export const EducationSection: React.FC = () => (
  <motion.section
    id="education"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-100px' }}
    className="bg-gray-50 py-20"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="mb-8 text-3xl font-bold text-blue-900 md:text-4xl">
          Education
        </h2>
        <p className="mx-auto max-w-3xl text-lg text-gray-600">
          MEng Chemical Engineering (University of Alberta, 3.94 GPA) and BEng
          Chemical Engineering (Panjab University)
        </p>
      </div>
    </div>
  </motion.section>
);

export const ToolsSection: React.FC = () => (
  <motion.section
    id="tools"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-100px' }}
    className="bg-white py-20"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="mb-8 text-3xl font-bold text-blue-900 md:text-4xl">
          Tools & Technologies
        </h2>
        <p className="mx-auto max-w-3xl text-lg text-gray-600">
          Professional tools: Excel, Visio, Veeva, Lucidchart, Fieldwire,
          Trackwise, Statistical tools
        </p>
      </div>
    </div>
  </motion.section>
);
