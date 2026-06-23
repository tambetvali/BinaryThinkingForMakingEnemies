'use client';
import React from 'react';
import { usePhilosophyStore } from '@/store/philosophyStore';
import ClickableTerm, { DualTerm } from '@/components/philosophy/ClickableTerm';

// Pair highlight: a span that gets a subtle background tint
// when the given mode is active — marks the whole semantic group.
function PairHighlight({ pairMode, children }: { pairMode: 'material' | 'spiritual'; children: React.ReactNode }) {
  const { mode } = usePhilosophyStore();
  const active = mode === pairMode;
  // Night: slightly lighter blue-ish wash; Day: slightly warmer wash
  const bg = active
    ? pairMode === 'material'
      ? 'rgba(200,160,0,0.09)'   // amber wash for material pair
      : 'rgba(109,57,200,0.09)'  // purple wash for spiritual pair
    : 'transparent';
  return (
    <span style={{ background: bg, borderRadius: 3, padding: '1px 2px', transition: 'background 0.35s' }}>
      {children}
    </span>
  );
}

// DualTerm: clicking sets BOTH mode and modality simultaneously.
// I → material+bottom-up, O → material+top-down, A → spiritual+bottom-up, E → spiritual+top-down
export default function PanoramaSection() {
  const { mode, modality, logic } = usePhilosophyStore();

  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(1.1rem, 3vw, 1.6rem)', color: 'var(--gold)', marginBottom: 20, letterSpacing: '0.06em' }}>
        The Opposition Panorama
      </h2>

      {/* All-coverage intro — always the same regardless of selectors */}
      <div className="phil-card" style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.15em', marginBottom: 12 }}>
          SCOPE & CONTEXT — ALL MODES
        </div>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-parchment)', lineHeight: 1.75 }}>
          Every society faces a fundamental question: <em>should we organize from the{' '}
          <ClickableTerm action={{ type: 'modality', value: 'bottom-up' }}>bottom up ☽ Yin</ClickableTerm>
          {' '}or the{' '}
          <ClickableTerm action={{ type: 'modality', value: 'top-down' }}>top down ☀ Yang</ClickableTerm>?
          </em>{' '}
          In the{' '}
          <ClickableTerm action={{ type: 'mode', value: 'material' }}>material</ClickableTerm>
          {' world, this crystallizes as '}
          <PairHighlight pairMode="material">
            <DualTerm mode="material" modality="bottom-up">capitalism</DualTerm>
            {' versus '}
            <DualTerm mode="material" modality="top-down">communism</DualTerm>
          </PairHighlight>
          {'. In the '}
          <ClickableTerm action={{ type: 'mode', value: 'spiritual' }}>spiritual</ClickableTerm>
          {' world, it is '}
          <PairHighlight pairMode="spiritual">
            <DualTerm mode="spiritual" modality="bottom-up">materialism</DualTerm>
            {' versus '}
            <DualTerm mode="spiritual" modality="top-down">spirituality</DualTerm>
          </PairHighlight>
          {'. '}
          <ClickableTerm action={{ type: 'logic', value: 'binary' }}>Either/or logic</ClickableTerm>
          {' forces a permanent choice. '}
          <ClickableTerm action={{ type: 'logic', value: 'taoist' }}>Both/and logic</ClickableTerm>
          {' reveals both contain the same optimization structure. '}
          <ClickableTerm action={{ type: 'logic', value: 'laegna' }}>Four-fold Laegna</ClickableTerm>
          {' gives us precise symbols: '}
          <DualTerm mode="material" modality="bottom-up">I</DualTerm>
          {' · '}
          <DualTerm mode="material" modality="top-down">O</DualTerm>
          {' · '}
          <DualTerm mode="spiritual" modality="bottom-up">A</DualTerm>
          {' · '}
          <DualTerm mode="spiritual" modality="top-down">E</DualTerm>
          {' for values, '}
          <ClickableTerm action={{ type: 'logic', value: 'binary' }}>Z</ClickableTerm>
          {' · '}
          <ClickableTerm action={{ type: 'logic', value: 'taoist' }}>X</ClickableTerm>
          {' · '}
          <ClickableTerm action={{ type: 'logic', value: 'laegna' }}>Y</ClickableTerm>
          {' for space.'}
        </p>
      </div>

      {/* Reactive section: changes based on mode + logic */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 24 }}>
        <MaterialExplanation mode={mode} modality={modality} logic={logic} />
        <SpiritualExplanation mode={mode} modality={modality} logic={logic} />
      </div>

      {/* Logic system deep-dive — highlights based on selection */}
      <LogicDeepDive logic={logic} mode={mode} modality={modality} />

      {/* Separator narrative */}
      <div style={{ marginTop: 28, padding: '20px 24px', background: 'var(--bg-card)', border: '1px solid var(--border-teal)', borderRadius: '4px' }}>
        <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.7rem', color: 'var(--teal)', letterSpacing: '0.15em', marginBottom: 10 }}>
          NON-BINARY OPPOSITION — SEPARATE DEFINITION REQUIRED
        </div>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-parchment)', lineHeight: 1.75 }}>
          Non-binary logic requires that we <strong style={{ color: 'var(--teal)' }}>define the opposition separately</strong> — 
          not just negate one pole to get the other. Whether a government should be communist, capitalist, or mixed 
          is a <em>specific case</em>, not an eternal truth. The logical pair (capitalism ↔ communism) is <em>not</em> the 
          same as the logical opposite (capitalism ↔ anti-capitalism). Laegna: A·E are the positive pair, I·O are the 
          negative pair. They <em>coexist in the same system</em>. Forcing them into binary X-conflict is the error.
        </p>
      </div>
    </section>
  );
}

function MaterialExplanation({ mode, modality, logic }: { mode: string; modality: string; logic: string }) {
  const isActive = mode === 'material';
  const accentColor = isActive ? 'var(--gold)' : 'var(--text-muted)';
  const borderColor = isActive ? 'var(--border-gold)' : 'rgba(122,138,154,0.15)';

  const topPole = modality === 'bottom-up' ? 'Capitalism' : 'Communism';
  const botPole = modality === 'bottom-up' ? 'Communism' : 'Capitalism';

  return (
    <div className="phil-card" style={{ borderColor, opacity: isActive ? 1 : 0.65, transition: 'all 0.4s' }}>
      <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.72rem', color: accentColor, letterSpacing: '0.15em', marginBottom: 12 }}>
        MATERIAL MODE {isActive ? '◆ ACTIVE' : ''}
      </div>
      <h3 style={{ fontFamily: 'var(--font-cinzel)', color: accentColor, fontSize: '1rem', marginBottom: 12 }}>
        {topPole} vs {botPole}
      </h3>

      {logic === 'binary' && (
        <div style={{ fontSize: '0.88rem', color: 'var(--text-parchment)', lineHeight: 1.7 }}>
          <p style={{ marginBottom: 8 }}>
            <strong style={{ color: 'var(--red-fire)' }}>Binary frame:</strong> "{topPole}: I am this, therefore I am NOT that." 
            The negative is implied by the positive. This is linear thinking rooted in historical trauma — 
            wars, revolutions, ideological purges became encoded in collective memory as permanent opposition.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            See: <a href="/trauma" style={{ color: 'var(--red-fire)' }}>Historical Trauma →</a>
          </p>
        </div>
      )}
      {(logic === 'taoist' || logic === 'laegna') && (
        <div style={{ fontSize: '0.88rem', color: 'var(--text-parchment)', lineHeight: 1.7 }}>
          <p style={{ marginBottom: 8 }}>
            <strong style={{ color: accentColor }}>{logic === 'taoist' ? 'Taoist' : 'Laegna'} frame:</strong>{' '}
            {topPole} optimizes {modality === 'bottom-up' ? 'individual gain minimizing collective loss' : 'collective gain minimizing individual loss'}. 
            {botPole} does the <em>same</em> — from the opposite direction. Both are{' '}
            <span style={{ color: 'var(--teal)' }}>optimization engines</span>, not pure opposites.
          </p>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            The communist who calls themselves dangerous is projecting the Jungian shadow — 
            trauma-converted binary logic sounds like anti-capitalism but is the same game.
          </p>
          {logic === 'laegna' && (
            <div style={{ marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--gold)', background: 'var(--gold-dim)', padding: '6px 10px' }}>
              {modality === 'bottom-up' ? 'A (Position) ← Capitalism · Communism → O (Negation)' : 'E (Posetion) ← Communism · Capitalism → I (Negotion)'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SpiritualExplanation({ mode, modality, logic }: { mode: string; modality: string; logic: string }) {
  const isActive = mode === 'spiritual';
  const accentColor = isActive ? 'var(--purple)' : 'var(--text-muted)';
  const borderColor = isActive ? 'rgba(139,92,246,0.3)' : 'rgba(122,138,154,0.15)';

  const topPole = modality === 'bottom-up' ? 'Materialism' : 'Spirituality';
  const botPole = modality === 'bottom-up' ? 'Spirituality' : 'Materialism';

  return (
    <div className="phil-card" style={{ borderColor, opacity: isActive ? 1 : 0.65, transition: 'all 0.4s' }}>
      <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.72rem', color: accentColor, letterSpacing: '0.15em', marginBottom: 12 }}>
        SPIRITUAL MODE {isActive ? '◆ ACTIVE' : ''}
      </div>
      <h3 style={{ fontFamily: 'var(--font-cinzel)', color: accentColor, fontSize: '1rem', marginBottom: 12 }}>
        {topPole} vs {botPole}
      </h3>

      {logic === 'binary' && (
        <div style={{ fontSize: '0.88rem', color: 'var(--text-parchment)', lineHeight: 1.7 }}>
          <p style={{ marginBottom: 8 }}>
            <strong style={{ color: 'var(--red-fire)' }}>Materialist critique:</strong> "Spirit people are idealists. 
            They overvalue human sensation, or worse — measure material gain as psychological satisfaction, 
            psychologizing spiritualism into uselessness." Finite, causal, clear-bound is the safe ground.
          </p>
          <p style={{ marginBottom: 8 }}>
            <strong style={{ color: 'var(--purple)' }}>Spiritual critique:</strong> "Materialists deny the goal-directed 
            nature of consciousness, reducing infinite recursive experience to mere chemistry."
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            Both critiques are binary: each negates the other.
          </p>
        </div>
      )}
      {(logic === 'taoist' || logic === 'laegna') && (
        <div style={{ fontSize: '0.88rem', color: 'var(--text-parchment)', lineHeight: 1.7 }}>
          <p style={{ marginBottom: 8 }}>
            <strong style={{ color: accentColor }}>{logic === 'taoist' ? 'Taoist' : 'Laegna'} synthesis:</strong>{' '}
            Materialism holds the <span style={{ color: '#cd853f' }}>root</span>: matter is the substrate, 
            causal and finite. Christianity calls this sacrifice; Buddhism calls it dukkha; Viking tradition calls it darkness. 
            Spirituality holds the <span style={{ color: 'var(--purple)' }}>crown</span>: goal-based, 
            infinity-recursive, assumes nature evolves through epochs.
          </p>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Neither invalidates the other. The error of binary logic is forcing "matter IS spirit" or "spirit IS matter" as permanent exclusions.
          </p>
          {logic === 'laegna' && (
            <div style={{ marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--purple)', background: 'var(--purple-dim)', padding: '6px 10px' }}>
              {modality === 'bottom-up' ? 'A (Position) ← Matter · Spirit → E (Posetion) : Y-zone' : 'E (Posetion) ← Spirit · Matter → A (Position) : Z-zone root'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function LogicDeepDive({ logic, mode, modality }: { logic: string; mode: string; modality: string }) {
  const bullets = {
    binary: [
      { text: 'Zero-sum: one gains exactly what the other loses', active: true },
      { text: 'Nash equilibrium: neither player can improve unilaterally', active: true },
      { text: 'Red Ocean: compete in existing market space', active: false },
      { text: 'Jungian projection: shadow is assigned to the opposed pole', active: true },
      { text: 'Historical trauma converts nuance into permanent exclusion', active: true },
      { text: 'No forgiveness possible — the X-zone has no Y component', active: false },
    ],
    taoist: [
      { text: 'Yin and Yang coexist: each contains a seed of the other', active: true },
      { text: 'Three transition modes: situation, integration, coexistence', active: true },
      { text: 'Positive of one can integrate with positive of the other', active: true },
      { text: 'Opposition is contextual — valid now, may dissolve later', active: false },
      { text: 'Moving target: what was opposing may become complementary', active: true },
      { text: 'Blue Ocean: create new value space, leave red behind', active: true },
    ],
    laegna: [
      { text: 'I (Negotion): active negation — dynamic opposition', active: true },
      { text: 'O (Negation): passive negation — stable absence', active: true },
      { text: 'A (Position): passive position — stable presence', active: true },
      { text: 'E (Posetion): active position — dynamic expression', active: true },
      { text: 'X-zone: linear/equilibrium — zero-sum, Nash, hate', active: false },
      { text: 'Y-zone: exp expansion — plus-sum, forgiveness, genius', active: true },
      { text: 'Z-zone: log contraction — root, stability, coexistence', active: true },
    ],
  };

  const currentBullets = bullets[logic as keyof typeof bullets];
  const color = logic === 'binary' ? 'var(--red-fire)' : logic === 'taoist' ? 'var(--teal)' : 'var(--gold)';

  return (
    <div className="phil-card" style={{ marginTop: 24 }}>
      <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.7rem', color, letterSpacing: '0.15em', marginBottom: 16 }}>
        {logic.toUpperCase()} LOGIC — KEY FEATURES
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 8 }}>
        {currentBullets.map((b, i) => (
          <div key={i} style={{
            display: 'flex', gap: 10, alignItems: 'flex-start',
            padding: '8px 12px',
            background: b.active ? color + '0f' : 'transparent',
            border: `1px solid ${b.active ? color + '33' : 'transparent'}`,
            borderRadius: '3px', transition: 'all 0.3s',
          }}>
            <span style={{ color: b.active ? color : 'var(--text-muted)', marginTop: 2, flexShrink: 0 }}>
              {b.active ? '◆' : '◇'}
            </span>
            <span style={{ fontSize: '0.85rem', color: b.active ? 'var(--text-parchment)' : 'var(--text-muted)', lineHeight: 1.5 }}>
              {b.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
