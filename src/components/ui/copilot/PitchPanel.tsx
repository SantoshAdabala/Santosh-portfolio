'use client';

import { motion } from 'framer-motion';
import { CopyButton } from '@/components/ui/CopyButton';

interface PitchPanelProps {
  data: string;
}

export function PitchPanel({ data }: PitchPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      <p className="text-sm text-foreground/50 leading-relaxed">
        A concise candidate pitch tailored to this role. Copy and use in outreach or cover letters.
      </p>

      {/* Quotable card */}
      <div className="relative rounded-xl border border-border/40 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8 pl-10 border-l-4 border-l-cyan-500/60">
        {/* Decorative quotation mark */}
        <span className="absolute top-4 left-4 text-5xl leading-none text-cyan-500/20 font-serif select-none pointer-events-none">
          &ldquo;
        </span>

        {/* Pitch text */}
        <p className="text-base text-foreground/80 leading-7 italic pl-4 pr-8">
          {data}
        </p>

        {/* Closing quotation mark */}
        <span className="absolute bottom-4 right-8 text-5xl leading-none text-cyan-500/20 font-serif select-none pointer-events-none">
          &rdquo;
        </span>

        {/* Copy button */}
        <div className="absolute top-4 right-4">
          <CopyButton text={data} />
        </div>
      </div>
    </motion.div>
  );
}
