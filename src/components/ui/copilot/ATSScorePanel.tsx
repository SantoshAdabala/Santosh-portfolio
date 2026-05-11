'use client';

import { motion } from 'framer-motion';
import type { ATSScore } from '@/types/copilot';
import { getScoreColor } from '@/lib/copilot-validators';

interface ATSScorePanelProps {
  data: ATSScore;
}

function ScoreRing({ score }: { score: number }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = getScoreColor(score);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={130} height={130} className="rotate-[-90deg]">
        <circle
          cx={65}
          cy={65}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={8}
        />
        <motion.circle
          cx={65}
          cy={65}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 8px ${color}50)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-3xl font-bold"
          style={{ color }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        >
          {score}
        </motion.span>
        <span className="text-[10px] text-foreground/40 uppercase tracking-wider">
          ATS Score
        </span>
      </div>
    </div>
  );
}

function ScoreDescription({ score }: { score: number }) {
  let description: string;
  if (score >= 80) {
    description = 'Excellent match — your resume is well-optimized for this role.';
  } else if (score >= 60) {
    description = 'Good foundation — a few targeted improvements could boost your ranking.';
  } else {
    description = 'Needs attention — significant gaps may prevent your resume from passing ATS filters.';
  }

  return (
    <p className="text-sm text-foreground/50 text-center leading-relaxed max-w-[280px]">
      {description}
    </p>
  );
}

function FactorBar({ label, value }: { label: string; value: number }) {
  const color = getScoreColor(value);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-foreground/60">{label}</span>
        <span className="font-medium" style={{ color }}>
          {value}%
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
        />
      </div>
    </div>
  );
}

export function ATSScorePanel({ data }: ATSScorePanelProps) {
  const isWarning = data.score < 60;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Score ring section */}
      <div className="flex flex-col items-center gap-5">
        <ScoreRing score={data.score} />
        <ScoreDescription score={data.score} />
        {isWarning && (
          <p className="text-xs text-amber-400 font-medium">
            ⚠ Score below 60 — your resume may not pass ATS screening
          </p>
        )}
      </div>

      {/* Breakdown factors */}
      <div className="rounded-xl border border-border/40 bg-background/30 p-6 space-y-5">
        <h3 className="text-sm font-semibold text-foreground/80">Score Breakdown</h3>
        <FactorBar label="Keyword Density" value={data.factors.keywordDensity} />
        <FactorBar label="Format Compatibility" value={data.factors.formatCompatibility} />
        <FactorBar label="Section Completeness" value={data.factors.sectionCompleteness} />
      </div>
    </motion.div>
  );
}
