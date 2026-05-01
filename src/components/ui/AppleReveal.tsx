'use client';

import { type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Props {
  children: ReactNode;
  className?: string;
}

// Cinematic reveal — scale + blur + slide + spring
export function AppleReveal({ children, className }: Props) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.88, filter: 'blur(12px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        type: 'spring',
        stiffness: 60,
        damping: 18,
        mass: 1,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Parallax wrapper — content moves at a different rate than scroll
export function AppleParallax({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  if (prefersReduced) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ''}`}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
