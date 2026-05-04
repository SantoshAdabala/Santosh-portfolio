'use client';

import { useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function SmoothScroll() {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Force scroll to top on page load
    window.scrollTo(0, 0);

    if (prefersReduced) return;

    document.documentElement.style.scrollBehavior = 'smooth';
    document.documentElement.style.setProperty('scroll-behavior', 'smooth');

    return () => {
      document.documentElement.style.removeProperty('scroll-behavior');
    };
  }, [prefersReduced]);

  return null;
}
