'use client';

import { BriefcaseBusiness, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePortfolioInteraction, type PortfolioMode } from '@/components/providers/PortfolioInteractionProvider';

const options: { mode: PortfolioMode; label: string; icon: typeof BriefcaseBusiness }[] = [
  { mode: 'recruiter', label: 'Recruiter', icon: BriefcaseBusiness },
  { mode: 'engineer', label: 'Engineer', icon: Code2 },
];

export function PortfolioModeToggle() {
  const { mode, setMode } = usePortfolioInteraction();

  return (
    <div className="fixed right-4 top-16 z-40 md:right-6 md:top-6">
      <div className="flex rounded-lg border border-border/60 bg-background/90 p-1 shadow-[0_12px_40px_rgba(15,23,42,0.14)] backdrop-blur-xl dark:bg-slate-950/85 dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
        {options.map((option) => {
          const Icon = option.icon;
          const active = mode === option.mode;
          return (
            <button
              key={option.mode}
              type="button"
              onClick={() => setMode(option.mode)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                active
                  ? 'bg-gradient-to-r from-accent to-cyan text-white shadow-sm'
                  : 'text-foreground/55 hover:bg-muted hover:text-foreground',
              )}
              aria-pressed={active}
            >
              <Icon className="h-3.5 w-3.5" />
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
