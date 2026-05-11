import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { validateCopilotAnalysis } from '@/lib/copilot-validators';
import type { CopilotAnalysis } from '@/types/copilot';

function getGroqClient() {
  return new Groq({ apiKey: process.env.GROQ_API_KEY });
}

const SYSTEM_PROMPT = `You are an expert resume analyzer and career coach. Given a resume and a job description, produce a comprehensive analysis.

Return your response as valid JSON matching this EXACT structure:

{
  "atsScore": {
    "score": <number 0-100>,
    "factors": {
      "keywordDensity": <number 0-100>,
      "formatCompatibility": <number 0-100>,
      "sectionCompleteness": <number 0-100>
    }
  },
  "skills": {
    "matched": [
      { "skill": "<string>", "status": "matched" }
    ],
    "partial": [
      { "skill": "<string>", "status": "partial", "priority": "high"|"medium"|"low", "gap": "<string explaining the gap>" }
    ],
    "missing": [
      { "skill": "<string>", "status": "missing", "priority": "high"|"medium"|"low" }
    ]
  },
  "bulletRewrites": [
    { "original": "<string>", "rewritten": "<string>", "reasoning": "<string>" }
  ],
  "recruiterFeedback": {
    "firstImpression": "<string>",
    "strengths": "<string>",
    "concerns": "<string>",
    "recommendation": "strong_yes"|"yes"|"maybe"|"no",
    "justification": "<string>"
  },
  "starAnswers": [
    { "question": "<string>", "situation": "<string>", "task": "<string>", "action": "<string>", "result": "<string>" }
  ],
  "keywords": {
    "missing": [
      { "keyword": "<string>", "category": "technical"|"soft_skill"|"tool"|"domain", "suggestion": "<string>" }
    ]
  },
  "tailoring": [
    { "suggestion": "<string>", "impact": "high"|"medium"|"low", "section": "<string>" }
  ],
  "pitch": "<string, 3-5 sentences>",
  "interviewQuestions": [
    { "question": "<string>", "category": "technical"|"behavioral"|"situational"|"role_specific", "assessmentNote": "<string>" }
  ],
  "coverLetter": "<string, 3-4 paragraphs, under 400 words>",
  "locationWarning": "<string or null>"
}

LOCATION DETECTION:
- If the job description specifies a location OUTSIDE the United States (e.g., Dublin, London, Singapore, Berlin, etc.), include a "locationWarning" field with a message like "This position requires being based in [City/Country], which is outside the United States."
- If the job is remote, US-based, or location is not specified, set "locationWarning" to null.
- The candidate is based in Lakewood, CO, United States.

RULES:
- "bulletRewrites" must have at least 3 items.
- "starAnswers" must have at least 3 items.
- "tailoring" must have at least 5 items.
- "interviewQuestions" must have at least 8 items.
- "recommendation" must be exactly one of: "strong_yes", "yes", "maybe", "no".
- "priority" must be exactly one of: "high", "medium", "low".
- "category" for keywords must be exactly one of: "technical", "soft_skill", "tool", "domain".
- "category" for interviewQuestions must be exactly one of: "technical", "behavioral", "situational", "role_specific".
- "impact" must be exactly one of: "high", "medium", "low".
- All string fields must be non-empty.
- Base all content on the provided resume facts. Do not invent experiences.
- Only return the JSON object, no other text.

SCORING RULES — SIMULATE A REAL ATS SYSTEM:
You must score the resume EXACTLY as a real Applicant Tracking System would. Real ATS systems use keyword matching algorithms, NOT subjective judgment. Follow this methodology:

1. KEYWORD MATCH (50% of score): Extract ALL required skills, tools, technologies, certifications, and qualifications from the JD. Count how many appear (exact or synonym match) in the resume. Score = (matched keywords / total required keywords) * 100. Weight "required" qualifications 2x vs "preferred."

2. EXPERIENCE MATCH (25% of score): Compare years of experience required vs. stated in resume. Compare job titles/functions. If the JD asks for 5 years and resume shows 5+, full marks. If JD function (e.g., "compliance officer") doesn't match resume function (e.g., "ML engineer"), this scores near 0.

3. EDUCATION & CERTIFICATIONS (15% of score): Does the resume meet the education requirements? Are required certifications present?

4. FORMAT & COMPLETENESS (10% of score): Does the resume have all standard sections (summary, experience, skills, education)? Is it parseable?

Calculate the ACTUAL weighted score. Do NOT round to convenient numbers. Give the real calculated number (e.g., 73, 28, 81, 44 — whatever the math produces).

DO NOT inflate scores to be nice. DO NOT deflate scores to be harsh. Just calculate honestly based on keyword overlap and requirement matching. A resume with 8/10 required keywords, matching experience level, and correct education should score 80+. A resume with 2/10 required keywords and wrong job function should score below 30.`;

/**
 * Calls Groq SDK with retry logic and timeout handling.
 * Retries once on JSON parse failure or validation failure.
 * Uses AbortController with 55-second timeout.
 */
async function callGroqWithRetry(
  groq: Groq,
  messages: { role: 'system' | 'user'; content: string }[],
): Promise<CopilotAnalysis> {
  const maxRetries = 1;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 55000);

    try {
      const completion = await groq.chat.completions.create(
        {
          messages,
          model: 'llama-3.3-70b-versatile',
          temperature: 0.3,
          max_tokens: 8192,
          response_format: { type: 'json_object' },
        },
        { signal: controller.signal },
      );

      clearTimeout(timeoutId);

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response content from AI');
      }

      // Parse JSON - may throw on invalid JSON
      const parsed = JSON.parse(content);

      // Validate structure
      const validation = validateCopilotAnalysis(parsed);
      if (!validation.valid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
      }

      return parsed as CopilotAnalysis;
    } catch (error: unknown) {
      clearTimeout(timeoutId);

      // If this is the last attempt, rethrow
      if (attempt === maxRetries) {
        throw error;
      }

      // Only retry on JSON parse or validation failures
      const isParseError =
        error instanceof SyntaxError ||
        (error instanceof Error && error.message.startsWith('Validation failed'));

      if (!isParseError) {
        // Non-retryable errors (network, timeout, rate limit) - throw immediately
        throw error;
      }

      // Otherwise, retry
    }
  }

  // Should never reach here, but TypeScript needs it
  throw new Error('Unexpected retry loop exit');
}

export async function POST(request: NextRequest) {
  try {
    const { resume, jobDescription } = await request.json();

    if (!resume || !jobDescription) {
      return NextResponse.json(
        { error: 'Both resume and job description are required' },
        { status: 400 },
      );
    }

    // Input validation for JD length
    if (typeof jobDescription !== 'string' || jobDescription.length < 50) {
      return NextResponse.json(
        { error: 'Job description must be at least 50 characters' },
        { status: 400 },
      );
    }

    if (jobDescription.length > 10000) {
      return NextResponse.json(
        { error: 'Job description exceeds maximum length' },
        { status: 400 },
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 },
      );
    }

    const groq = getGroqClient();

    const messages: { role: 'system' | 'user'; content: string }[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `## Resume:\n${resume}\n\n## Job Description:\n${jobDescription}`,
      },
    ];

    const analysis = await callGroqWithRetry(groq, messages);
    return NextResponse.json(analysis);
  } catch (error: unknown) {
    console.error('Analyze API error:', error);

    // Rate limit error
    if (
      error instanceof Error &&
      ('status' in error || 'statusCode' in error)
    ) {
      const status = (error as { status?: number; statusCode?: number }).status ??
        (error as { statusCode?: number }).statusCode;
      if (status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded, please wait and try again' },
          { status: 429 },
        );
      }
    }

    // Timeout (AbortError)
    if (
      error instanceof Error &&
      (error.name === 'AbortError' || error.message.includes('aborted'))
    ) {
      return NextResponse.json(
        { error: 'Analysis timed out, please try again' },
        { status: 504 },
      );
    }

    // Network errors
    if (
      error instanceof Error &&
      (error.message.includes('fetch') ||
        error.message.includes('network') ||
        error.message.includes('ECONNREFUSED') ||
        error.message.includes('ENOTFOUND') ||
        error.name === 'TypeError')
    ) {
      return NextResponse.json(
        { error: 'AI service unavailable, please try again' },
        { status: 503 },
      );
    }

    // Parse/validation failure after retry
    if (
      error instanceof SyntaxError ||
      (error instanceof Error && error.message.startsWith('Validation failed'))
    ) {
      return NextResponse.json(
        { error: 'Analysis failed, please try again' },
        { status: 502 },
      );
    }

    // Generic error
    const message = error instanceof Error ? error.message : 'Analysis failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
