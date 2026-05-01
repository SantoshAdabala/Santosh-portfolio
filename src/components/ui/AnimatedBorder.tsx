'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Props {
  children: ReactNode;
  className?: string;
}

// Visible rotating gradient border — the kind you see on premium sites
export function AnimatedBorder({ children, className }: Props) {
  const prefersReduced = useReducedMotion();

  return (
    <div className={cn('relative rounded-2xl p-[1px]', className)}>
      {/* Animated conic gradient border */}
      {!prefersReduced && (
        <div
          className="absolute inset-0 rounded-[inherit] animate-spin-slow"
          style={{
            background: 'conic-gradient(from 0deg, #8b5cf6, #06b6d4, #22d3ee, #a78bfa, #8b5cf6)',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            padding: '1px',
          }}
        />
      )}
      <div className="relative rounded-[inherit] bg-background">{children}</div>
    </div>
  );
}
