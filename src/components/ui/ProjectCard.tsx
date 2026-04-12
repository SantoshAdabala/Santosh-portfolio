'use client';

import { ExternalLink, Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProjectIllustration } from '@/components/ui/ProjectIllustration';
import { useTilt } from '@/hooks/useTilt';
import type { Project } from '@/types';

const categoryConfig: Record<Project['category'], { icon: string; gradient: string }> = {
  llm: { icon: '🤖', gradient: 'from-violet-600/30 to-purple-900/30' },
  rag: { icon: '🔍', gradient: 'from-cyan-600/30 to-blue-900/30' },
  ner: { icon: '🏷️', gradient: 'from-emerald-600/30 to-teal-900/30' },
  sentiment: { icon: '💬', gradient: 'from-pink-600/30 to-rose-900/30' },
  transformer: { icon: '⚡', gradient: 'from-amber-600/30 to-orange-900/30' },
  mlops: { icon: '🚀', gradient: 'from-blue-600/30 to-indigo-900/30' },
};

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const config = categoryConfig[project.category];
  const { style, onMouseMove, onMouseLeave } = useTilt(10);

  return (
    <div
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn(
        'glass group flex flex-col overflow-hidden rounded-2xl transition-shadow duration-300 hover:glow-purple shadow-3d will-change-transform',
        className,
      )}
    >
      {/* Thumbnail with SVG illustration */}
      <div className={cn('relative flex h-44 items-center justify-center bg-gradient-to-br overflow-hidden', config.gradient)}>
        <div className="absolute inset-0 opacity-80">
          <ProjectIllustration category={project.category} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold leading-tight">{project.title}</h3>
          {project.metrics && (
            <span className="shrink-0 rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent-light">
              {project.metrics}
            </span>
          )}
        </div>

        <p className="text-sm leading-relaxed text-foreground/60 dark:text-foreground">{project.description}</p>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-foreground/70 transition-colors hover:bg-accent/20 hover:text-accent-light"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links with glow on hover */}
        <div className="mt-auto flex items-center gap-3 pt-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-foreground/60 transition-all hover:bg-accent/10 hover:text-accent-light"
            aria-label={`GitHub repository for ${project.title}`}
          >
            <Github className="h-4 w-4" />
            Code
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-foreground/60 transition-all hover:bg-cyan/10 hover:text-cyan-light"
              aria-label={`Live demo for ${project.title}`}
            >
              <ExternalLink className="h-4 w-4" />
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
