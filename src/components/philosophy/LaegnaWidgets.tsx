'use client';
import React, { useState, useEffect, useRef } from 'react';
import { usePhilosophyStore } from '@/store/philosophyStore';
import type { LogicSystem, Mode, Modality } from '@/store/philosophyStore';

// ── Canonical letter data (from sheepcounter.json + source analysis) ──────────
export const LETTER_DATA = {
  I: { name: 'Negotion', abbr: 'No', signed: -2, color: '#c8a000', season: 'Winter', tao: 'Black dot in Yang', desc: 'Deep negative assertion' },
  O: { name: 'Negation',  abbr: 'Ne', signed: -1, color: '#c0392b', season: 'Evening', tao: 'Black Yin area', desc: 'Simple negative assertion' },
  A: { name: 'Position',  abbr: 'To', signed: +1, color: '#2e7d32', season: 'Day',    tao: 'White Yang area', desc: 'Simple positive assertion' },
  E: { name: 'Posetion',  abbr: 'Po', signed: +2, color: '#1565c0', season: 'Summer', tao: 'White dot in Yin', desc: 'Deep positive assertion' },
  W: { name: 'Minus-Inf', abbr: 'W',  signed: -Infinity, color: '#444', season: '—', tao: 'Heaven gate', desc: '−∞ boundary' },
  V: { name: 'Uneton-y',  abbr: 'V',  signed: -0,         color: '#7a5c99', season: '—', tao: 'Negative zero', desc: 'Log boundary / Y-unknown' },
  U: { name: 'Uneton-z',  abbr: 'U',  signed: +0,         color: '#2980b9', season: '—', tao: 'Positive zero', desc: 'Exp boundary / Z-unknown' },
  '∩': { name: 'Plus-Inf', abbr: '∩', signed: +Infinity, color: '#777', season: '—', tao: "Hell's puzzled", desc: '+∞ boundary' },
} as const;

// ── 1. LaegnaCompass ─────────────────────────────────────────────────────────

export function LaegnaCompass() {
  const { logic, mode, modality } = usePhilosophyStore();
  const cx = 160; const cy = 160; const r = 110;
  const isBottom = modality === 'bottom-up';
  const isMat    = mode === 'material';
  const chosen   = isMat ? (isBottom ? 'Capital' : 'Commun') : (isBottom ? 'Matter' : 'Spirit');
  const opposed  = isMat ? (isBottom ? 'Commun'  : 'Capital') : (isBottom ? 'Spirit' : 'Matter');

  // Quadrant angles (degrees from top, clockwise): I=top-left, E=top-right, O=bot-left, A=bot-right
  const quads: { letter: keyof typeof LETTER_DATA; ax: number; ay: number; qx: number; qy: number }[] = [
    { letter: 'I', ax: cx - r * 0.62, ay: cy - r * 0.62, qx: cx - r * 0.38, qy: cy - r * 0.38 },
    { letter: 'E', ax: cx + r * 0.62, ay: cy - r * 0.62, qx: cx + r * 0.38, qy: cy - r * 0.38 },
    { letter: 'O', ax: cx - r * 0.62, ay: cy + r * 0.62, qx: cx - r * 0.38, qy: cy + r * 0.38 },
    { letter: 'A', ax: cx + r * 0.62, ay: cy + r * 0.62, qx: cx + r * 0.38, qy: cy + r * 0.38 },
  ];

  const isBinary = logic === 'binary';
  // In binary: I (top-down true), A (bottom-up true) are "active"; O,E suppressed or false
  const activeInBinary = (l: string) => isBinary && ((isBottom && l === 'A') || (!isBottom && l === 'I'));
  const suppressedBinary = (l: string) => isBinary && ((isBottom && (l === 'I' || l === 'E')) || (!isBottom && (l === 'A' || l === 'O')));

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-gold)', borderRadius: 6, padding: 16 }}>
      <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.15em', marginBottom: 8, textAlign: 'center' }}>
        LAEGNA COMPASS · IOAE · {logic.toUpperCase()}
      </div>
      <svg viewBox={`0 0 ${cx*2} ${cy*2}`} style={{ width: '100%', maxWidth: 320, display: 'block', margin: '0 auto' }}>
        {/* Outer ring */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(240,165,0,0.15)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={r * 0.5} fill="none" stroke="rgba(240,165,0,0.08)" strokeWidth="1" />
        {/* Cross axes */}
        <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="rgba(240,165,0,0.12)" strokeWidth="0.5" />
        <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="rgba(240,165,0,0.12)" strokeWidth="0.5" />
        {/* Diagonals */}
        <line x1={cx - r * 0.7} y1={cy - r * 0.7} x2={cx + r * 0.7} y2={cy + r * 0.7} stroke="rgba(240,165,0,0.07)" strokeWidth="0.5" strokeDasharray="3,3" />
        <line x1={cx + r * 0.7} y1={cy - r * 0.7} x2={cx - r * 0.7} y2={cy + r * 0.7} stroke="rgba(240,165,0,0.07)" strokeWidth="0.5" strokeDasharray="3,3" />

        {/* Yin-Yang center */}
        <YinYangSVG cx={cx} cy={cy} r={28} />

        {/* Quadrant shading */}
        {quads.map(({ letter, qx, qy }) => {
          const ld = LETTER_DATA[letter as 'I'|'O'|'A'|'E'];
          const isSup = suppressedBinary(letter);
          const isAct = activeInBinary(letter);
          return (
            <circle key={letter} cx={qx} cy={qy} r={16}
              fill={isSup ? 'rgba(139,92,246,0.12)' : isAct ? ld.color + '30' : ld.color + '18'}
              stroke={isSup ? 'rgba(139,92,246,0.4)' : isAct ? ld.color : ld.color + '55'}
              strokeWidth={isAct ? 1.5 : 1} />
          );
        })}

        {/* Quadrant letters */}
        {quads.map(({ letter, qx, qy }) => {
          const ld = LETTER_DATA[letter as 'I'|'O'|'A'|'E'];
          const isSup = suppressedBinary(letter);
          return (
            <text key={letter + 'l'} x={qx} y={qy + 5} textAnchor="middle"
              fill={isSup ? 'rgba(139,92,246,0.6)' : ld.color}
              style={{ fontFamily: 'var(--font-cinzel)', fontSize: '16px', fontWeight: '700', cursor: 'default' }}>
              {letter}
            </text>
          );
        })}

        {/* Context labels at cardinal points */}
        <CompassLabel x={cx} y={cy - r - 10} text={isBottom ? 'global' : chosen} color="rgba(240,165,0,0.5)" />
        <CompassLabel x={cx} y={cy + r + 18} text={isBottom ? opposed : 'global'} color="rgba(240,165,0,0.4)" />
        <CompassLabel x={cx - r - 8} y={cy + 4} text="−" color="rgba(200,57,43,0.5)" />
        <CompassLabel x={cx + r + 8} y={cy + 4} text="+" color="rgba(46,125,50,0.5)" />

        {/* Signed values */}
        {quads.map(({ letter, qx, qy }) => {
          const ld = LETTER_DATA[letter as 'I'|'O'|'A'|'E'];
          return (
            <text key={letter + 'v'} x={qx} y={qy + 26} textAnchor="middle"
              fill={ld.color} opacity={0.6}
              style={{ fontSize: '8px', fontFamily: 'var(--font-mono)' }}>
              {ld.signed > 0 ? '+' : ''}{ld.signed}
            </text>
          );
        })}
      </svg>

      {/* Tao mapping legend */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginTop: 8 }}>
        {(['I','O','A','E'] as const).map(l => {
          const ld = LETTER_DATA[l];
          const isSup = suppressedBinary(l);
          return (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 6px', background: isSup ? 'rgba(139,92,246,0.07)' : ld.color + '0f', borderRadius: 3, border: `1px solid ${isSup ? 'rgba(139,92,246,0.2)' : ld.color + '33'}` }}>
              <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1rem', color: isSup ? 'var(--purple)' : ld.color, minWidth: 14 }}>{l}</span>
              <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                <span style={{ color: isSup ? 'var(--purple)' : ld.color, display: 'block', fontFamily: 'var(--font-cinzel)', fontSize: '0.58rem' }}>{ld.name} {isSup ? '(suppressed)' : ''}</span>
                {ld.tao} · {ld.season}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CompassLabel({ x, y, text, color }: { x: number; y: number; text: string; color: string }) {
  return <text x={x} y={y} textAnchor="middle" fill={color} style={{ fontSize: '8px', fontFamily: 'var(--font-cinzel)', letterSpacing: '0.06em' }}>{text}</text>;
}

// ── 2. InfinityVisualizer ────────────────────────────────────────────────────
// Shows the circle-radius→∞ theorem: as radius grows, local curvature → 0°
// Also shows zero-infinity duality: ∞ ↔ 0

export function InfinityVisualizer() {
  const [stage, setStage] = useState(0); // 0..3
  const stages = [
    { r: 28,  label: 'Finite circle (r = 28)', angle: 45,  desc: 'Local curvature is visible — clearly curved.' },
    { r: 55,  label: 'Growing (r = 55)',        angle: 22,  desc: 'Curve flattens. Angle at point shrinks.' },
    { r: 100, label: 'Large (r = 100)',          angle: 11,  desc: 'Almost flat locally. This is how Earth appears flat.' },
    { r: 200, label: 'Approaching ∞',            angle: 0.5, desc: 'Angle → 0°. Radius → ∞. Local flatness IS infinity.' },
  ];
  const s = stages[stage];
  const cx = 160; const cy = 130;

  // Arc segment visible in viewport
  const arcW = 140; const arcH = Math.min(60, s.r * 0.4);
  const startX = cx - arcW / 2; const endX = cx + arcW / 2;
  const arcY = cy + (s.r > 100 ? s.r * 0.95 : s.r * 0.8);

  // SVG arc path
  const largeArc = 0;
  const d = `M ${startX} ${arcY} A ${s.r * 2.5} ${s.r * 2.5} 0 ${largeArc} 1 ${endX} ${arcY}`;

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-teal)', borderRadius: 6, padding: 16 }}>
      <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.7rem', color: 'var(--teal)', letterSpacing: '0.15em', marginBottom: 8, textAlign: 'center' }}>
        FIRST THEOREM OF INFINITY · ANGLE → 0° AS RADIUS → ∞
      </div>
      <svg viewBox="0 0 320 200" style={{ width: '100%', height: 120, display: 'block' }}>
        <text x="160" y="18" textAnchor="middle" fill="var(--teal)" style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', opacity: 0.7 }}>
          {s.label} · local angle ≈ {s.angle}°
        </text>
        {/* The arc */}
        <path d={d} fill="none" stroke="var(--teal)" strokeWidth="2.5" opacity="0.8" />
        {/* Center point indicator */}
        <circle cx={cx} cy={arcY - 4} r="3" fill="var(--gold)" opacity="0.8" />
        {/* Tangent line (flat) */}
        <line x1={startX + 10} y1={arcY} x2={endX - 10} y2={arcY} stroke="rgba(240,165,0,0.2)" strokeWidth="1" strokeDasharray="4,3" />
        {/* Label: approaching flat */}
        {stage === 3 && (
          <text x="160" y={arcY - 12} textAnchor="middle" fill="var(--gold)" style={{ fontSize: '8px', fontFamily: 'var(--font-cinzel)' }}>∞ — locally flat</text>
        )}
        {/* Zero-Infinity duality indicator */}
        <text x="20" y="185" fill="#c0392b" opacity="0.7" style={{ fontSize: '8px', fontFamily: 'var(--font-mono)' }}>r=0 → 360° at one point</text>
        <text x="180" y="185" fill="#2e7d32" opacity="0.7" style={{ fontSize: '8px', fontFamily: 'var(--font-mono)' }}>r=∞ → 0° everywhere</text>
        <text x="160" y="165" textAnchor="middle" fill="rgba(240,165,0,0.5)" style={{ fontSize: '8px' }}>∞ ↔ 0 · structural mirrors</text>
      </svg>
      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: '6px 0 10px' }}>{s.desc}</p>
      <div style={{ display: 'flex', gap: 4 }}>
        {stages.map((st, i) => (
          <button key={i} onClick={() => setStage(i)} style={{
            flex: 1, padding: '4px 0', fontSize: '0.62rem', fontFamily: 'var(--font-cinzel)',
            background: stage === i ? 'rgba(30,203,225,0.18)' : 'transparent',
            border: `1px solid ${stage === i ? 'var(--teal)' : 'rgba(30,203,225,0.2)'}`,
            color: stage === i ? 'var(--teal)' : 'var(--text-muted)', cursor: 'pointer', borderRadius: 2,
          }}>r={i === 3 ? '∞' : stages[i].r}</button>
        ))}
      </div>
      <div style={{ marginTop: 8, padding: '6px 10px', background: 'rgba(30,203,225,0.06)', borderLeft: '2px solid var(--teal)', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
        <strong style={{ color: 'var(--teal)' }}>Imperfection Theorem:</strong> No finite system fully captures infinity. Infinity is a <em>coordinate</em>, not a size — a direction of approach. This structural incompleteness is the mathematical form of Buddhist <em>Anicca</em> (impermanence) and Laegna&apos;s <em>Law of Imperfection</em>.
      </div>
    </div>
  );
}

// ── 3. PonegationTable ───────────────────────────────────────────────────────
// The 4-value truth table. Hover a cell to see its ponegation result.
// In binary mode, shows only 2 active values + 2 suppressed.

export function PonegationTable() {
  const { logic } = usePhilosophyStore();
  const [hover, setHover] = useState<[string, string] | null>(null);
  const vals = ['I', 'O', 'A', 'E'] as const;

  // Ponegation result table (simplified: I+I=I, I+O=O/I, I+A=O, I+E=A, etc.)
  // Based on signed arithmetic: clamp(a+b, -2, +2) mapped to letter
  function poneResult(a: typeof vals[number], b: typeof vals[number]): typeof vals[number] {
    const signed = { I: -2, O: -1, A: 1, E: 2 } as const;
    const sum = signed[a] + signed[b];
    if (sum <= -2) return 'I';
    if (sum < 0) return 'O';
    if (sum >= 2) return 'E';
    return 'A';
  }

  const isBinary = logic === 'binary';
  const activeVals = isBinary ? ['O', 'A'] : vals;

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-gold)', borderRadius: 6, padding: 16 }}>
      <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.7rem', color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: 8, textAlign: 'center' }}>
        PONEGATION TABLE · FOUR-VALUE LOGIC
      </div>
      {isBinary && (
        <div style={{ fontSize: '0.7rem', color: 'var(--red-fire)', marginBottom: 8, fontFamily: 'var(--font-mono)', textAlign: 'center' }}>
          Binary uses only O+A (2 of 4) — I and E are suppressed
        </div>
      )}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
          <thead>
            <tr>
              <th style={{ padding: '4px 6px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textAlign: 'right' }}>⊕</th>
              {vals.map(v => {
                const ld = LETTER_DATA[v];
                const isSup = isBinary && !activeVals.includes(v);
                return (
                  <th key={v} style={{ padding: '4px 8px', color: isSup ? 'rgba(139,92,246,0.5)' : ld.color, fontFamily: 'var(--font-cinzel)', fontSize: '0.9rem' }}>{v}</th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {vals.map(row => {
              const rld = LETTER_DATA[row];
              const rowSup = isBinary && !activeVals.includes(row);
              return (
                <tr key={row}>
                  <td style={{ padding: '4px 8px', color: rowSup ? 'rgba(139,92,246,0.5)' : rld.color, fontFamily: 'var(--font-cinzel)', fontSize: '0.9rem', textAlign: 'right' }}>{row}</td>
                  {vals.map(col => {
                    const cld = LETTER_DATA[col];
                    const res = poneResult(row, col);
                    const rld2 = LETTER_DATA[res];
                    const colSup = isBinary && !activeVals.includes(col);
                    const isHov = hover?.[0] === row && hover?.[1] === col;
                    return (
                      <td key={col}
                        onMouseEnter={() => setHover([row, col])}
                        onMouseLeave={() => setHover(null)}
                        style={{
                          padding: '5px 8px', textAlign: 'center', cursor: 'default',
                          background: isHov ? rld2.color + '30' : (rowSup || colSup) ? 'rgba(139,92,246,0.06)' : rld2.color + '12',
                          border: `1px solid ${isHov ? rld2.color : (rowSup||colSup) ? 'rgba(139,92,246,0.15)' : rld2.color + '22'}`,
                          color: (rowSup || colSup) ? 'rgba(139,92,246,0.5)' : rld2.color,
                          fontFamily: 'var(--font-cinzel)', fontSize: '0.88rem',
                          transition: 'all 0.15s',
                        }}>
                        {res}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {hover && (
        <div style={{ marginTop: 8, padding: '5px 10px', background: LETTER_DATA[poneResult(hover[0] as never, hover[1] as never)].color + '15', borderRadius: 3, fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
          <strong style={{ color: LETTER_DATA[hover[0] as 'I'].color }}>{hover[0]}</strong>
          {' ⊕ '}
          <strong style={{ color: LETTER_DATA[hover[1] as 'I'].color }}>{hover[1]}</strong>
          {' → '}
          <strong style={{ color: LETTER_DATA[poneResult(hover[0] as never, hover[1] as never)].color }}>
            {poneResult(hover[0] as never, hover[1] as never)} ({LETTER_DATA[poneResult(hover[0] as never, hover[1] as never)].name})
          </strong>
        </div>
      )}
      <div style={{ marginTop: 8, fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
        Operation: signed sum clamped to range [−2, +2], mapped to letter. I=−2, O=−1, A=+1, E=+2. <em>Spaonegation</em> (scientific) and <em>Spiponegation</em> (spiritual) are variants of this table.
      </div>
    </div>
  );
}

// ── 4. GameStatesWidget ──────────────────────────────────────────────────────
// Maps IOAE to game outcomes: I=losing badly, O=losing, A=honest, E=overwinning
// Shows Rosedriad (framing effect) and thermodynamic stability

export function GameStatesWidget() {
  const { mode, modality } = usePhilosophyStore();
  const [active, setActive] = useState<string | null>(null);
  const isMat   = mode === 'material';
  const isBot   = modality === 'bottom-up';
  const chosen  = isMat ? (isBot ? 'Capitalism' : 'Communism')  : (isBot ? 'Materialism' : 'Spirituality');

  const states = [
    {
      letter: 'I', name: 'Negotion · Losing Badly', color: '#c8a000',
      game: 'Denial. Destruction of useful values. The deepest loss — not just defeat but the active rejection of what could help.',
      thermo: 'Thermodynamically unstable: high entropy production, no sustainable attractor. The ego-police state.',
      context: isMat ? (isBot ? 'Complete market collapse, hoarding, destruction of capital and trust' : 'Revolutionary nihilism: destroying existing order without replacement') : (isBot ? 'Denial of all spiritual experience; reductive materialism as armour' : 'Fanaticism: destroying material grounding in pursuit of pure spirit'),
    },
    {
      letter: 'O', name: 'Negation · Losing', color: '#c0392b',
      game: 'Simple negative. "False love" state — the quiet acknowledgement of defeat, retreat to safety.',
      thermo: 'Locally stable, globally suboptimal. Nash equilibrium in zero-sum (X-zone). Can persist indefinitely.',
      context: isMat ? (isBot ? `${chosen} forced into pure survival mode; no innovation, just maintenance` : 'Communist scarcity: negating individual initiative, stable but stagnant') : (isBot ? 'Materialist pessimism: things are what they are, no transcendence possible' : 'Spiritual depression: acknowledging impermanence but unable to act from it'),
    },
    {
      letter: 'A', name: 'Position · Honest Play', color: '#2e7d32',
      game: 'The evolutionarily stable strategy. "Good, resolves to reason." Sincere is cheaper than deceptive at scale.',
      thermo: 'Thermodynamically optimal: strategies that offer become stable attractors. Illumination point where sincerity beats deception.',
      context: isMat ? (isBot ? `${chosen} as genuine value creation: markets serve real needs, capital enables real production` : 'Communism as genuine collective coordination: real shared goals, not enforced conformity') : (isBot ? 'Scientific materialism: honest investigation of what matter actually is and does' : 'Genuine spiritual practice: presence, not performance'),
    },
    {
      letter: 'E', name: 'Posetion · Overwinning', color: '#1565c0',
      game: '"Advertise non-useful values, believe in unrecognized success." Dangerous: appears positive but exceeds truth.',
      thermo: 'Short-term dominant, long-term unstable. "Strategies that come to gain collapse under their own cost." The bubble.',
      context: isMat ? (isBot ? `Speculative finance: ${chosen} decoupled from real value, extracting without producing` : 'Totalitarian communism: the forced happiness of ideology, claiming victory over human nature') : (isBot ? 'Spiritual bypassing: using spiritual language to avoid material responsibility' : 'Enlightenment performance: claiming spiritual heights without genuine ground'),
    },
  ];

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-gold)', borderRadius: 6, padding: 16 }}>
      <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.7rem', color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: 10, textAlign: 'center' }}>
        IOAE GAME STATES · {mode.toUpperCase()} · {modality.toUpperCase()}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 6 }}>
        {states.map(s => (
          <div key={s.letter}
            onClick={() => setActive(active === s.letter ? null : s.letter)}
            style={{
              padding: '10px 10px 8px',
              background: active === s.letter ? s.color + '20' : s.color + '0c',
              border: `1px solid ${active === s.letter ? s.color : s.color + '40'}`,
              borderRadius: 4, cursor: 'pointer', transition: 'all 0.2s',
            }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
              <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.5rem', color: s.color, lineHeight: 1 }}>{s.letter}</span>
              <span style={{ fontSize: '0.62rem', color: s.color, fontFamily: 'var(--font-cinzel)', letterSpacing: '0.04em', lineHeight: 1.2 }}>{s.name.split('·')[1].trim()}</span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.45, margin: 0 }}>{s.game}</p>
            {active === s.letter && (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: '0.7rem', color: s.color, lineHeight: 1.45, marginBottom: 4, fontStyle: 'italic' }}>{s.thermo}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-parchment)', lineHeight: 1.45, padding: '4px 6px', background: s.color + '0f', borderLeft: `2px solid ${s.color}66`, borderRadius: '0 2px 2px 0' }}>{s.context}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10, padding: '6px 10px', background: 'rgba(21,101,192,0.08)', borderLeft: '2px solid #1565c0', borderRadius: '0 3px 3px 0', fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
        <strong style={{ color: '#1565c0' }}>Rosedriad / Roposetion:</strong> A player in Position (A) can appear as Posetion (E) not by changing their strategy, but because the <em>context R shifts</em> around them. Historical actors lose not by changing sides — the payoff matrix changes. Click each state to see the {mode}/{modality} context.
      </div>
    </div>
  );
}

// ── 5. RTSNumberWidget ────────────────────────────────────────────────────────
// Shows the RTS notation: R=precision, T=4^R values, S=signed range

export function RTSNumberWidget() {
  const [r, setR] = useState(1);
  const T = Math.pow(4, r);
  // S range: approximately ±(T/2)
  const sMax = Math.floor(T / 2);
  // Generate the digits for R=1,2
  const digits1 = ['W(−∞)', 'I(−2)', 'O(−1)', 'V(−0)', 'U(+0)', 'A(+1)', 'E(+2)', '∩(+∞)'];
  const digits2 = ['II', 'IO', 'IA', 'IE', 'OI', 'OO', 'OA', 'OE', 'AI', 'AO', 'AA', 'AE', 'EI', 'EO', 'EA', 'EE'];
  const signedVals2 = [-8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8];
  const colors2 = ['I','I','I','I','O','O','O','O','A','A','A','A','E','E','E','E'] as const;
  const colorMap = { I: '#c8a000', O: '#c0392b', A: '#2e7d32', E: '#1565c0' };

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-teal)', borderRadius: 6, padding: 16 }}>
      <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.7rem', color: 'var(--teal)', letterSpacing: '0.15em', marginBottom: 10, textAlign: 'center' }}>
        RTS NOTATION · LAEGNA NUMBER SYSTEM
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, justifyContent: 'center' }}>
        {[1,2,3].map(n => (
          <button key={n} onClick={() => setR(n)} style={{
            padding: '4px 14px', fontFamily: 'var(--font-cinzel)', fontSize: '0.75rem',
            background: r === n ? 'rgba(30,203,225,0.18)' : 'transparent',
            border: `1px solid ${r === n ? 'var(--teal)' : 'rgba(30,203,225,0.25)'}`,
            color: r === n ? 'var(--teal)' : 'var(--text-muted)', cursor: 'pointer', borderRadius: 2,
          }}>R={n}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
        <div style={{ textAlign: 'center', padding: '8px', background: 'rgba(240,165,0,0.07)', borderRadius: 4 }}>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.2rem', color: 'var(--gold)' }}>R = {r}</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 2 }}>window/precision</div>
        </div>
        <div style={{ textAlign: 'center', padding: '8px', background: 'rgba(30,203,225,0.07)', borderRadius: 4 }}>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.2rem', color: 'var(--teal)' }}>T = 4<sup style={{ fontSize: '0.7rem' }}>{r}</sup> = {T}</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 2 }}>total values</div>
        </div>
        <div style={{ textAlign: 'center', padding: '8px', background: 'rgba(46,125,50,0.07)', borderRadius: 4 }}>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1rem', color: '#2e7d32' }}>±{sMax}</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 2 }}>signed range S</div>
        </div>
      </div>
      {r === 1 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {digits1.map((d, i) => {
            const isCore = i >= 1 && i <= 2 || i >= 5 && i <= 6;
            const isBound = i === 0 || i === 7;
            const isZero = i === 3 || i === 4;
            return (
              <div key={d} style={{
                padding: '3px 7px', borderRadius: 3, fontSize: '0.72rem', fontFamily: 'var(--font-mono)',
                background: isBound ? 'rgba(128,128,128,0.1)' : isZero ? 'rgba(139,92,246,0.1)' : isCore ? 'rgba(240,165,0,0.1)' : 'transparent',
                border: `1px solid ${isBound ? 'rgba(128,128,128,0.3)' : isZero ? 'rgba(139,92,246,0.3)' : isCore ? 'rgba(240,165,0,0.3)' : 'transparent'}`,
                color: isBound ? 'var(--text-muted)' : isZero ? 'var(--purple)' : 'var(--gold)',
              }}>{d}</div>
            );
          })}
        </div>
      )}
      {r === 2 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 3 }}>
          {digits2.map((d, i) => (
            <div key={d} style={{
              textAlign: 'center', padding: '3px 2px', borderRadius: 2, fontSize: '0.68rem',
              fontFamily: 'var(--font-mono)', border: `1px solid ${colorMap[colors2[i]]}44`,
              background: colorMap[colors2[i]] + '12', color: colorMap[colors2[i]],
            }}>
              <div>{d}</div>
              <div style={{ fontSize: '0.55rem', opacity: 0.7 }}>{signedVals2[i] > 0 ? '+' : ''}{signedVals2[i]}</div>
            </div>
          ))}
        </div>
      )}
      {r === 3 && (
        <div style={{ padding: '8px 12px', background: 'rgba(30,203,225,0.06)', borderRadius: 4, fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          R=3: 64 values (III=−32 … EEE=+32) + boundaries. First digit dominates: <span style={{ color: '#c8a000' }}>I</span>··, <span style={{ color: '#c0392b' }}>O</span>··, <span style={{ color: '#2e7d32' }}>A</span>··, <span style={{ color: '#1565c0' }}>E</span>··. Each subsequent digit refines position within that quadrant. "In number AOA, A is the most important and others not."
        </div>
      )}
      <div style={{ marginTop: 10, fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
        Base-4 positional system. R increments double the precision: each new digit multiplies the resolution by 4. The same four letters I, O, A, E are used at every scale — the system is <em>self-similar across R levels</em>.
      </div>
    </div>
  );
}

function YinYangSVG({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  // Standard yin-yang, but colored I=yellow seed, O=red/black, A=green/white, E=blue seed
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#c0392b" opacity={0.25} />
      <path d={`M${cx} ${cy - r} A${r} ${r} 0 0 1 ${cx} ${cy + r} A${r / 2} ${r / 2} 0 0 0 ${cx} ${cy} A${r / 2} ${r / 2} 0 0 1 ${cx} ${cy - r}Z`} fill="#2e7d32" opacity={0.35} />
      {/* I seed (yellow) in A zone */}
      <circle cx={cx} cy={cy - r / 2} r={r / 5} fill="#c8a000" opacity={0.65} />
      {/* E seed (blue) in O zone */}
      <circle cx={cx} cy={cy + r / 2} r={r / 5} fill="#1565c0" opacity={0.65} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(240,165,0,0.3)" strokeWidth="1" />
    </g>
  );
}
