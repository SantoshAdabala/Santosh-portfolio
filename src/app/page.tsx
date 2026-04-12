import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { PublicationsSection } from '@/components/sections/PublicationsSection';
import { CertificationsSection } from '@/components/sections/CertificationsSection';
import { GitHubStatsSection } from '@/components/sections/GitHubStatsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { AppleReveal } from '@/components/ui/AppleReveal';

function Divider() {
  return <div className="section-divider mx-auto max-w-4xl" />;
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <Divider />
      <AppleReveal><AboutSection /></AppleReveal>
      <Divider />
      <AppleReveal><SkillsSection /></AppleReveal>
      <Divider />
      <AppleReveal><ProjectsSection /></AppleReveal>
      <Divider />
      <AppleReveal><ExperienceSection /></AppleReveal>
      <Divider />
      <AppleReveal><PublicationsSection /></AppleReveal>
      <Divider />
      <AppleReveal><CertificationsSection /></AppleReveal>
      <Divider />
      <AppleReveal><GitHubStatsSection /></AppleReveal>
      <Divider />
      <AppleReveal><ContactSection /></AppleReveal>
    </>
  );
}
