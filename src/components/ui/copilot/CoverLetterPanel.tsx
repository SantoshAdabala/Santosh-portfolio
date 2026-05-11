'use client';

import { motion } from 'framer-motion';
import { CopyButton } from '@/components/ui/CopyButton';

interface CoverLetterPanelProps {
  data: string;
}

/** Common salutation patterns */
const salutationPatterns = [
  /^dear\s/i,
  /^to whom/i,
  /^hi\s/i,
  /^hello\s/i,
  /^greetings/i,
];

/** Common closing patterns */
const closingPatterns = [
  /^sincerely/i,
  /^best regards/i,
  /^regards/i,
  /^thank you/i,
  /^thanks/i,
  /^warm regards/i,
  /^kind regards/i,
  /^respectfully/i,
  /^yours truly/i,
  /^yours sincerely/i,
  /^best/i,
  /^cheers/i,
];

function isSalutation(text: string): boolean {
  const trimmed = text.trim();
  return salutationPatterns.some((p) => p.test(trimmed));
}

function isClosing(text: string): boolean {
  const trimmed = text.trim();
  return closingPatterns.some((p) => p.test(trimmed));
}

function parseParagraphs(data: string): string[] {
  // Try splitting on double newlines first
  let paragraphs = data.split('\n\n').filter((p) => p.trim().length > 0);

  // If that only produces one block, try single newlines
  if (paragraphs.length <= 1) {
    paragraphs = data.split('\n').filter((p) => p.trim().length > 0);
  }

  return paragraphs;
}

export function CoverLetterPanel({ data }: CoverLetterPanelProps) {
  const paragraphs = parseParagraphs(data);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/50 leading-relaxed">
          Generated cover letter tailored to this role.
        </p>
        <CopyButton text={data} />
      </div>

      {/* Letter card */}
      <div className="rounded-xl border border-border/40 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-8 md:p-10 space-y-5">
        {paragraphs.map((paragraph, i) => {
          const isFirst = i === 0;
          const isLast = i === paragraphs.length - 1;
          const trimmed = paragraph.trim();

          // Salutation styling (first paragraph that looks like a greeting)
          if (isFirst && isSalutation(trimmed)) {
            return (
              <p
                key={i}
                className="text-base md:text-lg text-foreground/90 font-semibold leading-7 md:leading-8"
              >
                {trimmed}
              </p>
            );
          }

          // Closing styling (last paragraph or second-to-last that looks like a sign-off)
          if (isLast && isClosing(trimmed)) {
            return (
              <p
                key={i}
                className="text-base md:text-lg text-foreground/70 italic leading-7 md:leading-8 pt-2"
              >
                {trimmed}
              </p>
            );
          }

          // Check if second-to-last is closing (e.g. "Sincerely,\nName")
          if (
            !isLast &&
            i === paragraphs.length - 2 &&
            isClosing(trimmed)
          ) {
            return (
              <p
                key={i}
                className="text-base md:text-lg text-foreground/70 italic leading-7 md:leading-8 pt-2"
              >
                {trimmed}
              </p>
            );
          }

          // Regular paragraph
          return (
            <p
              key={i}
              className="text-base md:text-lg text-foreground/75 leading-7 md:leading-8"
            >
              {trimmed}
            </p>
          );
        })}
      </div>
    </motion.div>
  );
}
