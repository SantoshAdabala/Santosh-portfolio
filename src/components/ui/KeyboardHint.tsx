'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function KeyboardHint() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show after 5 seconds, hide after 10 seconds
    const showTimer = setTimeout(() => setShow(true), 5000);
    const hideTimer = setTimeout(() => setShow(false), 12000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-20 left-1/2 z-30 -translate-x-1/2 md:bottom-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 rounded-full border border-border/30 bg-background/80 px-4 py-2 text-xs text-foreground/40 backdrop-blur-md shadow-lg">
            <span>Press</span>
            <kbd className="rounded border border-border/40 bg-muted/50 px-1.5 py-0.5 font-mono text-[10px] font-semibold">⌘K</kbd>
            <span>to search & navigate</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
