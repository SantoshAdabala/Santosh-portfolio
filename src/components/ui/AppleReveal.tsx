'use client';

import { type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: 'default' | 'gentle' | 'dramatic';
}

const variants = {
  default: {
    initial: { opacity: 0, y: 80, scale: 0.95, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    duration: 0.8,
  },
  gentle: {
    initial: { opacity: 0, y: 40, scale: 0.98, filter: 'blur(4px)' },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    duration: 1.0,
  },
  dramatic: {
    initial: { opacity: 0, y: 120, scale: 0.9, filter: 'blur(16px)' },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    duration: 1.2,
  },
};

// Cinematic section reveal — smooth entrance without parallax jitter
export function AppleReveal({ children, className, delay = 0, variant = 'default' }: Props) {
  const prefersReduced = useReducedMotion();
  const config = variants[variant];

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={config.initial}
      whileInView={config.animate}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: config.duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Parallax wrapper — content moves at a different rate than scroll
export function AppleParallax({ children, className }: { children: ReactNode; className?: string }) {
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
