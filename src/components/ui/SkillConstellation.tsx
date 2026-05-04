'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { skillCategories } from '@/data/skills';

interface Node {
  id: string;
  label: string;
  category: string;
  proficiency: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  targetX: number;
  targetY: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  'Languages': '#22d3ee',
  'ML/AI Frameworks': '#8b5cf6',
  'MLOps & Infrastructure': '#38bdf8',
  'LLM & NLP Specializations': '#a78bfa',
  'Data & Visualization': '#06b6d4',
};

export function SkillConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -999, y: -999 });
  const dragRef = useRef<{ node: Node | null; offsetX: number; offsetY: number }>({ node: null, offsetX: 0, offsetY: 0 });
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const animRef = useRef<number>(0);

  // Initialize nodes
  useEffect(() => {
    if (prefersReduced) return;
    const container = containerRef.current;
    if (!container) return;

    const w = container.offsetWidth;
    const h = 500;
    const nodes: Node[] = [];
    const categories = skillCategories;
    const catCount = categories.length;

    categories.forEach((cat, ci) => {
      const angleOffset = (ci / catCount) * Math.PI * 2;
      const clusterRadius = Math.min(w, h) * 0.28;
      const cx = w / 2 + Math.cos(angleOffset) * clusterRadius;
      const cy = h / 2 + Math.sin(angleOffset) * clusterRadius;

      cat.skills.forEach((skill, si) => {
        const angle = angleOffset + (si / cat.skills.length) * (Math.PI * 2 / catCount) - Math.PI / catCount;
        const dist = 40 + Math.random() * 60;
        const x = cx + Math.cos(angle) * dist;
        const y = cy + Math.sin(angle) * dist;
        const radius = 4 + (skill.proficiency / 100) * 12;

        nodes.push({
          id: `${cat.title}-${skill.name}`,
          label: skill.name,
          category: cat.title,
          proficiency: skill.proficiency,
          x, y,
          vx: 0, vy: 0,
          radius,
          targetX: x,
          targetY: y,
        });
      });
    });

    nodesRef.current = nodes;
  }, [prefersReduced]);

  // Animation loop
  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = container.offsetWidth;
    let h = 500;

    const resize = () => {
      w = container.offsetWidth;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Physics
      for (const node of nodes) {
        if (dragRef.current.node === node) continue;

        // Attract to target position
        const dx = node.targetX - node.x;
        const dy = node.targetY - node.y;
        node.vx += dx * 0.008;
        node.vy += dy * 0.008;

        // Mouse repulsion
        const mx = node.x - mouse.x;
        const my = node.y - mouse.y;
        const mDist = Math.sqrt(mx * mx + my * my);
        if (mDist < 100 && mDist > 0) {
          const force = (1 - mDist / 100) * 2;
          node.vx += (mx / mDist) * force;
          node.vy += (my / mDist) * force;
        }

        // Node repulsion
        for (const other of nodes) {
          if (other === node) continue;
          const ox = node.x - other.x;
          const oy = node.y - other.y;
          const oDist = Math.sqrt(ox * ox + oy * oy);
          const minDist = node.radius + other.radius + 8;
          if (oDist < minDist && oDist > 0) {
            const force = (minDist - oDist) * 0.05;
            node.vx += (ox / oDist) * force;
            node.vy += (oy / oDist) * force;
          }
        }

        // Friction
        node.vx *= 0.92;
        node.vy *= 0.92;
        node.x += node.vx;
        node.y += node.vy;

        // Bounds
        node.x = Math.max(node.radius, Math.min(w - node.radius, node.x));
        node.y = Math.max(node.radius, Math.min(h - node.radius, node.y));
      }

      // Draw connections within same category
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[i].category !== nodes[j].category) continue;
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.25;
            const color = CATEGORY_COLORS[nodes[i].category] ?? '#8b5cf6';
            ctx.strokeStyle = color.replace(')', `, ${alpha})`).replace('rgb', 'rgba').replace('#', '');
            // Convert hex to rgba
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const color = CATEGORY_COLORS[node.category] ?? '#8b5cf6';
        const isFiltered = activeCategory && node.category !== activeCategory;
        const nodeAlpha = isFiltered ? 0.15 : 1;

        // Glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 2.5);
        gradient.addColorStop(0, `rgba(${hexToRgb(color)},${0.2 * nodeAlpha})`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(node.x - node.radius * 3, node.y - node.radius * 3, node.radius * 6, node.radius * 6);

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(color)},${0.7 * nodeAlpha})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(${hexToRgb(color)},${0.9 * nodeAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Label for larger nodes
        if (node.radius > 10 && !isFiltered) {
          ctx.fillStyle = `rgba(255,255,255,${0.7 * nodeAlpha})`;
          ctx.font = '10px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(node.label, node.x, node.y + node.radius + 14);
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [prefersReduced, activeCategory]);

  // Mouse handlers
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current = { x, y };

    if (dragRef.current.node) {
      dragRef.current.node.x = x - dragRef.current.offsetX;
      dragRef.current.node.y = y - dragRef.current.offsetY;
      dragRef.current.node.targetX = dragRef.current.node.x;
      dragRef.current.node.targetY = dragRef.current.node.y;
      return;
    }

    // Check hover
    const nodes = nodesRef.current;
    let found: Node | null = null;
    for (const node of nodes) {
      const dx = x - node.x;
      const dy = y - node.y;
      if (Math.sqrt(dx * dx + dy * dy) < node.radius + 5) {
        found = node;
        break;
      }
    }
    setHoveredNode(found);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (const node of nodesRef.current) {
      const dx = x - node.x;
      const dy = y - node.y;
      if (Math.sqrt(dx * dx + dy * dy) < node.radius + 5) {
        dragRef.current = { node, offsetX: dx, offsetY: dy };
        break;
      }
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    dragRef.current = { node: null, offsetX: 0, offsetY: 0 };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -999, y: -999 };
    setHoveredNode(null);
    dragRef.current = { node: null, offsetX: 0, offsetY: 0 };
  }, []);

  const categories = Object.keys(CATEGORY_COLORS);

  if (prefersReduced) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {skillCategories.flatMap((cat) =>
          cat.skills.map((skill) => (
            <div key={`${cat.title}-${skill.name}`} className="rounded-lg border border-border/40 px-3 py-2 text-sm">
              {skill.name} <span className="text-foreground/40">{skill.proficiency}%</span>
            </div>
          ))
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Category filter */}
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all border ${
            !activeCategory ? 'bg-accent/20 text-accent-light border-accent/40' : 'text-foreground/50 border-border/30 hover:border-foreground/30'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all border ${
              activeCategory === cat ? 'bg-accent/20 text-accent-light border-accent/40' : 'text-foreground/50 border-border/30 hover:border-foreground/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className="relative rounded-2xl border border-border/30 bg-muted/10 overflow-hidden"
        style={{ height: 500, cursor: dragRef.current.node ? 'grabbing' : 'default' }}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <canvas ref={canvasRef} className="absolute inset-0" />

        {/* Tooltip */}
        {hoveredNode && (
          <motion.div
            className="pointer-events-none absolute z-10 rounded-lg border border-border/40 bg-background/90 px-3 py-2 backdrop-blur-md shadow-lg"
            style={{ left: hoveredNode.x + 15, top: hoveredNode.y - 40 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
          >
            <p className="text-sm font-semibold">{hoveredNode.label}</p>
            <p className="text-xs text-foreground/50">{hoveredNode.category} · {hoveredNode.proficiency}%</p>
          </motion.div>
        )}
      </div>

      <p className="mt-3 text-center text-xs text-foreground/30">
        Drag nodes to rearrange · Hover for details · Filter by category
      </p>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
