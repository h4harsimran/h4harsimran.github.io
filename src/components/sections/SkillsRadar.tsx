import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  value: number; // 0-100
  color: string;
  description: string;
}

const skillsData: Skill[] = [
  {
    name: 'Scale-up & Tech Transfer',
    value: 95,
    color: '#1E40AF',
    description: 'Leading technology transfer from R&D to manufacturing scale',
  },
  {
    name: 'Risk Assessment',
    value: 90,
    color: '#0891B2',
    description: 'FMEA methodology and process risk evaluation',
  },
  {
    name: 'Process Design',
    value: 88,
    color: '#059669',
    description: 'Manufacturing process development and optimization',
  },
  {
    name: 'Qualification',
    value: 92,
    color: '#7C3AED',
    description: 'Equipment and process qualification (IQ/OQ/PQ)',
  },
  {
    name: 'Project Management',
    value: 85,
    color: '#DC2626',
    description: 'Leading cross-functional teams and complex projects',
  },
  {
    name: 'Data Analysis',
    value: 87,
    color: '#EA580C',
    description: 'Statistical analysis and process control',
  },
  {
    name: 'Statistical Control',
    value: 83,
    color: '#CA8A04',
    description: 'SPC implementation and process monitoring',
  },
  {
    name: 'HAZOP Study',
    value: 89,
    color: '#9333EA',
    description: 'Hazard and operability studies for process safety',
  },
];

const SkillsRadar: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const centerX = 200;
  const centerY = 200;
  const maxRadius = 150;
  const levels = 5;

  // Calculate polygon points for radar chart
  const getPolygonPoints = (values: number[]) => {
    const angleStep = (2 * Math.PI) / values.length;
    return values
      .map((value, index) => {
        const angle = index * angleStep - Math.PI / 2; // Start from top
        const radius = (value / 100) * maxRadius;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(' ');
  };

  // Calculate axis line endpoints
  const getAxisPoints = () => {
    const angleStep = (2 * Math.PI) / skillsData.length;
    return skillsData.map((_, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const x = centerX + maxRadius * Math.cos(angle);
      const y = centerY + maxRadius * Math.sin(angle);
      return { x, y, angle };
    });
  };

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    // Skip animations in test environment
    if (typeof window === 'undefined' || import.meta.env.MODE === 'test')
      return;

    const ctx = gsap.context(() => {
      // Animate radar grid
      gsap.fromTo(
        '.radar-grid',
        { opacity: 0, scale: 0 },
        {
          opacity: 0.3,
          scale: 1,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate axis lines
      gsap.fromTo(
        '.radar-axis',
        { opacity: 0, scaleY: 0, transformOrigin: 'center center' },
        {
          opacity: 0.4,
          scaleY: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate skill polygon
      gsap.fromTo(
        '.skill-polygon',
        { opacity: 0, scale: 0 },
        {
          opacity: 0.7,
          scale: 1,
          duration: 1.2,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate skill points
      gsap.fromTo(
        '.skill-point',
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 40%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate skill labels
      gsap.fromTo(
        '.skill-label',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const axisPoints = getAxisPoints();
  const polygonPoints = getPolygonPoints(skillsData.map(skill => skill.value));

  return (
    <section id="skills-radar" className="bg-white py-20" ref={containerRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-6 text-4xl font-bold text-blue-900 md:text-5xl">
            Skills Radar Chart
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Comprehensive competency mapping across biotech manufacturing
            disciplines
          </p>
        </motion.div>

        <div className="flex flex-col items-center justify-center gap-12 lg:flex-row">
          {/* Radar Chart */}
          <div className="relative">
            <svg
              ref={svgRef}
              width="400"
              height="400"
              viewBox="0 0 400 400"
              className="drop-shadow-lg"
            >
              {/* Background circles (grid) */}
              {Array.from({ length: levels }, (_, i) => (
                <circle
                  key={i}
                  className="radar-grid"
                  cx={centerX}
                  cy={centerY}
                  r={(maxRadius / levels) * (i + 1)}
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="1"
                />
              ))}

              {/* Axis lines */}
              {axisPoints.map((point, index) => (
                <line
                  key={index}
                  className="radar-axis"
                  x1={centerX}
                  y1={centerY}
                  x2={point.x}
                  y2={point.y}
                  stroke="#D1D5DB"
                  strokeWidth="1"
                />
              ))}

              {/* Skill polygon */}
              <polygon
                className="skill-polygon"
                points={polygonPoints}
                fill="url(#radarGradient)"
                stroke="#1E40AF"
                strokeWidth="2"
              />

              {/* Skill points */}
              {skillsData.map((skill, index) => {
                const angle =
                  (index * 2 * Math.PI) / skillsData.length - Math.PI / 2;
                const radius = (skill.value / 100) * maxRadius;
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);

                return (
                  <circle
                    key={skill.name}
                    className="skill-point cursor-pointer"
                    cx={x}
                    cy={y}
                    r="6"
                    fill={skill.color}
                    stroke="white"
                    strokeWidth="2"
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  />
                );
              })}

              {/* Skill labels */}
              {skillsData.map((skill, index) => {
                const angle =
                  (index * 2 * Math.PI) / skillsData.length - Math.PI / 2;
                const labelRadius = maxRadius + 30;
                const x = centerX + labelRadius * Math.cos(angle);
                const y = centerY + labelRadius * Math.sin(angle);

                return (
                  <text
                    key={skill.name}
                    className="skill-label cursor-pointer text-xs font-medium"
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#374151"
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {skill.name}
                  </text>
                );
              })}

              {/* Gradient definition */}
              <defs>
                <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.1" />
                </radialGradient>
              </defs>
            </svg>

            {/* Center label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-blue-200 bg-white shadow-lg">
                <span className="text-sm font-bold text-blue-900">YOU</span>
              </div>
            </div>
          </div>

          {/* Skill Details */}
          <div className="lg:w-96">
            <div className="h-64 rounded-lg bg-gray-50 p-6">
              {hoveredSkill ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="mb-4 text-xl font-bold text-blue-900">
                    {hoveredSkill.name}
                  </h3>
                  <div className="mb-4">
                    <div className="mb-2 flex justify-between text-sm">
                      <span>Proficiency</span>
                      <span className="font-semibold">
                        {hoveredSkill.value}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: hoveredSkill.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${hoveredSkill.value}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-700">
                    {hoveredSkill.description}
                  </p>
                </motion.div>
              ) : (
                <div className="flex h-full items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="mb-4 text-4xl">🎯</div>
                    <p>Hover over a skill point to see details</p>
                  </div>
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="mt-6 grid grid-cols-2 gap-2">
              {skillsData.map(skill => (
                <div
                  key={skill.name}
                  className="flex cursor-pointer items-center space-x-2 rounded p-2 text-xs hover:bg-gray-50"
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: skill.color }}
                  />
                  <span className="text-gray-700">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsRadar;
