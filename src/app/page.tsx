'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import SiteNav from '@/components/philosophy/SiteNav';
import OppositionViz from '@/components/philosophy/OppositionViz';
import LogicTriangle from '@/components/philosophy/LogicTriangle';
import PanoramaSection from '@/components/philosophy/PanoramaSection';
import ClickableTerm, { DualTerm } from '@/components/philosophy/ClickableTerm';

const LaegnaAIChat = dynamic(() => import('@/components/philosophy/LaegnaAIChat'), { ssr: false });

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', position: 'relative', zIndex: 1 }}>
      <SiteNav />

      {/* Hero */}
      <section style={{ padding: '60px 16px 40px', textAlign: 'center', position: 'relative' }}>
        <CosmicBackground />
        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.72rem', color: 'var(--teal)', letterSpacing: '0.25em', marginBottom: 16 }}>
            SPIREASON · LAEGNA MATHEMATICS · TAMBET VÄLI
          </div>
          <h1 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(1.8rem, 5vw, 3.2rem)', color: 'var(--text-parchment)', lineHeight: 1.2, marginBottom: 20, letterSpacing: '0.04em' }}>
            <ClickableTerm action={{ type: 'logic', value: 'binary' }}>Binary</ClickableTerm>
            {' '}vs.{' '}
            <ClickableTerm action={{ type: 'logic', value: 'taoist' }}>Taoist</ClickableTerm>
            <br />
            <span style={{ color: 'var(--gold)' }}>Opposition</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 620, margin: '0 auto 32px' }}>
            In the{' '}
            <ClickableTerm action={{ type: 'mode', value: 'material' }}>material</ClickableTerm>
            {' '}world,{' '}
            <DualTerm mode="material" modality="bottom-up">capitalism</DualTerm>
            {' '}and{' '}
            <DualTerm mode="material" modality="top-down">communism</DualTerm>
            {' '}oppose each other. In the{' '}
            <ClickableTerm action={{ type: 'mode', value: 'spiritual' }}>spiritual</ClickableTerm>
            {' '}world,{' '}
            <DualTerm mode="spiritual" modality="bottom-up">materialism</DualTerm>
            {' '}and{' '}
            <DualTerm mode="spiritual" modality="top-down">spirituality</DualTerm>
            {' '}do. Click any term to explore it through{' '}
            <ClickableTerm action={{ type: 'logic', value: 'binary' }}>either/or</ClickableTerm>
            {', '}
            <ClickableTerm action={{ type: 'logic', value: 'taoist' }}>both/and</ClickableTerm>
            {', or '}
            <ClickableTerm action={{ type: 'logic', value: 'laegna' }}>four-fold</ClickableTerm>
            {' '}logic.
          </p>
          <div className="geo-divider" style={{ maxWidth: 400, margin: '0 auto' }} />
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 24 }}>
            <QuickLink href="/trauma" color="var(--red-fire)">Historical Trauma ↗</QuickLink>
            <QuickLink href="/game-theory" color="var(--teal)">Game Theory ↗</QuickLink>
            <QuickLink href="/laegna" color="var(--gold)">Laegna Letters ↗</QuickLink>
            <QuickLink href="https://spireason.neocities.org" color="var(--purple)" external>SpiReason ↗</QuickLink>
          </div>
        </div>
      </section>

      {/* Main panorama */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px 80px' }}>
        {/* Row 1: Opposition viz + logic triangle */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 40 }}>
          <OppositionViz />
          <LogicTriangle />
        </div>

        <div className="geo-divider" />

        {/* Panorama sections */}
        <Suspense fallback={null}>
          <PanoramaSection />
        </Suspense>

        <div className="geo-divider" />

        {/* AI Chat */}
        <div style={{ marginBottom: 40 }}>
          <SectionTitle color="var(--teal)">The Laegna Oracle</SectionTitle>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: 20, lineHeight: 1.65 }}>
            Ask about Laegna math, SpiReason philosophy, or the logic behind any opposition.
            The Oracle knows Tambet Väli's full ecosystem — including the I·O·A·E value letters,
            Z·X·Y spatial zones, and the trauma-to-binary-logic pipeline.
          </p>
          <LaegnaAIChat />
        </div>

        <div className="geo-divider" />

        {/* Three games explanation */}
        <ThreeGamesSection />

        <div className="geo-divider" />

        {/* Links to sub-pages */}
        <ExploreSection />
      </main>
    </div>
  );
}

function SectionTitle({ children, color = 'var(--gold)' }: { children: React.ReactNode; color?: string }) {
  return (
    <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(1.1rem, 3vw, 1.6rem)', color, marginBottom: 16, letterSpacing: '0.06em' }}>
      {children}
    </h2>
  );
}

function QuickLink({ href, color, children, external }: { href: string; color: string; children: React.ReactNode; external?: boolean }) {
  const props = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <a href={href} {...props} style={{
      padding: '8px 18px', border: `1px solid ${color}`, color,
      fontSize: '0.82rem', fontFamily: 'var(--font-cinzel)', letterSpacing: '0.06em',
      transition: 'all 0.2s', borderRadius: '2px',
    }}
      onMouseOver={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = color + '22'; }}
      onMouseOut={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}>
      {children}
    </a>
  );
}

function CosmicBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <svg viewBox="0 0 1200 300" style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.12 }}>
        <circle cx="200" cy="150" r="120" fill="none" stroke="var(--gold)" strokeWidth="0.5" />
        <circle cx="200" cy="150" r="80" fill="none" stroke="var(--teal)" strokeWidth="0.5" />
        <circle cx="1000" cy="150" r="100" fill="none" stroke="var(--purple)" strokeWidth="0.5" />
        <circle cx="1000" cy="150" r="60" fill="none" stroke="var(--gold)" strokeWidth="0.5" />
        <line x1="0" y1="150" x2="1200" y2="150" stroke="var(--gold)" strokeWidth="0.3" />
        <line x1="600" y1="0" x2="600" y2="300" stroke="var(--gold)" strokeWidth="0.3" />
        {[...Array(12)].map((_, i) => (
          <circle key={i} cx={100 + i * 90} cy={50 + (i % 3) * 80} r="1.5" fill="var(--teal)" opacity="0.6" />
        ))}
      </svg>
    </div>
  );
}

function ThreeGamesSection() {
  return (
    <section>
      <SectionTitle>Three Integration Games</SectionTitle>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: 24, lineHeight: 1.65 }}>
        Non-dual logic offers three ways to handle opposition — depending on context, readiness, and the nature of what is being opposed.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        <GameCard
          title="Situation · Choice"
          symbol="⚔"
          color="var(--red-fire)"
          subtitle="Dual integration (temporary)"
          body="Positive of one is opposed to negative of the other. This is valid when full integration is impossible yet — not a permanent state. In binary logic, this is the only game: hate. In Taoist/Laegna, it is contextual."
          laegna="X-zone — equilibrium — zero-sum temporary state"
        />
        <GameCard
          title="Crown · Love"
          symbol="◈"
          color="var(--gold)"
          subtitle="Integration (highest)"
          body="Positive of one integrates with positive of the other. Minimizing negative in one minimizes it in the other. This is the Y-zone: plus-sum, moving target, forgiveness possible, genius emerges."
          laegna="Y-zone — plus-sum — E (Posetion) integrating with A (Position)"
        />
        <GameCard
          title="Root · Stability"
          symbol="⊞"
          color="var(--teal)"
          subtitle="Coexistence (linear)"
          body="Both poles coexist without needing to merge or fight. A stable linear solution — the Z-zone root. Democracy and mixed economies attempt this. Buddhistic middle path."
          laegna="Z-zone — log contraction — stable O·A coexistence"
        />
      </div>
      <div style={{ marginTop: 20, padding: '16px 20px', background: 'var(--gold-dim)', border: '1px solid var(--border-gold)', borderLeft: '3px solid var(--red-fire)', fontSize: '0.9rem', color: 'var(--text-parchment)', lineHeight: 1.65 }}>
        <ClickableTerm action={{ type: 'logic', value: 'binary' }}>Binary logic</ClickableTerm>
        {' '}sees only the first game — <em>Situation / Hate</em> — and makes it permanent.
        This is why{' '}
        <ClickableTerm action={{ type: 'logic', value: 'binary' }}>either/or thinking</ClickableTerm>
        {' '}equals zero-sum Nash equilibrium: no forgiveness, no integration,
        genius suppressed, only one can win.{' '}
        <ClickableTerm action={{ type: 'logic', value: 'taoist' }}>Both/and logic</ClickableTerm>
        {' '}and{' '}
        <ClickableTerm action={{ type: 'logic', value: 'laegna' }}>four-fold Laegna</ClickableTerm>
        {' '}unlock the other two games.
      </div>
    </section>
  );
}

function GameCard({ title, symbol, color, subtitle, body, laegna }: {
  title: string; symbol: string; color: string; subtitle: string; body: string; laegna: string;
}) {
  return (
    <div className="phil-card" style={{ borderColor: color + '44' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{ fontSize: '1.8rem', color }}>{symbol}</div>
        <div>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.88rem', color, letterSpacing: '0.06em' }}>{title}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>{subtitle}</div>
        </div>
      </div>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 12 }}>{body}</p>
      <div style={{ fontSize: '0.72rem', color, background: color + '11', padding: '6px 10px', borderRadius: '2px', fontFamily: 'var(--font-mono)' }}>
        {laegna}
      </div>
    </div>
  );
}

function ExploreSection() {
  const pages = [
    { href: '/trauma', title: 'Historical Trauma', color: 'var(--red-fire)', desc: 'How trauma encodes binary logic. Jungian projection, shadow economics, and the archaeology of fixed opposition.', symbol: '⚡' },
    { href: '/game-theory', title: 'Game Theory', color: 'var(--teal)', desc: 'Zero-sum Nash traps vs. plus-sum emergence. Simulations, payoff matrices, and the mathematics of hate vs. love.', symbol: '♟' },
    { href: '/business-theory', title: 'Business Theory', color: 'var(--purple)', desc: 'Red Ocean (X-zone, zero-sum, compete to kill) vs. Blue Ocean (Y-zone, plus-sum, create new value).', symbol: '◉' },
    { href: '/laegna', title: 'Laegna Letters', color: 'var(--gold)', desc: 'I·O·A·E value letters and Z·X·Y spatial zones. The full Laegna mathematical logic system by Tambet Väli.', symbol: 'ℒ' },
  ];

  return (
    <section>
      <SectionTitle>Explore the System</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        {pages.map(({ href, title, color, desc, symbol }) => (
          <a key={href} href={href} className="phil-card" style={{ display: 'block', borderColor: color + '33', transition: 'all 0.3s' }}
            onMouseOver={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = color; }}
            onMouseOut={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = color + '33'; }}>
            <div style={{ fontSize: '2rem', color, marginBottom: 10 }}>{symbol}</div>
            <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.88rem', color, marginBottom: 8, letterSpacing: '0.06em' }}>{title}</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{desc}</p>
            <div style={{ marginTop: 12, fontSize: '0.72rem', color, letterSpacing: '0.08em' }}>EXPLORE →</div>
          </a>
        ))}
      </div>
    </section>
  );
}
