import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const DNAHelix: React.FC = () => {
  const helixRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!helixRef.current) return;

    const helix = helixRef.current;
    const strands = helix.querySelectorAll('.dna-strand');
    const bases = helix.querySelectorAll('.dna-base');

    // Rotate the entire helix
    gsap.to(helix, {
      rotation: 360,
      duration: 20,
      ease: 'none',
      repeat: -1,
    });

    // Animate the strands with a wave effect
    strands.forEach((strand, index) => {
      gsap.to(strand, {
        scaleY: 1.1,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: index * 0.5,
      });
    });

    // Animate the bases with a pulsing effect
    bases.forEach((base, index) => {
      gsap.to(base, {
        opacity: 0.6,
        scale: 1.1,
        duration: 1.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: index * 0.2,
      });
    });

    return () => {
      gsap.killTweensOf([helix, ...strands, ...bases]);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
      <svg
        ref={helixRef}
        width="400"
        height="600"
        viewBox="0 0 400 600"
        className="h-full w-full max-w-md"
      >
        {/* DNA Strands */}
        <path
          className="dna-strand"
          d="M100 50 Q200 100 100 150 Q0 200 100 250 Q200 300 100 350 Q0 400 100 450 Q200 500 100 550"
          stroke="url(#gradient1)"
          strokeWidth="3"
          fill="none"
        />
        <path
          className="dna-strand"
          d="M300 50 Q200 100 300 150 Q400 200 300 250 Q200 300 300 350 Q400 400 300 450 Q200 500 300 550"
          stroke="url(#gradient2)"
          strokeWidth="3"
          fill="none"
        />

        {/* DNA Base Pairs */}
        {Array.from({ length: 12 }, (_, i) => {
          const y = 75 + i * 40;
          const x1 = 100 + Math.sin((i * Math.PI) / 3) * 50;
          const x2 = 300 - Math.sin((i * Math.PI) / 3) * 50;

          return (
            <g key={i} className="dna-base">
              <line
                x1={x1}
                y1={y}
                x2={x2}
                y2={y}
                stroke="url(#baseGradient)"
                strokeWidth="2"
                opacity="0.8"
              />
              <circle cx={x1} cy={y} r="4" fill="#06B6D4" opacity="0.9" />
              <circle cx={x2} cy={y} r="4" fill="#1E3A8A" opacity="0.9" />
            </g>
          );
        })}

        {/* Gradients */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#1E3A8A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="baseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default DNAHelix;
