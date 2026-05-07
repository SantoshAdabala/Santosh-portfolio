import { siteConfig } from '@/data/site-config';
import { VisitorCounter } from '@/components/ui/VisitorCounter';
import { FooterWave } from '@/components/ui/FooterWave';

const footerLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Publications', href: '#publications' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  return (
    <>
    <FooterWave />
    <footer className="border-t border-border/30 px-6 py-12 pb-24 md:pb-12">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap justify-center gap-4">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-foreground/40 transition-colors hover:text-accent-light"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-3 text-center text-sm text-foreground/40 dark:text-foreground">
          <VisitorCounter />
          <p>Designed as an interactive portfolio for ML, AI systems, and production impact.</p>
          <p>Last updated {siteConfig.lastUpdated}</p>
        </div>
      </div>
    </footer>
    </>
  );
}
