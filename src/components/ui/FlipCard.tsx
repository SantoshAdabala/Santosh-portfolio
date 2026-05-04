'use client';

import { useState, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  className?: string;
  ariaLabel?: string;
}

function isNestedInteractive(target: EventTarget, currentTarget: EventTarget) {
  if (!(target instanceof HTMLElement) || target === currentTarget) return false;
  return Boolean(target.closest('a, button, input, textarea, select, [role="button"]'));
}

export function FlipCard({ front, back, className, ariaLabel = 'Show project details' }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const prefersReduced = useReducedMotion();

  const toggle = () => setIsFlipped((value) => !value);

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    if (isNestedInteractive(e.target, e.currentTarget)) return;
    toggle();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (isNestedInteractive(e.target, e.currentTarget)) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  }

  const containerProps = {
    role: 'button',
    tabIndex: 0,
    'aria-pressed': isFlipped,
    'aria-label': isFlipped ? 'Show project summary' : ariaLabel,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
  };

  if (prefersReduced) {
    return (
      <div
        className={cn('relative cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background', className)}
        {...containerProps}
      >
        {isFlipped ? back : front}
      </div>
    );
  }

  return (
    <div
      className={cn('relative cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background', className)}
      style={{ perspective: '1200px' }}
      {...containerProps}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100, damping: 20 }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: 'hidden' }}
          aria-hidden={isFlipped}
          inert={isFlipped ? true : undefined}
        >
          {front}
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          aria-hidden={!isFlipped}
          inert={!isFlipped ? true : undefined}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}
