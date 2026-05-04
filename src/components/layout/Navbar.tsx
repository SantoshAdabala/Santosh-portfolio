'use client';

import { useState, useEffect } from 'react';
import { Home, User, Wrench, FolderOpen, Briefcase, BookOpen, Award, Github, Mail, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/data/site-config';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { MobileMenu } from '@/components/ui/MobileMenu';
import { MagneticElement } from '@/components/ui/MagneticElement';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import type { LucideIcon } from 'lucide-react';

const navItems: { label: string; href: string; icon: LucideIcon }[] = [
  { label: 'Home', href: '#hero', icon: Home },
  { label: 'About', href: '#about', icon: User },
  { label: 'Skills', href: '#skills', icon: Wrench },
  { label: 'Projects', href: '#projects', icon: FolderOpen },
  { label: 'Experience', href: '#experience', icon: Briefcase },
  { label: 'Publications', href: '#publications', icon: BookOpen },
  { label: 'Certs', href: '#certifications', icon: Award },
  { label: 'GitHub', href: '#github', icon: Github },
  { label: 'Contact', href: '#contact', icon: Mail },
];

const sectionIds = navItems.map((item) => item.href.slice(1));

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      // Show on scroll up or near top, hide on scroll down
      if (currentY < 100) {
        setIsVisible(true);
      } else if (currentY < lastScrollY) {
        setIsVisible(true);
      } else if (currentY > lastScrollY + 10) {
        setIsVisible(false);
      }
      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Fixed name — top left on desktop */}
      <a
        href="#hero"
        onClick={(e) => handleNavClick(e, '#hero')}
        className={cn(
          'fixed top-6 left-6 z-40 hidden md:block text-lg font-bold gradient-text text-shimmer transition-all duration-500',
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0',
        )}
      >
        {siteConfig.name}
      </a>

      {/* Floating bottom dock — desktop */}
      <nav
        className={cn(
          'fixed bottom-6 left-1/2 z-40 hidden -translate-x-1/2 transition-all duration-500 md:flex',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0',
        )}
      >
        <div className="glass flex items-center gap-1 rounded-2xl px-3 py-2 glow-purple">
          {navItems.map((item) => {
            const isActive = activeId === item.href.slice(1);
            return (
              <MagneticElement key={item.href} strength={0.25}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    'group relative flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-200',
                    isActive
                      ? 'text-accent-light bg-accent/10'
                      : 'text-foreground/50 hover:text-foreground/80 hover:bg-white/5',
                  )}
                  aria-label={item.label}
                >
                  {isActive && (
                    <span className="absolute -top-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-accent-light shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                  )}
                  <item.icon className="h-4 w-4" />
                  <span className="text-[10px]">{item.label}</span>
                </a>
              </MagneticElement>
            );
          })}
          <div className="mx-1 h-8 w-px bg-border/30" />
          <button
            onClick={() => {
              window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
            }}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] text-foreground/40 transition-colors hover:text-foreground/70 hover:bg-white/5"
            aria-label="Open command palette"
          >
            <span className="text-[10px]">⌘</span>
            <span>K</span>
          </button>
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile top bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="text-base font-semibold gradient-text text-shimmer"
          >
            {siteConfig.name}
          </a>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        items={navItems.map(({ label, href }) => ({ label, href }))}
      />
    </>
  );
}
