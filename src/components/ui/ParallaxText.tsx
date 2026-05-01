'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Props {
  children: string;
  className?: string;
  baseVelocity?: number;
}

// Infinite scrolling marquee — like Linear's tech stack display
export function MarqueeText({ children, className, baseVelocity = 1 }: Props) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={cn('overflow-hidden whitespace-nowrap', className)}>{children}</div>;
  }

  return (
    <div className={cn('relative flex overflow-hidden', className)}>
      <motion.div
        className="flex shrink-0 gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30 / baseVelocity,
            ease: 'linear',
          },
        }}
      >
        {/* Duplicate for seamless loop */}
        {[0, 1].map((copy) => (
          <span key={copy} className="flex shrink-0 gap-8">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
