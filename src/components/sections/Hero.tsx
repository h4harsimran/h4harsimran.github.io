import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { contactInfo } from '../../data/personal';
import DNAHelix from '../ui/DNAHelix';
import ParticleSystem from '../ui/ParticleSystem';
import ExpertiseNodes from '../ui/ExpertiseNodes';
import { useSectionFocus } from '../../hooks/useFocusManagement';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { createAriaAttributes, srOnlyClass } from '../../utils/accessibility';

const Hero: React.FC = () => {
  const [nodePositions, setNodePositions] = useState<
    Array<{ x: number; y: number }>
  >([]);
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const contactRef = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { sectionRef } = useSectionFocus();

  useEffect(() => {
    if (
      !heroRef.current ||
      !titleRef.current ||
      !subtitleRef.current ||
      !contactRef.current
    )
      return;
    if (prefersReducedMotion) return;

    // Capture refs at the start of the effect
    const titleElement = titleRef.current;
    const subtitleElement = subtitleRef.current;
    const contactElement = contactRef.current;

    const tl = gsap.timeline();

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
      }
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

    // Add subtle floating animation to title
    gsap.to(titleElement, {
      y: -5,
      duration: 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    return () => {
      tl.kill();
      gsap.killTweensOf([titleElement, subtitleElement, contactElement]);
    };
  }, [prefersReducedMotion]);

  const handleNodePositionsChange = (
    positions: Array<{ x: number; y: number }>
  ) => {
    setNodePositions(positions);
  };

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
      {/* Video Background */}
      <div className="hero-video-container">
        <video
          className="hero-video absolute inset-0 z-0 h-full w-full"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/images/244736.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
        </video>

        {/* Fallback gradient background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900" />
      </div>

      {/* Video Overlay for Better Text Readability */}
      <div className="video-overlay absolute inset-0 z-1" />
      <div className="absolute inset-0 z-2 bg-black/10" />

      {/* DNA Helix Background */}
      <div className="relative z-3">
        <DNAHelix />
      </div>

      {/* Particle System */}
      <div className="relative z-4">
        <ParticleSystem nodePositions={nodePositions} className="z-5" />
      </div>

      {/* Expertise Nodes */}
      <div className="relative z-5">
        <ExpertiseNodes onNodePositionsChange={handleNodePositionsChange} />
      </div>

      {/* Scientific Icons Background */}
      <div
        className="pointer-events-none absolute inset-0 z-6"
        aria-hidden="true"
      >
        <div className="animate-bounce-gentle absolute top-20 left-10 text-4xl opacity-30">
          ⚗️
        </div>
        <div
          className="animate-bounce-gentle absolute top-32 right-16 text-3xl opacity-25"
          style={{ animationDelay: '0.5s' }}
        >
          🧬
        </div>
        <div
          className="animate-bounce-gentle absolute bottom-40 left-20 text-5xl opacity-20"
          style={{ animationDelay: '1s' }}
        >
          🔬
        </div>
        <div
          className="animate-bounce-gentle absolute right-10 bottom-20 text-3xl opacity-30"
          style={{ animationDelay: '1.5s' }}
        >
          🧪
        </div>
        <div
          className="animate-bounce-gentle absolute top-1/2 left-5 text-2xl opacity-25"
          style={{ animationDelay: '2s' }}
        >
          ⚛️
        </div>
        <div
          className="animate-bounce-gentle absolute top-1/3 right-5 text-4xl opacity-20"
          style={{ animationDelay: '2.5s' }}
        >
          🧫
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
        {/* Text Background for Better Readability */}
        <div className="hero-content-box rounded-3xl p-8 md:p-12">
          <h1
            ref={titleRef}
            className="mb-4 bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-3xl font-bold text-transparent drop-shadow-lg will-change-transform md:text-5xl lg:text-6xl"
          >
            HARSIMRANJEET SINGH
            <span className={srOnlyClass}>
              - Manufacturing Sciences and Technology Leader specializing in
              CAR-T manufacturing, scale-up, and technology transfer
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="mb-8 text-xl font-medium tracking-wide text-cyan-300 drop-shadow-md will-change-transform md:text-2xl lg:text-3xl"
          >
            Manufacturing Sciences & Technology Leader
          </p>

          <p
            ref={contactRef}
            className="mb-12 flex flex-col items-center justify-center gap-2 text-lg text-blue-200 drop-shadow-md will-change-transform sm:flex-row sm:gap-8 md:text-xl"
          >
            <span className="flex items-center gap-2">
              <span aria-hidden="true">📍</span>
              <span>Located in {contactInfo.location}</span>
            </span>
            <span className="hidden text-blue-400 sm:inline" aria-hidden="true">
              |
            </span>
            <span className="flex items-center gap-2">
              <span aria-hidden="true">✉️</span>
              <span>Contact: {contactInfo.email}</span>
            </span>
          </p>

          {/* Specialization Tags */}
          <div
            className="mt-8 flex flex-wrap justify-center gap-3"
            role="list"
            aria-label="Areas of expertise"
          >
            {[
              'CAR-T Manufacturing',
              'Scale-up Expert',
              'Tech Transfer',
              'Process Engineering',
            ].map((tag, index) => (
              <span
                key={tag}
                role="listitem"
                className="animate-fade-in rounded-full border border-cyan-400/40 bg-blue-800/60 px-4 py-2 text-sm font-medium text-cyan-200 shadow-lg backdrop-blur-sm"
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
