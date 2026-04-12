'use client';

import React from 'react';
import type { Project } from '@/types';

interface Props {
  category: Project['category'];
}

function LLMIllustration() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className="h-full w-full">
      {/* Neural network layers */}
      {[40, 80, 120, 160].map((x, li) => (
        <g key={x}>
          {[25, 45, 65, 85, 105].slice(0, li === 0 || li === 3 ? 3 : 5).map((y, ni) => {
            const cy = li === 0 || li === 3 ? y + 20 : y;
            return (
              <circle key={`${x}-${y}`} cx={x} cy={cy} r={5} fill={`rgba(139,92,246,${0.3 + ni * 0.12})`} stroke="rgba(139,92,246,0.5)" strokeWidth={1} />
            );
          })}
        </g>
      ))}
      {/* Connections */}
      {[40, 80, 120].map((x1, li) => {
        const x2 = [80, 120, 160][li];
        return Array.from({ length: 8 }, (_, i) => (
          <line key={`l-${li}-${i}`} x1={x1} y1={30 + (i % 3) * 20 + (li === 0 ? 20 : 0)} x2={x2} y2={25 + (i % 5) * 20} stroke="rgba(139,92,246,0.15)" strokeWidth={0.5} />
        ));
      })}
      {/* Label */}
      <text x="100" y="115" textAnchor="middle" fill="rgba(139,92,246,0.6)" fontSize="8" fontFamily="monospace">LLM Architecture</text>
    </svg>
  );
}

function RAGIllustration() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className="h-full w-full">
      {/* Document stack */}
      {[0, 4, 8].map((offset) => (
        <rect key={offset} x={20 + offset} y={20 + offset} width={40} height={55} rx={3} fill="none" stroke="rgba(6,182,212,0.3)" strokeWidth={1} />
      ))}
      {/* Arrow to vector DB */}
      <line x1="72" y1="50" x2="95" y2="50" stroke="rgba(6,182,212,0.4)" strokeWidth={1.5} markerEnd="url(#arrowCyan)" />
      {/* Vector DB cylinder */}
      <ellipse cx="120" cy="35" rx={18} ry={6} fill="none" stroke="rgba(6,182,212,0.5)" strokeWidth={1} />
      <line x1="102" y1="35" x2="102" y2="65" stroke="rgba(6,182,212,0.5)" strokeWidth={1} />
      <line x1="138" y1="35" x2="138" y2="65" stroke="rgba(6,182,212,0.5)" strokeWidth={1} />
      <ellipse cx="120" cy="65" rx={18} ry={6} fill="none" stroke="rgba(6,182,212,0.5)" strokeWidth={1} />
      {/* Arrow to LLM */}
      <line x1="140" y1="50" x2="158" y2="50" stroke="rgba(139,92,246,0.4)" strokeWidth={1.5} />
      {/* LLM box */}
      <rect x="160" y="30" width={30} height={40} rx={4} fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.4)" strokeWidth={1} />
      <text x="175" y="54" textAnchor="middle" fill="rgba(139,92,246,0.7)" fontSize="7" fontFamily="monospace">LLM</text>
      {/* Dots in documents */}
      {[30, 38, 46].map((y) => (
        <line key={y} x1="30" y1={y} x2="50" y2={y} stroke="rgba(6,182,212,0.2)" strokeWidth={2} />
      ))}
      <text x="100" y="112" textAnchor="middle" fill="rgba(6,182,212,0.6)" fontSize="8" fontFamily="monospace">RAG Pipeline</text>
      <defs>
        <marker id="arrowCyan" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
          <path d="M0,0 L6,2 L0,4" fill="rgba(6,182,212,0.5)" />
        </marker>
      </defs>
    </svg>
  );
}

function TransformerIllustration() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className="h-full w-full">
      {/* Attention heads */}
      {[60, 100, 140].map((cx, i) => (
        <g key={cx}>
          <circle cx={cx} cy={35} r={12} fill="none" stroke={`rgba(245,158,11,${0.3 + i * 0.15})`} strokeWidth={1} />
          <text x={cx} y={38} textAnchor="middle" fill={`rgba(245,158,11,${0.5 + i * 0.15})`} fontSize="6" fontFamily="monospace">Q·K</text>
        </g>
      ))}
      {/* Feed forward */}
      <rect x="55" y="60" width={90} height={20} rx={4} fill="rgba(245,158,11,0.1)" stroke="rgba(245,158,11,0.3)" strokeWidth={1} />
      <text x="100" y="73" textAnchor="middle" fill="rgba(245,158,11,0.6)" fontSize="7" fontFamily="monospace">Feed Forward</text>
      {/* Connections */}
      {[60, 100, 140].map((cx) => (
        <line key={cx} x1={cx} y1={47} x2={cx} y2={60} stroke="rgba(245,158,11,0.2)" strokeWidth={1} />
      ))}
      {/* Output */}
      <rect x="70" y="90" width={60} height={15} rx={3} fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.25)" strokeWidth={1} />
      <text x="100" y="100" textAnchor="middle" fill="rgba(245,158,11,0.5)" fontSize="6" fontFamily="monospace">Softmax Output</text>
      <line x1="100" y1="80" x2="100" y2="90" stroke="rgba(245,158,11,0.2)" strokeWidth={1} />
      <text x="100" y="115" textAnchor="middle" fill="rgba(245,158,11,0.6)" fontSize="8" fontFamily="monospace">Transformer Block</text>
    </svg>
  );
}

function MLOpsIllustration() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className="h-full w-full">
      {/* Pipeline stages */}
      {['Data', 'Train', 'Eval', 'Deploy'].map((label, i) => {
        const x = 25 + i * 45;
        return (
          <g key={label}>
            <rect x={x} y={35} width={35} height={30} rx={4} fill={`rgba(59,130,246,${0.08 + i * 0.04})`} stroke={`rgba(59,130,246,${0.3 + i * 0.1})`} strokeWidth={1} />
            <text x={x + 17.5} y={54} textAnchor="middle" fill={`rgba(59,130,246,${0.5 + i * 0.1})`} fontSize="7" fontFamily="monospace">{label}</text>
            {i < 3 && <line x1={x + 35} y1={50} x2={x + 45} y2={50} stroke="rgba(59,130,246,0.3)" strokeWidth={1} />}
          </g>
        );
      })}
      {/* Monitoring loop */}
      <path d="M 175 65 Q 185 90 100 95 Q 15 90 25 65" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth={1} strokeDasharray="4 3" />
      <text x="100" y="92" textAnchor="middle" fill="rgba(59,130,246,0.4)" fontSize="6" fontFamily="monospace">monitoring & feedback</text>
      <text x="100" y="115" textAnchor="middle" fill="rgba(59,130,246,0.6)" fontSize="8" fontFamily="monospace">MLOps Pipeline</text>
    </svg>
  );
}

function SentimentIllustration() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className="h-full w-full">
      {/* Text input */}
      {[25, 35, 45].map((y) => (
        <line key={y} x1="20" y1={y} x2={50 + Math.random() * 20} y2={y} stroke="rgba(236,72,153,0.2)" strokeWidth={3} strokeLinecap="round" />
      ))}
      {/* Arrow */}
      <line x1="80" y1="40" x2="100" y2="40" stroke="rgba(236,72,153,0.3)" strokeWidth={1.5} />
      {/* Model box */}
      <rect x="105" y="25" width={40} height={30} rx={4} fill="rgba(236,72,153,0.1)" stroke="rgba(236,72,153,0.3)" strokeWidth={1} />
      <text x="125" y="43" textAnchor="middle" fill="rgba(236,72,153,0.6)" fontSize="7" fontFamily="monospace">XLM-R</text>
      {/* Output bars */}
      <rect x="160" y="25" width={25} height={8} rx={2} fill="rgba(34,197,94,0.3)" />
      <text x="172" y="32" textAnchor="middle" fill="rgba(34,197,94,0.6)" fontSize="5" fontFamily="monospace">POS</text>
      <rect x="160" y="37" width={15} height={8} rx={2} fill="rgba(250,204,21,0.3)" />
      <text x="167" y="44" textAnchor="middle" fill="rgba(250,204,21,0.6)" fontSize="5" fontFamily="monospace">NEU</text>
      <rect x="160" y="49" width={10} height={8} rx={2} fill="rgba(239,68,68,0.3)" />
      <text x="165" y="56" textAnchor="middle" fill="rgba(239,68,68,0.6)" fontSize="5" fontFamily="monospace">NEG</text>
      <text x="100" y="112" textAnchor="middle" fill="rgba(236,72,153,0.6)" fontSize="8" fontFamily="monospace">Sentiment Analysis</text>
    </svg>
  );
}

function NERIllustration() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className="h-full w-full">
      {/* Text with entity highlights */}
      <text x="20" y="40" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">The patient took</text>
      <rect x="20" y="48" width={50} height={14} rx={3} fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.4)" strokeWidth={0.5} />
      <text x="25" y="58" fill="rgba(16,185,129,0.8)" fontSize="8" fontFamily="monospace">Aspirin</text>
      <text x="75" y="58" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">for</text>
      <rect x="90" y="48" width={70} height={14} rx={3} fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.4)" strokeWidth={0.5} />
      <text x="95" y="58" fill="rgba(139,92,246,0.8)" fontSize="8" fontFamily="monospace">headache</text>
      {/* Entity labels */}
      <rect x="20" y="72" width={35} height={12} rx={2} fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.3)" strokeWidth={0.5} />
      <text x="37" y="81" textAnchor="middle" fill="rgba(16,185,129,0.7)" fontSize="6" fontFamily="monospace">DRUG</text>
      <rect x="65" y="72" width={45} height={12} rx={2} fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.3)" strokeWidth={0.5} />
      <text x="87" y="81" textAnchor="middle" fill="rgba(139,92,246,0.7)" fontSize="6" fontFamily="monospace">DISEASE</text>
      <rect x="120" y="72" width={35} height={12} rx={2} fill="rgba(6,182,212,0.1)" stroke="rgba(6,182,212,0.3)" strokeWidth={0.5} />
      <text x="137" y="81" textAnchor="middle" fill="rgba(6,182,212,0.7)" fontSize="6" fontFamily="monospace">GENE</text>
      <text x="100" y="112" textAnchor="middle" fill="rgba(16,185,129,0.6)" fontSize="8" fontFamily="monospace">Named Entity Recognition</text>
    </svg>
  );
}

const illustrations: Record<Project['category'], () => React.ReactNode> = {
  llm: LLMIllustration,
  rag: RAGIllustration,
  transformer: TransformerIllustration,
  mlops: MLOpsIllustration,
  sentiment: SentimentIllustration,
  ner: NERIllustration,
};

export function ProjectIllustration({ category }: Props) {
  const Illustration = illustrations[category];
  return <Illustration />;
}
