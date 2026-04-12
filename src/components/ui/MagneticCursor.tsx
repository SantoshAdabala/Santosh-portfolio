'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function MagneticCursor() {
  const prefersReduced = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [mounted, setMounted] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const dotX = useSpring(cursorX, springConfig);
  const dotY = useSpring(cursorY, springConfig);

  const ringConfig = { damping: 20, stiffness: 150, mass: 0.8 };
  const ringX = useSpring(cursorX, ringConfig);
  const ringY = useSpring(cursorY, ringConfig);

  useEffect(() => {
    setMounted(true);
    if (prefersReduced) return;

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]');
      setIsHovering(!!interactive);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [prefersReduced, cursorX, cursorY]);

  if (prefersReduced || !mounted) return null;

  return (
    <>
      {/* Inner dot — follows cursor tightly */}
      <motion.div
        className="pointer-events-none fixed z-[52] hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full bg-accent"
          animate={{
            width: isClicking ? 6 : isHovering ? 4 : 8,
            height: isClicking ? 6 : isHovering ? 4 : 8,
            opacity: isHovering ? 0.8 : 1,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        />
      </motion.div>

      {/* Outer ring — follows with lag, expands on hover */}
      <motion.div
        className="pointer-events-none fixed z-[52] hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border border-accent/40"
          animate={{
            width: isClicking ? 28 : isHovering ? 48 : 32,
            height: isClicking ? 28 : isHovering ? 48 : 32,
            borderColor: isHovering ? 'rgba(139,92,246,0.6)' : 'rgba(139,92,246,0.3)',
            backgroundColor: isHovering ? 'rgba(139,92,246,0.06)' : 'transparent',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
      </motion.div>
    </>
  );
}
