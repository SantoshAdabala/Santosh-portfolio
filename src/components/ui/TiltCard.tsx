'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useTilt } from '@/hooks/useTilt';

interface Props {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({ children, className, maxTilt = 8 }: Props) {
  const { style, onMouseMove, onMouseLeave } = useTilt(maxTilt);

  return (
    <div
      className={cn('will-change-transform', className)}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}
