'use client';

import { useState, useEffect } from 'react';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 6) return 'Burning the midnight oil? ';
  if (hour < 12) return 'Good morning ';
  if (hour < 17) return 'Good afternoon ';
  if (hour < 21) return 'Good evening ';
  return 'Working late? ';
}

function getReferrerGreeting(): string | null {
  if (typeof window === 'undefined') return null;
  const ref = document.referrer.toLowerCase();
  if (ref.includes('linkedin.com')) return 'Welcome from LinkedIn! ';
  if (ref.includes('github.com')) return 'Welcome from GitHub! ';
  if (ref.includes('twitter.com') || ref.includes('x.com')) return 'Welcome from X! ';
  if (ref.includes('google.com')) return 'Found me on Google? ';
  return null;
}

export function TimeGreeting() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const referrerGreeting = getReferrerGreeting();
    setGreeting(referrerGreeting ?? getGreeting());
  }, []);

  if (!greeting) return null;

  return <span className="text-foreground/40">{greeting}</span>;
}
