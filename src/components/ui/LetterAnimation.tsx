'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface LetterAnimationProps {
  text: string;
  className?: string;
  delay?: number;
}

// Staggered letter-by-letter spring animation
export function LetterAnimation({ text, className, delay = 0 }: LetterAnimationProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={cn('inline-flex overflow-hidden', className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.04,
            delayChildren: delay,
          },
        },
      }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          style={{ display: char === ' ' ? 'inline' : 'inline-block', width: char === ' ' ? '0.3em' : 'auto' }}
          variants={{
            hidden: {
              y: 60,
              opacity: 0,
              rotateX: -80,
              filter: 'blur(8px)',
            },
            visible: {
              y: 0,
              opacity: 1,
              rotateX: 0,
              filter: 'blur(0px)',
              transition: {
                type: 'spring',
                stiffness: 150,
                damping: 12,
                mass: 0.8,
              },
            },
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
