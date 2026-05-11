'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function AnimatedDivider() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className="section-divider mx-auto max-w-4xl" />;
  }

  return (
    <div className="relative mx-auto max-w-4xl py-6">
      {/* Base gradient line — draws in once */}
      <motion.div
        className="h-[1px]"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2), transparent)',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
