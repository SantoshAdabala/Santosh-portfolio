'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { projects } from '@/data/projects';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { usePortfolioInteraction } from '@/components/providers/PortfolioInteractionProvider';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { Project } from '@/types';

const categories: { label: string; value: Project['category'] | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'LLM', value: 'llm' },
  { label: 'RAG', value: 'rag' },
  { label: 'NLP / NER', value: 'ner' },
  { label: 'Transformers', value: 'transformer' },
  { label: 'MLOps', value: 'mlops' },
];

function projectMatchesSkill(project: Project, selectedSkill: string | null) {
  if (!selectedSkill) return false;
  const skill = selectedSkill.toLowerCase();
  const haystack = [
    project.title,
    project.description,
    project.metrics ?? '',
    project.category,
    ...project.techStack,
    ...(project.caseStudy?.proofPoints ?? []),
  ].join(' ').toLowerCase();

  return haystack.includes(skill) || project.techStack.some((tech) => skill.includes(tech.toLowerCase()));
}

export function ProjectsSection() {
  const prefersReduced = useReducedMotion();
  const { mode, selectedSkill, clearSelectedSkill } = usePortfolioInteraction();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Project['category'] | 'all'>('all');

  const filteredProjects = useMemo(() => {
    const search = query.trim().toLowerCase();
    return projects.filter((project) => {
      const categoryMatches = category === 'all' || project.category === category;
      const skillMatches = !selectedSkill || projectMatchesSkill(project, selectedSkill);
      const searchMatches =
        !search ||
        [project.title, project.description, project.metrics ?? '', project.category, ...project.techStack]
          .join(' ')
          .toLowerCase()
          .includes(search);

      return categoryMatches && skillMatches && searchMatches;
    });
  }, [category, query, selectedSkill]);

  const modeCopy =
    mode === 'recruiter'
      ? 'Recruiter mode emphasizes business impact, metrics, and project proof.'
      : 'Engineer mode emphasizes implementation details, stacks, and source code.';

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Featured Projects"
          subtitle={modeCopy}
        />

        <div className="mb-8 rounded-lg border border-border/60 bg-background/70 p-4 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/35" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects by stack, metric, or domain..."
                className="w-full rounded-lg border border-border/60 bg-background px-10 py-2.5 text-sm outline-none transition-colors placeholder:text-foreground/35 focus:border-accent"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setCategory(item.value)}
                  className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                    category === item.value
                      ? 'border-accent bg-accent/15 text-accent-light'
                      : 'border-border/60 text-foreground/55 hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {selectedSkill && (
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-foreground/60">
              <span>Skill map active:</span>
              <span className="rounded-lg bg-cyan/10 px-2.5 py-1 font-semibold text-cyan-light">{selectedSkill}</span>
              <button
                type="button"
                onClick={clearSelectedSkill}
                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold text-foreground/50 transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
                Clear
              </button>
            </div>
          )}
        </div>

        {filteredProjects.length === 0 && (
          <div className="rounded-lg border border-border/60 bg-muted/20 p-8 text-center text-sm text-foreground/55">
            No projects match those filters. Try clearing the skill map or search query.
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              {...(prefersReduced ? {} : {
                initial: { opacity: 0, y: 50, scale: 0.9, filter: 'blur(8px)' },
                whileInView: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
                viewport: { once: true, margin: '-50px' },
                transition: { delay: i * 0.08, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
              })}
            >
              <ProjectCard
                project={project}
                highlighted={projectMatchesSkill(project, selectedSkill)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
