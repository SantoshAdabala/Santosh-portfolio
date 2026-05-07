'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Search, Send, X } from 'lucide-react';
import { projects } from '@/data/projects';
import { skillCategories } from '@/data/skills';
import { experience } from '@/data/experience';
import { usePortfolioInteraction } from '@/components/providers/PortfolioInteractionProvider';

const quickQuestions = [
  'What healthcare ML have you done?',
  'Tell me about your LLM work',
  'What is your tech stack?',
  'Show me your experience',
];

function buildAnswer(query: string, mode: 'recruiter' | 'engineer') {
  const text = query.toLowerCase();

  // Healthcare / Clinical
  if (text.includes('health') || text.includes('clinical') || text.includes('medical') || text.includes('hipaa') || text.includes('claims') || text.includes('insurance') || text.includes('ner') || text.includes('phi') || text.includes('pii')) {
    return {
      title: 'Healthcare ML experience',
      body:
        'Clinical NLP pipeline: distilled Bio_ClinicalBERT (110M→65M), 93.2% F1 retained, 3.5x faster inference. At BCBS Colorado, built ClinicalBERT-based analysis of clinical notes and claims, HIPAA-compliant pipelines processing data from 6+ payer systems, and denial prediction models. At Accenture, built anomaly detection for insurance fraud.',
      target: 'experience',
    };
  }

  // LLM / Models / Fine-tuning
  if (text.includes('llm') || text.includes('fine') || text.includes('distill') || text.includes('model') || text.includes('compress') || text.includes('onnx') || text.includes('bert') || text.includes('transformer')) {
    return {
      title: mode === 'recruiter' ? 'Production LLM impact' : 'LLM technical depth',
      body:
        mode === 'recruiter'
          ? 'Compressed models from 110M to 65M params retaining 93.2% F1. Achieved 3.5x inference speedup (39ms→11ms) and 6.6x size reduction (411MB→62.6MB). Currently building an RLHF alignment pipeline for a 7B model on AWS SageMaker.'
          : 'Knowledge distillation with PyTorch/HuggingFace, ONNX Runtime optimization, INT8 quantization, structured pruning with recovery fine-tuning. Teacher: Bio_ClinicalBERT, Student: DistilClinicalBERT. A/B testing confirmed safe deployment.',
      target: 'projects',
    };
  }

  // MLOps / AWS / Pipelines / Infrastructure
  if (text.includes('mlops') || text.includes('aws') || text.includes('pipeline') || text.includes('distributed') || text.includes('spark') || text.includes('emr') || text.includes('docker') || text.includes('terraform') || text.includes('deploy') || text.includes('infra')) {
    return {
      title: 'MLOps & infrastructure',
      body:
        'AWS EMR pipeline processing 900K records in 3.5 min at 4,350 docs/sec. Azure Data Factory + Synapse for HIPAA-compliant healthcare pipelines. Databricks with SLA monitoring. FastAPI serving with Prometheus + OpenTelemetry. Docker, Terraform, and serverless Lambda deployments.',
      target: 'projects',
    };
  }

  // Agents / LangChain / RAG
  if (text.includes('langchain') || text.includes('agent') || text.includes('rag') || text.includes('chatbot') || text.includes('assistant')) {
    const matches = projects
      .filter((p) => `${p.title} ${p.description} ${p.techStack.join(' ')}`.toLowerCase().includes('langchain') || p.category === 'rag' || p.description.toLowerCase().includes('agent'))
      .map((p) => p.title)
      .slice(0, 3)
      .join(', ');
    return {
      title: 'Agentic AI & RAG',
      body: `Projects: ${matches}. These show multi-agent routing, tool integrations, vector retrieval, and production-oriented assistant design with Google ADK and LangChain.`,
      target: 'projects',
    };
  }

  // Skills / Tech stack
  if (text.includes('skill') || text.includes('stack') || text.includes('tech') || text.includes('python') || text.includes('pytorch') || text.includes('language')) {
    const topSkills = skillCategories
      .flatMap((c) => c.skills)
      .sort((a, b) => b.proficiency - a.proficiency)
      .slice(0, 8)
      .map((s) => s.name)
      .join(', ');
    return {
      title: 'Core tech stack',
      body: `Top skills: ${topSkills}. The Skills section has an interactive constellation — drag nodes and filter by category to explore.`,
      target: 'skills',
    };
  }

  // Experience / Career / Jobs
  if (text.includes('experience') || text.includes('job') || text.includes('work') || text.includes('career') || text.includes('bcbs') || text.includes('accenture') || text.includes('blue cross')) {
    return {
      title: 'Career experience',
      body: `Currently ML Engineer at Blue Cross Blue Shield of Colorado (Aug 2024–Present) working on clinical NLP, claims prediction, and HIPAA-compliant pipelines. Previously at Accenture (Jul 2019–Aug 2022) building insurance ML models, anomaly detection, and Azure Databricks pipelines for Sun Life Insurance.`,
      target: 'experience',
    };
  }

  // Education / Certifications
  if (text.includes('education') || text.includes('degree') || text.includes('certif') || text.includes('aws cert') || text.includes('university')) {
    return {
      title: 'Education & certifications',
      body: 'M.S. Data Science from University of Colorado Boulder. B.Tech ECE from JNTU Kakinada. Certified: AWS ML Engineer Associate, AWS Solutions Architect Associate, NVIDIA AI Anomaly Detection, Azure DP-900.',
      target: 'certifications',
    };
  }

  // Contact / Hire
  if (text.includes('contact') || text.includes('hire') || text.includes('email') || text.includes('reach') || text.includes('connect')) {
    return {
      title: 'Get in touch',
      body: 'Available for new opportunities. Reach out via the contact form, email at santoshbalu25@gmail.com, or connect on LinkedIn. There\'s also a downloadable contact card at /card.',
      target: 'contact',
    };
  }

  // Projects general
  if (text.includes('project') || text.includes('build') || text.includes('portfolio') || text.includes('show')) {
    return {
      title: 'Featured projects',
      body: 'The Projects section has flip cards — click any card to see detailed metrics on the back. Key projects: Clinical NLP (NER distillation), Wisdom Vault (cryptographic AI inheritance), Agentic AI Parenting (multi-agent system), and Cold Email Generator (RAG pipeline).',
      target: 'projects',
    };
  }

  // Default fallback
  return {
    title: 'How to explore this portfolio',
    body:
      'Try asking about: healthcare ML, LLM compression, my tech stack, work experience, projects, or certifications. You can also switch between Recruiter and Engineer mode in the top-right for different perspectives.',
    target: 'about',
  };
}

export function AskPortfolio() {
  const { mode } = usePortfolioInteraction();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [asked, setAsked] = useState(quickQuestions[0]);
  const answer = useMemo(() => buildAnswer(asked, mode), [asked, mode]);

  function submit(nextQuery = query) {
    const trimmed = nextQuery.trim();
    if (!trimmed) return;
    setAsked(trimmed);
    setQuery('');
  }

  function jumpToTarget() {
    setOpen(false);
    document.getElementById(answer.target)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-32 left-4 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-br from-accent to-cyan px-4 text-sm font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.35)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:left-6"
        aria-label="Ask my portfolio"
      >
        <MessageCircle className="h-5 w-5" />
        <span>Ask</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-24 left-4 z-50 w-[calc(100vw-2rem)] max-w-md overflow-hidden rounded-lg border border-border/60 bg-background shadow-[0_24px_80px_rgba(15,23,42,0.24)] backdrop-blur-xl dark:bg-slate-950/95 dark:shadow-[0_24px_80px_rgba(0,0,0,0.5)] md:left-6"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
              <div>
                <h3 className="text-sm font-semibold">Ask My Portfolio</h3>
                <p className="text-xs text-foreground/45">Local answers from portfolio content</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-foreground/45 transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close portfolio assistant"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 p-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/35" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') submit();
                    }}
                    placeholder="Ask about projects, skills, impact..."
                    className="w-full rounded-lg border border-border/60 bg-background px-9 py-2.5 text-sm outline-none focus:border-accent"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => submit()}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-white transition-colors hover:bg-accent-dark"
                  aria-label="Ask"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => submit(question)}
                    className="rounded-lg border border-border/60 px-2.5 py-1.5 text-xs font-medium text-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {question}
                  </button>
                ))}
              </div>

              <div className="rounded-lg border border-cyan/20 bg-cyan/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-light">
                  {mode} answer
                </p>
                <h4 className="mt-2 text-base font-semibold">{answer.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-foreground/65 dark:text-foreground/75">
                  {answer.body}
                </p>
                <button
                  type="button"
                  onClick={jumpToTarget}
                  className="mt-4 rounded-lg bg-background px-3 py-2 text-xs font-semibold text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
                >
                  Jump to related section
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
