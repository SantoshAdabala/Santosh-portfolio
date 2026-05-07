'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const techItems = [
  'PyTorch', 'HuggingFace', 'LangChain', 'PySpark', 'Docker', 'Kubernetes',
  'AWS', 'MLflow', 'ONNX Runtime', 'FastAPI', 'Terraform', 'Prometheus',
  'TensorFlow', 'scikit-learn', 'Databricks', 'OpenTelemetry',
];

export function TechMarquee() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div className="flex flex-wrap justify-center gap-3 py-8 px-6">
        {techItems.map((t) => (
          <span key={t} className="rounded-full border border-border/30 px-4 py-1.5 text-sm text-foreground/50">{t}</span>
        ))}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden py-10">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />

      {/* Staggered initial reveal + infinite scroll */}
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.05 } },
        }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: 40, ease: 'linear' } }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-6">
            {techItems.map((tech, i) => (
              <motion.span
                key={`${copy}-${tech}`}
                className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/5 px-5 py-2 text-sm font-medium text-foreground/60 dark:text-foreground/70 transition-colors hover:border-accent/40 hover:text-accent-light hover:bg-accent/10"
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.8 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent/40" />
                {tech}
              </motion.span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
