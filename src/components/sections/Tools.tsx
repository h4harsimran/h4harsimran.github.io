import React from 'react';
import { motion } from 'framer-motion';
import {
  FaFileExcel,
  FaSitemap,
  FaChartLine,
  FaDatabase,
  FaClipboardList,
  FaTools,
  FaChartBar,
  FaMicroscope,
  FaCog,
  FaLaptopCode,
} from 'react-icons/fa';
import { toolsAndTechnologies } from '../../data/education';

const Tools: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const toolVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const pulseAnimation = {
    scale: [1, 1.1, 1],
    boxShadow: [
      '0 0 0 0 rgba(30, 58, 138, 0)',
      '0 0 0 10px rgba(30, 58, 138, 0.1)',
      '0 0 0 0 rgba(30, 58, 138, 0)',
    ],
  };

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      FaFileExcel: <FaFileExcel className="h-8 w-8" />,
      FaSitemap: <FaSitemap className="h-8 w-8" />,
      FaChartLine: <FaChartLine className="h-8 w-8" />,
      FaDatabase: <FaDatabase className="h-8 w-8" />,
      FaClipboardList: <FaClipboardList className="h-8 w-8" />,
      FaTools: <FaTools className="h-8 w-8" />,
      FaChartBar: <FaChartBar className="h-8 w-8" />,
      FaMicroscope: <FaMicroscope className="h-8 w-8" />,
    };
    return iconMap[iconName] || <FaCog className="h-8 w-8" />;
  };

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      'Office & Documentation': 'from-blue-500 to-blue-600',
      'Quality & Compliance': 'from-green-500 to-green-600',
      'Project Management': 'from-purple-500 to-purple-600',
      'Analysis & Laboratory': 'from-orange-500 to-orange-600',
    };
    return colorMap[category] || 'from-gray-500 to-gray-600';
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'Office & Documentation': <FaLaptopCode className="h-6 w-6" />,
      'Quality & Compliance': <FaClipboardList className="h-6 w-6" />,
      'Project Management': <FaTools className="h-6 w-6" />,
      'Analysis & Laboratory': <FaMicroscope className="h-6 w-6" />,
    };
    return iconMap[category] || <FaCog className="h-6 w-6" />;
  };

  return (
    <section
      id="tools"
      className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50 py-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="bg-primary-600 absolute top-10 right-10 h-72 w-72 rounded-full blur-3xl" />
        <div className="bg-accent-500 absolute bottom-10 left-10 h-96 w-96 rounded-full blur-3xl" />
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
            Tools & Technologies
          </h2>
          <div className="from-primary-600 to-accent-500 mx-auto mb-6 h-1 w-24 bg-gradient-to-r"></div>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
            Professional toolkit for engineering excellence and process
            optimization
          </p>
        </motion.div>

        {/* Tools Grid by Category */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-12"
        >
          {toolsAndTechnologies.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              variants={categoryVariants}
              className="relative"
            >
              {/* Category Header */}
              <div className="mb-8 flex items-center justify-center">
                <div
                  className={`bg-gradient-to-r ${getCategoryColor(category.category)} flex items-center space-x-3 rounded-full px-6 py-3 text-white shadow-lg`}
                >
                  {getCategoryIcon(category.category)}
                  <h3 className="text-lg font-bold">{category.category}</h3>
                </div>
              </div>

              {/* Tools Grid */}
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {category.tools.map((tool, toolIndex) => (
                  <motion.div
                    key={tool.name}
                    variants={toolVariants}
                    whileHover={{
                      scale: 1.1,
                      y: -5,
                      transition: {
                        type: 'spring' as const,
                        stiffness: 300,
                        damping: 20,
                      },
                    }}
                    className="group relative"
                  >
                    <div className="hover:border-primary-200 relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300">
                      {/* Pulse Animation on Hover */}
                      <motion.div
                        animate={pulseAnimation}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: categoryIndex * 0.5 + toolIndex * 0.1,
                        }}
                        className="absolute inset-0 rounded-2xl"
                      />

                      {/* Tool Icon */}
                      <div className="relative z-10 flex flex-col items-center space-y-3">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className={`h-16 w-16 bg-gradient-to-br ${getCategoryColor(category.category)} flex items-center justify-center rounded-xl text-white shadow-lg transition-shadow duration-300 group-hover:shadow-xl`}
                        >
                          {getIcon(tool.icon)}
                        </motion.div>

                        {/* Tool Name */}
                        <h4 className="text-center text-sm leading-tight font-semibold text-gray-800">
                          {tool.name}
                        </h4>

                        {/* Proficiency Bar */}
                        <div className="w-full">
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              Proficiency
                            </span>
                            <span className="text-xs font-medium text-gray-700">
                              {tool.proficiency}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-gray-200">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${tool.proficiency}%` }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 1.5,
                                delay: categoryIndex * 0.2 + toolIndex * 0.1,
                                ease: 'easeOut' as const,
                              }}
                              className={`bg-gradient-to-r ${getCategoryColor(category.category)} h-1.5 rounded-full`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Hover Glow Effect */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(category.category)} rounded-2xl opacity-5`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
              Comprehensive Technical Toolkit
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-lg text-gray-600">
              Leveraging industry-standard tools and technologies to deliver
              precision engineering solutions in biotechnology manufacturing and
              process optimization.
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
              <div className="text-center">
                <div className="text-primary-600 text-2xl font-bold">8+</div>
                <div className="text-sm text-gray-600">Core Tools</div>
              </div>
              <div className="text-center">
                <div className="text-primary-600 text-2xl font-bold">4</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-primary-600 text-2xl font-bold">90%+</div>
                <div className="text-sm text-gray-600">Avg Proficiency</div>
              </div>
              <div className="text-center">
                <div className="text-primary-600 text-2xl font-bold">8</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Tools;
