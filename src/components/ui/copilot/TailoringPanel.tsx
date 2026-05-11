'use client';

import { motion } from 'framer-motion';
import type { TailoringSuggestion } from '@/types/copilot';

interface TailoringPanelProps {
  data: TailoringSuggestion[];
}

const impactDotColors = {
  high: 'bg-red-400',
  medium: 'bg-amber-400',
  low: 'bg-gray-400',
} as const;

function SuggestionItem({
  suggestion,
  index,
}: {
  suggestion: TailoringSuggestion;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex gap-3 rounded-xl border border-border/40 bg-background/30 p-5"
    >
      {/* Number */}
      <span className="shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-white/5 text-xs font-semibold text-foreground/60">
        {index + 1}
      </span>

      <div className="flex-1 space-y-2">
        {/* Suggestion text */}
        <p className="text-base text-foreground/80 leading-relaxed">
          {suggestion.suggestion}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-3">
          {/* Impact indicator */}
          <span className="inline-flex items-center gap-1.5 text-[10px] text-foreground/50 uppercase tracking-wider">
            <span className={`h-2 w-2 rounded-full ${impactDotColors[suggestion.impact]}`} />
            {suggestion.impact} impact
          </span>

          {/* Section badge */}
          <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium bg-white/5 text-foreground/50 border border-border/30">
            {suggestion.section}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function TailoringPanel({ data }: TailoringPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <p className="text-sm text-foreground/50 leading-relaxed">
        {data.length} tailoring suggestion{data.length !== 1 ? 's' : ''} prioritized by impact.
      </p>
      {data.map((suggestion, i) => (
        <SuggestionItem key={i} suggestion={suggestion} index={i} />
      ))}
    </motion.div>
  );
}
