'use client';

import { motion } from 'framer-motion';
import { experience } from '@/data/experience';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TimelineItem } from '@/components/ui/TimelineItem';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function ExperienceSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="experience" className="relative px-6 py-24 overflow-hidden">
      {/* AI illustration background */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/hero-ai-1.jpg"
          alt=""
          className="h-full w-full object-cover opacity-6"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <SectionHeading
          title="Experience"
          subtitle="My career journey in ML and AI"
        />

        <div className="relative">
          {/* Base timeline line — subtle */}
          <div className="absolute left-[6px] top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-accent/15 via-accent/8 to-transparent" />

          {experience.map((entry, i) => (
            <TimelineItem key={entry.id} entry={entry} index={prefersReduced ? 0 : i} />
          ))}
        </div>
      </div>
    </section>
  );
}
