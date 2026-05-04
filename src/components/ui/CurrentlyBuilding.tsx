'use client';

import { motion } from 'framer-motion';
import { Hammer, ExternalLink } from 'lucide-react';

interface Props {
  title: string;
  description: string;
  progress: number; // 0-100
  url?: string;
}

export function CurrentlyBuilding({ title, description, progress, url }: Props) {
  return (
    <motion.div
      className="rounded-xl border border-accent/20 bg-accent/5 p-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15">
          <Hammer className="h-4 w-4 text-accent-light" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold">Currently Building</h4>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-foreground/70">{title}</p>
          <p className="mt-1 text-xs text-foreground/45">{description}</p>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex justify-between text-[10px] text-foreground/40 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted/50">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent to-cyan"
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>
          </div>

          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-accent-light hover:text-accent transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              Follow progress
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
