'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for page to be interactive, then fade out
    const timer = setTimeout(() => setIsLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'hsl(240, 20%, 2%)' }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Animated logo mark */}
          <motion.div
            className="relative mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, delay: 0.1 }}
          >
            <div className="relative h-16 w-16">
              {/* Outer ring */}
              <motion.svg
                viewBox="0 0 64 64"
                className="absolute inset-0 h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                transition={{ opacity: { delay: 0.2 }, rotate: { duration: 3, repeat: Infinity, ease: 'linear' } }}
              >
                <circle
                  cx="32" cy="32" r="28"
                  fill="none"
                  stroke="url(#loaderGrad)"
                  strokeWidth="2"
                  strokeDasharray="40 136"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="loaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </motion.svg>
              {/* Center letter */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-2xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                SA
              </motion.div>
            </div>
          </motion.div>

          {/* Name */}
          <motion.p
            className="text-sm font-medium tracking-widest uppercase"
            style={{ color: 'rgba(255,255,255,0.4)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            Santosh Adabala
          </motion.p>

          {/* Loading bar */}
          <motion.div
            className="mt-6 h-[2px] w-32 overflow-hidden rounded-full"
            style={{ background: 'rgba(255,255,255,0.05)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.7, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
