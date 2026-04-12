'use client';

import { motion } from 'framer-motion';
import { Star, GitFork } from 'lucide-react';
import { githubStats } from '@/data/github-stats';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Seeded pseudo-random for deterministic contribution data
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateContributions(): number[] {
  const total = 52 * 7; // 52 weeks × 7 days
  const data: number[] = [];
  for (let i = 0; i < total; i++) {
    const r = seededRandom(i * 31 + 7);
    const weekOfYear = Math.floor(i / 7);
    // Higher activity mid-year and towards end
    const seasonalBoost = Math.sin((weekOfYear / 52) * Math.PI) * 0.3 + 0.5;
    const dayOfWeek = i % 7;
    // Weekdays more active
    const weekdayBoost = dayOfWeek >= 1 && dayOfWeek <= 5 ? 1.3 : 0.6;
    const val = r * seasonalBoost * weekdayBoost;

    if (val < 0.15) data.push(0);
    else if (val < 0.35) data.push(1);
    else if (val < 0.55) data.push(2);
    else if (val < 0.75) data.push(3);
    else data.push(4);
  }
  return data;
}

const CONTRIBUTION_COLORS = [
  'var(--color-muted)',       // 0: no contributions
  '#6D28D9',                  // 1: low (violet-700)
  '#7C3AED',                  // 2: medium-low (violet-600)
  '#8B5CF6',                  // 3: medium-high (violet-500)
  '#A78BFA',                  // 4: high (violet-400)
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function ContributionHeatmap() {
  const contributions = generateContributions();
  const cellSize = 12;
  const gap = 3;
  const step = cellSize + gap;
  const weeks = 52;

  return (
    <div>
      <svg
        width={weeks * step + 30}
        height={7 * step + 20}
        role="img"
        aria-label="GitHub contribution heatmap showing activity over the past year"
      >
        {/* Month labels */}
        {MONTHS.map((month, i) => (
          <text
            key={month}
            x={30 + Math.floor((i / 12) * weeks) * step}
            y={10}
            className="fill-foreground/50"
            fontSize={10}
            fontFamily="var(--font-sans)"
          >
            {month}
          </text>
        ))}
        {/* Cells */}
        {contributions.map((level, i) => {
          const week = Math.floor(i / 7);
          const day = i % 7;
          return (
            <rect
              key={i}
              x={30 + week * step}
              y={16 + day * step}
              width={cellSize}
              height={cellSize}
              rx={2}
              fill={CONTRIBUTION_COLORS[level]}
            />
          );
        })}
      </svg>
      <div className="mt-3 flex items-center justify-end gap-1 text-xs text-foreground/60 dark:text-foreground">
        <span>Less</span>
        {CONTRIBUTION_COLORS.map((color, i) => (
          <span
            key={i}
            className="inline-block h-3 w-3 rounded-sm"
            style={{ backgroundColor: color }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

export function GitHubStatsSection() {
  const prefersReduced = useReducedMotion();

  const viewProps = prefersReduced
    ? {}
    : {
        variants: fadeIn,
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-80px' },
      };

  return (
    <section id="github" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title="GitHub Activity"
          subtitle="Open-source contributions and stats"
        />

        {/* Stars & Forks */}
        <motion.div
          className="grid grid-cols-2 gap-6 sm:grid-cols-2"
          {...viewProps}
        >
          <div className="flex flex-col items-center rounded-xl border border-border bg-background p-6">
            <Star className="mb-2 h-6 w-6 text-accent" />
            <AnimatedCounter target={githubStats.totalStars} className="text-3xl font-bold" />
            <span className="mt-1 text-sm text-foreground/60 dark:text-foreground">Total Stars</span>
          </div>
          <div className="flex flex-col items-center rounded-xl border border-border bg-background p-6">
            <GitFork className="mb-2 h-6 w-6 text-accent" />
            <AnimatedCounter target={githubStats.totalForks} className="text-3xl font-bold" />
            <span className="mt-1 text-sm text-foreground/60 dark:text-foreground">Total Forks</span>
          </div>
        </motion.div>

        {/* Top Languages */}
        <motion.div className="mt-8" {...viewProps}>
          <h3 className="mb-4 text-lg font-semibold">Top Languages</h3>
          <div className="space-y-3">
            {githubStats.topLanguages.map((lang) => (
              <div key={lang.name} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-sm font-medium">{lang.name}</span>
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${lang.percentage}%` }}
                  />
                </div>
                <span className="w-10 text-right text-sm text-foreground/60 dark:text-foreground">
                  {lang.percentage}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contribution Graph */}
        <motion.div className="mt-8" {...viewProps}>
          <h3 className="mb-4 text-lg font-semibold">Contribution Graph</h3>
          <div className="overflow-x-auto rounded-xl border border-border bg-background p-4">
            <ContributionHeatmap />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
