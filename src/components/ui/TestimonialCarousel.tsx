'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { Testimonial } from '@/types';

interface Props {
  testimonials: Testimonial[];
  className?: string;
}

export function TestimonialCarousel({ testimonials, className }: Props) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const prefersReduced = useReducedMotion();

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-rotate every 6 seconds
  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const t = testimonials[current];

  const variants = prefersReduced
    ? { enter: {}, center: {}, exit: {} }
    : {
        enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0, scale: 0.95, filter: 'blur(4px)' }),
        center: { x: 0, opacity: 1, scale: 1, filter: 'blur(0px)' },
        exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0, scale: 0.95, filter: 'blur(4px)' }),
      };

  return (
    <div className={cn('relative', className)}>
      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl border border-border/30 bg-background/50 min-h-[240px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="p-8"
          >
            <Quote className="mb-4 h-8 w-8 text-accent/20" />
            <p className="text-base leading-relaxed text-foreground/70 dark:text-foreground/80 italic">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-4">
              {/* Avatar placeholder */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent to-cyan text-sm font-bold text-white">
                {t.author.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-semibold">{t.author}</p>
                <p className="text-xs text-foreground/50">{t.role}, {t.organization}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border/30 text-foreground/40 transition-colors hover:border-accent/40 hover:text-accent"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i === current ? 'w-6 bg-accent' : 'w-2 bg-foreground/20 hover:bg-foreground/40',
              )}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border/30 text-foreground/40 transition-colors hover:border-accent/40 hover:text-accent"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
