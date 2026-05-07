'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';

// Apple-style animated gradient mesh background
export function GradientMesh() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Blob 1 — purple */}
      <div
        className="absolute -top-1/4 -left-1/4 h-[600px] w-[600px] rounded-full opacity-50 animate-mesh-1"
        style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }}
      />
      {/* Blob 2 — cyan */}
      <div
        className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full opacity-40 animate-mesh-2"
        style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }}
      />
      {/* Blob 3 — violet */}
      <div
        className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full opacity-35 animate-mesh-3"
        style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)' }}
      />
      {/* Blob 4 — teal accent */}
      <div
        className="absolute bottom-1/4 left-1/3 h-[350px] w-[350px] rounded-full opacity-30 animate-mesh-4"
        style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)' }}
      />
    </div>
  );
}
