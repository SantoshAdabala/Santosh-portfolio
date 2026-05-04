'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { SkillConstellation } from '@/components/ui/SkillConstellation';
import { NeuralNetworkBg } from '@/components/ui/NeuralNetworkBg';

export function SkillsSection() {
  return (
    <section id="skills" className="relative px-6 py-24 overflow-hidden">
      <NeuralNetworkBg />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          title="Skills & Expertise"
          subtitle="An interactive constellation of technologies — drag, hover, and filter"
        />
        <SkillConstellation />
      </div>
    </section>
  );
}
