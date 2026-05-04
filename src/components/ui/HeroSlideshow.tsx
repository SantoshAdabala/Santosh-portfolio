'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const images = [
  { src: '/images/hero-ai-3.webp', alt: 'Santosh Adabala — ML Engineer with holographic AI visualizations', position: 'center 30%' },
];

interface Props {
  className?: string;
}

export function HeroSlideshow({ className }: Props) {
  const prefersReduced = useReducedMotion();
  const img = images[0];

  return (
    <div className={className}>
      <motion.img
        src={img.src}
        alt={img.alt}
        className={`h-full w-full object-cover ${prefersReduced ? '' : 'hero-ken-burns'}`}
        style={{ objectPosition: img.position }}
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </div>
  );
}
