'use client';

import { useState } from 'react';

interface TechNode {
  label: string;
  ring: number;
  angle: number;
  category: string;
}

const techNodes: TechNode[] = [
  { label: 'PyTorch', ring: 0, angle: 0, category: 'ML Frameworks' },
  { label: 'HuggingFace', ring: 0, angle: 72, category: 'ML Frameworks' },
  { label: 'Python', ring: 0, angle: 144, category: 'Languages' },
  { label: 'LangChain', ring: 0, angle: 216, category: 'ML Frameworks' },
  { label: 'QLoRA/PEFT', ring: 0, angle: 288, category: 'LLM Ops' },
  { label: 'PySpark', ring: 1, angle: 20, category: 'Data' },
  { label: 'Docker', ring: 1, angle: 60, category: 'MLOps' },
  { label: 'K8s', ring: 1, angle: 100, category: 'MLOps' },
  { label: 'AWS', ring: 1, angle: 140, category: 'Cloud' },
  { label: 'MLflow', ring: 1, angle: 180, category: 'MLOps' },
  { label: 'Databricks', ring: 1, angle: 220, category: 'Cloud' },
  { label: 'TensorFlow', ring: 1, angle: 260, category: 'ML Frameworks' },
  { label: 'scikit-learn', ring: 1, angle: 300, category: 'ML Frameworks' },
  { label: 'SQL', ring: 1, angle: 340, category: 'Languages' },
  { label: 'Kafka', ring: 2, angle: 15, category: 'Data' },
  { label: 'Kubeflow', ring: 2, angle: 55, category: 'MLOps' },
  { label: 'GCP', ring: 2, angle: 95, category: 'Cloud' },
  { label: 'Terraform', ring: 2, angle: 135, category: 'Cloud' },
  { label: 'Hudi', ring: 2, angle: 175, category: 'Data' },
  { label: 'Plotly', ring: 2, angle: 215, category: 'Data' },
  { label: 'Streamlit', ring: 2, angle: 255, category: 'Data' },
  { label: 'spaCy', ring: 2, angle: 295, category: 'ML Frameworks' },
  { label: 'Scala', ring: 2, angle: 335, category: 'Languages' },
];

const ringRadii = [80, 145, 205];
const ringLabels = ['Core', 'Proficient', 'Familiar'];

const catColors: Record<string, { bg: string; text: string; stroke: string }> = {
  'ML Frameworks': { bg: 'rgba(139,92,246,0.3)', text: '#a78bfa', stroke: 'rgba(139,92,246,0.7)' },
  'Languages': { bg: 'rgba(34,211,238,0.3)', text: '#22d3ee', stroke: 'rgba(34,211,238,0.7)' },
  'LLM Ops': { bg: 'rgba(192,132,252,0.3)', text: '#c084fc', stroke: 'rgba(192,132,252,0.7)' },
  'Data': { bg: 'rgba(6,182,212,0.3)', text: '#06b6d4', stroke: 'rgba(6,182,212,0.7)' },
  'MLOps': { bg: 'rgba(56,189,248,0.3)', text: '#38bdf8', stroke: 'rgba(56,189,248,0.7)' },
  'Cloud': { bg: 'rgba(251,191,36,0.25)', text: '#fbbf24', stroke: 'rgba(251,191,36,0.6)' },
};

function polarToXY(angle: number, radius: number, cx: number, cy: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
}

export function TechRadar() {
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const cx = 250;
  const cy = 250;
  const categories = [...new Set(techNodes.map((n) => n.category))];

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setActiveCat(null)}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all border ${
            !activeCat ? 'bg-accent/20 text-accent-light border-accent/40' : 'text-foreground/60 border-foreground/10 hover:border-foreground/30'
          }`}
        >
          All
        </button>
        {categories.map((cat) => {
          const c = catColors[cat];
          const active = activeCat === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCat(active ? null : cat)}
              style={{
                backgroundColor: active ? c.bg : undefined,
                color: active ? c.text : undefined,
                borderColor: active ? c.stroke : undefined,
              }}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all border ${
                active ? '' : 'text-foreground/60 border-foreground/10 hover:border-foreground/30'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <svg viewBox="0 0 500 500" className="w-full max-w-lg h-auto">
        {/* Rings */}
        {ringRadii.map((r, i) => (
          <g key={r}>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth={1} className="text-foreground/10" />
            <text x={cx + r - 2} y={cy - 6} fontSize={8} fontFamily="monospace" textAnchor="end" className="fill-foreground/25">{ringLabels[i]}</text>
          </g>
        ))}
        <line x1={cx} y1={40} x2={cx} y2={460} className="stroke-foreground/5" strokeWidth={0.5} />
        <line x1={40} y1={cy} x2={460} y2={cy} className="stroke-foreground/5" strokeWidth={0.5} />

        {/* Center */}
        <circle cx={cx} cy={cy} r={8} fill="#8b5cf6" opacity={0.4} />
        <circle cx={cx} cy={cy} r={4} fill="#8b5cf6" />

        {/* Nodes — no framer motion, just CSS transitions */}
        {techNodes.map((node) => {
          const pos = polarToXY(node.angle, ringRadii[node.ring], cx, cy);
          const isActive = !activeCat || node.category === activeCat;
          const c = catColors[node.category];
          const nodeR = node.ring === 0 ? 28 : node.ring === 1 ? 23 : 20;

          return (
            <g
              key={node.label}
              style={{ opacity: isActive ? 1 : 0.1, transition: 'opacity 0.3s ease' }}
            >
              {/* Line from center for core nodes */}
              {node.ring === 0 && (
                <line x1={cx} y1={cy} x2={pos.x} y2={pos.y} stroke={c.stroke} strokeWidth={0.8} opacity={isActive ? 0.3 : 0.05} />
              )}
              {/* Glow for core */}
              {node.ring === 0 && isActive && (
                <circle cx={pos.x} cy={pos.y} r={nodeR + 10} fill={c.bg} style={{ filter: 'blur(10px)' }} />
              )}
              {/* Node */}
              <circle
                cx={pos.x} cy={pos.y} r={nodeR}
                fill={c.bg}
                stroke={c.stroke}
                strokeWidth={node.ring === 0 ? 1.5 : 1}
              />
              {/* Label */}
              <text
                x={pos.x} y={pos.y + 1}
                textAnchor="middle" dominantBaseline="central"
                fill={c.text}
                fontSize={node.ring === 0 ? 9 : node.ring === 1 ? 8 : 7}
                fontFamily="system-ui, sans-serif"
                fontWeight={node.ring === 0 ? 600 : 400}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
