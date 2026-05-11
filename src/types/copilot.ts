export interface ATSScore {
  score: number; // 0-100
  factors: {
    keywordDensity: number; // 0-100
    formatCompatibility: number; // 0-100
    sectionCompleteness: number; // 0-100
  };
}

export interface SkillMatch {
  skill: string;
  status: 'matched' | 'partial' | 'missing';
  priority?: 'high' | 'medium' | 'low'; // for missing/partial
  gap?: string; // explanation for partial matches
}

export interface SkillAnalysis {
  matched: SkillMatch[];
  partial: SkillMatch[];
  missing: SkillMatch[];
}

export interface BulletRewrite {
  original: string;
  rewritten: string;
  reasoning: string;
}

export interface RecruiterFeedback {
  firstImpression: string;
  strengths: string;
  concerns: string;
  recommendation: 'strong_yes' | 'yes' | 'maybe' | 'no';
  justification: string;
}

export interface STARAnswer {
  question: string;
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface KeywordItem {
  keyword: string;
  category: 'technical' | 'soft_skill' | 'tool' | 'domain';
  suggestion: string; // where to incorporate
}

export interface KeywordAnalysis {
  missing: KeywordItem[];
}

export interface TailoringSuggestion {
  suggestion: string;
  impact: 'high' | 'medium' | 'low';
  section: string; // which resume section to modify
}

export interface InterviewQuestion {
  question: string;
  category: 'technical' | 'behavioral' | 'situational' | 'role_specific';
  assessmentNote: string; // what interviewer is looking for
}

export interface CopilotAnalysis {
  atsScore: ATSScore;
  skills: SkillAnalysis;
  bulletRewrites: BulletRewrite[];
  recruiterFeedback: RecruiterFeedback;
  starAnswers: STARAnswer[];
  keywords: KeywordAnalysis;
  tailoring: TailoringSuggestion[];
  pitch: string;
  interviewQuestions: InterviewQuestion[];
  coverLetter: string;
  locationWarning?: string | null;
}

export interface CopilotState {
  status: 'idle' | 'loading' | 'success' | 'error';
  result: CopilotAnalysis | null;
  error: string | null;
  activeTab: string; // tab id
  loadingStartTime: number | null; // for elapsed time display
}
