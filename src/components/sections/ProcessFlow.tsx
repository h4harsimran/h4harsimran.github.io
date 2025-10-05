import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStage {
  id: string;
  title: string;
  description: string;
  equipment: string[];
  color: string;
  bgColor: string;
}

const processStages: ProcessStage[] = [
  {
    id: 'upstream',
    title: 'UPSTREAM',
    description: 'Cell culture and expansion in bioreactors',
    equipment: ['Bioreactors', 'Cell Culture', 'Media Prep'],
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'downstream',
    title: 'DOWNSTREAM',
    description: 'Purification and concentration processes',
    equipment: ['TFF Systems', 'Chromatography', 'Centrifuges'],
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
  },
  {
    id: 'formulation',
    title: 'FORMULATION',
    description: 'Final product preparation and stabilization',
    equipment: ['Sterile Filtration', 'Fill/Finish', 'Viral Filtration'],
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    id: 'release',
    title: 'RELEASE',
    description: 'Quality control and product release',
    equipment: ['QC Testing', 'Release Testing', 'Stability'],
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
];

const ProcessFlow: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pipelineRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current || !pipelineRef.current) return;

    // Skip animations in test environment
    if (typeof window === 'undefined' || import.meta.env.MODE === 'test')
      return;

    const ctx = gsap.context(() => {
      // Animate pipeline drawing
      gsap.fromTo(
        '.pipeline-segment',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.5,
          stagger: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate process stages
      gsap.fromTo(
        '.process-stage',
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate flowing particles
      const animateParticles = () => {
        particlesRef.current.forEach((particle, index) => {
          if (particle) {
            gsap.set(particle, { x: -20, opacity: 0 });
            gsap.to(particle, {
              x: '100vw',
              opacity: 1,
              duration: 4,
              delay: index * 0.5,
              ease: 'none',
              repeat: -1,
              repeatDelay: 2,
            });
          }
        });
      };

      // Start particle animation after pipeline is drawn
      gsap.delayedCall(2, animateParticles);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process-flow" className="bg-gray-50 py-20" ref={containerRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-6 text-4xl font-bold text-blue-900 md:text-5xl">
            Process Flow Visualization
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            CAR-T manufacturing pipeline from cell culture to final product
            release
          </p>
        </motion.div>

        {/* Pipeline Container */}
        <div className="relative overflow-hidden" ref={pipelineRef}>
          {/* Main Pipeline */}
          <div className="relative mb-16 flex items-center justify-between">
            {processStages.map((stage, index) => (
              <React.Fragment key={stage.id}>
                {/* Process Stage */}
                <motion.div
                  className={`process-stage relative z-10 ${stage.bgColor} max-w-[250px] min-w-[200px] rounded-2xl border-2 border-gray-200 p-6 shadow-lg`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <h3
                    className={`text-xl font-bold ${stage.color} mb-3 text-center`}
                  >
                    {stage.title}
                  </h3>
                  <p className="mb-4 text-center text-sm text-gray-700">
                    {stage.description}
                  </p>
                  <div className="space-y-2">
                    {stage.equipment.map((equipment, equipIndex) => (
                      <div
                        key={equipIndex}
                        className="rounded-full border bg-white px-3 py-1 text-center text-xs text-gray-600"
                      >
                        {equipment}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Pipeline Segment */}
                {index < processStages.length - 1 && (
                  <div className="relative mx-4 flex-1">
                    <div className="pipeline-segment relative h-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-400 to-cyan-400">
                      {/* Flowing particles */}
                      <div
                        ref={el => {
                          if (el) particlesRef.current[index] = el;
                        }}
                        className="absolute top-0 left-0 h-2 w-4 rounded-full bg-white opacity-0"
                        style={{
                          boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                        }}
                      />
                    </div>

                    {/* Arrow */}
                    <div className="absolute top-1/2 right-0 translate-x-1 -translate-y-1/2 transform">
                      <div className="h-0 w-0 border-t-[6px] border-b-[6px] border-l-[8px] border-t-transparent border-b-transparent border-l-cyan-400" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Process Metrics */}
          <motion.div
            className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="rounded-lg bg-white p-4 text-center shadow">
              <div className="text-2xl font-bold text-blue-600">300+</div>
              <div className="text-sm text-gray-600">Equipment Validated</div>
            </div>
            <div className="rounded-lg bg-white p-4 text-center shadow">
              <div className="text-2xl font-bold text-cyan-600">10+</div>
              <div className="text-sm text-gray-600">Process Transfers</div>
            </div>
            <div className="rounded-lg bg-white p-4 text-center shadow">
              <div className="text-2xl font-bold text-green-600">8</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div className="rounded-lg bg-white p-4 text-center shadow">
              <div className="text-2xl font-bold text-purple-600">100%</div>
              <div className="text-sm text-gray-600">Regulatory Compliance</div>
            </div>
          </motion.div>
        </div>

        {/* Technical Details */}
        <motion.div
          className="mt-16 grid gap-8 md:grid-cols-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h4 className="mb-4 text-lg font-semibold text-blue-900">
              Critical Process Parameters
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Temperature control (±2°C)</li>
              <li>• pH monitoring (±0.1 units)</li>
              <li>• Dissolved oxygen (30-50%)</li>
              <li>• Pressure differentials</li>
              <li>• Flow rate optimization</li>
            </ul>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h4 className="mb-4 text-lg font-semibold text-blue-900">
              Quality Assurance
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• In-process testing</li>
              <li>• Sterility assurance</li>
              <li>• Endotoxin testing</li>
              <li>• Identity confirmation</li>
              <li>• Potency assessment</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessFlow;
