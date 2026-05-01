'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Award } from 'lucide-react';
import { certifications } from '@/data/certifications';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { IssuerLogo } from '@/components/ui/IssuerLogo';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function CertificationsSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="certifications" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="Certifications"
          subtitle="Professional credentials and continuous learning"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              {...(prefersReduced
                ? {}
                : {
                    initial: { opacity: 0, y: 30, filter: 'blur(6px)' },
                    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
                    viewport: { once: true, margin: '-50px' },
                    transition: { delay: i * 0.06, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
                  })}
            >
              <SpotlightCard
                className="glass group rounded-2xl hover-lift h-full"
                spotlightColor="rgba(139, 92, 246, 0.1)"
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 rounded-xl bg-white/5 p-2">
                      <IssuerLogo issuer={cert.issuerLogo} className="h-10 w-10" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold leading-snug text-foreground/90 dark:text-foreground">
                        {cert.title}
                      </h3>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-foreground/60 dark:text-foreground">
                        <Award className="h-3 w-3 text-accent-light" />
                        {cert.issuer}
                        {cert.date && <span className="text-foreground/40 dark:text-foreground/70">· {cert.date}</span>}
                      </p>
                    </div>
                  </div>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-foreground/60 dark:text-foreground transition-all hover:bg-accent/10 hover:text-accent-light"
                    >
                      <ExternalLink className="h-3 w-3" />
                      View Credential
                    </a>
                  )}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
