'use client';

import { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface GlowingBorderProps {
  children: ReactNode;
  className?: string;
  borderRadius?: string;
}

// Cursor-following animated gradient border
export function GlowingBorder({ children, className, borderRadius = '0.75rem' }: GlowingBorderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current || prefersReduced) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  if (prefersReduced) {
    return <div className={className} style={{ borderRadius }}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn('relative', className)}
      style={{ borderRadius }}
    >
      {/* Animated border */}
      <motion.div
        className="absolute -inset-[1px] rounded-[inherit] pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0.3,
          background: isHovered
            ? `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(139,92,246,0.6), rgba(6,182,212,0.4), transparent 60%)`
            : 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2), rgba(139,92,246,0.2))',
        }}
        transition={{ duration: 0.3 }}
        style={{
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          padding: '1px',
          borderRadius: 'inherit',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
