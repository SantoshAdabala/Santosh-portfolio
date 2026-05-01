'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Point {
  x: number;
  y: number;
  age: number;
}

const MAX_POINTS = 50;
const POINT_LIFETIME = 600; // ms
const TRAIL_WIDTH = 3;

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const lastAddRef = useRef(0);

  useEffect(() => {
    if (prefersReduced) return;
    // Only on desktop with fine pointer
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      const now = Date.now();
      // Add point every 16ms (60fps)
      if (now - lastAddRef.current > 16) {
        pointsRef.current.push({ x: e.clientX, y: e.clientY, age: 0 });
        if (pointsRef.current.length > MAX_POINTS) {
          pointsRef.current.shift();
        }
        lastAddRef.current = now;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const points = pointsRef.current;

      // Age points and remove dead ones
      for (let i = points.length - 1; i >= 0; i--) {
        points[i].age += 16;
        if (points[i].age > POINT_LIFETIME) {
          points.splice(i, 1);
        }
      }

      if (points.length < 2) {
        animId = requestAnimationFrame(draw);
        return;
      }

      // Draw smooth trail
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];
        const life0 = 1 - p0.age / POINT_LIFETIME;
        const life1 = 1 - p1.age / POINT_LIFETIME;
        const avgLife = (life0 + life1) / 2;

        // Gradient from purple to cyan based on position in trail
        const t = i / points.length;
        const r = Math.round(139 * (1 - t) + 6 * t);
        const g = Math.round(92 * (1 - t) + 182 * t);
        const b = Math.round(246 * (1 - t) + 212 * t);

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${avgLife * 0.6})`;
        ctx.lineWidth = TRAIL_WIDTH * avgLife;
        ctx.stroke();
      }

      // Glow at the head of the trail
      if (points.length > 0) {
        const head = points[points.length - 1];
        const headLife = 1 - head.age / POINT_LIFETIME;
        const gradient = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 20);
        gradient.addColorStop(0, `rgba(139, 92, 246, ${headLife * 0.3})`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(head.x - 20, head.y - 20, 40, 40);
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[51]"
      aria-hidden="true"
    />
  );
}
