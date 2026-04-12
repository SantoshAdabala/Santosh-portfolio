'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { useTilt } from '@/hooks/useTilt';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { ExperienceEntry } from '@/types';

interface TimelineItemProps {
  entry: ExperienceEntry;
  index: number;
  className?: string;
}

export function TimelineItem({ entry, index, className }: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReduced = useReducedMotion();
  const { style: tiltStyle, onMouseMove, onMouseLeave } = useTilt(6);

  return (
    <div ref={ref} className={cn('relative pl-12 pb-10', className)}>
      {/* ── Glowing timeline node ── */}
      <div className="absolute left-0 top-3 flex items-center justify-center">
        {/* Outermost pulse ring */}
        <motion.span
          className="absolute rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)' }}
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={isInView ? { width: 56, height: 56, opacity: [0, 1, 0.6] } : {}}
          transition={{ duration: 1.2, delay: index * 0.1, repeat: Infinity, repeatType: 'reverse' as const, repeatDelay: 1 }}
        />
        {/* Middle glow ring */}
        <motion.span
          className="absolute rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.25), rgba(139,92,246,0.15), transparent 70%)' }}
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={isInView ? { width: 36, height: 36, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
        />
        {/* Inner bright glow */}
        <motion.span
          className="absolute rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.6), rgba(6,182,212,0.3), transparent)',
            filter: 'blur(3px)',
          }}
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={isInView ? { width: 20, height: 20, opacity: [0.5, 1, 0.5] } : {}}
          transition={{ duration: 2, delay: index * 0.1, repeat: Infinity, repeatType: 'reverse' as const }}
        />
        {/* Core dot — bright and sharp */}
        <motion.span
          className="relative h-4 w-4 rounded-full"
          style={{
            background: isInView
              ? 'linear-gradient(135deg, #a78bfa, #22d3ee)'
              : 'rgba(139,92,246,0.2)',
            boxShadow: isInView
              ? '0 0 8px rgba(139,92,246,0.8), 0 0 20px rgba(139,92,246,0.5), 0 0 40px rgba(6,182,212,0.3), 0 0 60px rgba(139,92,246,0.15)'
              : 'none',
            transition: 'all 0.5s ease',
          }}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 300, damping: 15, delay: index * 0.1 }}
        />
      </div>

      {/* ── Connecting line segment ── */}
      <div className="absolute left-[6px] top-8 bottom-0 w-[1.5px] overflow-hidden">
        <motion.div
          className="h-full w-full"
          style={{
            background: 'linear-gradient(to bottom, rgba(139,92,246,0.4), rgba(6,182,212,0.15), transparent)',
          }}
          initial={{ scaleY: 0, transformOrigin: 'top' }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>

      {/* ── Card ── */}
      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, x: index % 2 === 0 ? -30 : 30, y: 10 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{
          duration: 0.6,
          delay: index * 0.12 + 0.1,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <div
          className="glass rounded-xl p-5 shadow-3d transition-shadow duration-300 hover:glow-purple"
          style={tiltStyle}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="rounded-full bg-cyan/10 px-3 py-0.5 text-xs font-medium text-cyan">
              {entry.dateRange}
            </span>
            <span className="rounded-full bg-accent/10 px-3 py-0.5 text-xs font-medium text-accent-light">
              {entry.type === 'work' ? 'Work' : entry.type === 'research' ? 'Research' : entry.type === 'competition' ? 'Award' : 'Open Source'}
            </span>
          </div>
          <h3 className="text-base font-semibold">{entry.role}</h3>
          <p className="text-sm text-accent-light/80 font-medium">{entry.organization}</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/60 dark:text-foreground/90">
            {entry.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
