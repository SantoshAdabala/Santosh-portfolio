import type { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    icon: 'Code',
    skills: [
      { name: 'Python', proficiency: 95 },
      { name: 'SQL', proficiency: 90 },
      { name: 'Scala', proficiency: 70 },
      { name: 'Java', proficiency: 65 },
      { name: 'C++', proficiency: 60 },
    ],
  },
  {
    title: 'ML/AI Frameworks',
    icon: 'Brain',
    skills: [
      { name: 'PyTorch', proficiency: 92 },
      { name: 'HuggingFace Transformers', proficiency: 90 },
      { name: 'TensorFlow', proficiency: 80 },
      { name: 'scikit-learn', proficiency: 88 },
      { name: 'LangChain', proficiency: 85 },
      { name: 'spaCy', proficiency: 78 },
    ],
  },
  {
    title: 'MLOps & Infrastructure',
    icon: 'Container',
    skills: [
      { name: 'Docker', proficiency: 88 },
      { name: 'Kubernetes', proficiency: 80 },
      { name: 'MLflow', proficiency: 85 },
      { name: 'Kubeflow', proficiency: 75 },
      { name: 'AWS (S3, SageMaker)', proficiency: 85 },
      { name: 'GCP (BigQuery)', proficiency: 78 },
      { name: 'Databricks', proficiency: 85 },
      { name: 'Terraform', proficiency: 72 },
    ],
  },
  {
    title: 'LLM & NLP Specializations',
    icon: 'MessageSquare',
    skills: [
      { name: 'LLM Fine-Tuning (QLoRA, PEFT)', proficiency: 92 },
      { name: 'Knowledge Distillation', proficiency: 90 },
      { name: 'Model Compression & Quantization', proficiency: 88 },
      { name: 'Prompt Engineering', proficiency: 90 },
      { name: 'RAG Systems', proficiency: 85 },
      { name: 'Agentic AI Workflows', proficiency: 82 },
      { name: 'Text Classification', proficiency: 86 },
      { name: 'Anomaly Detection', proficiency: 84 },
    ],
  },
  {
    title: 'Data & Visualization',
    icon: 'BarChart3',
    skills: [
      { name: 'PySpark', proficiency: 90 },
      { name: 'Pandas', proficiency: 93 },
      { name: 'Apache Kafka', proficiency: 78 },
      { name: 'Apache Hudi', proficiency: 80 },
      { name: 'Power BI', proficiency: 82 },
      { name: 'Plotly / Dash', proficiency: 78 },
      { name: 'Streamlit', proficiency: 80 },
    ],
  },
];
