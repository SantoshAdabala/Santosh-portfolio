'use client';

import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function ProjectsSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Featured Projects"
          subtitle="A selection of ML/AI projects I've built — click any card to flip"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              {...(prefersReduced ? {} : {
                initial: { opacity: 0, y: 50, scale: 0.9, filter: 'blur(8px)' },
                whileInView: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
                viewport: { once: true, margin: '-50px' },
                transition: { delay: i * 0.08, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
              })}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
