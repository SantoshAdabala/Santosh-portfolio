'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

const MATRIX_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
const COLUMN_COUNT = 30;

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    // Randomize initial positions so it doesn't look uniform
    for (let i = 0; i < drops.length; i++) {
      drops[i] = Math.random() * -50;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

function ReducedMotionMessage() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center p-8">
        <p className="text-green-400 text-4xl font-mono mb-4">🎉</p>
        <p className="text-green-400 text-2xl font-mono">
          You found the easter egg!
        </p>
        <p className="text-green-500/70 text-sm font-mono mt-4">
          Click anywhere or press Escape to close
        </p>
      </div>
    </div>
  );
}

export function EasterEgg() {
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<string[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const dismiss = useCallback(() => {
    setActive(false);
    inputRef.current = [];
  }, []);

  // Listen for Konami code
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (active) {
        if (e.key === 'Escape') {
          dismiss();
        }
        return;
      }

      inputRef.current.push(e.key);

      // Keep only the last N keys where N = KONAMI_CODE length
      if (inputRef.current.length > KONAMI_CODE.length) {
        inputRef.current = inputRef.current.slice(-KONAMI_CODE.length);
      }

      // Check if the sequence matches
      if (
        inputRef.current.length === KONAMI_CODE.length &&
        inputRef.current.every((key, i) => key === KONAMI_CODE[i])
      ) {
        setActive(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [active, dismiss]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {active && (
        <motion.div
          key="easter-egg-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] bg-black/90 cursor-pointer"
          onClick={dismiss}
          role="dialog"
          aria-label="Easter egg animation"
        >
          {prefersReducedMotion ? <ReducedMotionMessage /> : <MatrixRain />}
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="text-green-500/50 text-xs font-mono">
              Click anywhere or press Escape to close
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
