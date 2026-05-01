'use client';

import { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = 'rgba(139, 92, 246, 0.15)',
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current || prefersReduced) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn('relative overflow-hidden', className)}
    >
      {/* Spotlight gradient that follows cursor */}
      {!prefersReduced && (
        <motion.div
          className="pointer-events-none absolute -inset-px z-0"
          animate={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
          }}
          transition={{ duration: 0.2 }}
        />
      )}
      {/* Animated border glow */}
      {!prefersReduced && (
        <motion.div
          className="pointer-events-none absolute -inset-px z-0 rounded-[inherit]"
          animate={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(139,92,246,0.25), transparent 40%)`,
          }}
          transition={{ duration: 0.2 }}
          style={{
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            padding: '1px',
            borderRadius: 'inherit',
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
