'use client';
import React from 'react';
import Link from 'next/link';
import SiteNav from '@/components/philosophy/SiteNav';

export default function ZeroSumPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', color: 'var(--text-parchment)' }}>
      <SiteNav />
      

      {/* ── Hero ── */}
      <header style={{ textAlign: 'center', padding: '4rem 1.5rem 2rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--red-fire)', fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: '0.75rem' }}>
          LAEGNA · X-ZONE · BINARY OPPOSITION
        </p>
        <h1 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(1.6rem, 5vw, 2.8rem)', color: 'var(--gold)', marginBottom: '1rem' }}>
          Zero-Sum Games: The X-Zone
        </h1>
        <p style={{ fontFamily: 'var(--font-crimson)', fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          When the pie cannot grow, every bite you take is a bite taken from another. This is binary opposition made mathematical.
        </p>
      </header>

      <div className="geo-divider" style={{ height: '1px', margin: '0 auto 3rem', maxWidth: '600px' }} />

      <main style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>

        {/* ── Core definition ── */}
        <section className="phil-card" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--gold)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
            The Formal Definition
          </h2>
          <p style={{ fontFamily: 'var(--font-crimson)', lineHeight: 1.75, marginBottom: '0.75rem' }}>
            A game is <span className="highlight-binary">zero-sum</span> when the sum of all players&apos; payoffs is constant across every possible outcome.
            If player A gains <code style={{ color: 'var(--teal)', fontFamily: 'var(--font-mono)' }}>+n</code>, player B necessarily loses <code style={{ color: 'var(--red-fire)', fontFamily: 'var(--font-mono)' }}>−n</code>.
          </p>
          <p style={{ fontFamily: 'var(--font-crimson)', lineHeight: 1.75, color: 'var(--text-muted)' }}>
            The total payoff is not just constant — it is algebraically fixed. No action by either player can change
            the sum. Only distribution changes, never the whole.
          </p>
        </section>

        {/* ── Seesaw SVG ── */}
        <section className="phil-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--teal)', marginBottom: '1rem', fontSize: '1.05rem' }}>
            The Zero-Sum Balance
          </h2>
          <svg viewBox="0 0 400 200" style={{ width: '100%', maxWidth: '420px', display: 'block', margin: '0 auto' }}>
            {/* Fulcrum */}
            <polygon points="200,150 185,170 215,170" fill="rgba(240,165,0,0.3)" stroke="var(--gold)" strokeWidth="1" />
            <line x1="185" y1="170" x2="215" y2="170" stroke="var(--gold)" strokeWidth="1.5" />
            {/* Beam (tilted) */}
            <line x1="60" y1="110" x2="340" y2="145" stroke="var(--text-muted)" strokeWidth="2.5" strokeLinecap="round" />
            {/* Left side — winner */}
            <rect x="30" y="68" width="70" height="40" rx="5" fill="rgba(30,203,225,0.15)" stroke="var(--teal)" strokeWidth="1" />
            <text x="65" y="84" textAnchor="middle" fill="var(--teal)" fontSize="10" fontFamily="var(--font-mono)">WINNER</text>
            <text x="65" y="100" textAnchor="middle" fill="var(--teal)" fontSize="13" fontFamily="var(--font-mono)">+5</text>
            {/* Right side — loser */}
            <rect x="300" y="105" width="70" height="40" rx="5" fill="rgba(232,93,74,0.15)" stroke="var(--red-fire)" strokeWidth="1" />
            <text x="335" y="121" textAnchor="middle" fill="var(--red-fire)" fontSize="10" fontFamily="var(--font-mono)">LOSER</text>
            <text x="335" y="137" textAnchor="middle" fill="var(--red-fire)" fontSize="13" fontFamily="var(--font-mono)">−5</text>
            {/* Total label */}
            <text x="200" y="190" textAnchor="middle" fill="var(--gold)" fontSize="10" fontFamily="var(--font-mono)">TOTAL = 0  (always)</text>
          </svg>
          <p style={{ fontFamily: 'var(--font-crimson)', textAlign: 'center', color: 'var(--text-muted)', marginTop: '1rem', fontSize: '0.9rem' }}>
            One side rises only as the other falls. The beam always returns to the same total.
          </p>
        </section>

        {/* ── Laegna X-Zone ── */}
        <section className="phil-card" style={{ padding: '1.75rem', marginBottom: '2rem', borderColor: 'rgba(232,93,74,0.4)', borderWidth: '1px' }}>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--red-fire)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
            Laegna: The X-Zone
          </h2>
          <p style={{ fontFamily: 'var(--font-crimson)', lineHeight: 1.75, marginBottom: '0.75rem' }}>
            In Laegna notation, <span className="highlight-binary">X = the lin/equilibrium zone</span>. It is the domain of binary opposition — where every
            proposition is either true or false, every relationship is either ally or enemy, every game is either won or lost.
          </p>
          <p style={{ fontFamily: 'var(--font-crimson)', lineHeight: 1.75, color: 'var(--text-muted)' }}>
            Zero-sum games are X-Zone games in mathematical form. The logic that governs them is the same logic that
            governs trauma responses, adversarial legal systems, and red-ocean business competition.
          </p>
        </section>

        {/* ── Examples ── */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { name: 'Chess', desc: 'One player wins; the other loses. No draw is a "both win."', color: 'var(--teal)' },
            { name: 'War', desc: 'Territory, resources, and prisoners are redistributed — never created.', color: 'var(--red-fire)' },
            { name: 'Market Share Fights', desc: 'In a static market, your 5% gain is a competitor\'s 5% loss. Red ocean.', color: 'var(--purple)' },
          ].map(ex => (
            <div key={ex.name} className="phil-card" style={{ padding: '1.25rem' }}>
              <h3 style={{ fontFamily: 'var(--font-cinzel)', color: ex.color, marginBottom: '0.5rem', fontSize: '1rem' }}>{ex.name}</h3>
              <p style={{ fontFamily: 'var(--font-crimson)', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{ex.desc}</p>
            </div>
          ))}
        </section>

        {/* ── Genius suppression ── */}
        <section className="phil-card" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--gold)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
            How Zero-Sum Thinking Suppresses Genius
          </h2>
          <p style={{ fontFamily: 'var(--font-crimson)', lineHeight: 1.75, marginBottom: '0.75rem' }}>
            When players believe the pie is fixed, all creative energy flows into <em>taking</em> — not baking.
            Innovation, collaboration, and trust become strategic liabilities rather than assets.
          </p>
          <p style={{ fontFamily: 'var(--font-crimson)', lineHeight: 1.75, color: 'var(--text-muted)' }}>
            <span className="highlight-binary">Binary logic</span> cannot conceive of a move that grows total value — because its ontology has no category for
            &ldquo;both win more.&rdquo; The <span className="highlight-taoist">Y-Zone</span> is literally unthinkable from within X-Zone reasoning.
          </p>
        </section>

        {/* ── Path out ── */}
        <section className="phil-card" style={{ padding: '1.75rem', marginBottom: '2.5rem', borderColor: 'rgba(30,203,225,0.3)', borderWidth: '1px' }}>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--teal)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
            The Path Out
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--teal)', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>Y-ZONE</p>
              <p style={{ fontFamily: 'var(--font-crimson)', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Through creativity and synthesis — redesign the game so the pie grows. Blue Ocean strategy. Collaborative R&amp;D.
              </p>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--purple)', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>Z-ZONE</p>
              <p style={{ fontFamily: 'var(--font-crimson)', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Through coexistence treaties — agree to stop fighting over the pie and jointly protect it. Non-aggression pacts.
              </p>
            </div>
          </div>
        </section>

        {/* ── Back nav ── */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/game-theory" className="phil-card" style={{ padding: '0.9rem 1.4rem', textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--gold)' }}>← BACK TO GAME THEORY</span>
          </Link>
          <Link href="/game-theory/nash" className="phil-card" style={{ padding: '0.9rem 1.4rem', textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--purple)' }}>NASH EQUILIBRIUM →</span>
          </Link>
        </div>

      </main>
    </div>
  );
}
