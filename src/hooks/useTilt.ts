'use client';

import { useState, useCallback, type MouseEvent } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface TiltStyle {
  transform: string;
  transition: string;
}

const defaultStyle: TiltStyle = {
  transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
  transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
};

export function useTilt(maxTilt = 8) {
  const prefersReduced = useReducedMotion();
  const [style, setStyle] = useState<TiltStyle>(defaultStyle);

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (prefersReduced) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * maxTilt;
      const rotateY = (x - 0.5) * maxTilt;
      setStyle({
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`,
        transition: 'transform 0.1s ease',
      });
    },
    [maxTilt, prefersReduced],
  );

  const onMouseLeave = useCallback(() => {
    setStyle(defaultStyle);
  }, []);

  return { style: prefersReduced ? {} : style, onMouseMove, onMouseLeave };
}
