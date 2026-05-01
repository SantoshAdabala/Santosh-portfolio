'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Props {
  children: string;
  className?: string;
  as?: 'h2' | 'h3' | 'span';
}

// Vercel/Linear-style animated gradient text with hover shimmer
export function AnimatedGradientText({ children, className, as: Tag = 'span' }: Props) {
  const prefersReduced = useReducedMotion();

  return (
    <Tag
      className={cn(
        'relative inline-block bg-clip-text text-transparent',
        'bg-[length:300%_100%]',
        prefersReduced
          ? 'bg-gradient-to-r from-accent via-cyan to-accent'
          : 'bg-gradient-to-r from-accent via-cyan-light to-accent animate-gradient',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
