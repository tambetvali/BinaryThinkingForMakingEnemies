'use client';
import React from 'react';
import { usePhilosophyStore, getOppositionPair } from '@/store/philosophyStore';
import type { LogicSystem, Modality } from '@/store/philosophyStore';

// ── geometry ─────────────────────────────────────────────────────────────────
// Shift the whole triangle down so the BINARY label + sub-label above the top
// node don't clip the card top. Top node at y=52, bottom nodes at y=252.
const TOP  = { x: 150, y: 52  };
const BOT_L = { x: 20,  y: 252 };
const BOT_R = { x: 280, y: 252 };
// viewBox leaves 44px above top node for two text lines, 40px below bottom
const VB = '0 0 300 310';

const SYS_COLORS: Record<LogicSystem, string> = {
  binary: 'var(--red-fire)',
  taoist: 'var(--teal)',
  laegna: 'var(--gold)',
};

export default function LogicTriangle() {
  const { logic, mode, modality, setLogic, setModality } = usePhilosophyStore();
  const pair = getOppositionPair(mode, modality);

  // Which side-label should be clickable for Yin/Yang
  const leftLabel  = modality === 'bottom-up' ? pair.chosen  : pair.opposed;
  const rightLabel = modality === 'bottom-up' ? pair.opposed : pair.chosen;

  return (
    <div className="phil-card" style={{ textAlign: 'center', padding: '20px 16px' }}>
      <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.15em', marginBottom: 6 }}>
        THREE LOGIC SYSTEMS
      </div>

      {/* SVG is centered by auto margins; max-width constrains it */}
      <svg viewBox={VB} style={{ display: 'block', width: '100%', maxWidth: 300, height: 'auto', overflow: 'visible', margin: '0 auto' }}>

        {/* ── Triangle edges, react to active logic ── */}
        <line x1={TOP.x} y1={TOP.y} x2={BOT_L.x} y2={BOT_L.y}
          stroke={logic === 'binary' ? 'var(--red-fire)' : 'rgba(240,165,0,0.15)'}
          strokeWidth={logic === 'binary' ? 2 : 1} />
        <line x1={TOP.x} y1={TOP.y} x2={BOT_R.x} y2={BOT_R.y}
          stroke={logic === 'laegna' ? 'var(--gold)' : 'rgba(240,165,0,0.15)'}
          strokeWidth={logic === 'laegna' ? 2 : 1} />
        <line x1={BOT_L.x} y1={BOT_L.y} x2={BOT_R.x} y2={BOT_R.y}
          stroke={logic === 'taoist' ? 'var(--teal)' : 'rgba(240,165,0,0.15)'}
          strokeWidth={logic === 'taoist' ? 2 : 1} />

        {/* ── Inner geometry ── */}
        <circle cx="150" cy="172" r="50" fill="none" stroke="rgba(240,165,0,0.08)" strokeWidth="1" />
        <circle cx="150" cy="172" r="28" fill="none" stroke="rgba(30,203,225,0.1)" strokeWidth="1" />

        {/* Yin-Yang in center */}
        <circle cx="150" cy="172" r="20" fill="none" stroke="rgba(240,165,0,0.3)" strokeWidth="1" />
        <path d="M150 152 A10 10 0 0 1 150 172 A10 10 0 0 0 150 192 A20 20 0 0 1 150 152Z"
          fill="rgba(240,165,0,0.35)" />
        <circle cx="150" cy="162" r="4" fill="var(--bg-deep)" />
        <circle cx="150" cy="182" r="4" fill="rgba(240,165,0,0.8)" />

        {/* ── BINARY node (top) ── */}
        <NodeButton cx={TOP.x} cy={TOP.y} r={logic === 'binary' ? 14 : 10}
          active={logic === 'binary'} color="var(--red-fire)" onClick={() => setLogic('binary')} />
        {/* label above node — plenty of room now */}
        <text x={TOP.x} y={TOP.y - 18} textAnchor="middle" fill="var(--red-fire)"
          style={{ fontFamily: 'var(--font-cinzel)', fontSize: '10px', letterSpacing: '0.08em', cursor: 'pointer' }}
          onClick={() => setLogic('binary')}>BINARY</text>
        <text x={TOP.x} y={TOP.y - 6} textAnchor="middle" fill="rgba(232,93,74,0.5)"
          style={{ fontSize: '8px', cursor: 'pointer' }}
          onClick={() => setLogic('binary')}>Base-2 · X-zone</text>

        {/* ── TAOIST node (bottom-left) ── */}
        <NodeButton cx={BOT_L.x} cy={BOT_L.y} r={logic === 'taoist' ? 14 : 10}
          active={logic === 'taoist'} color="var(--teal)" onClick={() => setLogic('taoist')} />
        <text x={BOT_L.x} y={BOT_L.y + 22} textAnchor="middle" fill="var(--teal)"
          style={{ fontFamily: 'var(--font-cinzel)', fontSize: '10px', letterSpacing: '0.08em', cursor: 'pointer' }}
          onClick={() => setLogic('taoist')}>TAOIST</text>
        <text x={BOT_L.x} y={BOT_L.y + 33} textAnchor="middle" fill="rgba(30,203,225,0.5)"
          style={{ fontSize: '8px', cursor: 'pointer' }}
          onClick={() => setLogic('taoist')}>Base-4 · Dual</text>

        {/* ── LAEGNA node (bottom-right) ── */}
        <NodeButton cx={BOT_R.x} cy={BOT_R.y} r={logic === 'laegna' ? 14 : 10}
          active={logic === 'laegna'} color="var(--gold)" onClick={() => setLogic('laegna')} />
        <text x={BOT_R.x} y={BOT_R.y + 22} textAnchor="middle" fill="var(--gold)"
          style={{ fontFamily: 'var(--font-cinzel)', fontSize: '10px', letterSpacing: '0.08em', cursor: 'pointer' }}
          onClick={() => setLogic('laegna')}>LAEGNA</text>
        <text x={BOT_R.x} y={BOT_R.y + 33} textAnchor="middle" fill="rgba(240,165,0,0.5)"
          style={{ fontSize: '8px', cursor: 'pointer' }}
          onClick={() => setLogic('laegna')}>Base-4 · IOAE</text>

        {/* ── Side labels (edge midpoints) — clickable for Yin/Yang ── */}
        <SideLabel x={75} y={148} text="zero-sum" color="rgba(232,93,74,0.5)"
          onClick={() => setModality('bottom-up')}
          active={modality === 'bottom-up'} />
        <SideLabel x={225} y={148} text="plus-sum" color="rgba(240,165,0,0.5)"
          onClick={() => setModality('top-down')}
          active={modality === 'top-down'} />
        <text x="150" y="268" textAnchor="middle" fill="rgba(30,203,225,0.4)"
          style={{ fontSize: '8px', letterSpacing: '0.06em' }}>non-dual integration</text>

        {/* ── Opposition boxes at bottom corners ── */}
        <OppositionBox x={BOT_L.x} y={BOT_L.y + 42}
          label={leftLabel}
          sublabel="☽ Yin"
          color="var(--teal)"
          active={modality === 'bottom-up'}
          onClick={() => setModality('bottom-up')} />
        <OppositionBox x={BOT_R.x} y={BOT_R.y + 42}
          label={rightLabel}
          sublabel="☀ Yang"
          color="var(--gold)"
          active={modality === 'top-down'}
          onClick={() => setModality('top-down')} />

      </svg>

      <div style={{ marginTop: 4, fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
        {logic === 'binary'
          ? 'Either/Or: One truth excludes the other. X-zone · zero-sum · Nash equilibrium.'
          : logic === 'taoist'
          ? 'Both/And: Two truths flow together. Integration across context.'
          : 'Four-Fold: I·O·A·E map the full value space. Z·X·Y determine spatial logic.'}
      </div>
    </div>
  );
}

// ── Helper SVG components ────────────────────────────────────────────────────

function NodeButton({ cx, cy, r, active, color, onClick }: {
  cx: number; cy: number; r: number; active: boolean; color: string; onClick: () => void;
}) {
  // Invisible larger hit area + visible circle
  return (
    <g onClick={onClick} style={{ cursor: 'pointer' }}>
      <circle cx={cx} cy={cy} r={r + 8} fill="transparent" />
      <circle cx={cx} cy={cy} r={r}
        fill={active ? color : 'transparent'}
        stroke={color} strokeWidth={active ? 0 : 1.5}
        style={{ transition: 'all 0.25s' }}
        fillOpacity={active ? 0.9 : 0.2}
      />
      {active && (
        <circle cx={cx} cy={cy} r={r + 4} fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      )}
    </g>
  );
}

function SideLabel({ x, y, text, color, onClick, active }: {
  x: number; y: number; text: string; color: string;
  onClick: () => void; active: boolean;
}) {
  return (
    <g onClick={onClick} style={{ cursor: 'pointer' }}>
      <rect x={x - 28} y={y - 10} width={56} height={14} fill="transparent" />
      <text x={x} y={y} textAnchor="middle"
        fill={active ? color.replace('0.5', '0.9').replace('0.4', '0.8') : color}
        style={{ fontSize: '8px', letterSpacing: '0.06em', fontWeight: active ? 'bold' : 'normal' }}>
        {text}
      </text>
    </g>
  );
}

function OppositionBox({ x, y, label, sublabel, color, active, onClick }: {
  x: number; y: number; label: string; sublabel: string;
  color: string; active: boolean; onClick: () => void;
}) {
  const w = 72; const h = 28; const rx = 3;
  const bx = x - w / 2; const by = y;
  return (
    <g onClick={onClick} style={{ cursor: 'pointer' }}>
      <rect x={bx} y={by} width={w} height={h} rx={rx}
        fill={active ? color + '20' : 'transparent'}
        stroke={active ? color : color + '55'}
        strokeWidth={active ? 1.5 : 1}
        style={{ transition: 'all 0.25s' }} />
      <text x={x} y={by + 11} textAnchor="middle"
        fill={active ? color : color + 'aa'}
        style={{ fontFamily: 'var(--font-cinzel)', fontSize: '8px', letterSpacing: '0.04em', cursor: 'pointer' }}>
        {label}
      </text>
      <text x={x} y={by + 22} textAnchor="middle"
        fill={active ? color : color + '77'}
        style={{ fontSize: '7px', cursor: 'pointer' }}>
        {sublabel}
      </text>
    </g>
  );
}
