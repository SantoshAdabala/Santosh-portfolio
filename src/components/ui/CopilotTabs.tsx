'use client';

import { motion } from 'framer-motion';
import {
  Gauge,
  Layers,
  PenLine,
  UserCheck,
  Star,
  Key,
  Scissors,
  Megaphone,
  HelpCircle,
  Mail,
} from 'lucide-react';
import type { TabConfig } from '@/data/copilot-tabs';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Gauge,
  Layers,
  PenLine,
  UserCheck,
  Star,
  Key,
  Scissors,
  Megaphone,
  HelpCircle,
  Mail,
};

interface CopilotTabsProps {
  tabs: TabConfig[];
  activeTab: string;
  onTabChange: (id: string) => void;
  revealedTabs?: string[];
}

export function CopilotTabs({ tabs, activeTab, onTabChange, revealedTabs }: CopilotTabsProps) {
  // If revealedTabs is provided, filter to only show revealed tabs
  const visibleTabs = revealedTabs ? tabs.filter((tab) => revealedTabs.includes(tab.id)) : tabs;

  return (
    <nav
      role="tablist"
      aria-label="Analysis sections"
      className="flex gap-1 overflow-x-auto border-b border-border pb-px md:flex-wrap md:overflow-x-visible"
    >
      {visibleTabs.map((tab) => {
        const Icon = ICON_MAP[tab.icon];
        const isActive = tab.id === activeTab;

        return (
          <motion.button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            onClick={() => onTabChange(tab.id)}
            initial={{ opacity: 0, scale: 0.8, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={cn(
              'relative flex shrink-0 items-center gap-1.5 rounded-t-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              isActive
                ? 'text-accent'
                : 'text-foreground/60 hover:text-foreground/80',
            )}
          >
            {Icon && <Icon className="h-4 w-4" />}
            <span>{tab.label}</span>

            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-x-0 -bottom-px h-0.5 bg-accent"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </nav>
  );
}
