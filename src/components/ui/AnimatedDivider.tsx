'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function AnimatedDivider() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className="section-divider mx-auto max-w-4xl" />;
  }

  return (
    <div className="relative mx-auto max-w-4xl py-2">
      <motion.div
        className="h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.4), rgba(6, 182, 212, 0.4), transparent)',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      />
      {/* Glowing dot in the center */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-accent"
        style={{ boxShadow: '0 0 10px rgba(139, 92, 246, 0.6), 0 0 20px rgba(139, 92, 246, 0.3)' }}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 15 }}
      />
    </div>
  );
}
