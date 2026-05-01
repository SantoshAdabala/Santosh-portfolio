'use client';

import { motion } from 'framer-motion';
import { Star, GitFork } from 'lucide-react';
import { githubStats } from '@/data/github-stats';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { CountUp } from '@/components/ui/CountUp';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Seeded pseudo-random for deterministic contribution data
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateContributions(): number[] {
  const total = 52 * 7;
  const data: number[] = [];
  for (let i = 0; i < total; i++) {
    const r = seededRandom(i * 31 + 7);
    const weekOfYear = Math.floor(i / 7);
    const seasonalBoost = Math.sin((weekOfYear / 52) * Math.PI) * 0.3 + 0.5;
    const dayOfWeek = i % 7;
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
  'var(--color-muted)',
  '#6D28D9',
  '#7C3AED',
  '#8B5CF6',
  '#A78BFA',
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function AnimatedHeatmap() {
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
      <div className="mt-3 flex items-center justify-end gap-1 text-xs text-foreground/50">
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

  return (
    <section id="github" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title="GitHub Activity"
          subtitle="Open-source contributions and stats"
        />

        {/* Stars & Forks — with spotlight + spring count */}
        <div className="grid grid-cols-2 gap-6">
          {[
            { icon: Star, value: githubStats.totalStars.toString(), label: 'Total Stars', color: 'rgba(139, 92, 246, 0.12)' },
            { icon: GitFork, value: githubStats.totalForks.toString(), label: 'Total Forks', color: 'rgba(6, 182, 212, 0.12)' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              {...(prefersReduced ? {} : {
                initial: { opacity: 0, y: 40, scale: 0.9 },
                whileInView: { opacity: 1, y: 0, scale: 1 },
                viewport: { once: true },
                transition: { delay: i * 0.15, type: 'spring', stiffness: 100, damping: 15 },
              })}
            >
              <SpotlightCard
                className="rounded-xl border border-border/50 bg-background/50"
                spotlightColor={stat.color}
              >
                <div className="flex flex-col items-center p-8">
                  <stat.icon className="mb-3 h-7 w-7 text-accent" />
                  <CountUp value={stat.value} className="text-4xl font-bold gradient-text" />
                  <span className="mt-2 text-sm text-foreground/50">{stat.label}</span>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Top Languages — animated bars */}
        <motion.div
          className="mt-10"
          {...(prefersReduced ? {} : {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 },
          })}
        >
          <h3 className="mb-5 text-lg font-semibold">Top Languages</h3>
          <div className="space-y-4">
            {githubStats.topLanguages.map((lang, i) => (
              <div key={lang.name} className="flex items-center gap-3">
                <span className="w-32 shrink-0 text-sm font-medium">{lang.name}</span>
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted/50">
                  <motion.div
                    className="h-full rounded-full"
                    {...(prefersReduced
                      ? { style: { width: `${lang.percentage}%`, background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)' } }
                      : {
                          style: { background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)' },
                          initial: { width: '0%' },
                          whileInView: { width: `${lang.percentage}%` },
                          viewport: { once: true },
                          transition: { delay: i * 0.1, duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
                        }
                    )}
                  />
                </div>
                <motion.span
                  className="w-12 text-right text-sm font-mono text-foreground/50"
                  {...(prefersReduced ? {} : {
                    initial: { opacity: 0 },
                    whileInView: { opacity: 1 },
                    viewport: { once: true },
                    transition: { delay: i * 0.1 + 0.5 },
                  })}
                >
                  {lang.percentage}%
                </motion.span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contribution Graph — animated cells */}
        <motion.div
          className="mt-10"
          {...(prefersReduced ? {} : {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 },
          })}
        >
          <h3 className="mb-5 text-lg font-semibold">Contribution Graph</h3>
          <SpotlightCard
            className="overflow-x-auto rounded-xl border border-border/50 bg-background/50"
            spotlightColor="rgba(139, 92, 246, 0.06)"
          >
            <div className="p-5">
              <AnimatedHeatmap />
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
