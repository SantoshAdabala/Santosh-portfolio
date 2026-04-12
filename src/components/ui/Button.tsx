'use client';

import { type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const variantStyles = {
  primary:
    'bg-gradient-to-r from-accent to-cyan text-white hover:from-accent-light hover:to-cyan-light focus-visible:ring-accent',
  secondary:
    'border border-white/10 text-foreground/80 hover:bg-white/5 hover:text-foreground focus-visible:ring-accent',
  ghost:
    'text-foreground hover:bg-muted focus-visible:ring-foreground',
} as const;

type Variant = keyof typeof variantStyles;

interface ButtonSharedProps {
  variant?: Variant;
  className?: string;
  children?: ReactNode;
}

type ButtonAsButton = ButtonSharedProps &
  Omit<HTMLMotionProps<'button'>, 'children'> & { href?: undefined };

type ButtonAsAnchor = ButtonSharedProps &
  Omit<HTMLMotionProps<'a'>, 'children'> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button(props: ButtonProps) {
  const { variant = 'primary', className, children, ...rest } = props;
  const prefersReduced = useReducedMotion();

  const classes = cn(
    'inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
    variantStyles[variant],
    className,
  );

  const hoverProps = prefersReduced
    ? {}
    : {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
      };

  if (props.href !== undefined) {
    const { href, variant: _v, ...anchorRest } = rest as Omit<HTMLMotionProps<'a'>, 'children'> & {
      href: string;
      variant?: Variant;
    };
    return (
      <motion.a href={href} className={classes} {...hoverProps} {...anchorRest}>
        {children}
      </motion.a>
    );
  }

  const { variant: _v, ...btnRest } = rest as Omit<HTMLMotionProps<'button'>, 'children'> & {
    variant?: Variant;
  };
  return (
    <motion.button className={classes} {...hoverProps} {...btnRest}>
      {children}
    </motion.button>
  );
}
