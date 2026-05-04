'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SkillBarProps {
  name: string;
  proficiency: number;
  className?: string;
  active?: boolean;
  onSelect?: () => void;
}

export function SkillBar({ name, proficiency, className, active = false, onSelect }: SkillBarProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const prefersReduced = useReducedMotion();

  const clampedProficiency = Math.max(0, Math.min(100, proficiency));

  return (
    <button
      ref={ref}
      type="button"
      onClick={onSelect}
      className={cn(
        'w-full rounded-lg p-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        active ? 'bg-accent/10 ring-1 ring-accent/30' : 'hover:bg-muted/40',
        className,
      )}
      aria-pressed={active}
    >
      <div className="flex items-center justify-between text-sm">
        <motion.span
          className="font-medium"
          {...(prefersReduced ? {} : {
            initial: { opacity: 0, x: -10 },
            animate: isInView ? { opacity: 1, x: 0 } : {},
            transition: { duration: 0.4 },
          })}
        >
          {name}
        </motion.span>
        <motion.span
          className="text-foreground/60 dark:text-foreground font-mono text-xs"
          {...(prefersReduced ? {} : {
            initial: { opacity: 0, scale: 0.5 },
            animate: isInView ? { opacity: 1, scale: 1 } : {},
            transition: { type: 'spring', stiffness: 200, damping: 12, delay: 0.3 },
          })}
        >
          {clampedProficiency}%
        </motion.span>
      </div>
      <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-muted/50">
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, #8b5cf6, #a78bfa, #06b6d4)',
          }}
          initial={{ width: prefersReduced ? `${clampedProficiency}%` : '0%' }}
          animate={
            prefersReduced || isInView
              ? { width: `${clampedProficiency}%` }
              : { width: '0%' }
          }
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }
          }
        >
          {/* Shimmer effect on the bar */}
          {!prefersReduced && isInView && (
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
              transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 3 }}
            />
          )}
        </motion.div>
      </div>
    </button>
  );
}
