import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaFlask as BeakerIcon,
  FaShieldAlt as ShieldCheckIcon,
  FaUsers as UserGroupIcon,
  FaCog as CogIcon,
  FaFileAlt as DocumentCheckIcon,
  FaGlobe as GlobeAltIcon,
} from 'react-icons/fa';
import { useSectionFocus } from '../../hooks/useFocusManagement';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import {
  createAriaAttributes,
  handleKeyboardActivation,
  focusVisibleClass,
  srOnlyClass,
} from '../../utils/accessibility';

interface Skill {
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface ExpertiseCategory {
  title: string;
  color: string;
  bgColor: string;
  skills: Skill[];
}

const expertiseData: ExpertiseCategory[] = [
  {
    title: 'Technical',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    skills: [
      {
        name: 'TFF',
        description:
          'Tangential Flow Filtration systems design and optimization',
        icon: <CogIcon className="h-6 w-6" />,
      },
      {
        name: 'Chromatography',
        description: 'Protein purification and separation techniques',
        icon: <BeakerIcon className="h-6 w-6" />,
      },
      {
        name: 'Sterile Filtration',
        description: 'Aseptic processing and contamination control',
        icon: <ShieldCheckIcon className="h-6 w-6" />,
      },
      {
        name: 'Viral Filtration',
        description: 'Virus removal and clearance validation',
        icon: <ShieldCheckIcon className="h-6 w-6" />,
      },
      {
        name: 'Formulation',
        description: 'Drug product formulation and stability',
        icon: <BeakerIcon className="h-6 w-6" />,
      },
      {
        name: 'Reactors',
        description: 'Bioreactor design and process control',
        icon: <CogIcon className="h-6 w-6" />,
      },
    ],
  },
  {
    title: 'Regulatory',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    skills: [
      {
        name: 'US FDA',
        description: 'FDA compliance and regulatory submissions',
        icon: <DocumentCheckIcon className="h-6 w-6" />,
      },
      {
        name: 'EU GMP',
        description: 'European Good Manufacturing Practices',
        icon: <GlobeAltIcon className="h-6 w-6" />,
      },
      {
        name: 'Health Canada',
        description: 'Canadian regulatory requirements',
        icon: <DocumentCheckIcon className="h-6 w-6" />,
      },
      {
        name: 'ASME',
        description: 'American Society of Mechanical Engineers standards',
        icon: <CogIcon className="h-6 w-6" />,
      },
      {
        name: 'ICH',
        description: 'International Council for Harmonisation guidelines',
        icon: <GlobeAltIcon className="h-6 w-6" />,
      },
      {
        name: 'ASTM',
        description: 'American Society for Testing and Materials',
        icon: <DocumentCheckIcon className="h-6 w-6" />,
      },
    ],
  },
  {
    title: 'Leadership',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    skills: [
      {
        name: 'Team Lead',
        description: '300+ equipment validation projects managed',
        icon: <UserGroupIcon className="h-6 w-6" />,
      },
      {
        name: '10+ Direct Reports',
        description: 'Cross-functional team management and development',
        icon: <UserGroupIcon className="h-6 w-6" />,
      },
      {
        name: 'Cross-functional',
        description: 'Coordination across engineering, quality, and operations',
        icon: <UserGroupIcon className="h-6 w-6" />,
      },
    ],
  },
];

const HexagonTile: React.FC<{
  skill: Skill;
  category: ExpertiseCategory;
  index: number;
}> = ({ skill, category, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleToggle = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.button
      className={`relative mx-auto h-32 w-32 cursor-pointer ${focusVisibleClass}`}
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: prefersReducedMotion ? 0 : index * 0.1,
        duration: prefersReducedMotion ? 0.01 : 0.5,
      }}
      onHoverStart={prefersReducedMotion ? undefined : () => setIsFlipped(true)}
      onHoverEnd={prefersReducedMotion ? undefined : () => setIsFlipped(false)}
      onClick={handleToggle}
      onKeyDown={e => handleKeyboardActivation(e, handleToggle)}
      {...createAriaAttributes({
        label: `${skill.name} in ${category.title} category. ${isFlipped ? skill.description : 'Press to learn more'}`,
        pressed: isFlipped,
      })}
    >
      <motion.div
        className="preserve-3d relative h-full w-full"
        animate={prefersReducedMotion ? {} : { rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front face */}
        <div
          className={`absolute inset-0 ${category.bgColor} flex flex-col items-center justify-center rounded-lg border-2 border-gray-200 p-4 backface-hidden ${
            prefersReducedMotion && isFlipped ? 'hidden' : ''
          }`}
          style={{ backfaceVisibility: 'hidden' }}
          aria-hidden={isFlipped}
        >
          <div className={`${category.color} mb-2`} aria-hidden="true">
            {skill.icon}
          </div>
          <h4 className={`text-sm font-semibold ${category.color} text-center`}>
            {skill.name}
          </h4>
        </div>

        {/* Back face */}
        <div
          className={`absolute inset-0 ${category.bgColor} flex items-center justify-center rounded-lg border-2 border-gray-200 p-3 backface-hidden ${
            prefersReducedMotion && !isFlipped ? 'hidden' : ''
          }`}
          style={{
            backfaceVisibility: 'hidden',
            transform: prefersReducedMotion ? 'none' : 'rotateY(180deg)',
          }}
          aria-hidden={!isFlipped}
        >
          <p className="text-center text-xs leading-tight text-gray-700">
            {skill.description}
          </p>
        </div>
      </motion.div>

      {/* Screen reader content */}
      <span className={srOnlyClass}>
        {isFlipped ? `Details: ${skill.description}` : `Skill: ${skill.name}`}
      </span>
    </motion.button>
  );
};

const ExpertiseMatrix: React.FC = () => {
  const { sectionRef } = useSectionFocus();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="expertise-matrix"
      className="bg-white py-20"
      {...createAriaAttributes({
        label:
          'Expertise matrix showing technical, regulatory, and leadership skills',
        role: 'region',
      })}
      tabIndex={-1}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
        >
          <h2 className="mb-6 text-4xl font-bold text-blue-900 md:text-5xl">
            Expertise Matrix
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Three pillars of biotech manufacturing excellence: Technical
            mastery, Regulatory compliance, and Leadership experience
          </p>
        </motion.div>

        <div
          className="space-y-16"
          role="group"
          aria-label="Expertise categories"
        >
          {expertiseData.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="text-center"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: prefersReducedMotion ? 0 : categoryIndex * 0.2,
                duration: prefersReducedMotion ? 0.01 : 0.6,
              }}
            >
              <h3 className={`text-3xl font-bold ${category.color} mb-8`}>
                {category.title}
                <span className={srOnlyClass}>expertise category</span>
              </h3>

              <div
                className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6"
                role="group"
                aria-label={`${category.title} skills`}
              >
                {category.skills.map((skill, skillIndex) => (
                  <HexagonTile
                    key={skill.name}
                    skill={skill}
                    category={category}
                    index={skillIndex}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: prefersReducedMotion ? 0 : 0.8,
            duration: prefersReducedMotion ? 0.01 : 0.6,
          }}
        >
          <p className="text-lg text-gray-600 italic">
            {prefersReducedMotion
              ? 'Click on tiles to explore detailed expertise areas'
              : 'Hover over or click tiles to explore detailed expertise areas'}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ExpertiseMatrix;
