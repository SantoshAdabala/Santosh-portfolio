'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Circle, Loader2 } from 'lucide-react';

const THINKING_STEPS = [
  { id: 'ats', label: 'ATS Score Analysis' },
  { id: 'skills', label: 'Skill Gap Detection' },
  { id: 'bullets', label: 'Bullet Rewrites' },
  { id: 'recruiter', label: 'Recruiter Feedback' },
  { id: 'star', label: 'STAR Answers' },
  { id: 'keywords', label: 'Keyword Optimization' },
  { id: 'tailoring', label: 'Role Tailoring' },
  { id: 'pitch', label: 'Candidate Pitch' },
  { id: 'questions', label: 'Interview Questions' },
  { id: 'cover', label: 'Cover Letter' },
];

const STEP_INTERVAL = 2500;
const SLOW_THRESHOLD = 10000;

interface CopilotLoadingProps {
  startTime: number;
}

export function CopilotLoading({ startTime }: CopilotLoadingProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => {
        // Stop advancing once we reach the last step
        if (prev >= THINKING_STEPS.length - 1) return prev;
        return prev + 1;
      });
    }, STEP_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12">
      {/* Header */}
      <div className="flex flex-col items-center gap-3">
        <motion.div
          className="h-10 w-10 rounded-full border-3 border-accent/30 border-t-accent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <p className="text-sm font-medium text-foreground/70">
          AI is analyzing your resume...
        </p>
      </div>

      {/* Thinking steps list */}
      <div className="w-full max-w-sm space-y-1.5">
        {THINKING_STEPS.map((step, index) => {
          const isComplete = index < activeStepIndex;
          const isProcessing = index === activeStepIndex;
          const isPending = index > activeStepIndex;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors"
            >
              {/* Status icon */}
              <div className="flex h-5 w-5 items-center justify-center">
                {isComplete && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  >
                    <Check className="h-4 w-4 text-green-400" />
                  </motion.div>
                )}
                {isProcessing && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Loader2 className="h-4 w-4 text-accent" />
                  </motion.div>
                )}
                {isPending && (
                  <Circle className="h-3.5 w-3.5 text-foreground/20" />
                )}
              </div>

              {/* Label */}
              <span
                className={`text-sm transition-colors duration-300 ${
                  isComplete
                    ? 'text-foreground/60'
                    : isProcessing
                      ? 'text-accent font-medium'
                      : 'text-foreground/30'
                }`}
              >
                {step.label}
              </span>

              {/* Processing pulse indicator */}
              {isProcessing && (
                <motion.div
                  className="ml-auto h-1.5 w-1.5 rounded-full bg-accent"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Slow analysis message */}
      <AnimatePresence>
        {elapsed >= SLOW_THRESHOLD && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs text-foreground/50"
          >
            Comprehensive analysis takes a moment...
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
