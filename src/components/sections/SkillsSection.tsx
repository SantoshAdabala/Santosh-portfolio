'use client';

import { motion } from 'framer-motion';
import { Code, Brain, Container, MessageSquare, BarChart3 } from 'lucide-react';
import { skillCategories } from '@/data/skills';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SkillBar } from '@/components/ui/SkillBar';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { NeuralNetworkBg } from '@/components/ui/NeuralNetworkBg';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Code,
  Brain,
  Container,
  MessageSquare,
  BarChart3,
};

const spotlightColors = [
  'rgba(139, 92, 246, 0.12)',
  'rgba(6, 182, 212, 0.12)',
  'rgba(167, 139, 250, 0.12)',
  'rgba(34, 211, 238, 0.12)',
  'rgba(139, 92, 246, 0.12)',
];

export function SkillsSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="skills" className="relative px-6 py-24 overflow-hidden">
      <NeuralNetworkBg />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          title="Skills & Expertise"
          subtitle="Technologies and tools I work with"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, i) => {
            const Icon = iconMap[category.icon] ?? Code;
            return (
              <motion.div
                key={category.title}
                {...(prefersReduced
                  ? {}
                  : {
                      initial: { opacity: 0, y: 40, filter: 'blur(6px)' },
                      whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
                      viewport: { once: true, margin: '-50px' },
                      transition: { delay: i * 0.08, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
                    })}
              >
                <SpotlightCard
                  className="glass rounded-2xl hover-lift h-full"
                  spotlightColor={spotlightColors[i % spotlightColors.length]}
                >
                  <div className="p-6">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
                        <Icon className="h-5 w-5 text-cyan" />
                      </div>
                      <h3 className="text-lg font-semibold">{category.title}</h3>
                    </div>
                    <div className="space-y-3">
                      {category.skills.map((skill) => (
                        <SkillBar
                          key={skill.name}
                          name={skill.name}
                          proficiency={skill.proficiency}
                        />
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
