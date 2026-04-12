'use client';

import { useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function SmoothScroll() {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    // Add smooth scroll class to html element
    document.documentElement.style.scrollBehavior = 'smooth';

    // Add momentum-like scroll feel via CSS
    document.documentElement.style.setProperty('scroll-behavior', 'smooth');

    return () => {
      document.documentElement.style.removeProperty('scroll-behavior');
    };
  }, [prefersReduced]);

  return null;
}
