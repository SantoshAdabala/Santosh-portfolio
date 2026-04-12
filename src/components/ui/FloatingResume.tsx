'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';
import { siteConfig } from '@/data/site-config';

export function FloatingResume() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past the hero section
      setShow(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={siteConfig.resumeUrl}
          download
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="fixed bottom-24 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent to-cyan text-white shadow-[0_0_20px_rgba(139,92,246,0.4),0_0_40px_rgba(6,182,212,0.2)] transition-shadow hover:shadow-[0_0_30px_rgba(139,92,246,0.6),0_0_60px_rgba(6,182,212,0.3)] md:bottom-20 md:right-8"
          aria-label="Download Resume"
          data-cursor="pointer"
        >
          <Download className="h-5 w-5" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
