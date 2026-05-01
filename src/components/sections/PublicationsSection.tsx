'use client';

import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { publications } from '@/data/publications';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function PublicationsSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="publications" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title="Publications & Writing"
          subtitle="Articles, papers, and talks"
        />

        <div className="space-y-4">
          {publications.map((pub, i) => (
            <motion.a
              key={pub.id}
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              {...(prefersReduced
                ? {}
                : {
                    initial: { opacity: 0, x: -40, filter: 'blur(6px)' },
                    whileInView: { opacity: 1, x: 0, filter: 'blur(0px)' },
                    viewport: { once: true, margin: '-50px' },
                    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
                  })}
            >
              <SpotlightCard
                className="rounded-xl border border-border/50 bg-background/50 transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]"
                spotlightColor="rgba(139, 92, 246, 0.1)"
              >
                <div className="flex items-start justify-between gap-4 p-6">
                  <div className="min-w-0">
                    <h3 className="font-semibold leading-snug transition-colors group-hover:text-accent">
                      {pub.title}
                    </h3>
                    <p className="mt-2 text-sm text-foreground/50 dark:text-foreground/60">
                      {pub.source} &middot;{' '}
                      {new Date(pub.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                      })}
                    </p>
                  </div>
                  <motion.div
                    className="mt-1 shrink-0"
                    {...(prefersReduced ? {} : {
                      whileHover: { scale: 1.2, rotate: 45 },
                      transition: { type: 'spring', stiffness: 300 },
                    })}
                  >
                    <ArrowUpRight className="h-5 w-5 text-foreground/30 transition-colors group-hover:text-accent" />
                  </motion.div>
                </div>
              </SpotlightCard>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
