'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Search, Send, X } from 'lucide-react';
import { projects } from '@/data/projects';
import { skillCategories } from '@/data/skills';
import { experience } from '@/data/experience';
import { usePortfolioInteraction } from '@/components/providers/PortfolioInteractionProvider';

const quickQuestions = [
  'What is your strongest LLM project?',
  'Show healthcare ML experience',
  'What MLOps work have you done?',
  'Which projects use LangChain?',
];

function buildAnswer(query: string, mode: 'recruiter' | 'engineer') {
  const text = query.toLowerCase();

  if (text.includes('health') || text.includes('clinical') || text.includes('medical')) {
    return {
      title: 'Healthcare ML evidence',
      body:
        'The strongest healthcare proof is the Clinical NLP pipeline: 93.2% F1 retained, 3.5x faster inference, 6.6x model compression, and 900K records processed in 3.5 minutes. The BCBS experience also shows production anomaly detection and large-scale healthcare data work.',
      target: 'case-studies',
    };
  }

  if (text.includes('llm') || text.includes('fine') || text.includes('distillation') || text.includes('model')) {
    return {
      title: mode === 'recruiter' ? 'Production LLM impact' : 'LLM implementation depth',
      body:
        mode === 'recruiter'
          ? 'The portfolio emphasizes production LLM outcomes: faster inference, smaller models, reliable pipelines, and measurable healthcare/enterprise AI impact.'
          : 'The strongest technical thread is LLM optimization: PyTorch, HuggingFace, distillation, ONNX Runtime, quantization, LangChain workflows, and agentic systems.',
      target: 'impact',
    };
  }

  if (text.includes('mlops') || text.includes('aws') || text.includes('pipeline') || text.includes('distributed')) {
    return {
      title: 'MLOps and scale',
      body:
        'Relevant evidence includes AWS EMR processing, PySpark pipelines, FastAPI services, Docker/Lambda deployment, Prometheus monitoring, Terraform, Databricks, and data lake work with Apache Hudi.',
      target: 'projects',
    };
  }

  if (text.includes('langchain') || text.includes('agent') || text.includes('rag')) {
    const matches = projects
      .filter((project) => `${project.title} ${project.description} ${project.techStack.join(' ')}`.toLowerCase().includes('langchain') || project.category === 'rag')
      .map((project) => project.title)
      .slice(0, 3)
      .join(', ');
    return {
      title: 'Agentic AI and RAG work',
      body: `Relevant builds include ${matches}. They show modular agent workflows, tool integrations, vector retrieval patterns, and production-oriented assistant design.`,
      target: 'projects',
    };
  }

  if (text.includes('skill') || text.includes('stack') || text.includes('technology')) {
    const topSkills = skillCategories
      .flatMap((category) => category.skills)
      .sort((a, b) => b.proficiency - a.proficiency)
      .slice(0, 6)
      .map((skill) => skill.name)
      .join(', ');
    return {
      title: 'Core stack',
      body: `Top skills shown on the site include ${topSkills}. Click any skill in the Skills section to filter matching projects.`,
      target: 'skills',
    };
  }

  if (text.includes('experience') || text.includes('job') || text.includes('work')) {
    return {
      title: 'Experience summary',
      body: `The timeline includes ${experience.length} entries, with the current role focused on LLM fine-tuning, distillation, distributed ML pipelines, agentic workflows, and anomaly detection.`,
      target: 'experience',
    };
  }

  return {
    title: 'Best place to start',
    body:
      'Start with Case Studies for depth, Impact Dashboard for metrics, and Projects for code. For hiring context, switch to Recruiter mode; for implementation detail, switch to Engineer mode.',
    target: 'case-studies',
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
