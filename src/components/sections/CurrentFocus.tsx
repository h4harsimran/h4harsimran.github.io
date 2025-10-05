import React from 'react';
import { motion } from 'framer-motion';
import { FaDna, FaShieldAlt, FaExclamationTriangle } from 'react-icons/fa';
import { getCurrentFocusProjects } from '../../data/projects';

const CurrentFocus: React.FC = () => {
  const projects = getCurrentFocusProjects();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: -50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const hoverVariants = {
    hover: {
      scale: 1.05,
      y: -10,
      boxShadow: '0 20px 40px rgba(30, 58, 138, 0.2)',
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const getProjectIcon = (title: string) => {
    if (title.includes('CAR-T')) return <FaDna className="h-8 w-8" />;
    if (title.includes('Chain')) return <FaShieldAlt className="h-8 w-8" />;
    if (title.includes('Risk'))
      return <FaExclamationTriangle className="h-8 w-8" />;
    return <FaDna className="h-8 w-8" />;
  };

  const getProjectColor = (title: string) => {
    if (title.includes('CAR-T')) return 'from-blue-500 to-cyan-400';
    if (title.includes('Chain')) return 'from-green-500 to-teal-400';
    if (title.includes('Risk')) return 'from-amber-500 to-orange-400';
    return 'from-blue-500 to-cyan-400';
  };

  return (
    <section
      id="current-focus"
      className="bg-gradient-to-br from-gray-50 to-white py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-primary-900 mb-6 text-4xl font-bold md:text-5xl">
            Current Focus
          </h2>
          <div className="from-primary-600 to-accent-500 mx-auto mb-6 h-1 w-24 bg-gradient-to-r"></div>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
            Leading cutting-edge initiatives in CAR-T manufacturing, quality
            systems, and risk management
          </p>
        </motion.div>

        {/* Project Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map(project => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover="hover"
              className="group relative"
            >
              <motion.div
                variants={hoverVariants}
                className="h-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg"
              >
                {/* Card Header with Icon */}
                <div
                  className={`bg-gradient-to-r ${getProjectColor(project.title)} relative overflow-hidden p-6 text-white`}
                >
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getProjectIcon(project.title)}
                      <h3 className="text-xl font-bold">{project.title}</h3>
                    </div>
                    <div className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
                      {project.category}
                    </div>
                  </div>

                  {/* Animated particles */}
                  <div className="absolute top-0 right-0 h-32 w-32 opacity-20">
                    <motion.div
                      animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        rotate: {
                          duration: 20,
                          repeat: Infinity,
                          ease: 'linear',
                        },
                        scale: {
                          duration: 4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        },
                      }}
                      className="h-full w-full rounded-full border-2 border-white/30"
                    />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <p className="mb-6 leading-relaxed text-gray-600">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold tracking-wide text-gray-800 uppercase">
                      Key Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies
                        .slice(0, 4)
                        .map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: techIndex * 0.1 }}
                            className="hover:bg-primary-100 hover:text-primary-700 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 transition-colors duration-200"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      {project.technologies.length > 4 && (
                        <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-500">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="from-primary-900/5 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent"
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="mb-6 text-lg text-gray-600">
            Driving innovation in CAR-T manufacturing and biotechnology
            processes
          </p>
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-primary-600 inline-flex items-center space-x-2 font-semibold"
          >
            <FaDna className="h-5 w-5" />
            <span>Engineering Precision in Every Process</span>
            <FaDna className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CurrentFocus;
