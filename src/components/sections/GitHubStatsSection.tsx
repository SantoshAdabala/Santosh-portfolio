'use client';

import { motion } from 'framer-motion';
import { githubStats } from '@/data/github-stats';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LiveGitHubStats } from '@/components/ui/LiveGitHubStats';
import { CurrentlyBuilding } from '@/components/ui/CurrentlyBuilding';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
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

const CONTRIBUTION_COLORS = ['var(--color-muted)', '#6D28D9', '#7C3AED', '#8B5CF6', '#A78BFA'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function ContributionHeatmap() {
  const contributions = generateContributions();
  const cellSize = 12;
  const gap = 3;
  const step = cellSize + gap;
  const weeks = 52;

  return (
    <div>
      <svg width={weeks * step + 30} height={7 * step + 20} role="img" aria-label="GitHub contribution heatmap">
        {MONTHS.map((month, i) => (
          <text key={month} x={30 + Math.floor((i / 12) * weeks) * step} y={10} className="fill-foreground/50" fontSize={10} fontFamily="var(--font-sans)">{month}</text>
        ))}
        {contributions.map((level, i) => {
          const week = Math.floor(i / 7);
          const day = i % 7;
          return <rect key={i} x={30 + week * step} y={16 + day * step} width={cellSize} height={cellSize} rx={2} fill={CONTRIBUTION_COLORS[level]} />;
        })}
      </svg>
      <div className="mt-3 flex items-center justify-end gap-1 text-xs text-foreground/50">
        <span>Less</span>
        {CONTRIBUTION_COLORS.map((color, i) => (
          <span key={i} className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: color }} />
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
        <SectionHeading title="GitHub Activity" subtitle="Live stats and contributions" />

        {/* Live stats */}
        <LiveGitHubStats />

        {/* Currently Building */}
        <div className="mt-8">
          <CurrentlyBuilding
            title="AlignLLM — LLM Alignment Pipeline on AWS"
            description="Building a 7B chat model alignment pipeline using SFT, DPO, RLHF, and LoRA/QLoRA on AWS SageMaker with Terraform infrastructure."
            progress={45}
            url="https://github.com/SantoshAdabala"
          />
        </div>

        {/* Top Languages */}
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
              <div key={lang.name} className="group flex items-center gap-3">
                <span className="w-32 shrink-0 text-sm font-medium transition-colors group-hover:text-accent-light">{lang.name}</span>
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted/50">
                  <motion.div
                    className="h-full rounded-full transition-shadow group-hover:shadow-[0_0_12px_rgba(139,92,246,0.3)]"
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
                <span className="w-12 text-right text-sm font-mono text-foreground/50 transition-colors group-hover:text-foreground/80">
                  {lang.percentage}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contribution Graph */}
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
          <SpotlightCard className="overflow-x-auto rounded-xl border border-border/40 bg-background/50" spotlightColor="rgba(139, 92, 246, 0.06)">
            <div className="p-5">
              <ContributionHeatmap />
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
