'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { STARAnswer } from '@/types/copilot';

interface STARPanelProps {
  data: STARAnswer[];
}

function STARCard({ answer, index }: { answer: STARAnswer; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="rounded-xl border border-border/40 bg-background/30 overflow-hidden"
    >
      {/* Header / Question */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between gap-3 p-5 text-left hover:bg-white/[0.02] transition-colors"
        aria-expanded={isExpanded}
      >
        <span className="text-sm font-medium text-foreground/80 leading-relaxed">
          {answer.question}
        </span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="h-4 w-4 text-foreground/40" />
        </motion.div>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4 border-t border-border/20 pt-4">
              <STARSection label="Situation" color="text-blue-400" content={answer.situation} />
              <STARSection label="Task" color="text-purple-400" content={answer.task} />
              <STARSection label="Action" color="text-cyan" content={answer.action} />
              <STARSection label="Result" color="text-green-400" content={answer.result} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function STARSection({
  label,
  color,
  content,
}: {
  label: string;
  color: string;
  content: string;
}) {
  return (
    <div className="space-y-1.5">
      <span className={`text-[10px] font-semibold uppercase tracking-wider ${color}`}>
        {label}
      </span>
      <p className="text-sm text-foreground/60 leading-relaxed">{content}</p>
    </div>
  );
}

export function STARPanel({ data }: STARPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <p className="text-sm text-foreground/50 leading-relaxed">
        {data.length} STAR-format answer{data.length !== 1 ? 's' : ''} based on
        your experience. Click to expand.
      </p>
      {data.map((answer, i) => (
        <STARCard key={i} answer={answer} index={i} />
      ))}
    </motion.div>
  );
}
