'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import SiteNav from '@/components/philosophy/SiteNav';

// ── Payoff matrix data ──────────────────────────────────────────────────────
const MATRIX = [
  { row: 'Cooperate', col: 'Cooperate', you: 3, them: 3, zone: 'plus', label: 'Both Gain' },
  { row: 'Cooperate', col: 'Defect',    you: 0, them: 5, zone: 'loss',  label: 'You Lose' },
  { row: 'Defect',    col: 'Cooperate', you: 5, them: 0, zone: 'loss',  label: 'They Lose' },
  { row: 'Defect',    col: 'Defect',    you: 1, them: 1, zone: 'zero',  label: 'Both Suffer' },
];

const CELL_COLORS: Record<string, string> = {
  plus: 'rgba(30,203,225,0.18)',
  loss: 'rgba(232,93,74,0.18)',
  zero: 'rgba(139,92,246,0.18)',
};
const CELL_BORDERS: Record<string, string> = {
  plus: 'var(--teal)',
  loss: 'var(--red-fire)',
  zero: 'var(--purple)',
};

export default function GameTheoryPage() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [playerChoice, setPlayerChoice] = useState<'Cooperate' | 'Defect' | null>(null);
  const [opponentChoice, setOpponentChoice] = useState<'Cooperate' | 'Defect' | null>(null);

  const simResult = playerChoice && opponentChoice
    ? MATRIX.find(m => m.row === playerChoice && m.col === opponentChoice)
    : null;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', color: 'var(--text-parchment)' }}>
      <SiteNav />
      

      {/* ── Hero ── */}
      <header style={{ textAlign: 'center', padding: '4rem 1.5rem 2rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--teal)', fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: '0.75rem' }}>
          LAEGNA · X-ZONE &amp; Y-ZONE
        </p>
        <h1 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(1.8rem, 5vw, 3rem)', color: 'var(--gold)', marginBottom: '1rem' }}>
          Game Theory &amp; Logic Systems
        </h1>
        <p style={{ fontFamily: 'var(--font-crimson)', fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto' }}>
          How the structure of a game determines whether cooperation or conflict is rational — and how binary logic locks players into losing equilibria.
        </p>
      </header>

      <div className="geo-divider" style={{ height: '1px', margin: '0 auto 3rem', maxWidth: '600px' }} />

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>

        {/* ── Zero-Sum vs Plus-Sum ── */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div className="phil-card" style={{ padding: '1.75rem' }}>
            <h2 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--red-fire)', marginBottom: '0.75rem', fontSize: '1.2rem' }}>
              Zero-Sum Games
            </h2>
            <p style={{ fontFamily: 'var(--font-crimson)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
              Total gains equal total losses — always. Every point you win, your opponent loses. The pie cannot grow;
              only its distribution changes. This is <span className="highlight-binary">binary logic in action</span>: one winner requires one loser.
            </p>
            <p style={{ fontFamily: 'var(--font-crimson)', lineHeight: 1.7, marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              In Laegna terms, this is the <span className="highlight-binary">X-Zone</span> — the lin/equilibrium zone where opposition is absolute and no synthesis is possible.
            </p>
            <Link href="/game-theory/zero-sum" style={{ color: 'var(--red-fire)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
              EXPLORE X-ZONE →
            </Link>
          </div>

          <div className="phil-card" style={{ padding: '1.75rem' }}>
            <h2 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--teal)', marginBottom: '0.75rem', fontSize: '1.2rem' }}>
              Plus-Sum Games
            </h2>
            <p style={{ fontFamily: 'var(--font-crimson)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
              Total value can <em>grow</em>. Cooperation creates surplus. Forgiveness becomes rational. Genius can emerge
              because expanding the pie benefits everyone more than fighting over its current size.
            </p>
            <p style={{ fontFamily: 'var(--font-crimson)', lineHeight: 1.7, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              This is the <span className="highlight-taoist">Y-Zone</span> — synthesis, creativity, and non-dual possibility.
              The <span className="highlight-laegna">Three Books of Shadows</span> at{' '}
              <a href="https://spireason.neocities.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>spireason.neocities.org</a>{' '}
              gives examples and games of plus-sum thinking.
            </p>
          </div>
        </section>

        {/* ── Payoff Matrix SVG ── */}
        <section className="phil-card" style={{ padding: '2rem', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--gold)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
            Payoff Matrix — Prisoner&apos;s Dilemma
          </h2>
          <p style={{ fontFamily: 'var(--font-crimson)', color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Hover a cell to inspect. <span style={{ color: 'var(--teal)' }}>Teal</span> = plus-sum win · <span style={{ color: 'var(--red-fire)' }}>Red</span> = asymmetric loss · <span style={{ color: 'var(--purple)' }}>Purple</span> = mutual defection trap
          </p>
          <div style={{ overflowX: 'auto' }}>
            <svg viewBox="0 0 400 300" style={{ width: '100%', maxWidth: '420px', display: 'block', margin: '0 auto' }}>
              {/* Column headers */}
              <text x="210" y="28" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontFamily="var(--font-mono)">OPPONENT</text>
              <text x="170" y="52" textAnchor="middle" fill="var(--teal)" fontSize="10" fontFamily="var(--font-mono)">Cooperate</text>
              <text x="300" y="52" textAnchor="middle" fill="var(--red-fire)" fontSize="10" fontFamily="var(--font-mono)">Defect</text>
              {/* Row headers */}
              <text x="30" y="130" textAnchor="middle" fill="var(--teal)" fontSize="10" fontFamily="var(--font-mono)" transform="rotate(-90,30,130)">Cooperate</text>
              <text x="30" y="220" textAnchor="middle" fill="var(--red-fire)" fontSize="10" fontFamily="var(--font-mono)" transform="rotate(-90,30,220)">Defect</text>
              <text x="18" y="175" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontFamily="var(--font-mono)" transform="rotate(-90,18,175)">YOU</text>
              {/* Cells */}
              {[
                { x: 100, y: 60, i: 0 }, { x: 230, y: 60, i: 1 },
                { x: 100, y: 165, i: 2 }, { x: 230, y: 165, i: 3 },
              ].map(({ x, y, i }) => {
                const m = MATRIX[i];
                const isHov = hovered === i;
                return (
                  <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ cursor: 'pointer' }}>
                    <rect x={x} y={y} width={120} height={95} rx="6"
                      fill={isHov ? CELL_COLORS[m.zone].replace('0.18', '0.35') : CELL_COLORS[m.zone]}
                      stroke={isHov ? CELL_BORDERS[m.zone] : 'rgba(255,255,255,0.06)'}
                      strokeWidth={isHov ? 1.5 : 1} />
                    <text x={x + 60} y={y + 26} textAnchor="middle" fill="var(--text-parchment)" fontSize="11" fontFamily="var(--font-cinzel)">{m.label}</text>
                    <text x={x + 60} y={y + 50} textAnchor="middle" fill="var(--gold)" fontSize="13" fontFamily="var(--font-mono)">You: {m.you}</text>
                    <text x={x + 60} y={y + 70} textAnchor="middle" fill="var(--text-muted)" fontSize="12" fontFamily="var(--font-mono)">Them: {m.them}</text>
                    {isHov && <text x={x + 60} y={y + 88} textAnchor="middle" fill={CELL_BORDERS[m.zone]} fontSize="9" fontFamily="var(--font-mono)">{m.zone.toUpperCase()}-SUM</text>}
                  </g>
                );
              })}
            </svg>
          </div>
        </section>

        {/* ── Nash Equilibrium callout ── */}
        <section className="phil-card" style={{ padding: '1.75rem', marginBottom: '3rem', borderColor: 'var(--purple)', borderWidth: '1px' }}>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--purple)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
            Nash Equilibrium: A Trap in Disguise
          </h2>
          <p style={{ fontFamily: 'var(--font-crimson)', lineHeight: 1.75, marginBottom: '0.75rem' }}>
            In zero-sum games, <span className="highlight-laegna">Nash equilibrium</span> is the point where neither player can improve
            by changing strategy alone — given the other holds fixed. It sounds stable. It is a <em>trap</em>.
          </p>
          <p style={{ fontFamily: 'var(--font-crimson)', lineHeight: 1.75, marginBottom: '1rem', color: 'var(--text-muted)' }}>
            In the Prisoner&apos;s Dilemma, the Nash equilibrium is mutual defection (bottom-right cell) — both players receive 1.
            Yet if both cooperated, both receive 3. Trauma-locked binary thinking cannot reach that better outcome.
          </p>
          <Link href="/game-theory/nash" style={{ color: 'var(--purple)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
            EXPLORE NASH EQUILIBRIUM →
          </Link>
        </section>

        {/* ── Prisoner's Dilemma + Trauma ── */}
        <section className="phil-card" style={{ padding: '1.75rem', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--gold)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
            Prisoner&apos;s Dilemma as Trauma-Locked Thinking
          </h2>
          <p style={{ fontFamily: 'var(--font-crimson)', lineHeight: 1.75, marginBottom: '0.75rem' }}>
            The Prisoner&apos;s Dilemma illustrates how <span className="highlight-binary">binary logic</span> — operating only in yes/no, win/lose —
            drives rational agents to collectively irrational outcomes. Each player, reasoning defensively, chooses defect.
          </p>
          <p style={{ fontFamily: 'var(--font-crimson)', lineHeight: 1.75, color: 'var(--text-muted)' }}>
            This mirrors trauma psychology: when the nervous system is locked into threat-response, it perceives every interaction
            as zero-sum. Trust becomes impossible. The <span className="highlight-laegna">Y-Zone</span> — where cooperative surplus is possible —
            is neurologically inaccessible until the binary lock is dissolved.
          </p>
        </section>

        {/* ── Interactive strategy chooser ── */}
        <section className="phil-card" style={{ padding: '1.75rem', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--teal)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
            Choose Your Strategy
          </h2>
          <p style={{ fontFamily: 'var(--font-crimson)', color: 'var(--text-muted)', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
            Select your move and your opponent&apos;s move to see the payoff:
          </p>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.12em' }}>YOUR MOVE</p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {(['Cooperate', 'Defect'] as const).map(c => (
                  <button key={c} onClick={() => setPlayerChoice(c)}
                    className={`selector-btn ${playerChoice === c ? 'active' : ''}`}
                    style={{ color: c === 'Cooperate' ? 'var(--teal)' : 'var(--red-fire)' }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.12em' }}>OPPONENT&apos;S MOVE</p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {(['Cooperate', 'Defect'] as const).map(c => (
                  <button key={c} onClick={() => setOpponentChoice(c)}
                    className={`selector-btn ${opponentChoice === c ? 'active' : ''}`}
                    style={{ color: c === 'Cooperate' ? 'var(--teal)' : 'var(--red-fire)' }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {simResult && (
            <div style={{ padding: '1rem 1.25rem', borderRadius: '8px', background: CELL_COLORS[simResult.zone], border: `1px solid ${CELL_BORDERS[simResult.zone]}`, fontFamily: 'var(--font-crimson)' }}>
              <strong style={{ color: CELL_BORDERS[simResult.zone], fontFamily: 'var(--font-cinzel)', fontSize: '0.9rem' }}>{simResult.label}</strong>
              <span style={{ color: 'var(--text-muted)', marginLeft: '0.75rem', fontSize: '0.9rem' }}>
                You: <span style={{ color: 'var(--gold)' }}>{simResult.you}</span> · Them: <span style={{ color: 'var(--text-parchment)' }}>{simResult.them}</span> · Total: {simResult.you + simResult.them}
              </span>
            </div>
          )}
        </section>

        {/* ── Navigation footer ── */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/game-theory/zero-sum" className="phil-card" style={{ padding: '1rem 1.5rem', flex: 1, minWidth: '200px', textDecoration: 'none' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--red-fire)', letterSpacing: '0.12em', marginBottom: '0.25rem' }}>DEEP DIVE</div>
            <div style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--text-parchment)', fontSize: '0.95rem' }}>Zero-Sum: The X-Zone →</div>
          </Link>
          <Link href="/game-theory/nash" className="phil-card" style={{ padding: '1rem 1.5rem', flex: 1, minWidth: '200px', textDecoration: 'none' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--purple)', letterSpacing: '0.12em', marginBottom: '0.25rem' }}>DEEP DIVE</div>
            <div style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--text-parchment)', fontSize: '0.95rem' }}>Nash Equilibrium: The Trap →</div>
          </Link>
        </div>

      </main>
    </div>
  );
}
