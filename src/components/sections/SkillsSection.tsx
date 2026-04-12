'use client';

import { motion } from 'framer-motion';
import { Code, Brain, Container, MessageSquare, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { skillCategories } from '@/data/skills';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SkillBar } from '@/components/ui/SkillBar';
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, i) => {
            const Icon = iconMap[category.icon] ?? Code;
            return (
              <motion.div
                key={category.title}
                className="glass rounded-2xl p-6 transition-all duration-300 hover:glow-purple hover:scale-[1.01]"
                {...(prefersReduced
                  ? {}
                  : {
                      variants: cardVariants,
                      initial: 'hidden',
                      whileInView: 'visible',
                      viewport: { once: true, margin: '-50px' },
                      transition: { delay: i * 0.1, duration: 0.5 },
                    })}
              >
                <div className="mb-4 flex items-center gap-2">
                  <Icon className="h-5 w-5 text-cyan" />
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
