'use client';
import React from 'react';
import { usePhilosophyStore, getOppositionPair } from '@/store/philosophyStore';

export default function OppositionViz() {
  const { mode, modality, logic } = usePhilosophyStore();
  const pair = getOppositionPair(mode, modality);

  const logicColor = logic === 'binary' ? 'var(--red-fire)' : logic === 'taoist' ? 'var(--teal)' : 'var(--gold)';
  const logicBg = logic === 'binary' ? 'var(--red-dim)' : logic === 'taoist' ? 'var(--teal-dim)' : 'var(--gold-dim)';

  return (
    <div className="phil-card" style={{ padding: '32px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.15em', marginBottom: 8 }}>
          CURRENT OPPOSITION
        </div>
        <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.82rem', color: logicColor, letterSpacing: '0.1em' }}>
          {logic === 'binary' ? 'BINARY · BASE-2 · ZERO-SUM' : logic === 'taoist' ? 'TAOIST · BASE-4 · DUAL FLOW' : 'LAEGNA · BASE-4 · FOUR-FOLD'}
        </div>
      </div>

      {/* Responsive: row on wide, column on narrow */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 0,
        minWidth: 0,
      }}>
        {/* Chosen side */}
        <div style={{
          flex: '1 1 120px',
          minWidth: 0,
          background: logicBg,
          border: `1px solid ${logicColor}`,
          borderRight: 'none',
          borderBottom: 'none',
          padding: '16px 12px',
          textAlign: 'center',
          transition: 'all 0.4s',
        }}>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1rem', color: logicColor, marginBottom: 4, wordBreak: 'keep-all' }}>
            {pair.chosen}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {modality === 'bottom-up' ? '☽ Yin' : '☀ Yang'}
          </div>
          <div style={{ marginTop: 8, fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            {getChosenDescription(mode, modality, logic)}
          </div>
        </div>

        {/* Middle symbol — full-width row at bottom when wrapped */}
        <div style={{
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 10px',
          background: 'var(--bg-deep)',
          border: `1px solid ${logicColor}`,
          borderBottom: 'none',
          minWidth: 36,
        }}>
          <div style={{ fontSize: logic === 'binary' ? '1.4rem' : '1.2rem', color: logicColor, transition: 'all 0.4s', lineHeight: 1 }}>
            {logic === 'binary' ? '≠' : logic === 'taoist' ? '☯' : '⊕'}
          </div>
          <div style={{ fontSize: '0.52rem', color: 'var(--text-muted)', marginTop: 3, fontFamily: 'var(--font-cinzel)', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
            {logic === 'binary' ? 'VS' : logic === 'taoist' ? 'AND' : 'WITH'}
          </div>
        </div>

        {/* Opposed side */}
        <div style={{
          flex: '1 1 120px',
          minWidth: 0,
          background: 'rgba(122,138,154,0.06)',
          border: `1px solid rgba(122,138,154,0.3)`,
          borderLeft: 'none',
          borderBottom: 'none',
          padding: '16px 12px',
          textAlign: 'center',
          transition: 'all 0.4s',
          opacity: logic === 'binary' ? 0.8 : 1,
        }}>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1rem', color: 'var(--text-muted)', marginBottom: 4, wordBreak: 'keep-all' }}>
            {logic === 'binary' ? `¬ ${pair.opposed}` : pair.opposed}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {modality === 'bottom-up' ? '☀ Yang' : '☽ Yin'}
          </div>
          <div style={{ marginTop: 8, fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            {getOpposedDescription(mode, modality, logic)}
          </div>
        </div>

        {/* Bottom border strip */}
        <div style={{ width: '100%', height: 1, background: `${logicColor}55` }} />
      </div>

      {/* Logic explanation */}
      <div style={{ marginTop: 20, padding: '12px 16px', background: 'rgba(5,8,16,0.5)', borderLeft: `3px solid ${logicColor}`, fontSize: '0.88rem', lineHeight: 1.65, color: 'var(--text-parchment)' }}>
        {getLogicExplanation(mode, modality, logic)}
      </div>
    </div>
  );
}

function getChosenDescription(mode: string, modality: string, logic: string): string {
  if (mode === 'material' && modality === 'bottom-up') {
    if (logic === 'binary') return 'I am capitalist. I am NOT communist. Linear causal reasoning from historical trauma.';
    if (logic === 'taoist') return 'I am capitalist. Yet communism too optimizes gain and minimizes loss — just top-down. Both serve interest.';
    return 'A (Position): Capitalism holds the active positive. E (Posetion) flows toward it. Yet O and I coexist as the space of choice.';
  }
  if (mode === 'material' && modality === 'top-down') {
    if (logic === 'binary') return 'I am communist. I am NOT capitalist. The collective precedes the individual.';
    if (logic === 'taoist') return '"I am communist" — but this may be left-wing trauma projection: accusing capitalism of one\'s own shadow.';
    return 'O (Negation): Communism holds the passive negation space. Integration with A (capitalism) completes the system.';
  }
  if (mode === 'spiritual' && modality === 'bottom-up') {
    if (logic === 'binary') return 'Matter is real. Spirit is wishful thinking. Finite, causal, clear-bound: this is what we know.';
    if (logic === 'taoist') return 'Materialism is the root. Spirit grows from it — not despite it. Both are expressions of the same ground.';
    return 'A (Position): Materialism is the passive positive — the stable ground from which all inquiry begins.';
  }
  // spiritual top-down
  if (logic === 'binary') return 'Spirit precedes matter. Goal-based, recursive, infinite — nature evolves through epochs of experience.';
  if (logic === 'taoist') return 'Spirituality is the crown: infinite recursion, goal logic. Matter is its root: it does not contradict.';
  return 'E (Posetion): Spirit is the active expression. A (matter) is its substrate. Y-zone (plus-sum) enables both.';
}

function getOpposedDescription(mode: string, modality: string, logic: string): string {
  if (logic === 'binary') {
    return 'The negated pole. In binary logic, affirming one side mathematically excludes the other. Zero-sum Nash trap.';
  }
  if (logic === 'taoist') {
    return 'Not truly negated — contextually positioned. Taoist logic finds the grain of truth in the opponent\'s view.';
  }
  return 'Held in the I–O space (Negotion–Negation): the dynamic negative pair that gives meaning to A–E through contrast.';
}

function getLogicExplanation(mode: string, modality: string, logic: string): string {
  const pair = getOppositionPair(mode as 'material' | 'spiritual', modality as 'top-down' | 'bottom-up');
  if (logic === 'binary') {
    return `Binary (Base-2): ${pair.chosen} = TRUE → ${pair.opposed} = FALSE. This is zero-sum Nash equilibrium — X-zone in Laegna. Historical trauma converts contextual opposition into permanent exclusion, suppressing nuance and creating red-ocean competition where only one can win.`;
  }
  if (logic === 'taoist') {
    return `Taoist (Base-4): ${pair.chosen} and ${pair.opposed} coexist as complementary flows. The positive of one can integrate with the negative of the other. Three games: Situation (choice), Crown (integration/love), Root (stable coexistence). No permanent exclusion.`;
  }
  return `Laegna (Base-4): I (Negotion) · O (Negation) · A (Position) · E (Posetion). ${pair.chosen} occupies the A–E zone; ${pair.opposed} occupies the I–O zone. The X–Y axis (zero-sum vs plus-sum) determines whether they compete (X) or co-evolve (Y). Space itself changes by Z–X–Y zone projection.`;
}
