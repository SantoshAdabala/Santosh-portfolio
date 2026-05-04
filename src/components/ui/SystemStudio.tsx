'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  href: string;
  accent: string;
  icon: LucideIcon;
  stages: StudioStage[];
  decisions: Record<StudioFocus, StudioDecision>;
  metrics: Array<{ label: string; before: string; after: string; value: number }>;
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
      Speed: { title: 'Serve the compact model first', tradeoff: 'Prioritize the distilled model and keep the larger model as a quality reference.', result: '39ms to 11ms inference with a much smaller artifact.', confidence: 92 },
      Quality: { title: 'Guard accuracy with task-level checks', tradeoff: 'Optimize only when entity-level F1 and clinical coverage stay within range.', result: 'Retained 93.2% F1 while reducing serving cost.', confidence: 88 },
      Safety: { title: 'Keep clinical failures visible', tradeoff: 'Favor explainable evaluation slices over a single aggregate score.', result: 'Better visibility into high-risk entity misses before release.', confidence: 84 },
      Scale: { title: 'Batch weak labeling separately', tradeoff: 'Separate heavy data generation from online inference paths.', result: '900K records processed in 3.5 minutes at 4,350 docs/sec.', confidence: 90 },
    },
    metrics: [
      { label: 'Latency', before: '39ms', after: '11ms', value: 78 },
      { label: 'Model Size', before: '411MB', after: '62.6MB', value: 85 },
      { label: 'F1 Retained', before: 'baseline', after: '93.2%', value: 93 },
    ],
    takeaway: 'Production judgment: smaller models, measured tradeoffs, and deployment-aware evaluation.',
  },
  {
    id: 'agent-router',
    title: 'Agent Workflow Router',
    eyebrow: 'Multi-agent assistant design',
    challenge: 'Break a broad assistant into focused responsibilities that can be routed, tested, and extended.',
    href: 'https://github.com/SantoshAdabala/Agentic_AI_Parenting',
    accent: '#8b5cf6',
    icon: Workflow,
    stages: [
      { label: 'User Intent', detail: 'Classify whether the request is advice, nutrition, or health-context support.', icon: SlidersHorizontal },
      { label: 'Router', detail: 'Choose the right specialist path instead of forcing one general prompt.', icon: GitBranch },
      { label: 'Specialist', detail: 'Use smaller agent responsibilities with clearer tool access and prompts.', icon: BrainCircuit },
      { label: 'Tool Context', detail: 'Attach nutrition data and session memory only where they are needed.', icon: Layers3 },
      { label: 'Response', detail: 'Return grounded, bounded guidance with handoff boundaries.', icon: CheckCircle2 },
    ],
    decisions: {
      Speed: { title: 'Route before retrieval', tradeoff: 'Avoid loading every tool for every request.', result: 'Faster responses and cleaner tool usage.', confidence: 82 },
      Quality: { title: 'Split broad tasks into specialists', tradeoff: 'More orchestration, but each agent is easier to evaluate.', result: 'Flows stay easier to improve independently.', confidence: 86 },
      Safety: { title: 'Bound sensitive guidance', tradeoff: 'Helpful responses need explicit limits around medical-style questions.', result: 'Safer answer framing with clearer escalation points.', confidence: 88 },
      Scale: { title: 'Keep sessions stateful but scoped', tradeoff: 'Session memory improves continuity, but it needs tight boundaries.', result: 'Grows with new tools without turning into one brittle chain.', confidence: 80 },
    },
    metrics: [
      { label: 'Responsibilities', before: 'one flow', after: 'specialists', value: 72 },
      { label: 'Extensibility', before: 'manual', after: 'routed tools', value: 80 },
      { label: 'Context Scope', before: 'broad', after: 'targeted', value: 76 },
    ],
    takeaway: 'Demonstrates how to design maintainable agent systems instead of only writing prompts.',
  },
  {
    id: 'privacy-service',
    title: 'PHI/PII Guardrail Service',
    eyebrow: 'Healthcare data protection',
    challenge: 'Detect and redact sensitive FHIR fields before downstream analytics or sharing.',
    href: 'https://github.com/SantoshAdabala/PHI-PII-Parser-from-AWS',
    accent: '#10b981',
    icon: ShieldCheck,
    stages: [
      { label: 'FHIR Bundle', detail: 'Read structured healthcare records from storage or local service input.', icon: Database },
      { label: 'Field Scan', detail: 'Combine key-name matching with pattern checks for sensitive values.', icon: SlidersHorizontal },
      { label: 'Redaction', detail: 'Mask sensitive fields while preserving useful analytical structure.', icon: ShieldCheck },
      { label: 'Delivery', detail: 'Support local API usage and event-triggered serverless processing.', icon: Network },
      { label: 'Audit', detail: 'Produce cleaned exports with predictable schemas for downstream users.', icon: CheckCircle2 },
    ],
    decisions: {
      Speed: { title: 'Use deterministic detection first', tradeoff: 'Rules are less flexible than ML but faster and easier to inspect.', result: 'Predictable redaction for common FHIR resources.', confidence: 84 },
      Quality: { title: 'Preserve useful structure', tradeoff: 'Redaction should protect data without destroying analytical value.', result: 'Clean CSV outputs keep downstream workflows practical.', confidence: 82 },
      Safety: { title: 'Default toward conservative masking', tradeoff: 'Over-redaction is preferable to exposing sensitive fields.', result: 'Safer handling of PHI/PII across 10+ resource types.', confidence: 91 },
      Scale: { title: 'Use event-driven processing', tradeoff: 'Serverless triggers reduce operational load for bursty files.', result: 'Cleaner path from storage event to sanitized output.', confidence: 78 },
    },
    metrics: [
      { label: 'Coverage', before: 'manual', after: '10+ types', value: 82 },
      { label: 'Delivery', before: 'single', after: 'API + trigger', value: 74 },
      { label: 'Risk Control', before: 'raw', after: 'redacted', value: 88 },
    ],
    takeaway: 'Practical ML engineering discipline around privacy, data contracts, and deployment.',
  },
];

// Animated particle that flows between pipeline nodes
function FlowParticle({ from, to, color, delay }: { from: number; to: number; color: string; delay: number }) {
  return (
    <motion.circle
      r={3}
      fill={color}
      filter={`drop-shadow(0 0 4px ${color})`}
      initial={{ cx: from, cy: 40, opacity: 0 }}
      animate={{
        cx: [from, (from + to) / 2, to],
        cy: [40, 30, 40],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 1.5,
        delay,
        repeat: Infinity,
        repeatDelay: 2,
        ease: 'easeInOut',
      }}
    />
  );
}

// The animated pipeline visualization
function PipelineFlow({ stages, activeStage, onStageClick, accent }: {
  stages: StudioStage[];
  activeStage: number;
  onStageClick: (i: number) => void;
  accent: string;
}) {
  const prefersReduced = useReducedMotion();
  const nodeSpacing = 160;
  const svgWidth = (stages.length - 1) * nodeSpacing + 100;

  return (
    <div className="overflow-x-auto pb-4 scrollbar-hide">
      <svg width={svgWidth} height={120} className="mx-auto block" viewBox={`0 0 ${svgWidth} 120`}>
        {/* Connection lines */}
        {stages.map((_, i) => {
          if (i === stages.length - 1) return null;
          const x1 = 50 + i * nodeSpacing + 20;
          const x2 = 50 + (i + 1) * nodeSpacing - 20;
          const isActive = i === activeStage || i + 1 === activeStage;
          return (
            <g key={`line-${i}`}>
              {/* Base line */}
              <line
                x1={x1} y1={60} x2={x2} y2={60}
                stroke={isActive ? accent : 'rgba(139,92,246,0.15)'}
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray={isActive ? undefined : '4 4'}
              />
              {/* Animated glow on active */}
              {isActive && !prefersReduced && (
                <motion.line
                  x1={x1} y1={60} x2={x2} y2={60}
                  stroke={accent}
                  strokeWidth={4}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
              {/* Flowing particles */}
              {!prefersReduced && (
                <>
                  <FlowParticle from={x1} to={x2} color={accent} delay={i * 0.4} />
                  <FlowParticle from={x1} to={x2} color={accent} delay={i * 0.4 + 0.8} />
                </>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {stages.map((stage, i) => {
          const cx = 50 + i * nodeSpacing;
          const isActive = i === activeStage;
          return (
            <g
              key={stage.label}
              onClick={() => onStageClick(i)}
              className="cursor-pointer"
            >
              {/* Glow ring for active */}
              {isActive && !prefersReduced && (
                <motion.circle
                  cx={cx} cy={60} r={28}
                  fill="none"
                  stroke={accent}
                  strokeWidth={1.5}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              {/* Outer ring */}
              <circle
                cx={cx} cy={60} r={22}
                fill={isActive ? `${accent}20` : 'rgba(139,92,246,0.05)'}
                stroke={isActive ? accent : 'rgba(139,92,246,0.2)'}
                strokeWidth={isActive ? 2 : 1}
              />
              {/* Inner dot */}
              <circle
                cx={cx} cy={60} r={6}
                fill={isActive ? accent : 'rgba(139,92,246,0.3)'}
              />
              {/* Label */}
              <text
                x={cx} y={98}
                textAnchor="middle"
                className="fill-foreground/60"
                fontSize={11}
                fontWeight={isActive ? 600 : 400}
                style={{ fill: isActive ? accent : undefined }}
              >
                {stage.label}
              </text>
              {/* Stage number */}
              <text
                x={cx} y={64}
                textAnchor="middle"
                fontSize={10}
                fontWeight={700}
                style={{ fill: isActive ? 'white' : 'rgba(139,92,246,0.5)' }}
              >
                {i + 1}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function SystemStudio() {
  const prefersReduced = useReducedMotion();
  const [activeScenarioId, setActiveScenarioId] = useState(scenarios[0].id);
  const [activeFocus, setActiveFocus] = useState<StudioFocus>('Speed');
  const [activeStage, setActiveStage] = useState(0);

  const activeScenario = useMemo(
    () => scenarios.find((s) => s.id === activeScenarioId) ?? scenarios[0],
    [activeScenarioId],
  );
  const activeDecision = activeScenario.decisions[activeFocus];
  const activeStageDetail = activeScenario.stages[activeStage];
  const ActiveIcon = activeScenario.icon;

  function chooseScenario(id: string) {
    setActiveScenarioId(id);
    setActiveStage(0);
  }

  // Auto-advance stages
  useEffect(() => {
    if (prefersReduced) return;
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % activeScenario.stages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeScenario, prefersReduced]);

  return (
    <div className="rounded-2xl border border-border/40 bg-background/70 p-5 shadow-3d backdrop-blur sm:p-8">
      {/* Scenario tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {scenarios.map((s) => {
          const selected = s.id === activeScenario.id;
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => chooseScenario(s.id)}
              className={cn(
                'inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all',
                selected
                  ? 'border-cyan/50 bg-cyan/10 text-cyan-light shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                  : 'border-border/40 text-foreground/50 hover:bg-muted hover:text-foreground',
              )}
            >
              <Icon className="h-4 w-4" />
              {s.title}
            </button>
          );
        })}
      </div>

      {/* Header */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeScenario.id}
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/30">{activeScenario.eyebrow}</p>
              <h4 className="mt-2 text-2xl font-bold">{activeScenario.title}</h4>
              <p className="mt-2 max-w-xl text-sm text-foreground/50">{activeScenario.challenge}</p>
            </div>
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{ background: `${activeScenario.accent}15`, color: activeScenario.accent }}
            >
              <ActiveIcon className="h-6 w-6" />
            </div>
          </div>

          {/* Animated Pipeline */}
          <PipelineFlow
            stages={activeScenario.stages}
            activeStage={activeStage}
            onStageClick={setActiveStage}
            accent={activeScenario.accent}
          />

          {/* Stage detail card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              className="mt-6 rounded-xl border border-border/40 bg-muted/20 p-5"
              initial={prefersReduced ? false : { opacity: 0, x: 30, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ background: `${activeScenario.accent}20`, color: activeScenario.accent }}
                >
                  <activeStageDetail.icon className="h-4 w-4" />
                </div>
                <h5 className="text-sm font-semibold">{activeStageDetail.label}</h5>
                <span className="ml-auto text-xs text-foreground/30">Stage {activeStage + 1}/{activeScenario.stages.length}</span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/60">{activeStageDetail.detail}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Bottom: Focus + Decision */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Focus toggles */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/30">Optimization Focus</p>
          <div className="grid grid-cols-2 gap-2">
            {focusOptions.map(({ label, icon: FIcon }) => (
              <button
                key={label}
                type="button"
                onClick={() => setActiveFocus(label)}
                className={cn(
                  'inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all',
                  activeFocus === label
                    ? 'border-accent/50 bg-accent/15 text-accent-light shadow-[0_0_15px_rgba(139,92,246,0.1)]'
                    : 'border-border/40 text-foreground/50 hover:bg-muted hover:text-foreground',
                )}
              >
                <FIcon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>

          {/* Metrics */}
          <div className="mt-5 space-y-3">
            {activeScenario.metrics.map((m) => (
              <div key={m.label}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-medium text-foreground/60">{m.label}</span>
                  <span className="font-mono text-foreground/40">{m.before} → {m.after}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted/50">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: activeScenario.accent }}
                    initial={{ width: 0 }}
                    animate={{ width: `${m.value}%` }}
                    transition={{ duration: prefersReduced ? 0 : 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decision card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeScenario.id}-${activeFocus}`}
            className="rounded-xl border border-border/40 bg-muted/10 p-5"
            initial={prefersReduced ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/30 mb-3">Decision</p>
            <h4 className="text-lg font-bold">{activeDecision.title}</h4>
            <p className="mt-3 text-sm leading-relaxed text-foreground/55">{activeDecision.tradeoff}</p>

            <div className="mt-4 rounded-lg border border-cyan/20 bg-cyan/5 p-4">
              <p className="text-xs font-semibold text-cyan-light mb-1">Result</p>
              <p className="text-sm font-medium text-foreground/70">{activeDecision.result}</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-foreground/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-cyan"
                  initial={{ width: 0 }}
                  animate={{ width: `${activeDecision.confidence}%` }}
                  transition={{ duration: prefersReduced ? 0 : 0.7 }}
                />
              </div>
              <p className="mt-1 text-right text-[10px] text-foreground/30">{activeDecision.confidence}% confidence</p>
            </div>

            <p className="mt-4 text-xs text-foreground/40 italic">{activeScenario.takeaway}</p>

            <a
              href={activeScenario.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent to-cyan px-4 py-2.5 text-xs font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Open Project <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
