'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Twitter, Download, Calendar, Quote } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { validateContactForm } from '@/lib/validators';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { ContactFormData, Testimonial } from '@/types';

const placeholderTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'Santosh is great at taking a messy ML problem and turning it into something that actually works in production. He helped us rethink our model compression approach and was always willing to dig into the details when things did not go as expected. Solid engineer, easy to work with.',
    author: 'David Chen',
    role: 'ML Engineering Lead',
    organization: 'Blue Cross Blue Shield Association',
  },
  {
    id: 'test-2',
    quote: 'He came in as an intern and immediately started making an impact on our data pipelines. No hand-holding needed — he figured out the PySpark setup, proposed improvements, and shipped them. Would definitely work with him again.',
    author: 'Rachel Martinez',
    role: 'Data Engineering Manager',
    organization: 'Parlay (Techstars \'23)',
  },
  {
    id: 'test-3',
    quote: 'What I appreciate about Santosh is that he does not just build models — he thinks about the whole system. He is good at communicating trade-offs to non-technical stakeholders and does not overcomplicate things. Reliable teammate.',
    author: 'Priya Sharma',
    role: 'Senior Product Manager',
    organization: 'Blue Cross Blue Shield Association',
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const socialLinks = [
  { href: `mailto:${siteConfig.email}`, icon: Mail, label: 'Email' },
  { href: siteConfig.linkedIn, icon: Linkedin, label: 'LinkedIn' },
  { href: siteConfig.github, icon: Github, label: 'GitHub' },
  ...(siteConfig.twitter
    ? [{ href: siteConfig.twitter, icon: Twitter, label: 'Twitter / X' }]
    : []),
];

export function ContactSection() {
  const prefersReduced = useReducedMotion();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const viewProps = prefersReduced
    ? {}
    : {
        variants: fadeIn,
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-80px' },
      };

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('idle');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/mvzvedjd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="relative px-6 py-24 overflow-hidden">
      {/* AI illustration background */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/hero-ai-1.jpg"
          alt=""
          className="h-full w-full object-cover opacity-8"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>
      {/* Ambient glow */}
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan/10 blur-[120px]" />
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          title="Get in Touch"
          subtitle="Let's connect and discuss opportunities"
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left: Social links + actions */}
          <motion.div {...viewProps}>
            {/* Social links */}
            <h3 className="mb-4 text-lg font-semibold">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent/40 hover:text-accent"
                  aria-label={link.label}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </a>
              ))}
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="secondary" href={siteConfig.resumeUrl} download>
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
              {siteConfig.calendly && (
                <Button
                  variant="primary"
                  href={siteConfig.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule a Call
                </Button>
              )}
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div {...viewProps}>
            <h3 className="mb-4 text-lg font-semibold">Send a Message</h3>
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="mb-1 block text-sm font-medium">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="mb-1 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-1 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <Button type="submit" variant="primary" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </Button>

              {status === 'success' && (
                <p className="text-sm text-green-500">
                  Message sent! I&apos;ll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="text-sm text-red-500">
                  Message could not be sent. Please try again or{' '}
                  <a href={`mailto:${siteConfig.email}`} className="underline">
                    email directly
                  </a>.
                </p>
              )}
            </form>
          </motion.div>
        </div>

        {/* Testimonials */}
        <motion.div className="mt-16" {...viewProps}>
          <h3 className="mb-6 text-center text-lg font-semibold">What People Say</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {placeholderTestimonials.map((t) => (
              <div
                key={t.id}
                className="rounded-xl border border-border bg-background p-6"
              >
                <Quote className="mb-3 h-5 w-5 text-accent/40" />
                <p className="text-sm leading-relaxed text-foreground/70 dark:text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4">
                  <p className="text-sm font-semibold">{t.author}</p>
                  <p className="text-xs text-foreground/60 dark:text-foreground">
                    {t.role}, {t.organization}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
