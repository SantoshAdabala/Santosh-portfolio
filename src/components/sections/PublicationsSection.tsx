'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { publications } from '@/data/publications';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

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
              className="group flex items-start justify-between gap-4 rounded-xl border border-border bg-background p-5 transition-colors hover:border-accent/40"
              {...(prefersReduced
                ? {}
                : {
                    variants: cardVariants,
                    initial: 'hidden',
                    whileInView: 'visible',
                    viewport: { once: true, margin: '-50px' },
                    transition: { delay: i * 0.08, duration: 0.4 },
                  })}
            >
              <div className="min-w-0">
                <h3 className="font-semibold leading-snug group-hover:text-accent">
                  {pub.title}
                </h3>
                <p className="mt-1 text-sm text-foreground/60 dark:text-foreground">
                  {pub.source} &middot;{' '}
                  {new Date(pub.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                  })}
                </p>
              </div>
              <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-foreground/40 group-hover:text-accent" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
