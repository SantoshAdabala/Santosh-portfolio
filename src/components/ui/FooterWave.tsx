'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function FooterWave() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />;
  }

  return (
    <div className="relative h-20 overflow-hidden">
      {/* Wave 1 */}
      <motion.div
        className="absolute bottom-0 left-0 w-[200%] h-16"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 2400 80" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,40 C200,20 400,60 600,40 C800,20 1000,60 1200,40 C1400,20 1600,60 1800,40 C2000,20 2200,60 2400,40 L2400,80 L0,80 Z"
            fill="rgba(139,92,246,0.08)"
          />
        </svg>
      </motion.div>
      {/* Wave 2 — slower, offset */}
      <motion.div
        className="absolute bottom-0 left-0 w-[200%] h-20"
        animate={{ x: ['-25%', '-75%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 2400 80" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,50 C300,30 500,65 800,45 C1100,25 1300,60 1600,45 C1900,30 2100,60 2400,50 L2400,80 L0,80 Z"
            fill="rgba(6,182,212,0.05)"
          />
        </svg>
      </motion.div>
    </div>
  );
}
