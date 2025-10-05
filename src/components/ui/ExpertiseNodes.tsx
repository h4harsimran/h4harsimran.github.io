import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';

interface ExpertiseNode {
  id: string;
  title: string;
  icon: string;
  position: { x: number; y: number };
  connections: string[];
}

interface ExpertiseNodesProps {
  onNodePositionsChange: (_positions: Array<{ x: number; y: number }>) => void;
}

const ExpertiseNodes: React.FC<ExpertiseNodesProps> = ({
  onNodePositionsChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement[]>([]);

  const nodes: ExpertiseNode[] = useMemo(
    () => [
      {
        id: 'scale-up',
        title: 'Scale-up Expert',
        icon: '⚗️',
        position: { x: 20, y: 30 },
        connections: ['tech-transfer', 'process-engineer'],
      },
      {
        id: 'tech-transfer',
        title: 'Tech Transfer',
        icon: '🔬',
        position: { x: 80, y: 20 },
        connections: ['scale-up', 'process-engineer', 'car-t'],
      },
      {
        id: 'process-engineer',
        title: 'Process Engineer',
        icon: '🧬',
        position: { x: 50, y: 70 },
        connections: ['scale-up', 'tech-transfer', 'car-t'],
      },
      {
        id: 'car-t',
        title: 'CAR-T Specialist',
        icon: '🧪',
        position: { x: 75, y: 55 },
        connections: ['tech-transfer', 'process-engineer'],
      },
    ],
    []
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const nodeElements = nodesRef.current;

    // Calculate actual positions and notify parent
    const updatePositions = () => {
      const rect = container.getBoundingClientRect();
      const positions = nodes.map(node => ({
        x: (node.position.x / 100) * rect.width,
        y: (node.position.y / 100) * rect.height,
      }));
      onNodePositionsChange(positions);
    };

    // Initial position calculation
    setTimeout(updatePositions, 100);
    window.addEventListener('resize', updatePositions);

    // Animate nodes entrance
    gsap.fromTo(
      nodeElements,
      {
        scale: 0,
        opacity: 0,
        rotation: -180,
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1,
        ease: 'back.out(1.7)',
        stagger: 0.2,
      }
    );

    // Add floating animation
    nodeElements.forEach((node, index) => {
      if (node) {
        gsap.to(node, {
          y: '+=10',
          duration: 2 + index * 0.3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });

        // Add subtle rotation
        gsap.to(node, {
          rotation: 5,
          duration: 3 + index * 0.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }
    });

    return () => {
      window.removeEventListener('resize', updatePositions);
      gsap.killTweensOf(nodeElements);
    };
  }, [onNodePositionsChange, nodes]);

  const handleNodeHover = (index: number, isHovering: boolean) => {
    const node = nodesRef.current[index];
    if (!node) return;

    gsap.to(node, {
      scale: isHovering ? 1.1 : 1,
      duration: 0.3,
      ease: 'power2.out',
    });

    // Add glow effect
    const glowElement = node.querySelector('.node-glow');
    if (glowElement) {
      gsap.to(glowElement, {
        opacity: isHovering ? 0.6 : 0.3,
        scale: isHovering ? 1.2 : 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0">
      {nodes.map((node, index) => (
        <div
          key={node.id}
          ref={el => {
            if (el) nodesRef.current[index] = el;
          }}
          className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 transform cursor-pointer"
          style={{
            left: `${node.position.x}%`,
            top: `${node.position.y}%`,
          }}
          onMouseEnter={() => handleNodeHover(index, true)}
          onMouseLeave={() => handleNodeHover(index, false)}
        >
          {/* Glow effect */}
          <div className="node-glow bg-gradient-radial absolute inset-0 scale-150 rounded-full from-cyan-400/30 to-transparent opacity-30" />

          {/* Node container */}
          <div className="relative rounded-full border-2 border-cyan-400/50 bg-gradient-to-br from-blue-800 to-blue-900 p-4 shadow-lg backdrop-blur-sm md:p-6">
            {/* Icon */}
            <div className="mb-2 text-center text-2xl md:text-3xl">
              {node.icon}
            </div>

            {/* Title */}
            <div className="px-2 text-center text-xs font-semibold whitespace-nowrap text-white md:text-sm">
              {node.title}
            </div>

            {/* Pulse ring */}
            <div className="absolute inset-0 animate-ping rounded-full border-2 border-cyan-400/30" />
          </div>
        </div>
      ))}

      {/* Connection lines */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        <defs>
          <linearGradient
            id="connectionGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#1E3A8A" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {nodes.map(node =>
          node.connections.map(connectionId => {
            const connectedNode = nodes.find(n => n.id === connectionId);
            if (!connectedNode) return null;

            return (
              <line
                key={`${node.id}-${connectionId}`}
                x1={`${node.position.x}%`}
                y1={`${node.position.y}%`}
                x2={`${connectedNode.position.x}%`}
                y2={`${connectedNode.position.y}%`}
                stroke="url(#connectionGradient)"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="animate-pulse"
              />
            );
          })
        )}
      </svg>
    </div>
  );
};

export default ExpertiseNodes;
