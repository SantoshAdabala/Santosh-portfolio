'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Download, Sparkles, Zap, ArrowDown } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { Button } from '@/components/ui/Button';
import { TypingAnimation } from '@/components/ui/TypingAnimation';
import { LetterAnimation } from '@/components/ui/LetterAnimation';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { CountUp } from '@/components/ui/CountUp';
import { HeroSlideshow } from '@/components/ui/HeroSlideshow';
import { GradientMesh } from '@/components/ui/GradientMesh';
import { TimeGreeting } from '@/components/ui/TimeGreeting';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const keywords = ['LLM Fine-Tuning', 'Knowledge Distillation', 'PyTorch', 'Distributed ML', 'Agentic AI', 'RAG Systems'];

const stats = [
  { value: '5+', label: 'Years Experience', color: 'rgba(139, 92, 246, 0.2)' },
  { value: '10M+', label: 'Records Processed', color: 'rgba(6, 182, 212, 0.2)' },
  { value: '3.5x', label: 'Inference Speedup', color: 'rgba(139, 92, 246, 0.2)' },
  { value: '$2M+', label: 'Fraud Flagged', color: 'rgba(6, 182, 212, 0.2)' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export function HeroSection() {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], ['0px', '60px']);

  const motionProps = prefersReduced ? {} : { variants: container, initial: 'hidden' as const, animate: 'show' as const };
  const childMotion = prefersReduced ? {} : { variants: item };

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen overflow-hidden">
      {/* Animated gradient mesh */}
      <GradientMesh />
      {/* ── Full-bleed hero slideshow with parallax ── */}
      <div className="relative h-[70vh] w-full sm:h-[75vh] overflow-hidden">
        <HeroSlideshow
          className="absolute inset-0"
        />
        {/* Multi-layer gradient fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />

        {/* Badges floating on the image */}
        <motion.div
          className="absolute top-6 left-1/2 z-10 flex -translate-x-1/2 flex-wrap items-center justify-center gap-3 px-4"
          {...(prefersReduced ? {} : { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3, duration: 0.6 } })}
        >
          {siteConfig.openToWork && (
            <span className="inline-flex items-center gap-2 rounded-full border border-green-700/25 bg-white px-4 py-2 text-[13px] font-bold leading-none text-green-900 shadow-[0_8px_30px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-green-400/25 dark:bg-slate-950/90 dark:text-green-300 dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75 dark:bg-green-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600 dark:bg-green-400" />
              </span>
              Open to Work
            </span>
          )}
          <span className="inline-flex max-w-[min(92vw,720px)] items-center gap-2 rounded-full border border-violet-700/25 bg-white px-4 py-2 text-[13px] font-bold leading-snug text-violet-950 shadow-[0_8px_30px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-accent-light/25 dark:bg-slate-950/90 dark:text-violet-200 dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-violet-700 dark:text-accent-light" />
            <span>
              <span className="text-violet-700 dark:text-accent-light">Currently Learning:</span>{' '}
              {siteConfig.currentlyLearning}
            </span>
          </span>
        </motion.div>
      </div>

      {/* ── Content overlapping the image ── */}
      <motion.div
        className="relative z-10 -mt-40 px-6 sm:-mt-48"
        style={prefersReduced ? {} : { opacity: contentOpacity, y: contentY }}
      >
        <motion.div className="mx-auto flex max-w-5xl flex-col items-center text-center gap-8" {...motionProps}>
          {/* Name — letter-by-letter spring animation */}
          <motion.div {...childMotion}>
            <h1 className="gradient-text text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl drop-shadow-lg">
              <LetterAnimation text="Santosh Adabala" delay={0.3} />
            </h1>
            <motion.p
              className="mt-4 text-lg text-foreground/60 dark:text-foreground/80 font-medium tracking-wide"
              {...(prefersReduced ? {} : {
                initial: { opacity: 0, y: 10, filter: 'blur(4px)' },
                animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
                transition: { delay: 1.2, duration: 0.8 },
              })}
            >
              <span className="block text-sm text-foreground/40 mb-1"><TimeGreeting /></span>
              Production LLM Systems • Model Optimization • Distributed ML
            </motion.p>
          </motion.div>

          {/* Tagline with subtle gradient */}
          <motion.p className="max-w-2xl text-lg leading-relaxed text-foreground/50 dark:text-foreground/70" {...childMotion}>
            {siteConfig.tagline}
          </motion.p>

          {/* Typing animation */}
          <motion.div {...childMotion}>
            <TypingAnimation keywords={keywords} className="text-xl" />
          </motion.div>

          {/* Stats ticker — with spotlight + spring count-up */}
          <motion.div className="grid grid-cols-2 gap-4 sm:grid-cols-4 w-full max-w-2xl" {...childMotion}>
            {stats.map((stat) => (
              <SpotlightCard
                key={stat.label}
                className="glass rounded-2xl glow-purple group"
                spotlightColor={stat.color}
              >
                <div className="px-5 py-5 text-center">
                  <div className="text-2xl sm:text-3xl font-bold gradient-text">
                    <CountUp value={stat.value} />
                  </div>
                  <div className="mt-1.5 text-[11px] uppercase tracking-wider text-foreground/40 dark:text-foreground/60 font-medium">
                    {stat.label}
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div className="flex flex-wrap items-center justify-center gap-4" {...childMotion}>
            <Button
              variant="primary"
              className="glow-purple-strong px-8 py-3"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Zap className="mr-2 h-4 w-4" />
              View Projects
            </Button>
            <Button variant="secondary" href={siteConfig.resumeUrl} download className="glass px-8 py-3">
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-4"
            {...(prefersReduced ? {} : {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 2, duration: 1 },
            })}
          >
            <motion.div
              {...(prefersReduced ? {} : {
                animate: { y: [0, 8, 0] },
                transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              })}
            >
              <ArrowDown className="h-5 w-5 text-foreground/20" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
