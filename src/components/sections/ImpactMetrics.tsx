import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import AnimatedCounter from '../ui/AnimatedCounter';

const ImpactMetrics: React.FC = () => {
  const metrics = [
    {
      end: 300,
      suffix: '+',
      label: 'Equipment Validated',
      description: 'Commissioned & qualified across multiple facilities',
    },
    {
      end: 10,
      suffix: '+',
      label: 'Projects Led',
      description: 'Successfully delivered from concept to completion',
    },
    {
      end: 8,
      suffix: '',
      label: 'Years Experience',
      description: 'In biotech/pharma manufacturing sciences',
    },
    {
      end: 3.94,
      decimals: 2,
      suffix: '',
      label: 'Masters GPA',
      description: 'MEng Chemical Engineering, University of Alberta',
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="impact-metrics"
      className="relative bg-gradient-to-b from-white to-slate-50 py-20 dark:from-slate-900 dark:to-slate-800"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-4 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute -right-4 bottom-1/4 h-72 w-72 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl dark:text-slate-100">
            Impact by the{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Numbers
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Quantifiable achievements in manufacturing sciences and technology
            leadership
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex justify-center"
            >
              <AnimatedCounter
                end={metric.end}
                suffix={metric.suffix}
                decimals={metric.decimals}
                label={metric.label}
                description={metric.description}
                className="w-full max-w-sm"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-blue-500" />
            <span className="text-sm font-medium">
              PRECISION IN EVERY PROJECT
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
