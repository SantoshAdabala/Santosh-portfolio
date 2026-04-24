'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Download, Sparkles, Zap } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { Button } from '@/components/ui/Button';
import { TypingAnimation } from '@/components/ui/TypingAnimation';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const keywords = ['LLM Fine-Tuning', 'Knowledge Distillation', 'PyTorch', 'Distributed ML', 'Agentic AI', 'RAG Systems'];

const stats = [
  { value: '6+', label: 'Years Experience' },
  { value: '10M+', label: 'Records Processed' },
  { value: '3.5x', label: 'Inference Speedup' },
  { value: '$2M+', label: 'Fraud Flagged' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export function HeroSection() {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const motionProps = prefersReduced ? {} : { variants: container, initial: 'hidden', animate: 'show' };
  const childMotion = prefersReduced ? {} : { variants: item };

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen overflow-hidden">
      {/* ── Full-bleed hero image with parallax ── */}
      <div className="relative h-[70vh] w-full sm:h-[75vh] overflow-hidden">
        <motion.img
          src="/images/hero-ai-1.jpg"
          alt="Santosh Adabala — AI & ML Engineer"
          className="h-full w-full object-cover object-top"
          style={prefersReduced ? {} : { y: imageY, scale: imageScale }}
        />
        {/* Gradient fade into content */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        {/* Side vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />

        {/* Badges floating on the image */}
        <motion.div
          className="absolute top-6 left-1/2 z-10 flex -translate-x-1/2 flex-wrap items-center justify-center gap-3 px-4"
          {...(prefersReduced ? {} : { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3, duration: 0.6 } })}
        >
          {siteConfig.openToWork && (
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-green-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              Open to Work
            </span>
          )}
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-accent-light">
            <Sparkles className="h-3 w-3" />
            Currently Learning: {siteConfig.currentlyLearning}
          </span>
        </motion.div>
      </div>

      {/* ── Content overlapping the image ── */}
      <motion.div
        className="relative z-10 -mt-40 px-6 sm:-mt-48"
        style={prefersReduced ? {} : { opacity: contentOpacity }}
      >
        <motion.div className="mx-auto flex max-w-5xl flex-col items-center text-center gap-7" {...motionProps}>
          {/* Name */}
          <motion.div {...childMotion}>
            <h1 className="gradient-text text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl drop-shadow-lg">
              Santosh Adabala
            </h1>
            <p className="mt-3 text-lg text-foreground/60 dark:text-foreground font-medium">
              ML Engineer • LLM Specialist • AI Systems Architect
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p className="max-w-2xl text-lg leading-relaxed text-foreground/60 dark:text-foreground" {...childMotion}>
            {siteConfig.tagline}
          </motion.p>

          {/* Typing animation */}
          <motion.div {...childMotion}>
            <TypingAnimation keywords={keywords} className="text-xl" />
          </motion.div>

          {/* Stats ticker */}
          <motion.div className="grid grid-cols-2 gap-4 sm:grid-cols-4" {...childMotion}>
            {stats.map((stat) => (
              <div key={stat.label} className="glass rounded-xl px-6 py-4 text-center glow-purple">
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="mt-1 text-xs text-foreground/60 dark:text-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div className="flex flex-wrap items-center justify-center gap-4" {...childMotion}>
            <Button
              variant="primary"
              className="glow-purple-strong"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Zap className="mr-2 h-4 w-4" />
              View Projects
            </Button>
            <Button variant="secondary" href={siteConfig.resumeUrl} download className="glass">
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
