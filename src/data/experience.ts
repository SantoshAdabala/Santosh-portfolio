import type { ExperienceEntry } from '@/types';

export const experience: ExperienceEntry[] = [
  {
    id: 'exp-bcbs',
    dateRange: 'Aug 2024 – Present',
    role: 'Machine Learning Engineer',
    organization: 'Blue Cross Blue Shield of Colorado',
    description:
      'Used ClinicalBERT, Python, and Scikit-learn to analyze clinical notes, claims narratives, and prior authorization text, helping medical review teams find relevant clinical patterns faster. Built Python and SQL-based models to prioritize high-risk claims, predict likely denials, and surface high-cost cases. Built HIPAA-compliant data pipelines with Azure Data Factory, Azure Synapse, and Python to process claims from 6+ payer systems, reducing manual data preparation by 30%. Developed Power BI dashboards to track denial rates, turnaround time, and provider performance.',
    type: 'work',
  },
  {
    id: 'exp-parlay',
    dateRange: 'May 2023 – Aug 2023',
    role: 'Data Science Intern',
    organization: 'Parlay (Techstars \'23)',
    description:
      'Engineered PySpark data lake architecture on AWS S3 with Apache Hudi, achieving 40% reduction in batch processing time for 500K+ daily records. Automated data ingestion and transformation pipelines using Python multiprocessing and SQLAlchemy. Designed REST APIs to standardize internal data access, reducing integration time for new data sources by 60%.',
    type: 'work',
  },
  {
    id: 'exp-accenture',
    dateRange: 'Jul 2019 – Aug 2022',
    role: 'Machine Learning Engineer',
    organization: 'Accenture – Sun Life Insurance Client',
    description:
      'Built predictive models with Random Forest, XGBoost, and Scikit-learn to analyze insurance claims, policyholder behavior, and risk patterns. Developed anomaly detection logic to flag suspicious billing activity and high-risk policy behavior. Prepared ML-ready datasets using Azure Data Factory, Azure Synapse, PySpark, and Python, improving ingestion throughput by 50% and reducing reporting costs by 31%. Deployed Azure Databricks pipelines with data quality checks, logging, and SLA monitoring.',
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
