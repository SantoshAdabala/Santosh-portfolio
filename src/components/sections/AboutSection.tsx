'use client';

import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Trophy, ExternalLink, Cpu, Zap, Database, BarChart3 } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SystemStudio } from '@/components/ui/SystemStudio';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { TextReveal } from '@/components/ui/TextReveal';
import { AnimatedBorder } from '@/components/ui/AnimatedBorder';
import { CodeTypewriter } from '@/components/ui/CodeTypewriter';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const impactMetrics = [
  { value: '110M→65M', label: 'Model Compression', icon: Cpu, color: '#8b5cf6' },
  { value: '3.5x', label: 'Inference Speed', icon: Zap, color: '#06b6d4' },
  { value: '93.2%', label: 'F1 Retained', icon: BarChart3, color: '#22d3ee' },
  { value: '4,350/s', label: 'Docs Processed', icon: Database, color: '#a78bfa' },
];

export function AboutSection() {
  const prefersReduced = useReducedMotion();

  const cardAnim = (delay: number) => prefersReduced ? {} : {
    initial: { opacity: 0, y: 30, filter: 'blur(6px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-60px' },
    transition: { delay, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  };

  return (
    <section id="about" className="relative px-6 py-28 overflow-hidden">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0">
        <img src="/images/hero-ai-1.webp" alt="" className="h-full w-full object-cover opacity-8" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>
      <div className="pointer-events-none absolute top-0 left-1/4 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-cyan/8 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading title="About Me" subtitle="Building ML systems that make LLMs production-ready" />

        {/* Apple-style word-by-word reveal */}
        <TextReveal
          text="I build ML systems that make large language models faster, smaller, and production-ready. With 5+ years of experience applying ML, NLP, and predictive analytics to healthcare and insurance data, I specialize in clinical text analysis, model compression, and production ML pipelines."
          className="mx-auto max-w-3xl text-center text-xl leading-relaxed text-foreground/50 dark:text-foreground/70"
        />

        {/* Live code typewriter */}
        <motion.div
          className="mx-auto mt-16 max-w-2xl"
          {...cardAnim(0.05)}
        >
          <CodeTypewriter />
        </motion.div>

        {/* ── Bento Grid ── */}
        <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">

          {/* Impact metrics — spans 2 cols on large */}
          <motion.div className="sm:col-span-2 lg:col-span-2 lg:row-span-2" {...cardAnim(0)}>
            <AnimatedBorder className="h-full">
              <div className="p-8 h-full">
                <h3 className="text-lg font-semibold mb-6 gradient-text">Impact Metrics</h3>
                <div className="grid grid-cols-2 gap-6">
                  {impactMetrics.map((m) => (
                    <div key={m.label} className="flex flex-col items-center text-center gap-3">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl"
                        style={{ background: `${m.color}15`, boxShadow: `0 0 30px ${m.color}15` }}
                      >
                        <m.icon className="h-6 w-6" style={{ color: m.color }} />
                      </div>
                      <div>
                        <div className="text-xl font-bold font-mono" style={{ color: m.color }}>{m.value}</div>
                        <div className="text-xs text-foreground/50 mt-0.5">{m.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedBorder>
          </motion.div>

          {/* Education */}
          <motion.div {...cardAnim(0.1)}>
            <SpotlightCard className="glass rounded-2xl h-full" spotlightColor="rgba(6, 182, 212, 0.12)">
              <div className="p-6 h-full flex flex-col">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/10 mb-4">
                  <GraduationCap className="h-5 w-5 text-cyan" />
                </div>
                <h4 className="font-semibold mb-2">Education</h4>
                <p className="text-sm text-foreground/50 dark:text-foreground/70">M.S. Data Science — CU Boulder</p>
                <p className="text-sm text-foreground/50 dark:text-foreground/70 mt-1">B.S. ECE — JNTU Kakinada</p>
                <a
                  href="/degree.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto pt-3 inline-flex items-center gap-1.5 text-xs font-medium text-accent-light transition-colors hover:text-accent"
                >
                  <ExternalLink className="h-3 w-3" />
                  View Degree
                </a>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Location */}
          <motion.div {...cardAnim(0.15)}>
            <SpotlightCard className="glass rounded-2xl h-full" spotlightColor="rgba(139, 92, 246, 0.12)">
              <div className="p-6 h-full flex flex-col">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 mb-4">
                  <MapPin className="h-5 w-5 text-accent-light" />
                </div>
                <h4 className="font-semibold mb-2">Location</h4>
                <p className="text-sm text-foreground/50 dark:text-foreground/70">Colorado, United States</p>
                <p className="text-sm text-foreground/50 dark:text-foreground/70 mt-1">
                  {siteConfig.openToWork ? '🟢 Available for opportunities' : 'Not currently looking'}
                </p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Awards */}
          <motion.div {...cardAnim(0.2)}>
            <SpotlightCard className="glass rounded-2xl h-full" spotlightColor="rgba(6, 182, 212, 0.12)">
              <div className="p-6 h-full flex flex-col">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/10 mb-4">
                  <Trophy className="h-5 w-5 text-cyan" />
                </div>
                <h4 className="font-semibold mb-2">Awards</h4>
                <p className="text-sm text-foreground/50 dark:text-foreground/70">2023 DataScience Hackathon</p>
                <p className="text-sm text-foreground/50 dark:text-foreground/70 mt-1">Extra Mile Award (Team & Individual)</p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Currently Learning */}
          <motion.div {...cardAnim(0.25)}>
            <SpotlightCard className="glass rounded-2xl h-full" spotlightColor="rgba(167, 139, 250, 0.12)">
              <div className="p-6 h-full flex flex-col">
                <div className="text-2xl mb-3">🧠</div>
                <h4 className="font-semibold mb-2">Currently Learning</h4>
                <p className="text-sm text-foreground/50 dark:text-foreground/70">{siteConfig.currentlyLearning}</p>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>

        {/* System studio */}
        <motion.div
          className="mt-24"
          {...cardAnim(0.1)}
        >
          <h3 className="mb-2 text-center text-lg font-semibold gradient-text">System Studio</h3>
          <p className="mb-8 text-center text-sm text-foreground/40 dark:text-foreground/50">
            Choose a real problem, tune the priority, and see the architecture tradeoffs behind the work
          </p>
          <SystemStudio />
        </motion.div>
      </div>
    </section>
  );
}
