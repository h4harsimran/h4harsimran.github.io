import React from 'react';
import { motion } from 'framer-motion';
import {
  FaGraduationCap,
  FaMapMarkerAlt,
  FaStar,
  FaBook,
} from 'react-icons/fa';
import {
  getCanadianEducation,
  getIndianEducation,
  type Education as EducationType,
} from '../../data/education';

const Education: React.FC = () => {
  const canadianEducation = getCanadianEducation();
  const indianEducation = getIndianEducation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const floatingAnimation = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-5, 5, -5],
    },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  };

  const EducationCard: React.FC<{
    education: EducationType;
    side: 'left' | 'right';
    country: string;
    gradient: string;
  }> = ({ education, side, country, gradient }) => (
    <motion.div
      variants={side === 'left' ? slideInLeft : slideInRight}
      className="relative"
    >
      <div
        className={`bg-gradient-to-br ${gradient} relative overflow-hidden rounded-2xl p-8 text-white shadow-xl`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 h-32 w-32">
            <motion.div {...floatingAnimation} className="h-full w-full">
              <FaGraduationCap className="h-full w-full" />
            </motion.div>
          </div>
        </div>

        {/* Country Flag/Indicator */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-6 w-8 items-center justify-center rounded-sm bg-white/20">
              <span className="text-xs font-bold">
                {country === 'Canada' ? '🇨🇦' : '🇮🇳'}
              </span>
            </div>
            <h3 className="text-2xl font-bold">{country}</h3>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/30"
          >
            <FaGraduationCap className="h-6 w-6" />
          </motion.div>
        </div>

        {/* Education Details */}
        <div className="relative z-10 space-y-4">
          <div>
            <h4 className="mb-2 text-xl font-bold">
              {education.degree} {education.field}
            </h4>
            <div className="mb-2 flex items-center space-x-2 text-white/90">
              <FaMapMarkerAlt className="h-4 w-4" />
              <span>{education.institution}</span>
            </div>
            <div className="mb-4 flex items-center space-x-2 text-white/90">
              <FaBook className="h-4 w-4" />
              <span>{education.location}</span>
            </div>
          </div>

          {/* GPA Display */}
          <div className="rounded-lg bg-white/20 p-4 backdrop-blur-sm">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">GPA</span>
              <div className="flex items-center space-x-1">
                <FaStar className="h-4 w-4 text-yellow-300" />
                <span className="text-lg font-bold">{education.gpa}</span>
                <span className="text-sm opacity-75">/ {education.maxGpa}</span>
              </div>
            </div>
            <div className="h-2 w-full rounded-full bg-white/20">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{
                  width: `${(education.gpa / education.maxGpa) * 100}%`,
                }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-2 rounded-full bg-white"
              />
            </div>
          </div>

          {/* Duration */}
          <div className="text-sm text-white/80">
            {new Date(education.startDate).getFullYear()} -{' '}
            {new Date(education.endDate).getFullYear()}
          </div>

          {/* Key Achievements */}
          <div className="space-y-2">
            <h5 className="text-sm font-semibold tracking-wide uppercase">
              Key Achievements
            </h5>
            <ul className="space-y-1 text-sm text-white/90">
              {education.achievements
                .slice(0, 3)
                .map((achievement: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.8 }}
                    className="flex items-start space-x-2"
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white" />
                    <span>{achievement}</span>
                  </motion.li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section
      id="education"
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="bg-primary-600 absolute top-20 left-10 h-64 w-64 rounded-full blur-3xl" />
        <div className="bg-accent-500 absolute right-10 bottom-20 h-96 w-96 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-primary-900 mb-6 text-4xl font-bold md:text-5xl">
            Education Journey
          </h2>
          <div className="from-primary-600 to-accent-500 mx-auto mb-6 h-1 w-24 bg-gradient-to-r"></div>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
            Academic excellence across two continents, building the foundation
            for engineering innovation
          </p>
        </motion.div>

        {/* Animated Map Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="relative mb-16"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-100 via-cyan-50 to-blue-100 p-8">
            <div className="flex items-center justify-center space-x-8 md:space-x-16">
              {/* Edmonton Marker */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <motion.div
                  {...floatingAnimation}
                  className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg"
                >
                  <FaGraduationCap className="h-8 w-8 text-white" />
                </motion.div>
                <div className="text-sm font-semibold text-gray-700">
                  Edmonton, AB
                </div>
                <div className="text-xs text-gray-500">
                  University of Alberta
                </div>
              </motion.div>

              {/* Connection Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="relative h-0.5 flex-1 origin-left bg-gradient-to-r from-red-400 to-orange-400"
              >
                <motion.div
                  animate={{ x: [-10, 10, -10] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-yellow-400"
                />
              </motion.div>

              {/* Chandigarh Marker */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <motion.div
                  {...floatingAnimation}
                  transition={{ ...floatingAnimation.transition, delay: 2 }}
                  className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg"
                >
                  <FaGraduationCap className="h-8 w-8 text-white" />
                </motion.div>
                <div className="text-sm font-semibold text-gray-700">
                  Chandigarh
                </div>
                <div className="text-xs text-gray-500">Panjab University</div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Split Screen Education Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12"
        >
          {/* Canada Education */}
          {canadianEducation.map(edu => (
            <EducationCard
              key={edu.id}
              education={edu}
              side="left"
              country="Canada"
              gradient="from-red-600 via-red-500 to-red-400"
            />
          ))}

          {/* India Education */}
          {indianEducation.map(edu => (
            <EducationCard
              key={edu.id}
              education={edu}
              side="right"
              country="India"
              gradient="from-orange-600 via-orange-500 to-amber-400"
            />
          ))}
        </motion.div>

        {/* Bottom Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="rounded-2xl border border-white/20 bg-white/80 p-8 shadow-lg backdrop-blur-sm">
            <h3 className="text-primary-900 mb-4 text-2xl font-bold">
              Academic Excellence Across Continents
            </h3>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              From foundational engineering principles in India to advanced
              process control specialization in Canada, building the expertise
              that drives innovation in biotechnology manufacturing.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
