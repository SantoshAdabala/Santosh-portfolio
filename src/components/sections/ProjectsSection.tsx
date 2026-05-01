'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects } from '@/data/projects';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function ProjectsSection() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Featured Projects"
          subtitle="A selection of ML/AI projects I've built"
        />

        {/* Horizontal scroll showcase on desktop */}
        <div ref={containerRef} className="relative">
          {/* Desktop: horizontal scroll with snap */}
          <div className="hidden lg:block overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6">
            <div className="flex gap-6" style={{ width: `${projects.length * 420}px` }}>
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  className="w-[400px] shrink-0"
                  {...(prefersReduced ? {} : {
                    initial: { opacity: 0, x: 60, filter: 'blur(8px)' },
                    whileInView: { opacity: 1, x: 0, filter: 'blur(0px)' },
                    viewport: { once: true, margin: '-100px' },
                    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
                  })}
                >
                  <ProjectCard project={project} className="h-full" />
                </motion.div>
              ))}
            </div>
            {/* Scroll hint */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-foreground/30">
              <motion.span
                {...(prefersReduced ? {} : {
                  animate: { x: [0, 8, 0] },
                  transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                })}
              >
                ← Scroll to explore →
              </motion.span>
            </div>
          </div>

          {/* Mobile/Tablet: standard grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:hidden">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                {...(prefersReduced ? {} : {
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, margin: '-50px' },
                  transition: { delay: i * 0.08, duration: 0.5 },
                })}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
