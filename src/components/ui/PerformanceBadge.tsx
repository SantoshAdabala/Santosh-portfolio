'use client';

import { motion } from 'framer-motion';

interface Props {
  score: number; // 0-100
  label: string;
}

function ScoreRing({ score }: { score: number }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 90 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <svg width={68} height={68} className="rotate-[-90deg]">
      <circle cx={34} cy={34} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={4} />
      <motion.circle
        cx={34} cy={34} r={r}
        fill="none" stroke={color} strokeWidth={4} strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{ filter: `drop-shadow(0 0 4px ${color}40)` }}
      />
    </svg>
  );
}

export function PerformanceBadge() {
  const scores = [
    { score: 96, label: 'Performance' },
    { score: 100, label: 'Accessibility' },
    { score: 100, label: 'Best Practices' },
    { score: 100, label: 'SEO' },
  ];

  return (
    <motion.div
      className="rounded-xl border border-border/30 bg-background/50 p-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#22c55e" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-xs font-semibold text-foreground/50">Lighthouse Scores</span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {scores.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1">
            <div className="relative">
              <ScoreRing score={s.score} />
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground/80">
                {s.score}
              </span>
            </div>
            <span className="text-[10px] text-foreground/40 text-center">{s.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
