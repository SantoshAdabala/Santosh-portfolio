'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className={cn('mb-16 text-center', className)}>
      <motion.h2
        className="gradient-text text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
        {...(prefersReduced ? {} : {
          initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
          whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
          viewport: { once: true, margin: '-50px' },
          transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
        })}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="mt-4 text-lg text-foreground/50 dark:text-foreground/60"
          {...(prefersReduced ? {} : {
            initial: { opacity: 0, y: 10 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: '-50px' },
            transition: { delay: 0.15, duration: 0.5 },
          })}
        >
          {subtitle}
        </motion.p>
      )}
      {/* Decorative line */}
      <motion.div
        className="mx-auto mt-6 h-[1px] w-16"
        style={{ background: 'linear-gradient(90deg, transparent, #8b5cf6, #06b6d4, transparent)' }}
        {...(prefersReduced ? {} : {
          initial: { scaleX: 0, opacity: 0 },
          whileInView: { scaleX: 1, opacity: 1 },
          viewport: { once: true },
          transition: { delay: 0.3, duration: 0.6 },
        })}
      />
    </div>
  );
}
