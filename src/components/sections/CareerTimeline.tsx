import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaMapMarkerAlt,
  FaGraduationCap,
  FaIndustry,
  FaFlask,
  FaDna,
  FaGlobe,
  FaArrowRight,
} from 'react-icons/fa';
import { mockExperience } from '../../data/experience';
import type { Experience } from '../../types/portfolio';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface TimelineNode {
  year: string;
  experience: Experience;
  icon: React.ReactNode;
  location: 'India' | 'Canada';
  color: string;
  isEducation?: boolean;
}

const CareerTimeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  // Create timeline nodes from experience data
  const timelineNodes: TimelineNode[] = [
    {
      year: '2017',
      experience: mockExperience[5], // Process Engineer at Ind-Swift
      icon: <FaIndustry className="h-6 w-6" />,
      location: 'India',
      color: 'bg-orange-500',
    },
    {
      year: '2019',
      experience: mockExperience[4], // MEng at University of Alberta
      icon: <FaGraduationCap className="h-6 w-6" />,
      location: 'Canada',
      color: 'bg-blue-500',
      isEducation: true,
    },
    {
      year: '2021',
      experience: mockExperience[3], // CQV Specialist at Sanofi
      icon: <FaFlask className="h-6 w-6" />,
      location: 'Canada',
      color: 'bg-green-500',
    },
    {
      year: '2023',
      experience: mockExperience[2], // Specialist at Resilience
      icon: <FaIndustry className="h-6 w-6" />,
      location: 'Canada',
      color: 'bg-purple-500',
    },
    {
      year: '2025',
      experience: mockExperience[0], // Scientific Lead at OmniaBio
      icon: <FaDna className="h-6 w-6" />,
      location: 'Canada',
      color: 'bg-cyan-500',
    },
  ];

  useEffect(() => {
    if (!timelineRef.current) return;

    const ctx = gsap.context(() => {
      // Timeline line animation - enhanced horizontal scroll effect
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 2.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Enhanced staggered node reveals with horizontal movement
      nodesRef.current.forEach((node, index) => {
        if (node) {
          gsap.fromTo(
            node,
            {
              scale: 0,
              opacity: 0,
              x: -100,
              y: 30,
            },
            {
              scale: 1,
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.8,
              delay: index * 0.3,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: timelineRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // Enhanced pulse effect on hover with multiple elements
          node.addEventListener('mouseenter', () => {
            gsap.to(node.querySelector('.node-icon'), {
              scale: 1.3,
              rotation: 5,
              duration: 0.3,
              ease: 'power2.out',
            });
            gsap.to(node.querySelector('.experience-card'), {
              y: -8,
              scale: 1.05,
              duration: 0.3,
              ease: 'power2.out',
            });
            gsap.to(node.querySelectorAll('.pulse-ring'), {
              scale: 1.5,
              opacity: 0.6,
              duration: 0.3,
              stagger: 0.1,
            });
          });

          node.addEventListener('mouseleave', () => {
            gsap.to(node.querySelector('.node-icon'), {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
            gsap.to(node.querySelector('.experience-card'), {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: 'power2.out',
            });
            gsap.to(node.querySelectorAll('.pulse-ring'), {
              scale: 1,
              opacity: 0.2,
              duration: 0.3,
              stagger: 0.1,
            });
          });
        }
      });

      // Animate geographic transition elements
      gsap.fromTo(
        '.geographic-transition',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate the flowing gradient line
      gsap.to('.flowing-gradient', {
        backgroundPosition: '200% 0',
        duration: 3,
        repeat: -1,
        ease: 'none',
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  const formatDateRange = (
    startDate: string,
    endDate: string | null
  ): string => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;

    const startYear = start.getFullYear();
    const endYear = end ? end.getFullYear() : 'Present';

    return `${startYear} - ${endYear}`;
  };

  return (
    <section
      id="career-timeline"
      className="bg-gradient-to-br from-slate-50 to-blue-50 py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Career Timeline
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-600">
            Professional journey from India to Canada: Building expertise in
            biotech manufacturing and process engineering
          </p>
        </motion.div>

        {/* Enhanced Geographic Transition Visualization */}
        <div className="geographic-transition mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-lg"
          >
            {/* Map Background */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-50 via-blue-50 to-cyan-50 opacity-50"></div>

            <div className="relative z-10">
              <h3 className="mb-8 text-center text-2xl font-bold text-slate-800">
                Professional Journey: India → Canada
              </h3>

              <div className="flex items-center justify-between">
                {/* India Section */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <FaGlobe className="h-16 w-16 text-orange-500" />
                    <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500">
                      <FaMapMarkerAlt className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-lg font-bold text-orange-600">India</h4>
                    <p className="text-sm text-slate-600">Chandigarh</p>
                    <p className="text-xs text-slate-500">2017-2019</p>
                    <div className="mt-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                      Process Engineer
                    </div>
                  </div>
                </div>

                {/* Animated Journey Path */}
                <div className="relative mx-8 flex-1">
                  <div className="flowing-gradient relative h-2 overflow-hidden rounded-full bg-gradient-to-r from-orange-400 via-blue-400 to-cyan-400">
                    <div className="flowing-gradient absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
                  </div>

                  {/* Journey Milestones */}
                  <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 transform">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-yellow-400"></div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 transform text-xs whitespace-nowrap text-slate-600">
                      Decision Point
                    </div>
                  </div>

                  <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 transform">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-green-400"></div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 transform text-xs whitespace-nowrap text-slate-600">
                      Immigration
                    </div>
                  </div>

                  {/* Animated Arrow */}
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 transform">
                    <FaArrowRight className="h-6 w-6 animate-bounce text-blue-500" />
                  </div>
                </div>

                {/* Canada Section */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <FaGlobe className="h-16 w-16 text-blue-500" />
                    <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
                      <FaMapMarkerAlt className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-lg font-bold text-blue-600">Canada</h4>
                    <p className="text-sm text-slate-600">
                      Edmonton → Hamilton
                    </p>
                    <p className="text-xs text-slate-500">2019-Present</p>
                    <div className="mt-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                      Scientific Lead
                    </div>
                  </div>
                </div>
              </div>

              {/* Journey Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 p-3">
                  <div className="text-lg font-bold text-orange-700">2017</div>
                  <div className="text-xs text-orange-600">Journey Started</div>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 p-3">
                  <div className="text-lg font-bold text-blue-700">8+</div>
                  <div className="text-xs text-blue-600">Years Growth</div>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-cyan-100 to-cyan-200 p-3">
                  <div className="text-lg font-bold text-cyan-700">5</div>
                  <div className="text-xs text-cyan-600">Companies</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative">
          {/* Enhanced Timeline Line */}
          <div
            ref={lineRef}
            className="absolute top-1/2 left-0 h-2 w-full origin-left -translate-y-1/2 transform rounded-full bg-gradient-to-r from-orange-400 via-blue-400 to-cyan-400 shadow-lg"
            style={{ transformOrigin: 'left center' }}
          >
            {/* Flowing animation overlay */}
            <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
          </div>

          {/* Timeline Nodes */}
          <div className="relative flex items-center justify-between py-8">
            {timelineNodes.map((node, index) => (
              <div
                key={node.year}
                ref={el => {
                  nodesRef.current[index] = el;
                }}
                className="group flex cursor-pointer flex-col items-center"
                style={{ flex: '1', maxWidth: '200px' }}
              >
                {/* Enhanced Node Icon */}
                <div
                  className={`node-icon relative h-20 w-20 ${node.color} mb-4 flex items-center justify-center rounded-full text-white shadow-xl transition-all duration-300 group-hover:shadow-2xl`}
                >
                  {node.icon}

                  {/* Enhanced pulse rings */}
                  <div className="pulse-ring absolute inset-0 animate-ping rounded-full bg-current opacity-20"></div>
                  <div className="pulse-ring absolute inset-0 animate-pulse rounded-full bg-current opacity-30"></div>
                  <div className="pulse-ring absolute -inset-2 animate-ping rounded-full bg-current opacity-10"></div>

                  {/* Orbital ring */}
                  <div
                    className="absolute -inset-4 animate-spin rounded-full border-2 border-current opacity-20"
                    style={{ animationDuration: '8s' }}
                  ></div>
                </div>

                {/* Year Label */}
                <div className="mb-2 text-2xl font-bold text-slate-800">
                  {node.year}
                </div>

                {/* Location Badge */}
                <div
                  className={`mb-3 rounded-full px-3 py-1 text-sm font-medium ${
                    node.location === 'India'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {node.location}
                </div>

                {/* Enhanced Experience Card */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="experience-card max-w-xs rounded-xl border border-slate-100 bg-white p-5 text-center shadow-lg transition-all duration-300 group-hover:shadow-xl"
                >
                  <h3 className="mb-2 text-sm leading-tight font-bold text-slate-900">
                    {node.experience.position}
                  </h3>
                  <p className="mb-2 text-xs font-medium text-slate-600">
                    {node.experience.company}
                  </p>
                  <p className="mb-3 text-xs text-slate-500">
                    {formatDateRange(
                      node.experience.startDate,
                      node.experience.endDate
                    )}
                  </p>

                  {/* Key Achievement */}
                  {node.experience.achievements.length > 0 && (
                    <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-slate-700">
                      {node.experience.achievements[0]}
                    </p>
                  )}

                  {/* Enhanced Metrics */}
                  {node.experience.metrics &&
                    node.experience.metrics.length > 0 && (
                      <div className="mt-3 border-t border-slate-200 pt-3">
                        <div className="flex items-center justify-center space-x-2">
                          <div
                            className={`h-2 w-2 rounded-full ${node.color.replace('bg-', 'bg-')}`}
                          ></div>
                          <div className="text-xs text-slate-600">
                            <span className="text-sm font-bold text-slate-800">
                              {node.experience.metrics[0].value}
                            </span>
                            {node.experience.metrics[0].unit && (
                              <span className="ml-1 text-slate-500">
                                {node.experience.metrics[0].unit}
                              </span>
                            )}
                          </div>
                        </div>
                        {node.experience.metrics[0].label && (
                          <div className="mt-1 text-xs text-slate-500">
                            {node.experience.metrics[0].label}
                          </div>
                        )}
                      </div>
                    )}

                  {/* Technology Tags */}
                  {node.experience.technologies.length > 0 && (
                    <div className="mt-3 border-t border-slate-100 pt-2">
                      <div className="flex flex-wrap justify-center gap-1">
                        {node.experience.technologies
                          .slice(0, 2)
                          .map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600"
                            >
                              {tech}
                            </span>
                          ))}
                        {node.experience.technologies.length > 2 && (
                          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500">
                            +{node.experience.technologies.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-2 text-3xl font-bold text-blue-600">8+</div>
              <div className="text-slate-600">Years Experience</div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-2 text-3xl font-bold text-green-600">5</div>
              <div className="text-slate-600">Companies</div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-2 text-3xl font-bold text-purple-600">2</div>
              <div className="text-slate-600">Countries</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CareerTimeline;
