'use client';

import { ExternalLink, Github, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProjectIllustration } from '@/components/ui/ProjectIllustration';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { FlipCard } from '@/components/ui/FlipCard';
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

function CardFront({ project, config }: { project: Project; config: { icon: string; gradient: string } }) {
  return (
    <SpotlightCard
      className="glass group flex flex-col overflow-hidden rounded-2xl transition-shadow duration-300 hover:glow-purple shadow-3d h-full"
      spotlightColor={config.gradient.includes('violet') ? 'rgba(139, 92, 246, 0.15)' : 'rgba(6, 182, 212, 0.15)'}
    >
      <div className="flex flex-col h-full">
        {/* Thumbnail */}
        <div className={cn('relative flex h-44 items-center justify-center bg-gradient-to-br overflow-hidden', config.gradient)}>
          <div className="absolute inset-0 opacity-80">
            <ProjectIllustration category={project.category} />
          </div>
          {/* Flip hint */}
          <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-[10px] text-white/60 backdrop-blur-sm">
            <RotateCcw className="h-3 w-3" />
            Click to flip
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold leading-tight">{project.title}</h3>
          </div>

          <p className="text-sm leading-relaxed text-foreground/60 dark:text-foreground line-clamp-3">{project.description}</p>

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-foreground/70 transition-colors hover:bg-accent/20 hover:text-accent-light"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-foreground/50">
                +{project.techStack.length - 5}
              </span>
            )}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

function CardBack({ project, config }: { project: Project; config: { icon: string; gradient: string } }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl shadow-3d h-full border border-accent/20" style={{ background: 'hsl(240, 20%, 4%)' }}>
      <div className={cn('px-5 py-4 bg-gradient-to-br', config.gradient)}>
        <h3 className="text-base font-semibold text-white">{project.title}</h3>
        <p className="text-xs text-white/60 mt-1">Click to flip back</p>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Metrics */}
        {project.metrics && (
          <div>
            <h4 className="text-xs uppercase tracking-wider text-accent-light font-semibold mb-2">Key Metrics</h4>
            <p className="text-sm font-mono text-white/80">{project.metrics}</p>
          </div>
        )}

        {/* Full description */}
        <div>
          <h4 className="text-xs uppercase tracking-wider text-cyan font-semibold mb-2">Details</h4>
          <p className="text-xs leading-relaxed text-white/60">{project.description}</p>
        </div>

        {/* Full tech stack */}
        <div>
          <h4 className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-2">Tech Stack</h4>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium text-white/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="mt-auto flex items-center gap-3 pt-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent/15 px-3 py-1.5 text-sm font-medium text-accent-light transition-all hover:bg-accent/25"
          >
            <Github className="h-4 w-4" />
            Code
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-cyan/15 px-3 py-1.5 text-sm font-medium text-cyan-light transition-all hover:bg-cyan/25"
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

export function ProjectCard({ project, className }: ProjectCardProps) {
  const config = categoryConfig[project.category];

  return (
    <FlipCard
      className={cn('h-[480px]', className)}
      front={<CardFront project={project} config={config} />}
      back={<CardBack project={project} config={config} />}
    />
  );
}
