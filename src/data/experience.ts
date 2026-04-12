import type { ExperienceEntry } from '@/types';

export const experience: ExperienceEntry[] = [
  {
    id: 'exp-bcbs',
    dateRange: 'Aug 2023 – Present',
    role: 'Machine Learning Engineer',
    organization: 'Blue Cross Blue Shield Association',
    description:
      'Designed LLM fine-tuning and distillation pipelines using PyTorch and HuggingFace, compressing models from 175M to 45M parameters at 90% accuracy. Built distributed ML pipelines processing 10M+ monthly records. Achieved 3x inference speedup via structured pruning and INT8 quantization. Developed agentic AI workflows with LangChain reducing manual intervention by 25%. Implemented anomaly detection flagging $2M+ in potential fraud.',
    type: 'work',
  },
  {
    id: 'exp-parlay',
    dateRange: 'May 2023 – Aug 2023',
    role: 'Data Science Intern',
    organization: 'Parlay (Techstars \'23)',
    description:
      'Engineered PySpark data lake architecture on AWS S3 with Apache Hudi, achieving 40% reduction in batch processing time for 500K+ daily records. Automated ETL pipelines using Python multiprocessing and SQLAlchemy. Designed REST APIs reducing integration time for new data sources by 60%.',
    type: 'work',
  },
  {
    id: 'exp-accenture-swe',
    dateRange: 'Mar 2021 – Aug 2022',
    role: 'Software Engineer / ML Engineer',
    organization: 'Accenture',
    description:
      'Rebuilt ML training and data ingestion pipelines using BigQuery, Spark, Hadoop, and Databricks, improving throughput by 50%. Deployed distributed ML pipelines processing 100+ TB of financial data. Developed predictive analytics models improving forecast accuracy by 18%. Led Oracle-to-PostgreSQL migration with zero downtime.',
    type: 'work',
  },
  {
    id: 'exp-accenture-analyst',
    dateRange: 'Jun 2020 – Mar 2021',
    role: 'Application Development Analyst',
    organization: 'Accenture',
    description:
      'Built enterprise data applications using SQL and Python for Fortune 500 clients in healthcare and financial services. Implemented automated testing frameworks reducing deployment errors by 15%.',
    type: 'work',
  },
  {
    id: 'exp-accenture-assoc',
    dateRange: 'Jul 2019 – Jun 2020',
    role: 'Associate Application Developer',
    organization: 'Accenture',
    description:
      'Developed backend systems and database solutions using SQL and Java, contributing to 3 major client deliverables.',
    type: 'work',
  },
  {
    id: 'exp-hackathon',
    dateRange: '2023',
    role: '2023 DataScience Hackathon',
    organization: 'Hackathon Award',
    description:
      'Recognized for building innovative data science solutions. Also received Extra Mile Awards in both team and individual categories at Accenture.',
    type: 'competition',
  },
];
