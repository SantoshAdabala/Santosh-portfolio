'use client';

import { motion } from 'framer-motion';
import type { RecruiterFeedback } from '@/types/copilot';

interface RecruiterPanelProps {
  data: RecruiterFeedback;
}

function RecommendationBadge({
  recommendation,
}: {
  recommendation: RecruiterFeedback['recommendation'];
}) {
  const config = {
    strong_yes: { label: 'Strong Yes', color: 'bg-green-500/15 text-green-400 border-green-500/30' },
    yes: { label: 'Yes', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
    maybe: { label: 'Maybe', color: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
    no: { label: 'No', color: 'bg-red-500/15 text-red-400 border-red-500/30' },
  };

  const { label, color } = config[recommendation];

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${color}`}
    >
      {label}
    </span>
  );
}

export function RecruiterPanel({ data }: RecruiterPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-border/40 bg-gradient-to-br from-background/50 to-accent/[0.03] p-8 space-y-6"
    >
      {/* Header with recommendation badge */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground/80">
          Recruiter Assessment
        </h3>
        <RecommendationBadge recommendation={data.recommendation} />
      </div>

      {/* First Impression */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/40">
          First Impression
        </h4>
        <p className="text-base text-foreground/70 leading-7">
          {data.firstImpression}
        </p>
      </div>

      {/* Strengths */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-green-400/70">
          Strengths
        </h4>
        <p className="text-base text-foreground/70 leading-7">
          {data.strengths}
        </p>
      </div>

      {/* Concerns */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400/70">
          Concerns
        </h4>
        <p className="text-base text-foreground/70 leading-7">
          {data.concerns}
        </p>
      </div>

      {/* Recommendation + Justification */}
      <div className="space-y-2 border-t border-border/30 pt-5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/40">
          Justification
        </h4>
        <p className="text-base text-foreground/70 leading-7 italic">
          &ldquo;{data.justification}&rdquo;
        </p>
      </div>
    </motion.div>
  );
}
