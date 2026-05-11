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
import { TechMarquee } from '@/components/ui/TechMarquee';
import { AnimatedDivider } from '@/components/ui/AnimatedDivider';

export default function Home() {
  return (
    <>
      {/* Act 1: Introduction — dramatic, cinematic */}
      <HeroSection />
      <TechMarquee />
      <AnimatedDivider />

      {/* Act 2: Who I am — gentle, let content breathe */}
      <AppleReveal variant="gentle"><AboutSection /></AppleReveal>
      <AnimatedDivider />

      {/* Act 3: What I know — default pace */}
      <AppleReveal><SkillsSection /></AppleReveal>
      <AnimatedDivider />

      {/* Act 4: What I've built — dramatic, showcase work */}
      <AppleReveal variant="dramatic"><ProjectsSection /></AppleReveal>
      <AnimatedDivider />

      {/* Act 5: Where I've been — gentle, professional */}
      <AppleReveal variant="gentle" delay={0.1}><ExperienceSection /></AppleReveal>
      <AnimatedDivider />

      {/* Act 6: Thought leadership — default */}
      <AppleReveal delay={0.05}><PublicationsSection /></AppleReveal>
      <AnimatedDivider />

      {/* Act 7: Credentials — gentle, understated */}
      <AppleReveal variant="gentle"><CertificationsSection /></AppleReveal>
      <AnimatedDivider />

      {/* Act 8: Activity proof — default */}
      <AppleReveal><GitHubStatsSection /></AppleReveal>
      <AnimatedDivider />

      {/* Act 9: Call to action — dramatic close */}
      <AppleReveal variant="dramatic"><ContactSection /></AppleReveal>
    </>
  );
}
