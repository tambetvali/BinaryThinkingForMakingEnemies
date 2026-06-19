'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import SiteNav from '@/components/philosophy/SiteNav';

// ── Payoff matrix for Nash simulation ──────────────────────────────────────
type Strategy = 'C' | 'D';
const PAYOFFS: Record<Strategy, Record<Strategy, [number, number]>> = {
  C: { C: [3, 3], D: [0, 5] },
  D: { C: [5, 0], D: [1, 1] },
};
// Nash equilibrium cells (where neither player can unilaterally improve)
const NASH_CELLS: [Strategy, Strategy][] = [['D', 'D']];
const isNash = (r: Strategy, c: Strategy) => NASH_CELLS.some(([nr, nc]) => nr === r && nc === c);
const STRATEGIES: Strategy[] = ['C', 'D'];
const STRATEGY_LABELS: Record<Strategy, string> = { C: 'Cooperate', D: 'Defect' };

export default function NashPage() {
  const [hovRow, setHovRow] = useState<Strategy | null>(null);
  const [hovCol, setHovCol] = useState<Strategy | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', color: 'var(--text-parchment)' }}>
      <SiteNav />
      

      {/* ── Hero ── */}
      <header style={{ textAlign: 'center', padding: '4rem 1.5rem 2rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--purple)', fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: '0.75rem' }}>
          LAEGNA · X-ZONE FROZEN POINT
        </p>
        <h1 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(1.6rem, 5vw, 2.8rem)', color: 'var(--gold)', marginBottom: '1rem' }}>
          Nash Equilibrium: The Trap
        </h1>
        <p style={{ fontFamily: 'var(--font-crimson)', fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: '620px', margin: '0 auto' }}>
          A stable state no individual can escape — even when everyone would be better off if they all changed together.
        </p>
      </header>

      <div className="geo-divider" style={{ height: '1px', margin: '0 auto 3rem', maxWidth: '600px' }} />

      <main style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>

        {/* ── Definition ── */}
        <section className="phil-card" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--gold)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
            The Formal Definition
          </h2>
          <p style={{ fontFamily: 'var(--font-crimson)', lineHeight: 1.75, marginBottom: '0.75rem' }}>
            A <span className="highlight-laegna">Nash equilibrium</span> is a strategy profile where no player can increase their payoff
            by unilaterally changing their own strategy — <em>given all other players hold their strategies fixed</em>.
          </p>
          <p style={{ fontFamily: 'var(--font-crimson)', lineHeight: 1.75, color: 'var(--text-muted)' }}>
            It is a resting point. A frozen configuration. Named after mathematician John Nash, who proved that every
            finite game has at least one such equilibrium (possibly in mixed strategies).
          </p>
        </section>

        {/* ── Interactive matrix ── */}
        <section className="phil-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--teal)', marginBottom: '0.5rem', fontSize: '1.05rem' }}>
            Interactive Payoff Matrix
          </h2>
          <p style={{ fontFamily: 'var(--font-crimson)', color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.92rem' }}>
            Hover a cell to inspect payoffs. <span style={{ color: 'var(--purple)' }}>Purple glow</span> = Nash equilibrium.
            Payoff format: <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold)' }}>(You, Opponent)</code>
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr', gap: '6px', maxWidth: '400px', margin: '0 auto' }}>
            {/* Header row */}
            <div />
            {STRATEGIES.map(c => (
              <div key={c} style={{
                textAlign: 'center', padding: '0.5rem',
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em',
                color: c === 'C' ? 'var(--teal)' : 'var(--red-fire)',
              }}>
                OPP: {STRATEGY_LABELS[c]}
              </div>
            ))}

            {/* Data rows */}
            {STRATEGIES.map(r => (
              <React.Fragment key={r}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                  paddingRight: '0.75rem',
                  fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em',
                  color: r === 'C' ? 'var(--teal)' : 'var(--red-fire)',
                  writingMode: 'horizontal-tb',
                }}>
                  YOU: {STRATEGY_LABELS[r]}
                </div>
                {STRATEGIES.map(c => {
                  const [py, po] = PAYOFFS[r][c];
                  const nash = isNash(r, c);
                  const hov = hovRow === r && hovCol === c;
                  return (
                    <div key={c}
                      onMouseEnter={() => { setHovRow(r); setHovCol(c); }}
                      onMouseLeave={() => { setHovRow(null); setHovCol(null); }}
                      style={{
                        padding: '1rem 0.75rem',
                        borderRadius: '8px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        background: nash
                          ? 'rgba(139,92,246,0.22)'
                          : hov ? 'rgba(30,203,225,0.12)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${nash ? 'var(--purple)' : hov ? 'var(--teal)' : 'rgba(255,255,255,0.07)'}`,
                        boxShadow: nash ? '0 0 14px rgba(139,92,246,0.35)' : 'none',
                        transition: 'all 0.2s',
                      }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--gold)', marginBottom: '2px' }}>
                        {py}, {po}
                      </div>
                      <div style={{ fontFamily: 'var(--font-crimson)', fontSize: '0.75rem', color: nash ? 'var(--purple)' : 'var(--text-muted)' }}>
                        {nash ? '⚠ Nash' : hov ? `Σ=${py + po}` : '—'}
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>

          <p style={{ fontFamily: 'var(--font-crimson)', textAlign: 'center', color: 'var(--text-muted)', marginTop: '1.25rem', fontSize: '0.88rem' }}>
            Nash equilibrium: <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--purple)' }}>(Defect, Defect) → (1, 1)</code>.
            Yet <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--teal)' }}>(Cooperate, Cooperate) → (3, 3)</code> is Pareto-superior.
          </p>
        </section>

        {/* ── The Trap ── */}
        <section className="phil-card" style={{ padding: '1.75rem', marginBottom: '2rem', borderColor: 'rgba(139,92,246,0.4)', borderWidth: '1px' }}>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--purple)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
            Why It&apos;s a Trap
          </h2>
          <p style={{ fontFamily: 'var(--font-crimson)', lineHeight: 1.75, marginBottom: '0.75rem' }}>
            In the Prisoner&apos;s Dilemma, mutual defection is the Nash equilibrium. Neither player can do better
            by switching — if I cooperate while you defect, I get 0 instead of 1. So defection is individually rational.
          </p>
          <p style={{ fontFamily: 'var(--font-crimson)', lineHeight: 1.75, marginBottom: '0.75rem', color: 'var(--text-muted)' }}>
            But the collective outcome is <strong style={{ color: 'var(--text-parchment)' }}>suboptimal for both</strong>: both receive{' '}
            <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--red-fire)' }}>1</code>, when mutual cooperation
            would give both <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--teal)' }}>3</code>. The equilibrium is stable
            but not efficient. Locally optimal, globally catastrophic.
          </p>
          <p style={{ fontFamily: 'var(--font-crimson)', lineHeight: 1.75, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            This gap — between individual rationality and collective welfare — is the mathematical signature of
            <span className="highlight-binary"> trauma-locked binary thinking</span>.
          </p>
        </section>

        {/* ── Laegna X-Zone frozen point ── */}
        <section className="phil-card" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--gold)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
            Laegna: The X-Zone Frozen Point
          </h2>
          <p style={{ fontFamily: 'var(--font-crimson)', lineHeight: 1.75, marginBottom: '0.75rem' }}>
            In Laegna, the Nash equilibrium in a zero-sum or trauma-locked game is the <span className="highlight-binary">X-Zone frozen point</span> —
            a state of maximum rigidity where binary opposition has crystallised into stasis.
          </p>
          <p style={{ fontFamily: 'var(--font-crimson)', lineHeight: 1.75, color: 'var(--text-muted)' }}>
            Neither player can move without apparent loss. The game appears stable. But stability here is not peace —
            it is a <em>locked system</em>. The <span className="highlight-taoist">Y-Zone</span> disrupts it not by changing
            strategy within the game, but by changing the game itself.
          </p>
        </section>

        {/* ── Escaping through non-dual logic ── */}
        <section className="phil-card" style={{ padding: '1.75rem', marginBottom: '2.5rem', borderColor: 'rgba(30,203,225,0.3)', borderWidth: '1px' }}>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--teal)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
            Non-Dual Escape: Change the Game
          </h2>
          <p style={{ fontFamily: 'var(--font-crimson)', lineHeight: 1.75, marginBottom: '0.75rem' }}>
            <span className="highlight-taoist">Blue Ocean Strategy</span> is the business translation of this insight:
            don&apos;t compete harder in the existing game — render it irrelevant by creating a new value space where
            the defect/cooperate dilemma doesn&apos;t apply.
          </p>
          <p style={{ fontFamily: 'var(--font-crimson)', lineHeight: 1.75, color: 'var(--text-muted)' }}>
            In Laegna terms, this is the move from <span className="highlight-binary">X-Zone</span> to{' '}
            <span className="highlight-taoist">Y-Zone</span>: synthesising a new game rather than optimising within
            the old one. The Nash equilibrium becomes moot — because the payoff matrix itself has changed.
          </p>
        </section>

        {/* ── Back nav ── */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/game-theory" className="phil-card" style={{ padding: '0.9rem 1.4rem', textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--gold)' }}>← BACK TO GAME THEORY</span>
          </Link>
          <Link href="/game-theory/zero-sum" className="phil-card" style={{ padding: '0.9rem 1.4rem', textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--red-fire)' }}>← ZERO-SUM: THE X-ZONE</span>
          </Link>
        </div>

      </main>
    </div>
  );
}
