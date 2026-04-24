import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'wisdom-vault',
    title: 'Wisdom Vault — The Inheritable Agent',
    description:
      'An AI-powered inheritance system that lets a parent\'s decision patterns be inherited through cryptographically scoped tokens via Auth0 Token Vault. Uses Claude for wisdom extraction and multi-generational delegation with 2-of-3 trustee multi-sig.',
    techStack: ['Python', 'Flask', 'Auth0', 'Claude API', 'JWT', 'RSA'],
    githubUrl: 'https://github.com/SantoshAdabala/TheInheritableAgent',
    category: 'llm',
  },
  {
    id: 'parenting-agent',
    title: 'Agentic AI Parenting Assistant',
    description:
      'An AI-driven modular Parenting Agent built with Google\'s Agent Development Kit (ADK) and FatSecret integration. Features specialized sub-agents for parenting advice, nutrition meal planning, and basic medical guidance with stateful sessions.',
    techStack: ['Python', 'Google ADK', 'FatSecret API', 'LangChain', 'Agentic AI'],
    githubUrl: 'https://github.com/SantoshAdabala/Agentic_AI_Parenting',
    category: 'rag',
  },
  {
    id: 'clinical-nlp',
    title: 'Clinical NLP — Healthcare NER Pipeline',
    description:
      'End-to-end ML engineering project for clinical Named Entity Recognition. Distilled Bio_ClinicalBERT (110M) into DistilClinicalBERT (65M) retaining 93.2% F1, achieving 3.5x faster inference (39ms→11ms) and 6.6x model compression (411MB→62.6MB). Built distributed processing on AWS EMR handling 900K records in 3.5 minutes at 4,350 docs/sec, with weak labeling over 7K PubMed abstracts generating 19.5K entities.',
    techStack: ['PyTorch', 'HuggingFace', 'ONNX Runtime', 'PySpark', 'AWS EMR', 'FastAPI', 'Prometheus', 'Terraform'],
    githubUrl: 'https://github.com/SantoshAdabala/clinical-nlp-optimization',
    metrics: '93.2% F1 retention · 3.5x faster · 6.6x smaller',
    category: 'ner',
  },
  {
    id: 'cold-email-gen',
    title: 'Cold Email Generator',
    description:
      'A cold email generator for service companies built with Groq, LangChain, and Streamlit. Extracts job listings from career pages and crafts personalized emails with relevant portfolio links from a vector database.',
    techStack: ['Groq', 'LangChain', 'Streamlit', 'ChromaDB', 'Python'],
    githubUrl: 'https://github.com/SantoshAdabala/ColdEmailGenerator',
    category: 'llm',
  },
  {
    id: 'semeval-2024',
    title: 'SemEval-2024 Task 8a — AI Text Detection',
    description:
      'Research project for SemEval-2024 on detecting machine-generated text. Experimented with DistilBERT, DeBERTa, RoBERTa, and ALBERT on 119K+ samples. DeBERTa tokenizer + RoBERTa model achieved best results.',
    techStack: ['PyTorch', 'HuggingFace', 'DeBERTa', 'RoBERTa', 'NLP'],
    githubUrl: 'https://github.com/devyanisri/Semeval2024Task8a',
    metrics: 'Binary classification on 119K+ texts',
    category: 'transformer',
  },
  {
    id: 'space-analytics',
    title: 'Space Data Analytics Dashboard',
    description:
      'Comprehensive analytics project covering 4,630+ space missions from 1957–2022. Features interactive Power BI dashboards analyzing launch trends, mission success rates, rocket usage, and global cooperation patterns.',
    techStack: ['Power BI', 'DAX', 'Python', 'Data Modeling'],
    githubUrl: 'https://github.com/SantoshAdabala/SpaceAnalytics',
    category: 'mlops',
  },
  {
    id: 'phi-pii-parser',
    title: 'PHI/PII Parser — FHIR Data Redaction',
    description:
      'A service that reads HL7 FHIR Bundle JSON files from AWS S3, detects and redacts PII/PHI fields using key-name matching and regex patterns, and outputs cleaned CSVs. Supports both FastAPI local deployment and serverless AWS Lambda with automatic S3 triggers.',
    techStack: ['Python', 'FastAPI', 'AWS Lambda', 'S3', 'Docker', 'Pydantic'],
    githubUrl: 'https://github.com/SantoshAdabala/PHI-PII-Parser-from-AWS',
    metrics: 'Redacts 10+ FHIR resource types across PII/PHI fields',
    category: 'mlops',
  },
  {
    id: 'data-center-computing',
    title: 'Data-Center Scale Computing',
    description:
      'Projects focused on distributed computing at data-center scale, implementing scalable data processing pipelines and cloud-native architectures for large-scale ML workloads.',
    techStack: ['Python', 'PySpark', 'AWS', 'Distributed Systems'],
    githubUrl: 'https://github.com/SantoshAdabala/Data-Center-Scale-Computing',
    category: 'mlops',
  },
];
