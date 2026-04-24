'use client';

import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Trophy, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TechRadar } from '@/components/ui/TechRadar';
import { TiltCard } from '@/components/ui/TiltCard';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const impactMetrics = [
  { value: '110M→65M', label: 'Model Compression', pct: 74, color: '#8b5cf6' },
  { value: '3.5x Faster', label: 'Inference Speed', pct: 88, color: '#06b6d4' },
  { value: '93.2%', label: 'F1 Retained', pct: 93, color: '#22d3ee' },
  { value: '4,350/s', label: 'Docs Processed', pct: 95, color: '#a78bfa' },
];

function AnimatedRing({ pct, color, size = 80 }: { pct: number; color: string; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={4} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth={4} strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{ filter: `drop-shadow(0 0 6px ${color}40)` }}
      />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export function AboutSection() {
  const prefersReduced = useReducedMotion();
  const viewProps = prefersReduced
    ? {}
    : { variants: fadeUp, initial: 'hidden', whileInView: 'visible', viewport: { once: true, margin: '-80px' } };

  return (
    <section id="about" className="relative px-6 py-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <img src="/images/hero-ai-1.jpg" alt="" className="h-full w-full object-cover opacity-8" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>
      <div className="pointer-events-none absolute top-0 left-1/4 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading title="About Me" subtitle="Building ML systems that make LLMs production-ready" />

        {/* Narrative */}
        <motion.p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-foreground/60 dark:text-foreground" {...viewProps}>
          I build ML systems that make large language models faster, smaller, and production-ready.
          With 6+ years of experience, I specialize in LLM customization workflows — fine-tuning,
          knowledge distillation, prompt optimization, and model compression.
        </motion.p>

        {/* Impact metrics with animated rings */}
        <motion.div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4" {...viewProps}>
          {impactMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              className="flex flex-col items-center gap-3"
              {...(prefersReduced ? {} : {
                initial: { opacity: 0, scale: 0.8 },
                whileInView: { opacity: 1, scale: 1 },
                viewport: { once: true },
                transition: { delay: i * 0.1, duration: 0.5 },
              })}
            >
              <div className="relative">
                <AnimatedRing pct={m.pct} color={m.color} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold font-mono" style={{ color: m.color }}>{m.value}</span>
                </div>
              </div>
              <span className="text-xs text-center text-foreground/60 dark:text-foreground font-medium">{m.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Radar — full width centerpiece */}
        <motion.div className="mt-20" {...viewProps}>
          <h3 className="mb-2 text-center text-lg font-semibold gradient-text">Technology Radar</h3>
          <p className="mb-8 text-center text-sm text-foreground/60 dark:text-foreground">Click a category to filter • Core → Proficient → Familiar</p>
          <TechRadar />
        </motion.div>

        {/* Info row */}
        <motion.div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" {...viewProps}>
          <TiltCard className="glass flex items-start gap-3 rounded-xl p-5 hover-lift">
            <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-cyan" />
            <div>
              <h4 className="font-semibold">Education</h4>
              <p className="text-sm text-foreground/60 dark:text-foreground">M.S. Data Science — University of Colorado Boulder</p>
              <p className="text-sm text-foreground/60 dark:text-foreground">B.S. Electronics &amp; Communications — JNTU Kakinada</p>
              <a
                href="/degree.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-1 text-xs font-medium text-accent-light transition-colors hover:bg-accent/20"
              >
                <ExternalLink className="h-3 w-3" />
                View Degree
              </a>
            </div>
          </TiltCard>
          <TiltCard className="glass flex items-start gap-3 rounded-xl p-5 hover-lift">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-cyan" />
            <div>
              <h4 className="font-semibold">Location &amp; Availability</h4>
              <p className="text-sm text-foreground/60 dark:text-foreground">Colorado, United States</p>
              <p className="text-sm text-foreground/60 dark:text-foreground">
                {siteConfig.openToWork ? 'Available for new opportunities' : 'Not currently looking'}
              </p>
            </div>
          </TiltCard>
          <TiltCard className="glass flex items-start gap-3 rounded-xl p-5 hover-lift">
            <Trophy className="mt-0.5 h-5 w-5 shrink-0 text-cyan" />
            <div>
              <h4 className="font-semibold">Awards &amp; Hackathons</h4>
              <p className="text-sm text-foreground/60 dark:text-foreground">2023 DataScience Hackathon</p>
              <p className="text-sm text-foreground/60 dark:text-foreground">Extra Mile Award (Team &amp; Individual)</p>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
