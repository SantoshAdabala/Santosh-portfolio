'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Use localStorage-based counter since CountAPI is dead
    try {
      const stored = localStorage.getItem('portfolio-views');
      const val = stored ? parseInt(stored, 10) + 1 : 1;
      localStorage.setItem('portfolio-views', val.toString());
      setCount(val);
    } catch {
      // localStorage not available
    }
  }, []);

  if (count === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-foreground/60 dark:text-foreground/80"
    >
      <Eye className="h-3.5 w-3.5 text-accent-light" />
      <span>{count.toLocaleString()} views</span>
    </motion.div>
  );
}
