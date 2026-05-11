export interface TabConfig {
  id: string;
  label: string;
  icon: string; // Lucide icon name
  description: string;
}

export const COPILOT_TABS: TabConfig[] = [
  { id: 'ats', label: 'ATS Score', icon: 'Gauge', description: 'ATS compatibility score' },
  { id: 'skills', label: 'Skills', icon: 'Layers', description: 'Skill gap analysis' },
  { id: 'bullets', label: 'Bullets', icon: 'PenLine', description: 'Rewritten bullet points' },
  { id: 'recruiter', label: 'Recruiter', icon: 'UserCheck', description: 'Recruiter perspective' },
  { id: 'star', label: 'STAR', icon: 'Star', description: 'STAR-format answers' },
  { id: 'keywords', label: 'Keywords', icon: 'Key', description: 'Missing keywords' },
  { id: 'tailoring', label: 'Tailoring', icon: 'Scissors', description: 'Role-specific suggestions' },
  { id: 'pitch', label: 'Pitch', icon: 'Megaphone', description: 'Candidate pitch' },
  { id: 'questions', label: 'Questions', icon: 'HelpCircle', description: 'Interview questions' },
  { id: 'cover', label: 'Cover Letter', icon: 'Mail', description: 'Generated cover letter' },
];
