import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { contactInfo } from '../../data/personal';
import DNAHelix from '../ui/DNAHelix';
import { useSectionFocus } from '../../hooks/useFocusManagement';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { createAriaAttributes, srOnlyClass } from '../../utils/accessibility';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const contactRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { sectionRef } = useSectionFocus();

  useEffect(() => {
    if (
      !heroRef.current ||
      !titleRef.current ||
      !subtitleRef.current ||
      !contactRef.current ||
      !imageRef.current
    )
      return;
    if (prefersReducedMotion) return;

    // Capture refs at the start of the effect
    const titleElement = titleRef.current;
    const subtitleElement = subtitleRef.current;
    const contactElement = contactRef.current;
    const imageElement = imageRef.current;

    const tl = gsap.timeline();

    // Animate portrait image entrance
    tl.fromTo(
      imageElement,
      {
        scale: 0.8,
        opacity: 0,
        y: 30,
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
      }
    );

    // Animate title entrance
    tl.fromTo(
      titleElement,
      {
        y: 50,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
      },
      '-=0.8'
    );

    // Animate subtitle
    tl.fromTo(
      subtitleElement,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.5'
    );

    // Animate contact info
    tl.fromTo(
      contactElement,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.3'
    );

    // Add subtle floating animation to portrait
    gsap.to(imageElement, {
      y: -8,
      duration: 4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    // Add subtle floating animation to title
    gsap.to(titleElement, {
      y: -3,
      duration: 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 0.5,
    });

    return () => {
      tl.kill();
      gsap.killTweensOf([
        titleElement,
        subtitleElement,
        contactElement,
        imageElement,
      ]);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={el => {
        heroRef.current = el;
        sectionRef.current = el;
      }}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden text-white"
      {...createAriaAttributes({
        label:
          'Hero section - Harsimranjeet Singh, Manufacturing Sciences & Technology Leader',
        role: 'region',
      })}
      tabIndex={-1}
    >
      {/* Gradient Background - Using proper biotech colors */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-800" />

      {/* Overlay for depth */}
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-blue-800/60 via-transparent to-blue-800/40" />

      {/* DNA Helix Background */}
      <div className="absolute inset-0 z-2 opacity-30">
        <DNAHelix />
      </div>

      {/* Scientific Icons Background */}
      <div
        className="pointer-events-none absolute inset-0 z-3"
        aria-hidden="true"
      >
        <div className="animate-bounce-gentle absolute top-20 left-10 text-4xl opacity-20">
          ⚗️
        </div>
        <div
          className="animate-bounce-gentle absolute top-32 right-16 text-3xl opacity-15"
          style={{ animationDelay: '0.5s' }}
        >
          🧬
        </div>
        <div
          className="animate-bounce-gentle absolute bottom-40 left-20 text-5xl opacity-10"
          style={{ animationDelay: '1s' }}
        >
          🔬
        </div>
        <div
          className="animate-bounce-gentle absolute right-10 bottom-20 text-3xl opacity-20"
          style={{ animationDelay: '1.5s' }}
        >
          🧪
        </div>
        <div
          className="animate-bounce-gentle absolute top-1/2 left-5 text-2xl opacity-15"
          style={{ animationDelay: '2s' }}
        >
          ⚛️
        </div>
        <div
          className="animate-bounce-gentle absolute top-1/3 right-5 text-4xl opacity-10"
          style={{ animationDelay: '2.5s' }}
        >
          🧫
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Portrait Section */}
          <div
            ref={imageRef}
            className="order-1 flex justify-center lg:order-1 lg:justify-end"
          >
            <div className="relative h-64 w-64 md:h-80 md:w-80">
              {/* Main portrait image */}
              <img
                src="/images/IMG_4190.JPG"
                alt="Harsimranjeet Singh - Manufacturing Sciences & Technology Leader"
                className="h-full w-full rounded-full border-4 border-cyan-500/50 object-cover shadow-2xl"
              />

              {/* Glowing ring effect */}
              <div className="absolute inset-0 animate-pulse rounded-full border-2 border-cyan-400 opacity-60"></div>
              <div
                className="absolute inset-0 animate-pulse rounded-full border border-blue-400 opacity-40"
                style={{ animationDelay: '0.5s' }}
              ></div>

              {/* Floating particles around portrait */}
              <div className="absolute -top-4 -right-4 h-3 w-3 animate-ping rounded-full bg-cyan-500 opacity-75"></div>
              <div
                className="absolute -bottom-6 -left-6 h-2 w-2 animate-ping rounded-full bg-cyan-500 opacity-60"
                style={{ animationDelay: '1s' }}
              ></div>
              <div
                className="absolute top-1/2 -right-8 h-1.5 w-1.5 animate-ping rounded-full bg-cyan-500 opacity-50"
                style={{ animationDelay: '2s' }}
              ></div>
            </div>
          </div>

          {/* Text Content */}
          <div className="order-2 text-center lg:order-2 lg:text-left">
            <h1
              ref={titleRef}
              className="mb-6 bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-4xl font-bold text-transparent drop-shadow-lg will-change-transform md:text-5xl lg:text-6xl"
            >
              HARSIMRANJEET SINGH
              <span className={srOnlyClass}>
                - Manufacturing Sciences and Technology Leader specializing in
                CAR-T manufacturing, scale-up, and technology transfer
              </span>
            </h1>

            <p
              ref={subtitleRef}
              className="mb-8 text-xl font-medium tracking-wide text-cyan-400 drop-shadow-md will-change-transform md:text-2xl lg:text-3xl"
            >
              Manufacturing Sciences & Technology Leader
            </p>

            <div className="mb-8 space-y-2 text-lg text-slate-200">
              <p className="flex items-center justify-center gap-2 lg:justify-start">
                <span aria-hidden="true">🎯</span>
                <span className="font-medium">
                  CAR-T Manufacturing Specialist
                </span>
              </p>
              <p className="flex items-center justify-center gap-2 lg:justify-start">
                <span aria-hidden="true">⚡</span>
                <span className="font-medium">
                  Scale-up & Tech Transfer Expert
                </span>
              </p>
            </div>

            <p
              ref={contactRef}
              className="mb-12 flex flex-col items-center justify-center gap-2 text-lg text-slate-300 drop-shadow-md will-change-transform sm:flex-row sm:gap-8 md:text-xl lg:items-start lg:justify-start"
            >
              <span className="flex items-center gap-2">
                <span aria-hidden="true">📍</span>
                <span>Located in {contactInfo.location}</span>
              </span>
              <span
                className="hidden text-cyan-400 sm:inline"
                aria-hidden="true"
              >
                |
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden="true">✉️</span>
                <span>Contact: {contactInfo.email}</span>
              </span>
            </p>

            {/* Specialization Tags */}
            <div
              className="flex flex-wrap justify-center gap-3 lg:justify-start"
              role="list"
              aria-label="Areas of expertise"
            >
              {[
                'Process Engineering',
                'Risk Assessment',
                'Technology Transfer',
                'Equipment Validation',
              ].map((tag, index) => (
                <span
                  key={tag}
                  role="listitem"
                  className="animate-fade-in rounded-full border border-cyan-400/40 bg-blue-800/60 px-4 py-2 text-sm font-medium text-cyan-400 shadow-lg backdrop-blur-sm transition-colors duration-300 hover:bg-blue-800/80"
                  style={{
                    animationDelay: prefersReducedMotion
                      ? '0s'
                      : `${2 + index * 0.1}s`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-8">
              <p className="font-medium text-cyan-400 italic">
                "Designed & Engineered with Precision"
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Like the processes I optimize daily
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
