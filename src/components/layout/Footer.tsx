import React from 'react';
import { motion } from 'framer-motion';
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowUp,
} from 'react-icons/fa';
import { socialLinks, contactInfo, personalInfo } from '../../data/personal';
import type { SocialLink } from '../../types/portfolio';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const getIconComponent = (iconName: string) => {
    const icons: {
      [key: string]: React.ComponentType<{ className?: string }>;
    } = {
      FaLinkedin,
      FaGithub,
      FaEnvelope,
      FaPhone,
    };
    return icons[iconName] || FaEnvelope;
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <footer className="from-primary-900 via-primary-800 to-primary-900 relative overflow-hidden bg-gradient-to-br text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="from-accent-500/20 absolute inset-0 bg-gradient-to-r to-transparent"></div>
        <div className="bg-accent-500/10 absolute top-0 left-1/4 h-96 w-96 rounded-full blur-3xl"></div>
        <div className="bg-primary-500/10 absolute right-1/4 bottom-0 h-96 w-96 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {/* About Section */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <h3 className="mb-4 text-2xl font-bold text-white">
                {personalInfo.name}
              </h3>
              <p className="text-primary-200 mb-6 leading-relaxed">
                {personalInfo.title}
              </p>
              <p className="text-primary-300 max-w-md text-sm leading-relaxed">
                Specializing in CAR-T manufacturing, scale-up, and technology
                transfer with 8+ years of biotech/biopharma experience. Expert
                in process optimization, regulatory compliance, and leading
                cross-functional teams to deliver precision-engineered
                solutions.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="mb-4 text-lg font-semibold text-white">
                Quick Links
              </h4>
              <nav className="space-y-3">
                {[
                  { label: 'Hero', id: 'hero' },
                  { label: 'Impact Metrics', id: 'impact-metrics' },
                  { label: 'Career Timeline', id: 'career-timeline' },
                  { label: 'Expertise Matrix', id: 'expertise-matrix' },
                  { label: 'Process Flow', id: 'process-flow' },
                  { label: 'Skills Radar', id: 'skills-radar' },
                  { label: 'Current Focus', id: 'current-focus' },
                  { label: 'Education', id: 'education' },
                  { label: 'Tools', id: 'tools' },
                  { label: 'Contact', id: 'contact' },
                ].map(link => (
                  <motion.button
                    key={link.id}
                    onClick={() => {
                      const element = document.querySelector(`#${link.id}`);
                      if (element) {
                        element.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        });
                      }
                    }}
                    whileHover={{ x: 5 }}
                    className="text-primary-300 hover:text-accent-400 block text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <h4 className="mb-4 text-lg font-semibold text-white">
                Get In Touch
              </h4>
              <div className="space-y-3">
                <motion.a
                  href={`mailto:${contactInfo.email}`}
                  whileHover={{ x: 5 }}
                  className="text-primary-300 hover:text-accent-400 flex items-center text-sm transition-colors duration-300"
                >
                  <FaEnvelope className="mr-3 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{contactInfo.email}</span>
                </motion.a>

                {contactInfo.phone && (
                  <motion.a
                    href={`tel:${contactInfo.phone}`}
                    whileHover={{ x: 5 }}
                    className="text-primary-300 hover:text-accent-400 flex items-center text-sm transition-colors duration-300"
                  >
                    <FaPhone className="mr-3 h-4 w-4 flex-shrink-0" />
                    <span>{contactInfo.phone}</span>
                  </motion.a>
                )}

                <motion.div
                  whileHover={{ x: 5 }}
                  className="text-primary-300 flex items-center text-sm"
                >
                  <FaMapMarkerAlt className="mr-3 h-4 w-4 flex-shrink-0" />
                  <span>{contactInfo.location}</span>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="border-primary-700 mt-12 border-t pt-8"
          >
            <div className="flex flex-col items-center justify-between sm:flex-row">
              <div className="mb-4 flex items-center space-x-6 sm:mb-0">
                {socialLinks.map((social: SocialLink) => {
                  const IconComponent = getIconComponent(social.icon);
                  return (
                    <motion.a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-primary-300 hover:text-accent-400 transition-colors duration-300"
                      aria-label={social.label}
                    >
                      <IconComponent className="h-6 w-6" />
                    </motion.a>
                  );
                })}
              </div>

              {/* Back to Top Button */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-primary-300 hover:text-accent-400 flex items-center space-x-2 text-sm transition-colors duration-300"
                aria-label="Back to top"
              >
                <span>Back to Top</span>
                <FaArrowUp className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-primary-700 bg-primary-950/50 border-t"
        >
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="text-primary-400 flex flex-col items-center justify-between text-sm sm:flex-row">
              <p className="mb-2 sm:mb-0">
                © {currentYear} {personalInfo.name}. All rights reserved.
              </p>
              <motion.p
                whileHover={{ scale: 1.05 }}
                className="flex items-center font-medium tracking-wide"
              >
                DESIGNED & ENGINEERED WITH PRECISION
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
