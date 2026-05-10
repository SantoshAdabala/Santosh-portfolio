'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Upload, FileText, Sparkles, CheckCircle2, AlertTriangle, Lightbulb, Target, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

interface AnalysisResult {
  matchScore: number;
  summary: string;
  matchingSkills: string[];
  missingSkills: string[];
  suggestions: string[];
  strengthAreas: string[];
  riskAreas: string[];
}

function ScoreRing({ score }: { score: number }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 75 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={130} height={130} className="rotate-[-90deg]">
        <circle cx={65} cy={65} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={8} />
        <motion.circle
          cx={65} cy={65} r={r}
          fill="none" stroke={color} strokeWidth={8} strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 8px ${color}50)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-3xl font-bold"
          style={{ color }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        >
          {score}
        </motion.span>
        <span className="text-[10px] text-foreground/40 uppercase tracking-wider">Match</span>
      </div>
    </div>
  );
}

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

export default function DemosPage() {
  const [resume, setResume] = useState(MY_RESUME);
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleAnalyze() {
    if (!resume.trim() || !jobDescription.trim()) {
      setError('Please paste a job description to analyze.');
      return;
    }

    setError('');
    setLoading(true);
    setResult(null);

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
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <Button variant="ghost" href="/" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
                <Sparkles className="h-5 w-5 text-accent-light" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/40">AI Demo</span>
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
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground/70">
              <FileText className="h-4 w-4 text-accent-light" />
              My Resume (pre-loaded)
            </label>
            <textarea
              value={resume}
              readOnly
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              className="w-full h-64 rounded-xl border border-border/40 bg-background/30 px-4 py-3 text-sm outline-none text-foreground/50 resize-none cursor-default select-none"
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
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-cyan px-8 py-3.5 text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? (
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

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              {/* Score + Summary */}
              <div className="flex flex-col sm:flex-row items-center gap-8 mb-10">
                <ScoreRing score={result.matchScore} />
                <div>
                  <h2 className="text-xl font-bold mb-2">Match Analysis</h2>
                  <p className="text-sm text-foreground/60 max-w-lg leading-relaxed">{result.summary}</p>
                </div>
              </div>

              {/* Detail cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Matching Skills */}
                <SpotlightCard className="rounded-xl border border-border/40 bg-background/50" spotlightColor="rgba(34, 197, 94, 0.1)">
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                      <h3 className="text-sm font-semibold">Matching Skills</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.matchingSkills.map((skill) => (
                        <span key={skill} className="rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-400">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>

                {/* Missing Skills */}
                <SpotlightCard className="rounded-xl border border-border/40 bg-background/50" spotlightColor="rgba(239, 68, 68, 0.1)">
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                      <h3 className="text-sm font-semibold">Missing / Weak Skills</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.missingSkills.map((skill) => (
                        <span key={skill} className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>

                {/* Strengths */}
                <SpotlightCard className="rounded-xl border border-border/40 bg-background/50" spotlightColor="rgba(139, 92, 246, 0.1)">
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="h-4 w-4 text-accent-light" />
                      <h3 className="text-sm font-semibold">Strengths</h3>
                    </div>
                    <ul className="space-y-1.5">
                      {result.strengthAreas.map((s) => (
                        <li key={s} className="text-xs text-foreground/60 flex items-start gap-1.5">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-accent-light shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </SpotlightCard>

                {/* Risks */}
                <SpotlightCard className="rounded-xl border border-border/40 bg-background/50" spotlightColor="rgba(239, 68, 68, 0.08)">
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <h3 className="text-sm font-semibold">Risk Areas</h3>
                    </div>
                    <ul className="space-y-1.5">
                      {result.riskAreas.map((r) => (
                        <li key={r} className="text-xs text-foreground/60 flex items-start gap-1.5">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-red-400 shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </SpotlightCard>

                {/* Suggestions — spans 2 cols */}
                <SpotlightCard className="rounded-xl border border-border/40 bg-background/50 sm:col-span-2" spotlightColor="rgba(6, 182, 212, 0.1)">
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="h-4 w-4 text-cyan" />
                      <h3 className="text-sm font-semibold">Suggestions to Improve</h3>
                    </div>
                    <ul className="space-y-2">
                      {result.suggestions.map((s, i) => (
                        <li key={i} className="text-sm text-foreground/60 flex items-start gap-2">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan/10 text-[10px] font-bold text-cyan">
                            {i + 1}
                          </span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </SpotlightCard>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
