'use client';

import { motion } from 'framer-motion';
import type { SkillAnalysis, SkillMatch } from '@/types/copilot';

interface SkillsPanelProps {
  data: SkillAnalysis;
}

function PriorityBadge({ priority }: { priority: 'high' | 'medium' | 'low' }) {
  const styles = {
    high: 'bg-red-500/15 text-red-400 border-red-500/30',
    medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    low: 'bg-gray-500/15 text-gray-400 border-gray-500/30',
  };

  return (
    <span
      className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider border ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}

function SkillBadge({
  skill,
  variant,
}: {
  skill: SkillMatch;
  variant: 'matched' | 'partial' | 'missing';
}) {
  const styles = {
    matched: 'bg-green-500/10 text-green-400 border-green-500/20',
    partial: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    missing: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${styles[variant]}`}
        >
          {skill.skill}
        </span>
        {skill.priority && <PriorityBadge priority={skill.priority} />}
      </div>
      {skill.gap && (
        <p className="text-[11px] text-foreground/40 pl-1 leading-relaxed">{skill.gap}</p>
      )}
    </div>
  );
}

export function SkillsPanel({ data }: SkillsPanelProps) {
  const sections = [
    { key: 'matched', items: data.matched, variant: 'matched' as const, label: 'Matched Skills', color: 'text-green-400', dot: 'bg-green-400' },
    { key: 'partial', items: data.partial, variant: 'partial' as const, label: 'Partial Matches', color: 'text-amber-400', dot: 'bg-amber-400' },
    { key: 'missing', items: data.missing, variant: 'missing' as const, label: 'Missing Skills', color: 'text-red-400', dot: 'bg-red-400' },
  ].filter((s) => s.items.length > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {sections.map((section, idx) => (
        <div key={section.key}>
          <div className="space-y-4">
            <h3 className={`text-sm font-semibold flex items-center gap-2 ${section.color}`}>
              <span className={`h-2 w-2 rounded-full ${section.dot}`} />
              {section.label} ({section.items.length})
            </h3>
            <div className="flex flex-wrap gap-3">
              {section.items.map((skill) => (
                <SkillBadge key={skill.skill} skill={skill} variant={section.variant} />
              ))}
            </div>
          </div>
          {idx < sections.length - 1 && (
            <div className="mt-8 border-t border-border/20" />
          )}
        </div>
      ))}
    </motion.div>
  );
}
