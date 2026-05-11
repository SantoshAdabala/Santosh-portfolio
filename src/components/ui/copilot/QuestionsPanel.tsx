'use client';

import { motion } from 'framer-motion';
import type { InterviewQuestion } from '@/types/copilot';

interface QuestionsPanelProps {
  data: InterviewQuestion[];
}

const categoryConfig = {
  technical: { label: 'Technical', headerColor: 'text-blue-400', dotColor: 'bg-blue-400' },
  behavioral: { label: 'Behavioral', headerColor: 'text-purple-400', dotColor: 'bg-purple-400' },
  situational: { label: 'Situational', headerColor: 'text-cyan-400', dotColor: 'bg-cyan-400' },
  role_specific: { label: 'Role-Specific', headerColor: 'text-amber-400', dotColor: 'bg-amber-400' },
} as const;

function QuestionItem({
  question,
  number,
}: {
  question: InterviewQuestion;
  number: number;
}) {
  return (
    <div className="flex gap-3 py-3">
      <span className="shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-white/5 text-[10px] font-semibold text-foreground/50">
        {number}
      </span>
      <div className="space-y-1">
        <p className="text-base text-foreground/80 leading-relaxed">
          {question.question}
        </p>
        <p className="text-xs text-foreground/40 leading-relaxed">
          {question.assessmentNote}
        </p>
      </div>
    </div>
  );
}

export function QuestionsPanel({ data }: QuestionsPanelProps) {
  const grouped = data.reduce(
    (acc, q) => {
      if (!acc[q.category]) acc[q.category] = [];
      acc[q.category].push(q);
      return acc;
    },
    {} as Record<string, InterviewQuestion[]>,
  );

  const categories = ['technical', 'behavioral', 'situational', 'role_specific'] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-7"
    >
      <p className="text-sm text-foreground/50 leading-relaxed">
        {data.length} interview question{data.length !== 1 ? 's' : ''} you may encounter for this role.
      </p>

      {categories.map((category) => {
        const questions = grouped[category];
        if (!questions || questions.length === 0) return null;
        const config = categoryConfig[category];

        return (
          <div key={category} className="space-y-3">
            <h3
              className={`text-sm font-semibold flex items-center gap-2 ${config.headerColor}`}
            >
              <span className={`h-2 w-2 rounded-full ${config.dotColor}`} />
              {config.label} ({questions.length})
            </h3>
            <div className="rounded-xl border border-border/40 bg-background/30 p-5 space-y-1 divide-y divide-border/10">
              {questions.map((q, i) => (
                <QuestionItem key={i} question={q} number={i + 1} />
              ))}
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
