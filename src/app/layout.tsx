import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from 'next-themes';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { EasterEgg } from '@/components/ui/EasterEgg';
import { AIParticleSimulator } from '@/components/ui/AIParticleSimulator';
import { MagneticCursor } from '@/components/ui/MagneticCursor';
import { CursorTrail } from '@/components/ui/CursorTrail';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import { FluidMotion } from '@/components/ui/FluidMotion';
import { FloatingResume } from '@/components/ui/FloatingResume';
import { siteConfig } from '@/data/site-config';
import './globals.css';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.name,
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Santosh Adabala — ML Engineer Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/og-image.svg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Siva Naga Santosh Adabala',
  jobTitle: 'Machine Learning Engineer',
  description: siteConfig.description,
  url: 'https://santoshadabala.com',
  sameAs: [
    siteConfig.linkedIn,
    siteConfig.github,
  ],
  knowsAbout: [
    'Machine Learning', 'LLM Fine-Tuning', 'Knowledge Distillation',
    'PyTorch', 'NLP', 'Distributed ML', 'MLOps', 'Agentic AI',
  ],
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'University of Colorado Boulder',
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'Jawaharlal Nehru Technological University, Kakinada',
    },
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Blue Cross Blue Shield Association',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="noise-overlay">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SmoothScroll />
          <ScrollProgress />
          <MagneticCursor />
          <CursorTrail />
          <AIParticleSimulator />
          <header>
            <Navbar />
          </header>
          <FluidMotion>
            <main>{children}</main>
          </FluidMotion>
          <FloatingResume />
          <footer>
            <Footer />
          </footer>
          <EasterEgg />
        </ThemeProvider>
      </body>
    </html>
  );
}
