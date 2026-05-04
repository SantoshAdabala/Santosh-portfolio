'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Code2, Gauge, GitBranch, Target } from 'lucide-react';
import { projects } from '@/data/projects';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ProjectIllustration } from '@/components/ui/ProjectIllustration';
import { usePortfolioInteraction } from '@/components/providers/PortfolioInteractionProvider';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const caseStudies = projects.filter((project) => project.caseStudy);

const tabConfig = [
  { id: 'problem', label: 'Problem', icon: Target, color: 'text-accent-light' },
  { id: 'architecture', label: 'Architecture', icon: GitBranch, color: 'text-cyan' },
  { id: 'results', label: 'Results', icon: Gauge, color: 'text-emerald-400' },
  { id: 'code', label: 'Code', icon: Code2, color: 'text-violet-300' },
] as const;

type CaseTab = (typeof tabConfig)[number]['id'];

export function CaseStudiesSection() {
  const prefersReduced = useReducedMotion();
  const { mode } = usePortfolioInteraction();
  const [selectedProjectId, setSelectedProjectId] = useState(caseStudies[0]?.id ?? '');
  const [activeTab, setActiveTab] = useState<CaseTab>('results');

  useEffect(() => {
    setActiveTab(mode === 'recruiter' ? 'results' : 'architecture');
  }, [mode]);

  const selectedProject = useMemo(
    () => caseStudies.find((project) => project.id === selectedProjectId) ?? caseStudies[0],
    [selectedProjectId],
  );

  const caseStudy = selectedProject?.caseStudy;
  const activeConfig = tabConfig.find((tab) => tab.id === activeTab) ?? tabConfig[0];

  return (
    <section id="case-studies" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Case Studies"
          subtitle="Switch projects and inspect the same build through business impact or engineering detail"
        />

        {selectedProject && caseStudy && (
          <motion.div
            className="grid gap-6 lg:grid-cols-[320px_1fr]"
            {...(prefersReduced
              ? {}
              : {
                  initial: { opacity: 0, y: 36, filter: 'blur(6px)' },
                  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
                  viewport: { once: true, margin: '-80px' },
                  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
                })}
          >
            <aside className="space-y-3">
              {caseStudies.map((project) => {
                const active = project.id === selectedProject.id;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setSelectedProjectId(project.id)}
                    className={`w-full rounded-lg border p-4 text-left transition-colors ${
                      active
                        ? 'border-accent/50 bg-accent/10 text-foreground shadow-sm'
                        : 'border-border/60 bg-background/70 text-foreground/60 hover:bg-muted/40 hover:text-foreground'
                    }`}
                  >
                    <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-foreground/35">
                      {project.category}
                    </span>
                    <span className="mt-1 block text-sm font-semibold">{project.title}</span>
                    {project.metrics && (
                      <span className="mt-2 block font-mono text-[11px] text-cyan-light">{project.metrics}</span>
                    )}
                  </button>
                );
              })}
            </aside>

            <article className="overflow-hidden rounded-lg border border-border/60 bg-background/70 shadow-3d backdrop-blur">
              <div className="grid md:grid-cols-[260px_1fr]">
                <div className="relative min-h-64 overflow-hidden border-b border-border/50 bg-gradient-to-br from-accent/10 via-background to-cyan/10 md:border-b-0 md:border-r">
                  <ProjectIllustration category={selectedProject.category} />
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/40">
                        {mode === 'recruiter' ? 'Impact lens' : 'Engineering lens'}
                      </p>
                      <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                        {selectedProject.title}
                      </h3>
                    </div>
                    <Button
                      variant="secondary"
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0"
                    >
                      View Code
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {tabConfig.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                          activeTab === tab.id
                            ? 'border-accent bg-accent/15 text-accent-light'
                            : 'border-border/60 text-foreground/55 hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <tab.icon className={`h-3.5 w-3.5 ${activeTab === tab.id ? tab.color : ''}`} />
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 rounded-lg border border-border/60 bg-muted/20 p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <activeConfig.icon className={`h-4 w-4 ${activeConfig.color}`} />
                      <h4 className="text-sm font-semibold">{activeConfig.label}</h4>
                    </div>

                    {activeTab === 'problem' && (
                      <p className="text-sm leading-relaxed text-foreground/65 dark:text-foreground/75">
                        {caseStudy.problem}
                      </p>
                    )}

                    {activeTab === 'architecture' && (
                      <>
                        <p className="text-sm leading-relaxed text-foreground/65 dark:text-foreground/75">
                          {caseStudy.approach}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {selectedProject.techStack.map((tech) => (
                            <span key={tech} className="rounded-lg bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent-light">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </>
                    )}

                    {activeTab === 'results' && (
                      <>
                        <p className="text-sm leading-relaxed text-foreground/65 dark:text-foreground/75">
                          {caseStudy.impact}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {caseStudy.proofPoints.map((point) => (
                            <span
                              key={point}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-cyan/20 bg-cyan/10 px-3 py-1.5 text-xs font-medium text-cyan-light"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              {point}
                            </span>
                          ))}
                        </div>
                      </>
                    )}

                    {activeTab === 'code' && (
                      <div className="space-y-4">
                        <p className="text-sm leading-relaxed text-foreground/65 dark:text-foreground/75">
                          Source is available for review, including implementation choices, project structure, and integration details.
                        </p>
                        <Button variant="primary" href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                          Open Repository
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </motion.div>
        )}
      </div>
    </section>
  );
}
