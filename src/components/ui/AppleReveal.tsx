'use client';

import { type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Props {
  children: ReactNode;
  className?: string;
}

// Cinematic section reveal — dramatic parallax with depth layers
export function AppleReveal({ children, className }: Props) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax: content moves slower than scroll creating depth
  const y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ''}`}>
      <motion.div
        initial={{ opacity: 0, y: 120, scale: 0.92, filter: 'blur(16px)' }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1], // Custom ease — fast start, smooth end
        }}
        style={{ y }}
      >
        {children}
      </motion.div>
    </div>
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
