'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, FileText, Sparkles, Target, Upload, Download } from 'lucide-react';
import { CopilotLoading } from '@/components/ui/CopilotLoading';
import { CopilotTabs } from '@/components/ui/CopilotTabs';
import { COPILOT_TABS } from '@/data/copilot-tabs';
import { ATSScorePanel } from '@/components/ui/copilot/ATSScorePanel';
import { SkillsPanel } from '@/components/ui/copilot/SkillsPanel';
import { BulletsPanel } from '@/components/ui/copilot/BulletsPanel';
import { RecruiterPanel } from '@/components/ui/copilot/RecruiterPanel';
import { STARPanel } from '@/components/ui/copilot/STARPanel';
import { KeywordsPanel } from '@/components/ui/copilot/KeywordsPanel';
import { TailoringPanel } from '@/components/ui/copilot/TailoringPanel';
import { PitchPanel } from '@/components/ui/copilot/PitchPanel';
import { QuestionsPanel } from '@/components/ui/copilot/QuestionsPanel';
import { CoverLetterPanel } from '@/components/ui/copilot/CoverLetterPanel';
import type { CopilotAnalysis } from '@/types/copilot';

const MY_RESUME = `Santosh Adabala
Machine Learning Engineer
Lakewood, CO | santosh.adabala98@gmail.com | (551) 368-6374 | LinkedIn | GitHub | Portfolio

Professional Summary
Machine Learning Engineer with 5+ years of experience applying ML, NLP, and predictive analytics to healthcare and insurance data. Hands-on with claims risk scoring, denial prediction, clinical text analysis, fraud-risk detection, anomaly detection, and ML-ready data pipelines using Python, SQL, Scikit-learn, PyTorch, TensorFlow, ClinicalBERT, PySpark, Azure, AWS, Databricks, and MLflow.

Technical Skills
Languages: Python, SQL, R, Scala
ML/AI: Scikit-learn, PyTorch, TensorFlow, XGBoost, LightGBM, ClinicalBERT, Transformers, Hugging Face, RAG, NLP, NER, Anomaly Detection
Data/MLOps: PySpark, Databricks, Airflow, Azure Data Factory, SSIS, MLflow, Feature Engineering, Model Evaluation, Model Monitoring
Cloud/Analytics: Azure Synapse, Azure SQL, AWS SageMaker, AWS EMR, S3, PostgreSQL, SQL Server, Snowflake, BigQuery, Power BI, Tableau, Git, HIPAA

Professional Experience
Machine Learning Engineer | Blue Cross Blue Shield of Colorado | Aug 2024 – Present
• Used ClinicalBERT, Python, and Scikit-learn to analyze clinical notes, claims narratives, and prior authorization text, helping medical review teams find relevant clinical patterns faster.
• Built Python and SQL-based models to prioritize high-risk claims, predict likely denials, and surface high-cost cases for utilization review teams.
• Built HIPAA-compliant data pipelines with Azure Data Factory, Azure Synapse, Azure SQL, SQL Server, and Python to process claims, provider, eligibility, and pre-certification data from 6+ payer systems, reducing manual data preparation effort by 30%.
• Developed Power BI dashboards and model-monitoring reports to track denial rates, turnaround time, appeals success, utilization trends, provider performance, and data quality checks.

Machine Learning Engineer | Accenture – Sun Life Insurance Client | Jul 2019 – Aug 2022
• Built predictive models with Random Forest, XGBoost, Logistic Regression, and Scikit-learn to analyze insurance claims, policyholder behavior, risk patterns, and claim approval trends.
• Developed anomaly detection logic on claims and transaction data to flag suspicious billing activity, unusual claim frequency, and high-risk policy behavior.
• Prepared ML-ready datasets from policy, premium, claims, customer, and payment data using Azure Data Factory, Azure Synapse, Azure SQL, PySpark, and Python, improving ingestion throughput by 50% and reducing reporting costs by 31%.
• Deployed Azure Databricks pipelines with data quality checks, logging, alerting, and SLA monitoring for recurring insurance analytics and model input datasets.

Machine Learning Projects
AlignLLM: LLM Alignment Pipeline on AWS | SageMaker, LoRA/QLoRA, DPO, RLHF, AWS Glue, Terraform
• Built a personal LLM alignment pipeline for a 7B chat model using SFT, DPO, RLHF, and LoRA/QLoRA; used AWS SageMaker for training, CloudWatch for monitoring, AWS Glue and Athena for data processing, Terraform for infrastructure, and W&B for experiment tracking.

LLM Model Compression and Inference Optimization | PyTorch, Transformers, ONNX
• Fine-tuned and compressed transformer models using knowledge distillation and ONNX export, reducing model size from 110M to 65M parameters and improving inference latency from 39ms to 11ms.

Distributed ML Pipeline for Document Intelligence | AWS EMR, S3, PySpark, MLflow
• Built a PySpark-based document processing pipeline on AWS EMR and S3, improving throughput to 4,350 docs/sec by tuning Spark transformations, partitioning strategy, and batch processing logic.

Education
M.S. Data Science, University of Colorado Boulder
B.Tech. Electronics and Communication Engineering, JNTU Kakinada
Relevant Coursework: Machine Learning, Deep Learning, NLP, Data Mining, Statistics, Big Data Analytics

Certifications
AWS ML Engineer – Associate | AWS Solutions Architect – Associate | NVIDIA AI Anomaly Detection | Azure DP-900`;

const OWNER_NAME = 'Santosh Adabala';

function isOwnerResume(text: string): boolean {
  return text.toLowerCase().includes(OWNER_NAME.toLowerCase());
}

/**
 * Masks PII/PHI in resume text for display purposes.
 * Redacts email addresses, phone numbers, and street addresses.
 * The full text is still sent to the API for analysis.
 */
function maskPII(text: string): string {
  return text
    // Mask email addresses
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '••••@••••.•••')
    // Mask phone numbers (various formats)
    .replace(/(\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4})/g, '(•••) •••-••••')
    // Mask street addresses (number + street name patterns)
    .replace(/\d{1,5}\s+[A-Z][a-zA-Z]+\s+(St|Street|Ave|Avenue|Blvd|Boulevard|Dr|Drive|Ln|Lane|Rd|Road|Way|Ct|Court|Pl|Place)\b/g, '•••• •••••••• ••');
}

/**
 * Generates a structured markdown prompt for AI resume tailoring.
 */
function generateExportPrompt(resume: string, jd: string, analysis: CopilotAnalysis): string {
  const sections = [
    '# Resume Tailoring Prompt',
    '',
    '> Paste this entire file into Claude or ChatGPT to generate a tailored resume.',
    '',
    '## Instructions for AI',
    '',
    'Using the analysis below, rewrite my resume to be optimally tailored for this specific job description. Follow these rules:',
    '- Incorporate the missing keywords naturally into my experience bullets',
    '- Rewrite bullets using the suggested improvements',
    '- Reorder sections to prioritize what the JD emphasizes',
    '- Keep all facts truthful — do not invent experience I don\'t have',
    '- Maintain a clean, ATS-friendly format',
    '- Target an ATS score of 85+',
    '',
    '---',
    '',
    '## My Current Resume',
    '',
    '```',
    resume,
    '```',
    '',
    '---',
    '',
    '## Target Job Description',
    '',
    '```',
    jd,
    '```',
    '',
    '---',
    '',
    '## Analysis Results',
    '',
    `### ATS Score: ${analysis.atsScore.score}/100`,
    `- Keyword Density: ${analysis.atsScore.factors.keywordDensity}%`,
    `- Format Compatibility: ${analysis.atsScore.factors.formatCompatibility}%`,
    `- Section Completeness: ${analysis.atsScore.factors.sectionCompleteness}%`,
    '',
    '### Missing Keywords',
    ...analysis.keywords.missing.map(k => `- **${k.keyword}** (${k.category}) — ${k.suggestion}`),
    '',
    '### Suggested Bullet Rewrites',
    ...analysis.bulletRewrites.map(b => [
      `- Original: "${b.original}"`,
      `  Improved: "${b.rewritten}"`,
      `  Reason: ${b.reasoning}`,
    ]).flat(),
    '',
    '### Tailoring Suggestions',
    ...analysis.tailoring.map((t, i) => `${i + 1}. [${t.impact.toUpperCase()}] ${t.suggestion} (Section: ${t.section})`),
    '',
    '### Skills Gap',
    '**Matched:** ' + analysis.skills.matched.map(s => s.skill).join(', '),
    '**Partial:** ' + analysis.skills.partial.map(s => `${s.skill} (${s.gap})`).join(', '),
    '**Missing:** ' + analysis.skills.missing.map(s => `${s.skill} [${s.priority}]`).join(', '),
    '',
    '---',
    '',
    '## Output Format',
    '',
    'Please output the tailored resume in clean plain text format, ready to paste into a document.',
  ];

  return sections.join('\n');
}

export default function DemosPage() {
  const [resume, setResume] = useState(MY_RESUME);
  const [jobDescription, setJobDescription] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<CopilotAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('ats');
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);
  const [revealedTabs, setRevealedTabs] = useState<string[]>([]);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  async function handlePdfUpload(file: File) {
    setIsUploading(true);
    try {
      // Read the file as text — works for text-layer PDFs and plain text files
      const text = await file.text();

      // Check if we got readable text (not binary garbage)
      const printableRatio = text.replace(/[^\x20-\x7E\n\r\t]/g, '').length / text.length;

      if (printableRatio > 0.8 && text.trim().length > 50) {
        setResume(text.trim());
        setError(null);
      } else {
        setError('Could not read this PDF. Please paste your resume text directly into the field above.');
      }
    } catch {
      setError('Failed to read file. Please paste your resume text directly.');
    } finally {
      setIsUploading(false);
    }
  }

  async function handleAnalyze() {
    if (!jobDescription.trim()) {
      setError('Please paste a job description to analyze.');
      setStatus('error');
      return;
    }

    if (!isOwnerResume(resume)) {
      setError('Unable to process this resume. Please try again later.');
      setStatus('error');
      return;
    }

    setError(null);
    setStatus('loading');
    setResult(null);
    setLoadingStartTime(Date.now());

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume: resume.trim(), jobDescription: jobDescription.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Analysis failed');
      }

      const data = await res.json();
      setResult(data);
      setStatus('success');

      // Progressive reveal: stagger tabs one by one
      setIsRevealing(true);
      setRevealedTabs([]);
      const tabIds = COPILOT_TABS.map(t => t.id);
      for (let i = 0; i < tabIds.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setRevealedTabs(prev => [...prev, tabIds[i]]);
        setActiveTab(tabIds[i]);
      }
      setIsRevealing(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('error');
    }
  }

  function renderActivePanel() {
    if (!result) return null;

    switch (activeTab) {
      case 'ats':
        return <ATSScorePanel data={result.atsScore} />;
      case 'skills':
        return <SkillsPanel data={result.skills} />;
      case 'bullets':
        return <BulletsPanel data={result.bulletRewrites} />;
      case 'recruiter':
        return <RecruiterPanel data={result.recruiterFeedback} />;
      case 'star':
        return <STARPanel data={result.starAnswers} />;
      case 'keywords':
        return <KeywordsPanel data={result.keywords} />;
      case 'tailoring':
        return <TailoringPanel data={result.tailoring} />;
      case 'pitch':
        return <PitchPanel data={result.pitch} />;
      case 'questions':
        return <QuestionsPanel data={result.interviewQuestions} />;
      case 'cover':
        return <CoverLetterPanel data={result.coverLetter} />;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => {
              if (window.history.length > 1) {
                window.history.back();
              } else {
                window.location.href = '/';
              }
            }}
            className="mb-6 inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-foreground/60 transition-colors hover:bg-white/5 hover:text-foreground/80"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Portfolio
          </button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
                <Sparkles className="h-5 w-5 text-accent-light" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/40">Career Intelligence</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold gradient-text">Resume / JD Match Analyzer</h1>
            <p className="mt-3 text-foreground/50 max-w-2xl">
              Paste a job description to see how well my background matches the role. AI-powered analysis with actionable feedback. Powered by Llama 3.3 70B.
            </p>
          </motion.div>
        </div>

        {/* Input section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="mb-2 flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground/70">
                <FileText className="h-4 w-4 text-accent-light" />
                My Resume
                <span className="text-[10px] font-normal text-foreground/40">(PII masked)</span>
              </label>
              <label className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground/60 cursor-pointer transition-colors hover:bg-white/10 hover:text-foreground/80">
                <Upload className="h-3.5 w-3.5" />
                {isUploading ? 'Parsing...' : 'Upload PDF'}
                <input
                  type="file"
                  accept=".pdf,.txt,.doc,.docx"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handlePdfUpload(file);
                    e.target.value = '';
                  }}
                  disabled={isUploading}
                />
              </label>
            </div>
            <textarea
              value={maskPII(resume)}
              readOnly
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              onSelect={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.setSelectionRange(0, 0);
              }}
              onKeyDown={(e) => {
                // Block Ctrl+A, Ctrl+C, Ctrl+X
                if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'x'].includes(e.key.toLowerCase())) {
                  e.preventDefault();
                }
              }}
              className="w-full h-64 rounded-xl border border-border/40 bg-background/30 px-4 py-3 text-sm outline-none text-foreground/70 resize-none select-none cursor-default transition-all duration-300"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground/70">
              <Target className="h-4 w-4 text-cyan" />
              Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full h-64 rounded-xl border border-border/40 bg-background/50 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_20px_rgba(139,92,246,0.1)] placeholder:text-foreground/25 resize-none"
            />
          </motion.div>
        </div>

        {/* Analyze button */}
        <motion.div
          className="mt-6 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <button
            onClick={handleAnalyze}
            disabled={status === 'loading'}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-cyan px-8 py-3.5 text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] disabled:opacity-50 disabled:hover:scale-100"
          >
            {status === 'loading' ? (
              <>
                <motion.div
                  className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Analyze Match
              </>
            )}
          </button>
          {error && <p className="text-sm text-red-400">{error}</p>}
        </motion.div>

        {/* Loading state */}
        <AnimatePresence>
          {status === 'loading' && loadingStartTime && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="mt-12"
            >
              <CopilotLoading startTime={loadingStartTime} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {status === 'success' && result && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              {/* Location warning */}
              {result.locationWarning && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 px-5 py-4"
                >
                  <span className="text-lg">📍</span>
                  <p className="text-sm text-amber-300 leading-relaxed">
                    {result.locationWarning}
                  </p>
                </motion.div>
              )}

              {/* Tab navigation */}
              <CopilotTabs
                tabs={COPILOT_TABS}
                activeTab={activeTab}
                onTabChange={(id) => {
                  // During reveal, don't allow manual tab switching
                  if (!isRevealing) setActiveTab(id);
                }}
                revealedTabs={isRevealing ? revealedTabs : undefined}
              />

              {/* Active panel */}
              <div className="mt-6" id={`panel-${activeTab}`} role="tabpanel">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderActivePanel()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Export for AI section */}
              {!isRevealing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12 rounded-xl border border-border/40 bg-gradient-to-br from-background/50 to-accent/[0.02] p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground/80">Export Analysis for AI Resume Tailoring</h3>
                      <p className="mt-1 text-xs text-foreground/50 leading-relaxed">
                        Download a structured prompt file with all insights. Paste it into Claude or ChatGPT to generate a tailored resume.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (!result) return;
                        const content = generateExportPrompt(resume, jobDescription, result);
                        const blob = new Blob([content], { type: 'text/markdown' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'resume-tailoring-prompt.md';
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                      className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-accent/15 px-4 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/25"
                    >
                      <Download className="h-4 w-4" />
                      Export .md
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
