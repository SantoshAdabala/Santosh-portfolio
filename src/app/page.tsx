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
      {/* ═══ ACT 1: INTRODUCTION — Hero + Tech Marquee flow together ═══ */}
      <HeroSection />
      <TechMarquee />

      {/* ═══ ACT 2: IDENTITY — About + Skills, gentle reveals ═══ */}
      <div className="mt-24 sm:mt-32">
        <AnimatedDivider />
        <AppleReveal variant="gentle"><AboutSection /></AppleReveal>
        <div className="mt-12 sm:mt-16">
          <AppleReveal><SkillsSection /></AppleReveal>
        </div>
      </div>

      {/* ═══ ACT 3: PROOF — Projects + Experience, dramatic showcase ═══ */}
      <div className="mt-24 sm:mt-32">
        <AnimatedDivider />
        <AppleReveal variant="dramatic"><ProjectsSection /></AppleReveal>
        <div className="mt-12 sm:mt-16">
          <AppleReveal variant="gentle" delay={0.1}><ExperienceSection /></AppleReveal>
        </div>
      </div>

      {/* ═══ ACT 4: CREDIBILITY — Publications + Certs + GitHub, understated ═══ */}
      <div className="mt-24 sm:mt-32">
        <AnimatedDivider />
        <AppleReveal delay={0.05}><PublicationsSection /></AppleReveal>
        <div className="mt-12 sm:mt-16">
          <AppleReveal variant="gentle"><CertificationsSection /></AppleReveal>
        </div>
        <div className="mt-12 sm:mt-16">
          <AppleReveal><GitHubStatsSection /></AppleReveal>
        </div>
      </div>

      {/* ═══ ACT 5: CONNECTION — Dramatic close ═══ */}
      <div className="mt-24 sm:mt-32">
        <AnimatedDivider />
        <AppleReveal variant="dramatic"><ContactSection /></AppleReveal>
      </div>
    </>
  );
}
