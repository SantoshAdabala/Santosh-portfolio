'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { projects } from '@/data/projects';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ProjectsSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Featured Projects"
          subtitle="A selection of ML/AI projects I've built"
        />

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          {...(prefersReduced
            ? {}
            : {
                variants: container,
                initial: 'hidden',
                whileInView: 'visible',
                viewport: { once: true, margin: '-80px' },
              })}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              {...(prefersReduced ? {} : { variants: item })}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
