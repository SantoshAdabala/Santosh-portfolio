'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView, useSpring, useMotionValue, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface CountUpProps {
  value: string; // e.g. "6+", "10M+", "3.5x", "$2M+"
  className?: string;
}

// Premium count-up with spring overshoot — extracts number and animates it
export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReduced = useReducedMotion();

  // Extract numeric part
  const match = value.match(/[\d.]+/);
  const numericValue = match ? parseFloat(match[0]) : 0;
  const prefix = value.slice(0, value.indexOf(match?.[0] ?? ''));
  const suffix = value.slice((value.indexOf(match?.[0] ?? '') + (match?.[0]?.length ?? 0)));

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 100,
    damping: 15,
    mass: 1,
  });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (prefersReduced) {
      setDisplay(match?.[0] ?? '0');
      return;
    }
    if (!isInView) return;

    motionValue.set(numericValue);

    const unsubscribe = springValue.on('change', (v) => {
      // Format to match original precision
      if (match?.[0]?.includes('.')) {
        setDisplay(v.toFixed(1));
      } else {
        setDisplay(Math.round(v).toString());
      }
    });

    return unsubscribe;
  }, [isInView, numericValue, prefersReduced, motionValue, springValue, match]);

  return (
    <motion.span
      ref={ref}
      className={cn('tabular-nums', className)}
      {...(prefersReduced ? {} : {
        initial: { scale: 0.5, opacity: 0 },
        whileInView: { scale: 1, opacity: 1 },
        viewport: { once: true },
        transition: { type: 'spring', stiffness: 200, damping: 12 },
      })}
    >
      {prefix}{display}{suffix}
    </motion.span>
  );
}
