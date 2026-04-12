'use client';

import type { Certification } from '@/types';

interface Props {
  issuer: Certification['issuerLogo'];
  className?: string;
}

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.01 24.01 0 0 0 0 21.56l7.98-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

function NvidiaLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <rect width="48" height="48" rx="8" fill="#76B900"/>
      <text x="24" y="30" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="system-ui">N</text>
    </svg>
  );
}

function CourseraLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <rect width="48" height="48" rx="8" fill="#0056D2"/>
      <text x="24" y="30" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="system-ui">C</text>
    </svg>
  );
}

function UdemyLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <rect width="48" height="48" rx="8" fill="#A435F0"/>
      <text x="24" y="30" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="system-ui">U</text>
    </svg>
  );
}

function OtherLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <rect width="48" height="48" rx="8" fill="#6B7280"/>
      <text x="24" y="30" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="system-ui">✓</text>
    </svg>
  );
}

function AwsLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <rect width="48" height="48" rx="8" fill="#232F3E"/>
      <path d="M14.5 27.5c0 1.2.4 2.1 1.1 2.7.3.2.6.2.8 0 .2-.2.2-.5 0-.8-.5-.5-.8-1.2-.8-2.1 0-3.5 4.2-6.6 9.4-6.6 3.2 0 6 1 7.8 2.7.2.2.5.2.7 0 .2-.2.2-.5 0-.7-2-2-5.2-3.1-8.5-3.1-5.8 0-10.5 3.5-10.5 7.9z" fill="#FF9900"/>
      <path d="M33.5 29c-.3-.1-.6 0-.7.3-.8 2-2.8 3.2-5.3 3.2-3.8 0-6.5-2.8-6.5-6.5s2.7-6.5 6.5-6.5c2.2 0 4.1 1 5.2 2.6.2.3.5.3.7.1.3-.2.3-.5.1-.7-1.3-1.9-3.5-3.1-6-3.1-4.4 0-7.6 3.2-7.6 7.6s3.2 7.6 7.6 7.6c3 0 5.3-1.5 6.3-3.8.1-.3 0-.6-.3-.7z" fill="#FF9900"/>
      <text x="24" y="30" textAnchor="middle" fill="#FF9900" fontSize="10" fontWeight="bold" fontFamily="system-ui">AWS</text>
    </svg>
  );
}

const logos: Record<Certification['issuerLogo'], (props: { className?: string }) => React.ReactNode> = {
  google: GoogleLogo,
  nvidia: NvidiaLogo,
  coursera: CourseraLogo,
  udemy: UdemyLogo,
  aws: AwsLogo,
  meta: OtherLogo,
  other: OtherLogo,
};

export function IssuerLogo({ issuer, className = 'h-10 w-10' }: Props) {
  const Logo = logos[issuer];
  return <Logo className={className} />;
}
