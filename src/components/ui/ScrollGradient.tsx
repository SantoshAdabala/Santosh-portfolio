'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function ScrollGradient() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.02, 0.06, 0.06, 0.02]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);

  if (prefersReduced) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute inset-0"
        style={{ y, scale, opacity }}
      >
        <div className="absolute top-[10%] left-[20%] w-[60vw] h-[60vh] rounded-full bg-accent/20 blur-[150px]" />
        <div className="absolute top-[50%] right-[10%] w-[50vw] h-[50vh] rounded-full bg-cyan-500/15 blur-[150px]" />
        <div className="absolute bottom-[10%] left-[30%] w-[40vw] h-[40vh] rounded-full bg-purple-600/10 blur-[130px]" />
      </motion.div>
    </div>
  );
}
