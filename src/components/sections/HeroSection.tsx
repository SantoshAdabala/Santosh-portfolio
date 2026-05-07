'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Download, Sparkles, Zap, ChevronDown } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { Button } from '@/components/ui/Button';
import { TypingAnimation } from '@/components/ui/TypingAnimation';
import { LetterAnimation } from '@/components/ui/LetterAnimation';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { CountUp } from '@/components/ui/CountUp';
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

export function HeroSection() {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Parallax layers at different speeds
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.9]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section id="hero" ref={heroRef} className="relative h-screen overflow-hidden">
      {/* ── Full-viewport background image ── */}
      <motion.div
        className="absolute inset-0"
        style={prefersReduced ? {} : { scale: imageScale }}
      >
        <img
          src="/images/hero-ai-3.webp"
          alt="Santosh Adabala — ML Engineer"
          className="h-full w-full object-cover object-[center_30%] hero-ken-burns"
        />
      </motion.div>

      {/* Gradient mesh behind content */}
      <GradientMesh />

      {/* ── Dramatic gradient overlay ── */}
      <motion.div
        className="absolute inset-0"
        style={prefersReduced ? {} : { opacity: overlayOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />

      {/* ── Badges — top ── */}
      <motion.div
        className="absolute top-6 left-1/2 z-10 flex -translate-x-1/2 flex-wrap items-center justify-center gap-3 px-4"
        {...(prefersReduced ? {} : { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5, duration: 0.8 } })}
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

      {/* ── Main content — centered vertically ── */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6"
        style={prefersReduced ? {} : { y: contentY, opacity: contentOpacity }}
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center gap-6">
          {/* Greeting */}
          <motion.div
            className="text-sm text-foreground/40"
            {...(prefersReduced ? {} : {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.3, duration: 0.8 },
            })}
          >
            <TimeGreeting />
          </motion.div>

          {/* Name — massive */}
          <motion.div
            {...(prefersReduced ? {} : {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.4, duration: 0.6 },
            })}
          >
            <h1 className="gradient-text text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl xl:text-9xl drop-shadow-lg">
              <LetterAnimation text="Santosh Adabala" delay={0.5} />
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl text-foreground/60 dark:text-foreground/70 font-medium tracking-wide"
            {...(prefersReduced ? {} : {
              initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
              animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
              transition: { delay: 1.5, duration: 0.8 },
            })}
          >
            ML Engineer • LLM Specialist • AI Systems Architect
          </motion.p>

          {/* Typing animation */}
          <motion.div
            {...(prefersReduced ? {} : {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 2, duration: 0.6 },
            })}
          >
            <TypingAnimation keywords={keywords} className="text-xl sm:text-2xl" />
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 gap-3 sm:grid-cols-4 w-full max-w-2xl mt-4"
            {...(prefersReduced ? {} : {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 2.2, duration: 0.8 },
            })}
          >
            {stats.map((stat) => (
              <SpotlightCard
                key={stat.label}
                className="glass rounded-2xl"
                spotlightColor={stat.color}
              >
                <div className="px-4 py-4 text-center">
                  <div className="text-2xl sm:text-3xl font-bold gradient-text">
                    <CountUp value={stat.value} />
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-foreground/40 font-medium">
                    {stat.label}
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mt-4"
            {...(prefersReduced ? {} : {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 2.5, duration: 0.6 },
            })}
          >
            <Button
              variant="primary"
              className="glow-purple-strong px-8 py-3 text-base"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Zap className="mr-2 h-4 w-4" />
              View Projects
            </Button>
            <Button variant="secondary" href={siteConfig.resumeUrl} download className="glass px-8 py-3 text-base">
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator — bottom */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          {...(prefersReduced ? {} : {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 3, duration: 1 },
          })}
        >
          <motion.div
            {...(prefersReduced ? {} : {
              animate: { y: [0, 10, 0] },
              transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            })}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-widest text-foreground/30">Scroll</span>
            <ChevronDown className="h-5 w-5 text-foreground/30" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
