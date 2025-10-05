import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

interface ParticleSystemProps {
  nodePositions: Array<{ x: number; y: number }>;
  className?: string;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({
  nodePositions,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const createParticle = (
      startNode: { x: number; y: number },
      endNode: { x: number; y: number }
    ): Particle | null => {
      const dx = endNode.x - startNode.x;
      const dy = endNode.y - startNode.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = 0.5 + Math.random() * 0.5;

      // Validate all values before creating particle
      if (
        !isFinite(dx) ||
        !isFinite(dy) ||
        !isFinite(distance) ||
        distance === 0 ||
        !isFinite(speed) ||
        speed === 0
      ) {
        return null; // Return null for invalid particles
      }

      return {
        x: startNode.x,
        y: startNode.y,
        vx: (dx / distance) * speed,
        vy: (dy / distance) * speed,
        life: 0,
        maxLife: distance / speed,
      };
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(
        0,
        0,
        canvas.width / window.devicePixelRatio,
        canvas.height / window.devicePixelRatio
      );

      // Add new particles
      if (Math.random() < 0.1 && nodePositions.length >= 2) {
        const startIndex = Math.floor(Math.random() * nodePositions.length);
        let endIndex = Math.floor(Math.random() * nodePositions.length);
        while (endIndex === startIndex) {
          endIndex = Math.floor(Math.random() * nodePositions.length);
        }

        const newParticle = createParticle(
          nodePositions[startIndex],
          nodePositions[endIndex]
        );
        if (newParticle) {
          particlesRef.current.push(newParticle);
        }
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        // Validate particle position and properties
        if (
          !isFinite(particle.x) ||
          !isFinite(particle.y) ||
          !isFinite(particle.life) ||
          !isFinite(particle.maxLife)
        ) {
          return false; // Remove invalid particles
        }

        const alpha = Math.max(0, 1 - particle.life / particle.maxLife);
        const size = 2 + Math.sin(particle.life * 0.1) * 1;

        // Validate size and alpha
        if (!isFinite(size) || !isFinite(alpha) || size <= 0) {
          return false; // Remove invalid particles
        }

        // Create gradient for particle
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          size * 2
        );
        gradient.addColorStop(0, `rgba(6, 182, 212, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(30, 58, 138, ${alpha * 0.8})`);
        gradient.addColorStop(1, `rgba(6, 182, 212, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = '#06B6D4';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        return particle.life < particle.maxLife;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [nodePositions]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default ParticleSystem;
