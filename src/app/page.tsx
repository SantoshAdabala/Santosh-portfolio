import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection';
import { ImpactDashboardSection } from '@/components/sections/ImpactDashboardSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { PublicationsSection } from '@/components/sections/PublicationsSection';
import { CertificationsSection } from '@/components/sections/CertificationsSection';
import { GitHubStatsSection } from '@/components/sections/GitHubStatsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { AppleReveal } from '@/components/ui/AppleReveal';
import { TechMarquee } from '@/components/ui/TechMarquee';
import { AnimatedDivider } from '@/components/ui/AnimatedDivider';

export default function Home() {
  return (
    <>
      <HeroSection />
      <TechMarquee />
      <AnimatedDivider />
      <AppleReveal><AboutSection /></AppleReveal>
      <AnimatedDivider />
      <AppleReveal><SkillsSection /></AppleReveal>
      <AnimatedDivider />
      <AppleReveal><ProjectsSection /></AppleReveal>
      <AnimatedDivider />
      <AppleReveal><CaseStudiesSection /></AppleReveal>
      <AnimatedDivider />
      <AppleReveal><ImpactDashboardSection /></AppleReveal>
      <AnimatedDivider />
      <AppleReveal><ExperienceSection /></AppleReveal>
      <AnimatedDivider />
      <AppleReveal><PublicationsSection /></AppleReveal>
      <AnimatedDivider />
      <AppleReveal><CertificationsSection /></AppleReveal>
      <AnimatedDivider />
      <AppleReveal><GitHubStatsSection /></AppleReveal>
      <AnimatedDivider />
      <AppleReveal><ContactSection /></AppleReveal>
    </>
  );
}
