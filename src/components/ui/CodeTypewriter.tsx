'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const CODE_LINES = [
  { text: '# Knowledge Distillation Pipeline', color: 'text-foreground/40' },
  { text: 'from transformers import AutoModelForTokenClassification', color: 'text-cyan' },
  { text: 'from torch.nn import KLDivLoss', color: 'text-cyan' },
  { text: '', color: '' },
  { text: 'teacher = AutoModelForTokenClassification.from_pretrained(', color: 'text-foreground/80' },
  { text: '    "Bio_ClinicalBERT"  # 110M params, F1=86.57%', color: 'text-accent-light' },
  { text: ')', color: 'text-foreground/80' },
  { text: 'student = AutoModelForTokenClassification.from_pretrained(', color: 'text-foreground/80' },
  { text: '    "DistilClinicalBERT"  # 65M params → 93.2% F1 retained', color: 'text-green-400' },
  { text: ')', color: 'text-foreground/80' },
  { text: '', color: '' },
  { text: 'loss = KLDivLoss(reduction="batchmean")', color: 'text-foreground/80' },
  { text: 'optimizer.step()  # 3.5x faster inference ⚡', color: 'text-yellow-400' },
];

interface Props {
  className?: string;
}

export function CodeTypewriter({ className }: Props) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [visibleLines, setVisibleLines] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (prefersReduced || !isInView) {
      if (prefersReduced) setVisibleLines(CODE_LINES.length);
      return;
    }

    setIsTyping(true);
    let lineIdx = 0;
    let charIdx = 0;

    const interval = setInterval(() => {
      if (lineIdx >= CODE_LINES.length) {
        clearInterval(interval);
        setIsTyping(false);
        return;
      }

      const line = CODE_LINES[lineIdx];
      if (charIdx >= line.text.length) {
        lineIdx++;
        charIdx = 0;
        setVisibleLines(lineIdx);
        setCurrentChar(0);
        // Pause between lines
        return;
      }

      charIdx++;
      setCurrentChar(charIdx);
    }, 30);

    return () => clearInterval(interval);
  }, [isInView, prefersReduced]);

  return (
    <div ref={ref} className={cn('relative', className)}>
      {/* Terminal chrome */}
      <div className="rounded-xl border border-border/30 bg-[hsl(240,20%,4%)] overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.08)]">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-border/20 px-4 py-2.5">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/70" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <div className="h-3 w-3 rounded-full bg-green-500/70" />
          </div>
          <span className="ml-2 text-xs text-foreground/30 font-mono">distillation_pipeline.py</span>
        </div>
        {/* Code area */}
        <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto">
          {CODE_LINES.map((line, i) => {
            if (prefersReduced || i < visibleLines) {
              return (
                <motion.div
                  key={i}
                  className={cn('whitespace-pre', line.color)}
                  {...(prefersReduced ? {} : {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { duration: 0.2 },
                  })}
                >
                  {line.text || '\u00A0'}
                </motion.div>
              );
            }
            if (i === visibleLines) {
              return (
                <div key={i} className={cn('whitespace-pre', line.color)}>
                  {line.text.slice(0, currentChar)}
                  {isTyping && (
                    <span className="inline-block w-[2px] h-[1.1em] bg-accent animate-blink align-middle ml-[1px]" />
                  )}
                </div>
              );
            }
            return <div key={i} className="h-[1.5em]" />;
          })}
        </div>
      </div>
    </div>
  );
}
