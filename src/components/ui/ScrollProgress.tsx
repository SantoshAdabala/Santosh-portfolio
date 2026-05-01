'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function ScrollProgress() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  if (prefersReduced) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #8b5cf6, #06b6d4, #22d3ee)',
      }}
    />
  );
}
