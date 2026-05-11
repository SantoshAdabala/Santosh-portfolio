'use client';

import { motion } from 'framer-motion';
import type { BulletRewrite } from '@/types/copilot';

interface BulletsPanelProps {
  data: BulletRewrite[];
}

function BulletCard({ bullet, index }: { bullet: BulletRewrite; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="rounded-xl border border-border/40 bg-background/30 p-6 space-y-5"
    >
      {/* Original */}
      <div className="space-y-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground/30">
          Original
        </span>
        <p className="text-sm text-foreground/40 line-through decoration-foreground/20 leading-relaxed">
          {bullet.original}
        </p>
      </div>

      {/* Rewritten */}
      <div className="space-y-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-green-400/70">
          Improved
        </span>
        <p className="text-base text-foreground/90 border-l-2 border-green-500/40 pl-3 leading-relaxed">
          {bullet.rewritten}
        </p>
      </div>

      {/* Reasoning */}
      <p className="text-xs text-foreground/40 italic leading-relaxed">
        💡 {bullet.reasoning}
      </p>
    </motion.div>
  );
}

export function BulletsPanel({ data }: BulletsPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      <p className="text-sm text-foreground/50 leading-relaxed">
        {data.length} bullet{data.length !== 1 ? 's' : ''} rewritten to better
        align with the job description.
      </p>
      {data.map((bullet, i) => (
        <BulletCard key={i} bullet={bullet} index={i} />
      ))}
    </motion.div>
  );
}
