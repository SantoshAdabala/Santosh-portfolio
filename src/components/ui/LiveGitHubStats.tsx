'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, BookOpen } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { githubStats as fallbackStats } from '@/data/github-stats';

interface GitHubData {
  totalStars: number;
  totalForks: number;
  publicRepos: number;
}

export function LiveGitHubStats() {
  const [stats, setStats] = useState<GitHubData>({
    totalStars: fallbackStats.totalStars,
    totalForks: fallbackStats.totalForks,
    publicRepos: 0,
  });
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch user profile
        const userRes = await fetch('https://api.github.com/users/SantoshAdabala');
        if (!userRes.ok) return;
        const user = await userRes.json();

        // Fetch repos for stars/forks
        const reposRes = await fetch('https://api.github.com/users/SantoshAdabala/repos?per_page=100&sort=updated');
        if (!reposRes.ok) return;
        const repos = await reposRes.json();

        let totalStars = 0;
        let totalForks = 0;
        for (const repo of repos) {
          totalStars += repo.stargazers_count ?? 0;
          totalForks += repo.forks_count ?? 0;
        }

        setStats({
          totalStars,
          totalForks,
          publicRepos: user.public_repos ?? 0,
        });
        setIsLive(true);
      } catch {
        // Keep fallback stats
      }
    }

    fetchStats();
  }, []);

  const items = [
    { icon: Star, value: stats.totalStars, label: 'Stars', color: 'rgba(139, 92, 246, 0.12)' },
    { icon: GitFork, value: stats.totalForks, label: 'Forks', color: 'rgba(6, 182, 212, 0.12)' },
    { icon: BookOpen, value: stats.publicRepos, label: 'Repos', color: 'rgba(167, 139, 250, 0.12)' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 100, damping: 15 }}
        >
          <SpotlightCard className="rounded-xl border border-border/40 bg-background/50" spotlightColor={item.color}>
            <div className="flex flex-col items-center p-6">
              <item.icon className="mb-2 h-5 w-5 text-accent" />
              <motion.span
                className="text-3xl font-bold gradient-text"
                key={item.value}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {item.value}
              </motion.span>
              <span className="mt-1 text-xs text-foreground/50">{item.label}</span>
            </div>
          </SpotlightCard>
        </motion.div>
      ))}
      {isLive && (
        <div className="col-span-3 text-center">
          <span className="inline-flex items-center gap-1.5 text-[10px] text-foreground/30">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Live from GitHub API
          </span>
        </div>
      )}
    </div>
  );
}
