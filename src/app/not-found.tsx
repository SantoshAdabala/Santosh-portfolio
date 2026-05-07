'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      {/* Animated 404 with floating illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        className="relative"
      >
        {/* Animated SVG illustration */}
        <svg width="200" height="160" viewBox="0 0 200 160" className="mx-auto mb-6">
          <motion.circle
            cx="100" cy="80" r="50"
            fill="none" stroke="rgba(139,92,246,0.3)" strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1, rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          <motion.circle
            cx="100" cy="80" r="35"
            fill="none" stroke="rgba(6,182,212,0.3)" strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1, rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
          <motion.text
            x="100" y="85" textAnchor="middle" fontSize="18" fontWeight="bold"
            fill="rgba(139,92,246,0.6)" fontFamily="monospace"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            NULL
          </motion.text>
          {/* Floating particles */}
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.circle
              key={i}
              cx={60 + i * 20} cy={140}
              r={2}
              fill="rgba(139,92,246,0.4)"
              animate={{ y: [-10, -30, -10], opacity: [0, 1, 0] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            />
          ))}
        </svg>
        <h1 className="text-[100px] sm:text-[140px] font-bold leading-none gradient-text text-center">
          404
        </h1>
      </motion.div>

      <motion.p
        className="mt-4 text-xl text-foreground/60 dark:text-foreground/70"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        This page doesn&apos;t exist — like a model with 0% accuracy.
      </motion.p>

      <motion.p
        className="mt-2 text-sm text-foreground/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        The page you&apos;re looking for has been moved, deleted, or never existed.
      </motion.p>

      <motion.div
        className="mt-8 flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Button variant="primary" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
        <Button variant="secondary" href="/">
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
      </motion.div>

      {/* Ambient glow */}
      <div className="pointer-events-none fixed top-1/3 left-1/4 h-96 w-96 rounded-full bg-accent/8 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-cyan/6 blur-[100px]" />
    </div>
  );
}
