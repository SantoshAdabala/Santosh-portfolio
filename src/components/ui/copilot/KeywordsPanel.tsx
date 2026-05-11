'use client';

import { motion } from 'framer-motion';
import type { KeywordAnalysis, KeywordItem } from '@/types/copilot';

interface KeywordsPanelProps {
  data: KeywordAnalysis;
}

const categoryConfig = {
  technical: { label: 'Technical', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  soft_skill: { label: 'Soft Skills', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  tool: { label: 'Tools', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
  domain: { label: 'Domain', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
} as const;

const categoryHeaderColors = {
  technical: 'text-blue-400',
  soft_skill: 'text-purple-400',
  tool: 'text-cyan-400',
  domain: 'text-amber-400',
} as const;

const categoryDotColors = {
  technical: 'bg-blue-400',
  soft_skill: 'bg-purple-400',
  tool: 'bg-cyan-400',
  domain: 'bg-amber-400',
} as const;

function KeywordTag({ item }: { item: KeywordItem }) {
  const config = categoryConfig[item.category];

  return (
    <div className="flex flex-col gap-1">
      <span
        className={`inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium ${config.color}`}
      >
        {item.keyword}
      </span>
      <p className="text-[11px] text-foreground/40 pl-1 leading-relaxed">{item.suggestion}</p>
    </div>
  );
}

export function KeywordsPanel({ data }: KeywordsPanelProps) {
  const grouped = data.missing.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, KeywordItem[]>,
  );

  const categories = ['technical', 'soft_skill', 'tool', 'domain'] as const;
  const activeCategories = categories.filter(
    (c) => grouped[c] && grouped[c].length > 0,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <p className="text-sm text-foreground/50 leading-relaxed">
        {data.missing.length} missing keyword{data.missing.length !== 1 ? 's' : ''} detected.
        Add these to improve ATS matching.
      </p>

      {activeCategories.map((category, idx) => (
        <div key={category}>
          <div className="space-y-4">
            <h3
              className={`text-sm font-semibold flex items-center gap-2 ${categoryHeaderColors[category]}`}
            >
              <span className={`h-2 w-2 rounded-full ${categoryDotColors[category]}`} />
              {categoryConfig[category].label} ({grouped[category].length})
            </h3>
            <div className="flex flex-wrap gap-3">
              {grouped[category].map((item) => (
                <KeywordTag key={item.keyword} item={item} />
              ))}
            </div>
          </div>
          {idx < activeCategories.length - 1 && (
            <div className="mt-8 border-t border-border/20" />
          )}
        </div>
      ))}
    </motion.div>
  );
}
