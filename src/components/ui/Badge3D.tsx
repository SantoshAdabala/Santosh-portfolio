'use client';

import { useRef, useEffect, useCallback } from 'react';
import { Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Props {
  imageSrc: string;
  imageAlt: string;
  className?: string;
}

export function Badge3D({ imageSrc, imageAlt, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const stateRef = useRef({
    isDragging: false,
    rotY: 0,
    rotX: 0,
    velocity: 0,
    lastX: 0,
    lastTime: 0,
    autoSpin: true,
    animFrame: 0 as number,
  });

  useEffect(() => {
    if (prefersReduced) return;

    const card = cardRef.current;
    const container = containerRef.current;
    if (!card || !container) return;

    const state = stateRef.current;

    // Main render loop
    const render = () => {
      // Auto-spin when not dragging and no momentum
      if (state.autoSpin && !state.isDragging) {
        state.rotY += 0.4;
      }

      // Apply momentum friction when not dragging
      if (!state.isDragging && !state.autoSpin) {
        state.rotY += state.velocity;
        state.velocity *= 0.98;

        // When momentum dies, resume auto-spin
        if (Math.abs(state.velocity) < 0.05) {
          state.velocity = 0;
          state.autoSpin = true;
        }
      }

      card.style.transform = `rotateX(${state.rotX}deg) rotateY(${state.rotY}deg)`;
      state.animFrame = requestAnimationFrame(render);
    };

    // Pointer down
    const onDown = (e: PointerEvent) => {
      state.isDragging = true;
      state.autoSpin = false;
      state.velocity = 0;
      state.lastX = e.clientX;
      state.lastTime = performance.now();
      container.setPointerCapture(e.pointerId);
      container.style.cursor = 'grabbing';
    };

    // Pointer move
    const onMove = (e: PointerEvent) => {
      if (!state.isDragging) return;

      const now = performance.now();
      const dx = e.clientX - state.lastX;
      const dt = now - state.lastTime;

      // Track velocity
      if (dt > 0) {
        state.velocity = (dx / dt) * 8;
      }

      state.rotY += dx * 0.5;
      state.lastX = e.clientX;
      state.lastTime = now;
    };

    // Pointer up — release with momentum
    const onUp = () => {
      state.isDragging = false;
      container.style.cursor = 'grab';
      // velocity is already set from onMove, momentum handled in render loop
    };

    // Hover tilt (vertical only)
    const onHover = (e: MouseEvent) => {
      if (state.isDragging) return;
      const rect = container.getBoundingClientRect();
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      state.rotX = y * -12;
    };

    const onLeave = () => {
      if (!state.isDragging) {
        state.rotX = 0;
      }
    };

    container.addEventListener('pointerdown', onDown);
    container.addEventListener('pointermove', onMove);
    container.addEventListener('pointerup', onUp);
    container.addEventListener('pointercancel', onUp);
    container.addEventListener('mousemove', onHover);
    container.addEventListener('mouseleave', onLeave);

    state.animFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(state.animFrame);
      container.removeEventListener('pointerdown', onDown);
      container.removeEventListener('pointermove', onMove);
      container.removeEventListener('pointerup', onUp);
      container.removeEventListener('pointercancel', onUp);
      container.removeEventListener('mousemove', onHover);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, [prefersReduced]);

  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'santosh-adabala-contact-card.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [imageSrc]);

  if (prefersReduced) {
    return (
      <div className={cn('flex flex-col items-center gap-6', className)}>
        <img src={imageSrc} alt={imageAlt} className="max-w-md w-full rounded-2xl shadow-lg" />
        <button onClick={handleDownload} className="inline-flex items-center gap-2 rounded-xl bg-accent/15 px-5 py-2.5 text-sm font-medium text-accent-light">
          <Download className="h-4 w-4" /> Download Card
        </button>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col items-center gap-8', className)}>
      <div
        ref={containerRef}
        className="relative select-none touch-none"
        style={{ perspective: '1000px', cursor: 'grab' }}
      >
        <div
          ref={cardRef}
          style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-[480px] max-w-[90vw] pointer-events-none"
            style={{
              borderRadius: '20px',
              clipPath: 'inset(5% 3% 5% 3% round 20px)',
            }}
            draggable={false}
          />
        </div>

        {/* Ground shadow */}
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 h-6 rounded-full blur-xl"
          style={{ width: '70%', background: 'linear-gradient(90deg, rgba(139,92,246,0.25), rgba(6,182,212,0.15))', opacity: 0.5 }}
        />
      </div>

      <button
        onClick={handleDownload}
        className="inline-flex items-center gap-2 rounded-xl border border-accent/20 bg-accent/10 px-6 py-3 text-sm font-medium text-accent-light transition-all hover:bg-accent/20 hover:border-accent/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
      >
        <Download className="h-4 w-4" />
        Download Contact Card
      </button>

      <p className="text-xs text-foreground/30">Flick left/right to spin • Drag to rotate</p>
    </div>
  );
}
