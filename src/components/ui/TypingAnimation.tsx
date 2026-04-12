'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TypingAnimationProps {
  keywords: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export function TypingAnimation({
  keywords,
  typingSpeed = 100,
  deletingSpeed = 60,
  pauseDuration = 1500,
  className,
}: TypingAnimationProps) {
  const prefersReduced = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = keywords[wordIndex] ?? '';

  const tick = useCallback(() => {
    if (isDeleting) {
      setText((prev) => prev.slice(0, -1));
    } else {
      setText((prev) => currentWord.slice(0, prev.length + 1));
    }
  }, [isDeleting, currentWord]);

  useEffect(() => {
    if (prefersReduced || keywords.length === 0) return;

    let delay: number;

    if (!isDeleting && text === currentWord) {
      delay = pauseDuration;
      const timeout = setTimeout(() => setIsDeleting(true), delay);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % keywords.length);
      return;
    }

    delay = isDeleting ? deletingSpeed : typingSpeed;
    const timeout = setTimeout(tick, delay);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, currentWord, keywords, prefersReduced, typingSpeed, deletingSpeed, pauseDuration, tick]);

  if (keywords.length === 0) return null;

  if (prefersReduced) {
    return (
      <span className={cn('font-mono text-accent', className)}>
        {keywords.join(' | ')}
      </span>
    );
  }

  return (
    <span className={cn('font-mono text-accent', className)}>
      {text}
      <span className="animate-blink ml-0.5 inline-block w-[2px] h-[1em] bg-accent align-middle" />
    </span>
  );
}
