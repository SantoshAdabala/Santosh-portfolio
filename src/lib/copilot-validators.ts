import type { CopilotAnalysis } from '@/types/copilot';

/**
 * Validates a parsed CopilotAnalysis object for structural correctness.
 * Checks score ranges, array lengths, enum values, and non-empty strings.
 */
export function validateCopilotAnalysis(data: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Data must be a non-null object'] };
  }

  const d = data as Record<string, unknown>;

  // --- atsScore ---
  if (!d.atsScore || typeof d.atsScore !== 'object') {
    errors.push('atsScore must be an object');
  } else {
    const ats = d.atsScore as Record<string, unknown>;
    if (!isNumberInRange(ats.score, 0, 100)) {
      errors.push('atsScore.score must be a number in [0, 100]');
    }
    if (!ats.factors || typeof ats.factors !== 'object') {
      errors.push('atsScore.factors must be an object');
    } else {
      const factors = ats.factors as Record<string, unknown>;
      if (!isNumberInRange(factors.keywordDensity, 0, 100)) {
        errors.push('atsScore.factors.keywordDensity must be a number in [0, 100]');
      }
      if (!isNumberInRange(factors.formatCompatibility, 0, 100)) {
        errors.push('atsScore.factors.formatCompatibility must be a number in [0, 100]');
      }
      if (!isNumberInRange(factors.sectionCompleteness, 0, 100)) {
        errors.push('atsScore.factors.sectionCompleteness must be a number in [0, 100]');
      }
    }
  }

  // --- skills ---
  if (!d.skills || typeof d.skills !== 'object') {
    errors.push('skills must be an object');
  } else {
    const skills = d.skills as Record<string, unknown>;

    // matched
    if (!Array.isArray(skills.matched)) {
      errors.push('skills.matched must be an array');
    } else {
      for (let i = 0; i < skills.matched.length; i++) {
        const s = skills.matched[i] as Record<string, unknown>;
        if (!isNonEmptyString(s?.skill)) {
          errors.push(`skills.matched[${i}].skill must be a non-empty string`);
        }
        if (s?.status !== 'matched') {
          errors.push(`skills.matched[${i}].status must be 'matched'`);
        }
      }
    }

    // partial
    if (!Array.isArray(skills.partial)) {
      errors.push('skills.partial must be an array');
    } else {
      for (let i = 0; i < skills.partial.length; i++) {
        const s = skills.partial[i] as Record<string, unknown>;
        if (!isNonEmptyString(s?.skill)) {
          errors.push(`skills.partial[${i}].skill must be a non-empty string`);
        }
        if (s?.status !== 'partial') {
          errors.push(`skills.partial[${i}].status must be 'partial'`);
        }
        if (!isNonEmptyString(s?.gap)) {
          errors.push(`skills.partial[${i}].gap must be a non-empty string`);
        }
      }
    }

    // missing
    if (!Array.isArray(skills.missing)) {
      errors.push('skills.missing must be an array');
    } else {
      for (let i = 0; i < skills.missing.length; i++) {
        const s = skills.missing[i] as Record<string, unknown>;
        if (!isNonEmptyString(s?.skill)) {
          errors.push(`skills.missing[${i}].skill must be a non-empty string`);
        }
        if (s?.status !== 'missing') {
          errors.push(`skills.missing[${i}].status must be 'missing'`);
        }
        if (!isOneOf(s?.priority, ['high', 'medium', 'low'])) {
          errors.push(`skills.missing[${i}].priority must be 'high', 'medium', or 'low'`);
        }
      }
    }
  }

  // --- bulletRewrites ---
  if (!Array.isArray(d.bulletRewrites)) {
    errors.push('bulletRewrites must be an array');
  } else {
    if (d.bulletRewrites.length < 3) {
      errors.push('bulletRewrites must have at least 3 items');
    }
    for (let i = 0; i < d.bulletRewrites.length; i++) {
      const b = d.bulletRewrites[i] as Record<string, unknown>;
      if (!isNonEmptyString(b?.original)) {
        errors.push(`bulletRewrites[${i}].original must be a non-empty string`);
      }
      if (!isNonEmptyString(b?.rewritten)) {
        errors.push(`bulletRewrites[${i}].rewritten must be a non-empty string`);
      }
      if (!isNonEmptyString(b?.reasoning)) {
        errors.push(`bulletRewrites[${i}].reasoning must be a non-empty string`);
      }
    }
  }

  // --- recruiterFeedback ---
  if (!d.recruiterFeedback || typeof d.recruiterFeedback !== 'object') {
    errors.push('recruiterFeedback must be an object');
  } else {
    const rf = d.recruiterFeedback as Record<string, unknown>;
    if (!isNonEmptyString(rf.firstImpression)) {
      errors.push('recruiterFeedback.firstImpression must be a non-empty string');
    }
    if (!isNonEmptyString(rf.strengths)) {
      errors.push('recruiterFeedback.strengths must be a non-empty string');
    }
    if (!isNonEmptyString(rf.concerns)) {
      errors.push('recruiterFeedback.concerns must be a non-empty string');
    }
    if (!isNonEmptyString(rf.justification)) {
      errors.push('recruiterFeedback.justification must be a non-empty string');
    }
    if (!isOneOf(rf.recommendation, ['strong_yes', 'yes', 'maybe', 'no'])) {
      errors.push("recruiterFeedback.recommendation must be 'strong_yes', 'yes', 'maybe', or 'no'");
    }
  }

  // --- starAnswers ---
  if (!Array.isArray(d.starAnswers)) {
    errors.push('starAnswers must be an array');
  } else {
    if (d.starAnswers.length < 3) {
      errors.push('starAnswers must have at least 3 items');
    }
    for (let i = 0; i < d.starAnswers.length; i++) {
      const s = d.starAnswers[i] as Record<string, unknown>;
      if (!isNonEmptyString(s?.question)) {
        errors.push(`starAnswers[${i}].question must be a non-empty string`);
      }
      if (!isNonEmptyString(s?.situation)) {
        errors.push(`starAnswers[${i}].situation must be a non-empty string`);
      }
      if (!isNonEmptyString(s?.task)) {
        errors.push(`starAnswers[${i}].task must be a non-empty string`);
      }
      if (!isNonEmptyString(s?.action)) {
        errors.push(`starAnswers[${i}].action must be a non-empty string`);
      }
      if (!isNonEmptyString(s?.result)) {
        errors.push(`starAnswers[${i}].result must be a non-empty string`);
      }
    }
  }

  // --- keywords ---
  if (!d.keywords || typeof d.keywords !== 'object') {
    errors.push('keywords must be an object');
  } else {
    const kw = d.keywords as Record<string, unknown>;
    if (!Array.isArray(kw.missing)) {
      errors.push('keywords.missing must be an array');
    } else {
      for (let i = 0; i < kw.missing.length; i++) {
        const item = kw.missing[i] as Record<string, unknown>;
        if (!isNonEmptyString(item?.keyword)) {
          errors.push(`keywords.missing[${i}].keyword must be a non-empty string`);
        }
        if (!isOneOf(item?.category, ['technical', 'soft_skill', 'tool', 'domain'])) {
          errors.push(`keywords.missing[${i}].category must be 'technical', 'soft_skill', 'tool', or 'domain'`);
        }
        if (!isNonEmptyString(item?.suggestion)) {
          errors.push(`keywords.missing[${i}].suggestion must be a non-empty string`);
        }
      }
    }
  }

  // --- tailoring ---
  if (!Array.isArray(d.tailoring)) {
    errors.push('tailoring must be an array');
  } else {
    if (d.tailoring.length < 5) {
      errors.push('tailoring must have at least 5 items');
    }
    for (let i = 0; i < d.tailoring.length; i++) {
      const t = d.tailoring[i] as Record<string, unknown>;
      if (!isNonEmptyString(t?.suggestion)) {
        errors.push(`tailoring[${i}].suggestion must be a non-empty string`);
      }
      if (!isOneOf(t?.impact, ['high', 'medium', 'low'])) {
        errors.push(`tailoring[${i}].impact must be 'high', 'medium', or 'low'`);
      }
      if (!isNonEmptyString(t?.section)) {
        errors.push(`tailoring[${i}].section must be a non-empty string`);
      }
    }
  }

  // --- interviewQuestions ---
  if (!Array.isArray(d.interviewQuestions)) {
    errors.push('interviewQuestions must be an array');
  } else {
    if (d.interviewQuestions.length < 8) {
      errors.push('interviewQuestions must have at least 8 items');
    }
    for (let i = 0; i < d.interviewQuestions.length; i++) {
      const q = d.interviewQuestions[i] as Record<string, unknown>;
      if (!isNonEmptyString(q?.question)) {
        errors.push(`interviewQuestions[${i}].question must be a non-empty string`);
      }
      if (!isOneOf(q?.category, ['technical', 'behavioral', 'situational', 'role_specific'])) {
        errors.push(`interviewQuestions[${i}].category must be 'technical', 'behavioral', 'situational', or 'role_specific'`);
      }
      if (!isNonEmptyString(q?.assessmentNote)) {
        errors.push(`interviewQuestions[${i}].assessmentNote must be a non-empty string`);
      }
    }
  }

  // --- pitch ---
  if (!isNonEmptyString(d.pitch)) {
    errors.push('pitch must be a non-empty string');
  }

  // --- coverLetter ---
  if (!isNonEmptyString(d.coverLetter)) {
    errors.push('coverLetter must be a non-empty string');
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Returns a hex color string based on the score value.
 * - Red (#ef4444) for score < 50
 * - Amber (#f59e0b) for score 50-59
 * - Blue (#3b82f6) for score 60-74
 * - Green (#22c55e) for score >= 75
 */
export function getScoreColor(score: number): string {
  if (score < 50) return '#ef4444';
  if (score < 60) return '#f59e0b';
  if (score < 75) return '#3b82f6';
  return '#22c55e';
}

/**
 * Validates that a cover letter text has at most 400 words.
 */
export function validateCoverLetterLength(text: string): boolean {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  return words.length <= 400;
}

// --- Helper functions ---

function isNumberInRange(value: unknown, min: number, max: number): boolean {
  return typeof value === 'number' && !isNaN(value) && value >= min && value <= max;
}

function isNonEmptyString(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

function isOneOf(value: unknown, options: string[]): boolean {
  return typeof value === 'string' && options.includes(value);
}
