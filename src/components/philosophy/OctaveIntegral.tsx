'use client';
import React, { useState } from 'react';
import { usePhilosophyStore } from '@/store/philosophyStore';

// Octave math: differential = negative octaves, integral = positive octaves
// They meet at zero. state(t) = shadow ⊕ insight
// Karmic logic: A→B, ¬B→¬A (contrapositive = karmic backlash)

const OCTAVE_LEVELS = [
  { label: 'R=−4', kind: 'diff', value: -4, desc: 'Deep differential — raw chaos, quantum foam, pre-existence' },
  { label: 'R=−3', kind: 'diff', value: -3, desc: 'Differential — strong shadow, entropy, dissolution forces' },
  { label: 'R=−2', kind: 'diff', value: -2, desc: 'Differential — trauma patterns, unconscious drives' },
  { label: 'R=−1', kind: 'diff', value: -1, desc: 'Near-zero diff — unresolved tension, approaching present' },
  { label: 'R= 0', kind: 'zero', value:  0, desc: 'Zero — meeting of differential and integral. The Now. state(t) = shadow ⊕ insight' },
  { label: 'R=+1', kind: 'int',  value:  1, desc: 'Near-zero integral — first insight, seed of integration' },
  { label: 'R=+2', kind: 'int',  value:  2, desc: 'Integral — growing insight, karma actively resolving' },
  { label: 'R=+3', kind: 'int',  value:  3, desc: 'Strong integral — dharma manifest, long-term truth emerging' },
  { label: 'R=+4', kind: 'int',  value:  4, desc: 'Deep integral — above-infinity, Y-zone, non-returner state' },
];

export function OctaveIntegralWidget() {
  const { mode, modality, logic } = usePhilosophyStore();
  const [hoveredR, setHoveredR] = useState<number | null>(null);
  const [karmicA, setKarmicA] = useState('');
  const [karmicB, setKarmicB] = useState('');

  const isMat = mode === 'material';
  const isBot = modality === 'bottom-up';
  const chosen  = isMat ? (isBot ? 'Capitalism' : 'Communism')  : (isBot ? 'Materialism' : 'Spirituality');
  const opposed = isMat ? (isBot ? 'Communism'  : 'Capitalism') : (isBot ? 'Spirituality' : 'Materialism');

  // Show where current logic sits on the octave scale
  const logicLevel = logic === 'binary' ? 0 : logic === 'taoist' ? 1 : 2;

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-gold)', borderRadius: 6, padding: '14px 16px' }}>
      <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.68rem', color: 'var(--gold)', letterSpacing: '0.14em', marginBottom: 4 }}>
        OCTAVE INTEGRAL · DIFFERENTIAL / ZERO / INTEGRAL
      </div>
      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 12, lineHeight: 1.5 }}>
        Negative octaves = differential (shadow, past). Zero = meeting point. Positive octaves = integral (insight, future).
        Hover an octave to explore.
      </div>

      {/* Octave stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 14 }}>
        {OCTAVE_LEVELS.map((lv) => {
          const isZero = lv.kind === 'zero';
          const isDiff = lv.kind === 'diff';
          const isHov = hoveredR === lv.value;
          const bgColor = isZero ? 'rgba(240,165,0,0.15)' : isDiff ? 'rgba(139,92,246,0.10)' : 'rgba(30,203,225,0.10)';
          const borderC = isZero ? 'rgba(240,165,0,0.5)' : isDiff ? 'rgba(139,92,246,0.35)' : 'rgba(30,203,225,0.35)';
          const textC   = isZero ? 'var(--gold)' : isDiff ? 'var(--purple)' : 'var(--teal)';
          const barW = isZero ? '100%' : `${Math.min(100, 20 + Math.abs(lv.value) * 18)}%`;
          return (
            <div key={lv.value}
              onMouseEnter={() => setHoveredR(lv.value)}
              onMouseLeave={() => setHoveredR(null)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, cursor: 'default',
                padding: '4px 8px',
                background: isHov ? bgColor : isZero ? 'rgba(240,165,0,0.08)' : 'transparent',
                border: `1px solid ${isHov || isZero ? borderC : 'transparent'}`,
                borderRadius: 3, transition: 'all 0.2s',
              }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: textC, minWidth: 44 }}>{lv.label}</span>
              {/* Bar */}
              <div style={{ flex: 1, height: isZero ? 6 : 4, background: 'rgba(255,255,255,0.04)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: barW, height: '100%', background: isDiff ? 'rgba(139,92,246,0.5)' : isZero ? 'rgba(240,165,0,0.6)' : 'rgba(30,203,225,0.5)', borderRadius: 2, transition: 'width 0.3s' }} />
              </div>
              {isHov && (
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', maxWidth: 200, lineHeight: 1.4 }}>{lv.desc}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Karmic logic explorer */}
      <div style={{ borderTop: '1px solid var(--border-gold)', paddingTop: 10 }}>
        <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: 6 }}>
          KARMIC LOGIC EXPLORER · A → B · ¬B → ¬A
        </div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
          <input value={karmicA} onChange={e => setKarmicA(e.target.value)} placeholder={`e.g. "${chosen} grows"`}
            style={{ flex: 1, minWidth: 120, padding: '4px 8px', background: 'rgba(46,125,50,0.1)', border: '1px solid rgba(46,125,50,0.3)', color: 'var(--text-parchment)', fontSize: '0.75rem', borderRadius: 2 }} />
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', alignSelf: 'center' }}>→</span>
          <input value={karmicB} onChange={e => setKarmicB(e.target.value)} placeholder={`e.g. "${opposed} suffers"`}
            style={{ flex: 1, minWidth: 120, padding: '4px 8px', background: 'rgba(30,203,225,0.1)', border: '1px solid rgba(30,203,225,0.3)', color: 'var(--text-parchment)', fontSize: '0.75rem', borderRadius: 2 }} />
        </div>
        {karmicA && karmicB && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ padding: '5px 10px', background: 'rgba(46,125,50,0.1)', border: '1px solid rgba(46,125,50,0.3)', borderRadius: 3, fontSize: '0.75rem', color: 'var(--text-parchment)' }}>
              <span style={{ color: '#2e7d32' }}>A → B:</span> If <em>{karmicA}</em>, then <em>{karmicB}</em>
            </div>
            <div style={{ padding: '5px 10px', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: 3, fontSize: '0.75rem', color: 'var(--text-parchment)' }}>
              <span style={{ color: 'var(--purple)' }}>¬B → ¬A (karmic backlash):</span> If NOT <em>{karmicB}</em>, then eventually NOT <em>{karmicA}</em>
            </div>
            <div style={{ padding: '5px 10px', background: 'rgba(240,165,0,0.08)', border: '1px solid rgba(240,165,0,0.2)', borderRadius: 3, fontSize: '0.7rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              The Law of Imperfection: the False value appears slowly, strengthens through the octave integral, and eventually corrects the original action — not as punishment but as structural necessity.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
