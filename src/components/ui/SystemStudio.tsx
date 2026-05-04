'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Database,
  Gauge,
  GitBranch,
  Layers3,
  Network,
  ShieldCheck,
  SlidersHorizontal,
  Workflow,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type StudioFocus = 'Speed' | 'Quality' | 'Safety' | 'Scale';

interface StudioStage {
  label: string;
  detail: string;
  icon: LucideIcon;
}

interface StudioDecision {
  title: string;
  tradeoff: string;
  result: string;
  confidence: number;
}

interface StudioScenario {
  id: string;
  title: string;
  eyebrow: string;
  challenge: string;
  project: string;
  href: string;
  accent: string;
  icon: LucideIcon;
  stages: StudioStage[];
  decisions: Record<StudioFocus, StudioDecision>;
  metrics: Array<{
    label: string;
    before: string;
    after: string;
    value: number;
  }>;
  takeaway: string;
}

const focusOptions: Array<{ label: StudioFocus; icon: LucideIcon }> = [
  { label: 'Speed', icon: Zap },
  { label: 'Quality', icon: CheckCircle2 },
  { label: 'Safety', icon: ShieldCheck },
  { label: 'Scale', icon: Network },
];

const scenarios: StudioScenario[] = [
  {
    id: 'clinical-compression',
    title: 'Clinical NLP Compression',
    eyebrow: 'Latency-sensitive healthcare ML',
    challenge: 'Make a clinical entity model smaller and faster without giving up useful accuracy.',
    project: 'Clinical NLP - Healthcare NER Pipeline',
    href: 'https://github.com/SantoshAdabala/clinical-nlp-optimization',
    accent: '#22d3ee',
    icon: BrainCircuit,
    stages: [
      { label: 'Clinical Text', detail: 'Validate schema, source quality, and entity coverage before training.', icon: Database },
      { label: 'Teacher Model', detail: 'Use the stronger model as the reference behavior for compact training.', icon: BrainCircuit },
      { label: 'Distillation', detail: 'Transfer task behavior into a smaller student model with targeted evaluation.', icon: GitBranch },
      { label: 'Optimized Serve', detail: 'Package inference around lower latency and smaller model artifacts.', icon: Gauge },
      { label: 'Monitoring', detail: 'Track latency, F1 drift, throughput, and failure cases after deployment.', icon: Activity },
    ],
    decisions: {
      Speed: {
        title: 'Serve the compact model first',
        tradeoff: 'Prioritize the distilled model and keep the larger model as a quality reference.',
        result: '39ms to 11ms inference with a much smaller artifact.',
        confidence: 92,
      },
      Quality: {
        title: 'Guard accuracy with task-level checks',
        tradeoff: 'Optimize only when entity-level F1 and clinical coverage stay within range.',
        result: 'Retained 93.2% F1 while reducing serving cost.',
        confidence: 88,
      },
      Safety: {
        title: 'Keep clinical failures visible',
        tradeoff: 'Favor explainable evaluation slices over a single aggregate score.',
        result: 'Better visibility into high-risk entity misses before release.',
        confidence: 84,
      },
      Scale: {
        title: 'Batch weak labeling separately',
        tradeoff: 'Separate heavy data generation from online inference paths.',
        result: '900K records processed in 3.5 minutes at 4,350 docs/sec.',
        confidence: 90,
      },
    },
    metrics: [
      { label: 'Latency', before: '39ms', after: '11ms', value: 78 },
      { label: 'Model Size', before: '411MB', after: '62.6MB', value: 85 },
      { label: 'F1 Retained', before: 'large baseline', after: '93.2%', value: 93 },
    ],
    takeaway: 'This shows production judgment: smaller models, measured tradeoffs, and deployment-aware evaluation.',
  },
  {
    id: 'agent-router',
    title: 'Agent Workflow Router',
    eyebrow: 'Multi-agent assistant design',
    challenge: 'Break a broad assistant into focused responsibilities that can be routed, tested, and extended.',
    project: 'Agentic AI Parenting Assistant',
    href: 'https://github.com/SantoshAdabala/Agentic_AI_Parenting',
    accent: '#8b5cf6',
    icon: Workflow,
    stages: [
      { label: 'User Intent', detail: 'Classify whether the request is advice, nutrition, or health-context support.', icon: SlidersHorizontal },
      { label: 'Router', detail: 'Choose the right specialist path instead of forcing one general prompt.', icon: GitBranch },
      { label: 'Specialist', detail: 'Use smaller agent responsibilities with clearer tool access and prompts.', icon: BrainCircuit },
      { label: 'Tool Context', detail: 'Attach nutrition data and session memory only where they are needed.', icon: Layers3 },
      { label: 'Response Check', detail: 'Return grounded, bounded guidance with handoff boundaries.', icon: CheckCircle2 },
    ],
    decisions: {
      Speed: {
        title: 'Route before retrieval',
        tradeoff: 'Avoid loading every tool for every request.',
        result: 'Faster responses and cleaner tool usage.',
        confidence: 82,
      },
      Quality: {
        title: 'Split broad tasks into specialists',
        tradeoff: 'More orchestration, but each agent is easier to evaluate.',
        result: 'Advice, nutrition, and health flows stay easier to improve independently.',
        confidence: 86,
      },
      Safety: {
        title: 'Bound sensitive guidance',
        tradeoff: 'Helpful responses need explicit limits around medical-style questions.',
        result: 'Safer answer framing with clearer escalation points.',
        confidence: 88,
      },
      Scale: {
        title: 'Keep sessions stateful but scoped',
        tradeoff: 'Session memory improves continuity, but it needs tight boundaries.',
        result: 'The assistant can grow with new tools without turning into one brittle chain.',
        confidence: 80,
      },
    },
    metrics: [
      { label: 'Responsibilities', before: 'one flow', after: 'specialists', value: 72 },
      { label: 'Extensibility', before: 'manual prompts', after: 'routed tools', value: 80 },
      { label: 'Context Scope', before: 'broad', after: 'targeted', value: 76 },
    ],
    takeaway: 'This demonstrates how you design maintainable agent systems instead of only writing prompts.',
  },
  {
    id: 'privacy-service',
    title: 'PHI/PII Guardrail Service',
    eyebrow: 'Healthcare data protection',
    challenge: 'Detect and redact sensitive FHIR fields before downstream analytics or sharing.',
    project: 'PHI/PII Parser - FHIR Data Redaction',
    href: 'https://github.com/SantoshAdabala/PHI-PII-Parser-from-AWS',
    accent: '#10b981',
    icon: ShieldCheck,
    stages: [
      { label: 'FHIR Bundle', detail: 'Read structured healthcare records from storage or local service input.', icon: Database },
      { label: 'Field Scan', detail: 'Combine key-name matching with pattern checks for sensitive values.', icon: SlidersHorizontal },
      { label: 'Redaction', detail: 'Mask sensitive fields while preserving useful analytical structure.', icon: ShieldCheck },
      { label: 'Delivery Mode', detail: 'Support local API usage and event-triggered serverless processing.', icon: Network },
      { label: 'Audit Output', detail: 'Produce cleaned exports with predictable schemas for downstream users.', icon: CheckCircle2 },
    ],
    decisions: {
      Speed: {
        title: 'Use deterministic detection first',
        tradeoff: 'Rules are less flexible than ML but faster and easier to inspect.',
        result: 'Predictable redaction for common FHIR resources.',
        confidence: 84,
      },
      Quality: {
        title: 'Preserve useful structure',
        tradeoff: 'Redaction should protect data without destroying analytical value.',
        result: 'Clean CSV outputs keep downstream workflows practical.',
        confidence: 82,
      },
      Safety: {
        title: 'Default toward conservative masking',
        tradeoff: 'Over-redaction is preferable to exposing sensitive fields.',
        result: 'Safer handling of PHI/PII across 10+ resource types.',
        confidence: 91,
      },
      Scale: {
        title: 'Use event-driven processing',
        tradeoff: 'Serverless triggers reduce operational load for bursty files.',
        result: 'Cleaner path from storage event to sanitized output.',
        confidence: 78,
      },
    },
    metrics: [
      { label: 'Coverage', before: 'manual checks', after: '10+ types', value: 82 },
      { label: 'Delivery', before: 'single mode', after: 'API + trigger', value: 74 },
      { label: 'Risk Control', before: 'raw fields', after: 'redacted', value: 88 },
    ],
    takeaway: 'This communicates practical ML engineering discipline around privacy, data contracts, and deployment.',
  },
];

export function SystemStudio() {
  const prefersReduced = useReducedMotion();
  const [activeScenarioId, setActiveScenarioId] = useState(scenarios[0].id);
  const [activeFocus, setActiveFocus] = useState<StudioFocus>('Speed');
  const [activeStage, setActiveStage] = useState(0);

  const activeScenario = useMemo(
    () => scenarios.find((scenario) => scenario.id === activeScenarioId) ?? scenarios[0],
    [activeScenarioId],
  );
  const activeDecision = activeScenario.decisions[activeFocus];
  const activeStageDetail = activeScenario.stages[activeStage] ?? activeScenario.stages[0];
  const ActiveScenarioIcon = activeScenario.icon;

  function chooseScenario(id: string) {
    setActiveScenarioId(id);
    setActiveStage(0);
  }

  return (
    <div className="rounded-lg border border-border/60 bg-background/70 p-4 shadow-3d backdrop-blur sm:p-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <div className="mb-5 flex flex-wrap gap-2">
            {scenarios.map((scenario) => {
              const selected = scenario.id === activeScenario.id;
              const ScenarioIcon = scenario.icon;

              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => chooseScenario(scenario.id)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs font-semibold transition-colors',
                    selected
                      ? 'border-cyan/50 bg-cyan/10 text-cyan-light'
                      : 'border-border/60 text-foreground/55 hover:bg-muted hover:text-foreground',
                  )}
                >
                  <ScenarioIcon className="h-3.5 w-3.5" />
                  {scenario.title}
                </button>
              );
            })}
          </div>

          <div className="relative overflow-hidden rounded-lg border border-border/60 bg-muted/15 p-5">
            <div className="pointer-events-none absolute inset-0 opacity-60">
              <motion.div
                className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-cyan/50 to-transparent"
                animate={prefersReduced ? {} : { x: ['-45%', '45%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div
                className="absolute -right-24 -top-24 h-64 w-64 rounded-full blur-[100px]"
                style={{ backgroundColor: `${activeScenario.accent}24` }}
              />
            </div>

            <motion.div
              key={activeScenario.id}
              initial={prefersReduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="relative"
            >
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/35">
                    {activeScenario.eyebrow}
                  </p>
                  <h4 className="mt-2 text-2xl font-semibold text-foreground">{activeScenario.title}</h4>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/60 dark:text-foreground/72">
                    {activeScenario.challenge}
                  </p>
                </div>
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border/60"
                  style={{ backgroundColor: `${activeScenario.accent}18`, color: activeScenario.accent }}
                >
                  <ActiveScenarioIcon className="h-6 w-6" />
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-5">
                {activeScenario.stages.map((stage, index) => {
                  const selected = activeStage === index;
                  const StageIcon = stage.icon;

                  return (
                    <button
                      key={stage.label}
                      type="button"
                      onClick={() => setActiveStage(index)}
                      className={cn(
                        'group relative min-h-32 rounded-lg border p-4 text-left transition-all',
                        selected
                          ? 'border-cyan/50 bg-cyan/10 text-foreground shadow-[0_18px_50px_rgba(6,182,212,0.12)]'
                          : 'border-border/50 bg-background/45 text-foreground/55 hover:border-border hover:bg-background/70 hover:text-foreground',
                      )}
                    >
                      {index < activeScenario.stages.length - 1 && (
                        <ArrowRight className="pointer-events-none absolute -right-3 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-cyan/50 md:block" />
                      )}
                      <motion.span
                        className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/60"
                        animate={selected && !prefersReduced ? { scale: [1, 1.08, 1] } : {}}
                        transition={{ duration: 1.8, repeat: Infinity }}
                      >
                        <StageIcon className="h-4 w-4" style={{ color: selected ? activeScenario.accent : undefined }} />
                      </motion.span>
                      <span className="block text-sm font-semibold">{stage.label}</span>
                      <span className="mt-2 block text-xs leading-relaxed text-foreground/48 dark:text-foreground/60">
                        {stage.detail}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 rounded-lg border border-border/60 bg-background/55 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/35">
                  Selected stage
                </p>
                <p className="mt-2 text-sm font-semibold">{activeStageDetail.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground/58 dark:text-foreground/70">
                  {activeStageDetail.detail}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <aside className="rounded-lg border border-border/60 bg-background/55 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/35">Optimization focus</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {focusOptions.map(({ label, icon: FocusIcon }) => {
              const selected = activeFocus === label;

              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setActiveFocus(label)}
                  className={cn(
                    'inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors',
                    selected
                      ? 'border-accent/60 bg-accent/15 text-accent-light'
                      : 'border-border/60 text-foreground/55 hover:bg-muted hover:text-foreground',
                  )}
                >
                  <FocusIcon className="h-3.5 w-3.5" />
                  {label}
                </button>
              );
            })}
          </div>

          <motion.div
            key={`${activeScenario.id}-${activeFocus}`}
            initial={prefersReduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-5"
          >
            <h4 className="text-xl font-semibold">{activeDecision.title}</h4>
            <p className="mt-3 text-sm leading-relaxed text-foreground/60 dark:text-foreground/72">
              {activeDecision.tradeoff}
            </p>
            <div className="mt-4 rounded-lg border border-border/60 bg-muted/20 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/35">Result</p>
              <p className="mt-2 text-sm font-semibold text-cyan-light">{activeDecision.result}</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-foreground/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-cyan"
                  initial={{ width: 0 }}
                  animate={{ width: `${activeDecision.confidence}%` }}
                  transition={{ duration: prefersReduced ? 0 : 0.7, ease: 'easeOut' }}
                />
              </div>
            </div>
          </motion.div>

          <div className="mt-5 space-y-4">
            {activeScenario.metrics.map((metric) => (
              <div key={metric.label}>
                <div className="mb-1 flex items-center justify-between gap-3 text-xs">
                  <span className="font-semibold text-foreground/65">{metric.label}</span>
                  <span className="font-mono text-foreground/45">
                    {metric.before} to {metric.after}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-foreground/10">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: activeScenario.accent }}
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: prefersReduced ? 0 : 0.65, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-lg border border-border/60 bg-muted/15 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/35">Recruiter takeaway</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/62 dark:text-foreground/72">
              {activeScenario.takeaway}
            </p>
          </div>

          <a
            href={activeScenario.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent to-cyan px-4 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Open Related Project
            <ArrowRight className="h-4 w-4" />
          </a>
        </aside>
      </div>
    </div>
  );
}
