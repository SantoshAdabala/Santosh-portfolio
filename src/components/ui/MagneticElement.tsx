'use client';

import { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MagneticElementProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

// Element that pulls toward cursor on hover — premium interaction
export function MagneticElement({ children, className, strength = 0.3 }: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current || prefersReduced) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={cn('will-change-transform', className)}
    >
      {children}
    </motion.div>
  );
}
