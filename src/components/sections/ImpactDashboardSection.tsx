'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Database, Gauge, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { usePortfolioInteraction } from '@/components/providers/PortfolioInteractionProvider';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const impactMetrics = [
  {
    id: 'latency',
    label: 'Inference Latency',
    value: '39ms -> 11ms',
    before: 39,
    after: 11,
    unit: 'ms',
    improvement: '3.5x faster',
    detail: 'Clinical NLP inference optimized with distillation and ONNX Runtime.',
    icon: Gauge,
  },
  {
    id: 'model-size',
    label: 'Model Artifact',
    value: '411MB -> 62.6MB',
    before: 411,
    after: 62.6,
    unit: 'MB',
    improvement: '6.6x smaller',
    detail: 'Bio_ClinicalBERT compressed into a production-friendly DistilClinicalBERT variant.',
    icon: Activity,
  },
  {
    id: 'throughput',
    label: 'Distributed Throughput',
    value: '4,350 docs/sec',
    before: 900,
    after: 4350,
    unit: 'docs/sec',
    improvement: '900K records in 3.5 min',
    detail: 'AWS EMR pipeline scaled weak labeling and entity extraction across large clinical data batches.',
    icon: Database,
  },
  {
    id: 'fraud',
    label: 'Risk Flagging',
    value: '$2M+ flagged',
    before: 0.5,
    after: 2,
    unit: 'M USD',
    improvement: 'high-value anomaly detection',
    detail: 'Anomaly detection surfaced potential fraud and gave reviewers stronger prioritization signals.',
    icon: ShieldCheck,
  },
];

export function ImpactDashboardSection() {
  const prefersReduced = useReducedMotion();
  const { mode } = usePortfolioInteraction();
  const [activeId, setActiveId] = useState(impactMetrics[0].id);
  const activeMetric = impactMetrics.find((metric) => metric.id === activeId) ?? impactMetrics[0];
  const maxValue = Math.max(activeMetric.before, activeMetric.after);
  const beforeWidth = `${Math.max(8, (activeMetric.before / maxValue) * 100)}%`;
  const afterWidth = `${Math.max(8, (activeMetric.after / maxValue) * 100)}%`;

  return (
    <section id="impact" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Impact Dashboard"
          subtitle={mode === 'recruiter' ? 'Metrics that communicate outcomes quickly' : 'Performance and scale improvements behind the systems'}
        />

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {impactMetrics.map((metric, index) => {
              const Icon = metric.icon;
              const active = metric.id === activeId;
              return (
                <motion.button
                  key={metric.id}
                  type="button"
                  onClick={() => setActiveId(metric.id)}
                  className={`rounded-lg border p-4 text-left transition-colors ${
                    active
                      ? 'border-accent/50 bg-accent/10 text-foreground shadow-sm'
                      : 'border-border/60 bg-background/70 text-foreground/60 hover:bg-muted/40 hover:text-foreground'
                  }`}
                  {...(prefersReduced
                    ? {}
                    : {
                        initial: { opacity: 0, x: -20 },
                        whileInView: { opacity: 1, x: 0 },
                        viewport: { once: true },
                        transition: { delay: index * 0.05, duration: 0.45 },
                      })}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan/10">
                      <Icon className="h-4 w-4 text-cyan" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{metric.label}</span>
                      <span className="mt-1 block font-mono text-xs text-cyan-light">{metric.value}</span>
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            className="rounded-lg border border-border/60 bg-background/70 p-6 shadow-3d backdrop-blur sm:p-8"
            key={activeMetric.id}
            {...(prefersReduced
              ? {}
              : {
                  initial: { opacity: 0, y: 18, filter: 'blur(6px)' },
                  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
                  transition: { duration: 0.35 },
                })}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/35">Selected metric</p>
                <h3 className="mt-2 text-2xl font-semibold">{activeMetric.label}</h3>
              </div>
              <div className="rounded-lg bg-cyan/10 px-4 py-2 font-mono text-sm font-semibold text-cyan-light">
                {activeMetric.improvement}
              </div>
            </div>

            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-foreground/65 dark:text-foreground/75">
              {activeMetric.detail}
            </p>

            <div className="mt-8 space-y-5">
              <div>
                <div className="mb-2 flex justify-between text-xs font-semibold text-foreground/45">
                  <span>Before</span>
                  <span>{activeMetric.before} {activeMetric.unit}</span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full bg-foreground/25"
                    initial={{ width: prefersReduced ? beforeWidth : '0%' }}
                    animate={{ width: beforeWidth }}
                    transition={{ duration: 0.7 }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-xs font-semibold text-foreground/45">
                  <span>After / Outcome</span>
                  <span>{activeMetric.after} {activeMetric.unit}</span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-cyan"
                    initial={{ width: prefersReduced ? afterWidth : '0%' }}
                    animate={{ width: afterWidth }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
