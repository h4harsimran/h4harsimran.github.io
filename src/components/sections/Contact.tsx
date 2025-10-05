import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMail, FiPhone } from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa';
import { useSectionFocus } from '../../hooks/useFocusManagement';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import {
  createAriaAttributes,
  handleKeyboardActivation,
  focusVisibleClass,
  srOnlyClass,
} from '../../utils/accessibility';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const centralNodeRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(SVGLineElement | null)[]>([]);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const particlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();
  const { sectionRef: focusSectionRef } = useSectionFocus();

  const contactMethods = useMemo(
    () => [
      {
        id: 'email',
        icon: FiMail,
        label: 'Email',
        value: 'harsimranjeetsingh4@gmail.com',
        href: 'mailto:harsimranjeetsingh4@gmail.com',
        position: { x: -200, y: -100 },
        color: '#06B6D4',
      },
      {
        id: 'linkedin',
        icon: FaLinkedin,
        label: 'LinkedIn',
        value: 'linkedin.com/in/hs10',
        href: 'https://linkedin.com/in/hs10',
        position: { x: 200, y: -100 },
        color: '#0077B5',
      },
      {
        id: 'phone',
        icon: FiPhone,
        label: 'Phone',
        value: '5879373631',
        href: 'tel:5879373631',
        position: { x: 0, y: 150 },
        color: '#10B981',
      },
    ],
    []
  );

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Initial setup - hide elements
      gsap.set(linesRef.current, {
        strokeDasharray: '1000',
        strokeDashoffset: '1000',
        opacity: 0,
      });
      gsap.set(iconsRef.current, { scale: 0, opacity: 0 });
      gsap.set(particlesRef.current, { scale: 0, opacity: 0 });
      gsap.set(centralNodeRef.current, { scale: 0, opacity: 0 });

      // Main animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate central node first
      tl.to(centralNodeRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
      });

      // Animate lines drawing outward with stagger
      tl.to(
        linesRef.current,
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power2.out',
        },
        '-=0.4'
      );

      // Animate contact icons bouncing in sequence
      tl.to(
        iconsRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.7)',
        },
        '-=0.8'
      );

      // Animate particles along the lines
      tl.to(
        particlesRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.3'
      );

      // Continuous particle animation
      particlesRef.current.forEach((particle, index) => {
        if (particle) {
          gsap.to(particle, {
            scale: 1.5,
            opacity: 0.3,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.3,
          });
        }
      });

      // Hover animations for contact icons
      iconsRef.current.forEach((icon, index) => {
        if (icon) {
          const handleMouseEnter = () => {
            gsap.to(icon, {
              scale: 1.1,
              duration: 0.3,
              ease: 'power2.out',
            });
            gsap.to(linesRef.current[index], {
              stroke: contactMethods[index].color,
              strokeWidth: 3,
              duration: 0.3,
            });
          };

          const handleMouseLeave = () => {
            gsap.to(icon, {
              scale: 1,
              duration: 0.3,
              ease: 'power2.out',
            });
            gsap.to(linesRef.current[index], {
              stroke: '#06B6D4',
              strokeWidth: 2,
              duration: 0.3,
            });
          };

          icon.addEventListener('mouseenter', handleMouseEnter);
          icon.addEventListener('mouseleave', handleMouseLeave);

          return () => {
            icon.removeEventListener('mouseenter', handleMouseEnter);
            icon.removeEventListener('mouseleave', handleMouseLeave);
          };
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, contactMethods]);

  return (
    <section
      ref={el => {
        sectionRef.current = el;
        focusSectionRef.current = el;
      }}
      id="contact"
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 py-20"
      {...createAriaAttributes({
        label: 'Contact information and connection methods',
        role: 'region',
      })}
      tabIndex={-1}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl">
            LET'S CONNECT
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Ready to collaborate on your next biotech manufacturing challenge?
            Let's discuss how precision engineering can drive your project
            forward.
          </p>
        </motion.div>

        {/* Connection Visualization */}
        <div
          className="relative flex min-h-[400px] items-center justify-center"
          role="group"
          aria-label="Contact methods visualization"
        >
          {/* SVG for connection lines */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 800 400"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {contactMethods.map((method, index) => (
              <line
                key={method.id}
                ref={el => {
                  linesRef.current[index] = el;
                }}
                x1="400"
                y1="200"
                x2={400 + method.position.x}
                y2={200 + method.position.y}
                stroke="#06B6D4"
                strokeWidth="2"
                filter="url(#glow)"
                className="transition-all duration-300"
              />
            ))}
          </svg>

          {/* Central "YOU" Node */}
          <div
            ref={centralNodeRef}
            className="absolute z-10 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-blue-600 to-cyan-500 shadow-2xl"
            role="img"
            aria-label="Central connection point representing you"
          >
            <span className="text-lg font-bold text-white" aria-hidden="true">
              YOU
            </span>
          </div>

          {/* Contact Method Icons */}
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <div key={method.id} className="absolute">
                {/* Particle Effect */}
                <div
                  ref={el => {
                    particlesRef.current[index] = el;
                  }}
                  className="absolute h-3 w-3 rounded-full bg-cyan-400 opacity-0"
                  style={{
                    left: `${method.position.x / 2}px`,
                    top: `${method.position.y / 2}px`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />

                {/* Contact Icon */}
                <a
                  href={method.href}
                  target={method.id === 'linkedin' ? '_blank' : undefined}
                  rel={
                    method.id === 'linkedin' ? 'noopener noreferrer' : undefined
                  }
                  className={`block ${focusVisibleClass}`}
                  onKeyDown={e =>
                    handleKeyboardActivation(e, () => {
                      if (method.id === 'linkedin') {
                        window.open(
                          method.href,
                          '_blank',
                          'noopener,noreferrer'
                        );
                      } else {
                        window.location.href = method.href;
                      }
                    })
                  }
                  {...createAriaAttributes({
                    label: `Contact via ${method.label}: ${method.value}`,
                  })}
                >
                  <div
                    ref={el => {
                      iconsRef.current[index] = el;
                    }}
                    className="group flex h-20 w-20 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-slate-200 bg-white shadow-xl transition-all duration-300 hover:border-cyan-400"
                    style={{
                      left: `${method.position.x}px`,
                      top: `${method.position.y}px`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <IconComponent
                      className="mb-1 text-2xl transition-colors duration-300 group-hover:text-cyan-600"
                      style={{ color: method.color }}
                    />
                    <span className="text-xs font-medium text-slate-600 group-hover:text-slate-800">
                      {method.label}
                    </span>
                  </div>
                </a>

                {/* Contact Information */}
                <div
                  className="absolute mt-24 text-center"
                  style={{
                    left: `${method.position.x}px`,
                    transform: 'translateX(-50%)',
                    top: `${method.position.y}px`,
                  }}
                >
                  <p className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-700 shadow-md">
                    {method.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Contact Information */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: prefersReducedMotion ? 0.01 : 0.8,
            delay: prefersReducedMotion ? 0 : 0.4,
          }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-slate-600 shadow-lg">
            <span
              className="h-2 w-2 animate-pulse rounded-full bg-green-500"
              aria-hidden="true"
            ></span>
            <span className="font-medium">Based in Hamilton, ON</span>
            <span className={srOnlyClass}>Available for collaboration</span>
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-cyan-200/20 to-blue-200/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-blue-200/20 to-cyan-200/20 blur-3xl"></div>
      </div>
    </section>
  );
};

export default Contact;
