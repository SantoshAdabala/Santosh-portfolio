'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const images = [
  { src: '/images/hero-ai-3.PNG', alt: 'Santosh Adabala — ML Engineer with holographic AI visualizations', position: 'center 30%' },
];

const INTERVAL = 6000;

const kenBurns = [
  { initial: { scale: 1.0, x: '0%', y: '0%' }, animate: { scale: 1.12, x: '-2%', y: '-1%' } },
  { initial: { scale: 1.12, x: '2%', y: '1%' }, animate: { scale: 1.0, x: '0%', y: '0%' } },
  { initial: { scale: 1.0, x: '1%', y: '1%' }, animate: { scale: 1.1, x: '-1%', y: '-1%' } },
];

interface Props {
  className?: string;
  parallaxY?: import('framer-motion').MotionValue<string>;
  parallaxScale?: import('framer-motion').MotionValue<number>;
}

export function HeroSlideshow({ className, parallaxY, parallaxScale }: Props) {
  const [current, setCurrent] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const img = images[current];
  const kb = kenBurns[current % kenBurns.length];

  return (
    <div className={className}>
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.img
            src={img.src}
            alt={img.alt}
            className="h-full w-full object-cover"
            style={{
              objectPosition: img.position,
              ...(parallaxY && parallaxScale ? { y: parallaxY, scale: parallaxScale } : {}),
            }}
            {...(prefersReduced
              ? {}
              : {
                  initial: kb.initial,
                  animate: kb.animate,
                  transition: { duration: INTERVAL / 1000, ease: 'linear' },
                }
            )}
          />
        </motion.div>
      </AnimatePresence>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="group relative h-1.5 overflow-hidden rounded-full transition-all duration-500"
            style={{ width: i === current ? 32 : 8 }}
            aria-label={`Go to slide ${i + 1}`}
          >
            <div className="absolute inset-0 rounded-full bg-white/20" />
            {i === current && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)' }}
                initial={{ scaleX: 0, transformOrigin: 'left' }}
                animate={{ scaleX: 1 }}
                transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
