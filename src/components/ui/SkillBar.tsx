'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SkillBarProps {
  name: string;
  proficiency: number;
  className?: string;
}

export function SkillBar({ name, proficiency, className }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReduced = useReducedMotion();

  const clampedProficiency = Math.max(0, Math.min(100, proficiency));

  return (
    <div ref={ref} className={cn('space-y-1.5', className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-foreground/60 dark:text-foreground">{clampedProficiency}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent via-accent-light to-cyan"
          initial={{ width: prefersReduced ? `${clampedProficiency}%` : '0%' }}
          animate={
            prefersReduced || isInView
              ? { width: `${clampedProficiency}%` }
              : { width: '0%' }
          }
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 0.8, ease: 'easeOut' }
          }
        />
      </div>
    </div>
  );
}
