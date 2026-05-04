'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Badge3D } from '@/components/ui/Badge3D';
import { Button } from '@/components/ui/Button';

export default function CardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-20">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed top-1/4 left-1/3 h-96 w-96 rounded-full bg-accent/8 blur-[150px]" />
      <div className="pointer-events-none fixed bottom-1/4 right-1/3 h-64 w-64 rounded-full bg-cyan/6 blur-[120px]" />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h1 className="gradient-text text-3xl font-bold tracking-tight sm:text-4xl">
          Digital Contact Card
        </h1>
        <p className="text-sm text-foreground/40 max-w-md text-center">
          Hover to interact • Drag to rotate • Download to save
        </p>

        <Badge3D
          imageSrc="/images/contact-card.png"
          imageAlt="Santosh Adabala — Digital Contact Card"
          className="mt-4"
        />

        <Button
          variant="ghost"
          href="/#contact"
          className="mt-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Portfolio
        </Button>
      </motion.div>
    </div>
  );
}
