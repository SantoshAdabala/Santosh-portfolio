'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Home, User, Wrench, FolderOpen, Briefcase, BookOpen,
  Award, Github, Mail, Download, Moon, Sun, ExternalLink, Command,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { siteConfig } from '@/data/site-config';
import type { LucideIcon } from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  icon: LucideIcon;
  action: () => void;
  category: 'navigation' | 'actions' | 'links';
  keywords?: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  const navigateTo = useCallback((id: string) => {
    close();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [close]);

  const commands: CommandItem[] = [
    { id: 'hero', label: 'Home', icon: Home, action: () => navigateTo('hero'), category: 'navigation' },
    { id: 'about', label: 'About', icon: User, action: () => navigateTo('about'), category: 'navigation' },
    { id: 'skills', label: 'Skills & Expertise', icon: Wrench, action: () => navigateTo('skills'), category: 'navigation', keywords: 'tech stack' },
    { id: 'projects', label: 'Projects', icon: FolderOpen, action: () => navigateTo('projects'), category: 'navigation', keywords: 'work portfolio' },
    { id: 'case-studies', label: 'Case Studies', icon: BookOpen, action: () => navigateTo('case-studies'), category: 'navigation', keywords: 'impact proof metrics' },
    { id: 'impact', label: 'Impact Dashboard', icon: Award, action: () => navigateTo('impact'), category: 'navigation', keywords: 'metrics outcomes performance' },
    { id: 'experience', label: 'Experience', icon: Briefcase, action: () => navigateTo('experience'), category: 'navigation', keywords: 'career jobs' },
    { id: 'publications', label: 'Publications', icon: BookOpen, action: () => navigateTo('publications'), category: 'navigation', keywords: 'papers writing' },
    { id: 'certifications', label: 'Certifications', icon: Award, action: () => navigateTo('certifications'), category: 'navigation', keywords: 'certs credentials' },
    { id: 'github', label: 'GitHub Activity', icon: Github, action: () => navigateTo('github'), category: 'navigation' },
    { id: 'contact', label: 'Contact', icon: Mail, action: () => navigateTo('contact'), category: 'navigation', keywords: 'email message' },
    {
      id: 'toggle-theme', label: resolvedTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      icon: resolvedTheme === 'dark' ? Sun : Moon,
      action: () => { setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'); close(); },
      category: 'actions', keywords: 'theme dark light mode',
    },
    {
      id: 'download-resume', label: 'Download Resume',
      icon: Download,
      action: () => { window.open(siteConfig.resumeUrl, '_blank'); close(); },
      category: 'actions',
    },
    {
      id: 'open-github', label: 'Open GitHub Profile',
      icon: ExternalLink,
      action: () => { window.open(siteConfig.github, '_blank'); close(); },
      category: 'links',
    },
    {
      id: 'open-linkedin', label: 'Open LinkedIn Profile',
      icon: ExternalLink,
      action: () => { window.open(siteConfig.linkedIn, '_blank'); close(); },
      category: 'links',
    },
    {
      id: 'view-card', label: 'View Contact Card',
      icon: ExternalLink,
      action: () => { window.location.href = '/card/'; close(); },
      category: 'actions', keywords: 'badge business card download',
    },
  ];

  const filtered = query
    ? commands.filter((cmd) => {
        const searchStr = `${cmd.label} ${cmd.keywords ?? ''} ${cmd.category}`.toLowerCase();
        return searchStr.includes(query.toLowerCase());
      })
    : commands;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  // Arrow key navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        filtered[selectedIndex].action();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex]);

  // Reset selection when query changes
  useEffect(() => setSelectedIndex(0), [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 50);
  }, [isOpen]);

  if (!mounted) return null;

  const grouped = {
    navigation: filtered.filter((c) => c.category === 'navigation'),
    actions: filtered.filter((c) => c.category === 'actions'),
    links: filtered.filter((c) => c.category === 'links'),
  };

  let globalIdx = -1;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          {/* Palette */}
          <motion.div
            className="fixed left-1/2 top-[20%] z-[61] w-full max-w-lg -translate-x-1/2"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="overflow-hidden rounded-2xl border border-border/30 shadow-[0_0_60px_rgba(139,92,246,0.15)]" style={{ background: 'hsl(240, 20%, 4%)' }}>
              {/* Search input */}
              <div className="flex items-center gap-3 border-b border-border/20 px-4 py-3">
                <Search className="h-5 w-5 shrink-0 text-foreground/30" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search commands..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-foreground/30"
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-border/30 px-2 py-0.5 text-[10px] text-foreground/30">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[360px] overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <p className="py-8 text-center text-sm text-foreground/30">No results found</p>
                )}

                {(['navigation', 'actions', 'links'] as const).map((cat) => {
                  const items = grouped[cat];
                  if (items.length === 0) return null;
                  return (
                    <div key={cat}>
                      <p className="px-3 py-2 text-[10px] uppercase tracking-wider text-foreground/25 font-semibold">
                        {cat}
                      </p>
                      {items.map((cmd) => {
                        globalIdx++;
                        const idx = globalIdx;
                        const isSelected = idx === selectedIndex;
                        return (
                          <button
                            key={cmd.id}
                            onClick={cmd.action}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                              isSelected ? 'bg-accent/15 text-white' : 'text-white/60 hover:text-white/80'
                            }`}
                          >
                            <cmd.icon className={`h-4 w-4 shrink-0 ${isSelected ? 'text-accent-light' : 'text-foreground/30'}`} />
                            <span>{cmd.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-border/20 px-4 py-2 text-[10px] text-foreground/20">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
