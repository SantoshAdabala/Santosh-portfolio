import type { GitHubStats } from '@/types';

export const githubStats: GitHubStats = {
  totalStars: 12,
  totalForks: 3,
  topLanguages: [
    { name: 'Python', percentage: 55 },
    { name: 'Jupyter Notebook', percentage: 25 },
    { name: 'HTML', percentage: 10 },
    { name: 'SQL', percentage: 5 },
    { name: 'Java', percentage: 5 },
  ],
  contributionGraphUrl:
    'https://ghchart.rshah.org/7C3AED/SantoshAdabala',
};
