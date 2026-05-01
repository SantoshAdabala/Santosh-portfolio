'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TextRevealProps {
  text: string;
  className?: string;
}

// Apple-style word-by-word opacity reveal on scroll
export function TextReveal({ text, className }: TextRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.3'],
  });

  const words = text.split(' ');

  if (prefersReduced) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p ref={ref} className={cn('flex flex-wrap justify-center', className)}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return <Word key={`${word}-${i}`} word={word} range={[start, end]} progress={scrollYProgress} />;
      })}
    </p>
  );
}

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [6, 0]);

  return (
    <motion.span
      className="mr-[0.3em] inline-block"
      style={{ opacity, y }}
    >
      {word}
    </motion.span>
  );
}
