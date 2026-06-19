'use client';

import React from 'react';
import Link from 'next/link';
import SiteNav from '@/components/philosophy/SiteNav';

// ── Page ─────────────────────────────────────────────────────────────────────
export default function TraumaPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', color: 'var(--text-parchment)' }}>
      <SiteNav />
      
      <main style={{ maxWidth: 860, margin: '0 auto', padding: '0 16px 80px' }}>
        <HeroSection />
        <MechanismSection />
        <JungianSection />
        <LaegnaSection />
        <VisualizationsSection />
        <TraumaPatternsSection />
        <HealingSection />
        <FooterLinks />
      </main>
    </div>
  );
}

// ── Shared style helpers ─────────────────────────────────────────────────────
const card: React.CSSProperties = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border-gold)',
  borderRadius: 12,
  padding: '28px 32px',
  marginBottom: 28,
};
const sectionTitle: React.CSSProperties = {
  fontFamily: 'var(--font-cinzel)',
  fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
  color: 'var(--gold)',
  letterSpacing: '0.06em',
  marginBottom: 14,
};
const body: React.CSSProperties = {
  fontFamily: 'var(--font-crimson)',
  fontSize: '1.1rem',
  color: 'var(--text-parchment)',
  lineHeight: 1.8,
};
const muted: React.CSSProperties = {
  fontFamily: 'var(--font-crimson)',
  fontSize: '1rem',
  color: 'var(--text-muted)',
  lineHeight: 1.75,
};

// ── Trauma Loop SVG ──────────────────────────────────────────────────────────
function TraumaLoopSVG() {
  return (
    <svg viewBox="0 0 320 200" width="100%" style={{ maxWidth: 320 }} aria-label="Trauma loop vs healing spiral">
      {/* Closed loop — trauma */}
      <g transform="translate(80,100)">
        <circle cx="0" cy="0" r="50" fill="none" stroke="var(--red-fire)" strokeWidth="2.5" strokeDasharray="6 3" opacity="0.85" />
        <text x="0" y="5" textAnchor="middle" fill="var(--red-fire)" fontSize="9" fontFamily="var(--font-cinzel)" letterSpacing="0.08em">TRAUMA</text>
        <text x="0" y="17" textAnchor="middle" fill="var(--text-muted)" fontSize="7">LOOP</text>
        {/* Arrows on loop */}
        <path d="M0,-50 L6,-44 L-6,-44Z" fill="var(--red-fire)" opacity="0.8" />
        <path d="M50,0 L44,6 L44,-6Z" fill="var(--red-fire)" opacity="0.8" />
        <path d="M0,50 L-6,44 L6,44Z" fill="var(--red-fire)" opacity="0.8" />
        <path d="M-50,0 L-44,-6 L-44,6Z" fill="var(--red-fire)" opacity="0.8" />
      </g>
      {/* Divider */}
      <line x1="160" y1="20" x2="160" y2="180" stroke="rgba(240,165,0,0.2)" strokeWidth="1" strokeDasharray="4 4" />
      {/* Open spiral — healing */}
      <g transform="translate(240,100)">
        <path d="M0,0 Q10,-15 20,-10 Q35,-5 30,10 Q25,30 5,35 Q-20,38 -35,20 Q-50,0 -40,-25 Q-25,-50 5,-55"
          fill="none" stroke="var(--teal)" strokeWidth="2.5" opacity="0.85" />
        <text x="0" y="-62" textAnchor="middle" fill="var(--teal)" fontSize="9" fontFamily="var(--font-cinzel)" letterSpacing="0.08em">HEALING</text>
        <text x="0" y="-50" textAnchor="middle" fill="var(--text-muted)" fontSize="7">SPIRAL</text>
        <path d="M5,-55 L12,-52 L4,-47Z" fill="var(--teal)" opacity="0.9" />
      </g>
      {/* Label row */}
      <text x="80" y="175" textAnchor="middle" fill="var(--red-fire)" fontSize="8" fontFamily="var(--font-cinzel)" opacity="0.7">Binary / Closed</text>
      <text x="240" y="175" textAnchor="middle" fill="var(--teal)" fontSize="8" fontFamily="var(--font-cinzel)" opacity="0.7">Taoist / Open</text>
    </svg>
  );
}

// ── Binary Axis SVG ──────────────────────────────────────────────────────────
function BinaryAxisSVG() {
  return (
    <svg viewBox="0 0 340 140" width="100%" style={{ maxWidth: 340 }} aria-label="Binary opposition collapsing to axis">
      {/* Axis */}
      <line x1="20" y1="70" x2="320" y2="70" stroke="var(--text-muted)" strokeWidth="1.5" />
      <circle cx="20" cy="70" r="5" fill="var(--red-fire)" />
      <circle cx="320" cy="70" r="5" fill="var(--red-fire)" />
      <text x="20" y="95" textAnchor="middle" fill="var(--red-fire)" fontSize="8" fontFamily="var(--font-cinzel)">EVIL</text>
      <text x="320" y="95" textAnchor="middle" fill="var(--red-fire)" fontSize="8" fontFamily="var(--font-cinzel)">GOOD</text>
      {/* Midpoint — Taoist reconciliation */}
      <circle cx="170" cy="70" r="8" fill="none" stroke="var(--gold)" strokeWidth="2" />
      <circle cx="170" cy="70" r="3" fill="var(--gold)" />
      <text x="170" y="95" textAnchor="middle" fill="var(--gold)" fontSize="8" fontFamily="var(--font-cinzel)">中 CENTRE</text>
      {/* Y-zone arc */}
      <path d="M60,70 Q170,10 280,70" fill="none" stroke="var(--teal)" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.7" />
      <text x="170" y="22" textAnchor="middle" fill="var(--teal)" fontSize="8" fontFamily="var(--font-cinzel)" letterSpacing="0.08em">Y-ZONE · PLUS-SUM</text>
      {/* X markers */}
      <text x="20" y="55" textAnchor="middle" fill="var(--red-fire)" fontSize="11" fontFamily="var(--font-mono)">X</text>
      <text x="320" y="55" textAnchor="middle" fill="var(--red-fire)" fontSize="11" fontFamily="var(--font-mono)">X</text>
      <text x="170" y="55" textAnchor="middle" fill="var(--gold)" fontSize="11" fontFamily="var(--font-mono)">Y</text>
      {/* Z annotation */}
      <text x="170" y="130" textAnchor="middle" fill="var(--purple)" fontSize="8" fontFamily="var(--font-cinzel)" letterSpacing="0.08em">Z-ZONE · STABLE COEXISTENCE</text>
    </svg>
  );
}

// ── Trauma Pattern Card ───────────────────────────────────────────────────────
function TraumaCard({ icon, title, binary, healing }: { icon: string; title: string; binary: string; healing: string }) {
  return (
    <div style={{ ...card, borderLeft: '3px solid var(--red-fire)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ fontSize: '2rem', marginBottom: 8 }}>{icon}</div>
      <div style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--text-parchment)', fontSize: '0.95rem', letterSpacing: '0.06em', marginBottom: 10 }}>{title}</div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <span style={{ background: 'rgba(232,93,74,0.12)', border: '1px solid rgba(232,93,74,0.3)', borderRadius: 6, padding: '4px 10px', fontSize: '0.82rem', color: 'var(--red-fire)', fontFamily: 'var(--font-mono)' }}>
          ✗ {binary}
        </span>
        <span style={{ background: 'rgba(30,203,225,0.08)', border: '1px solid rgba(30,203,225,0.25)', borderRadius: 6, padding: '4px 10px', fontSize: '0.82rem', color: 'var(--teal)', fontFamily: 'var(--font-mono)' }}>
          ✦ {healing}
        </span>
      </div>
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section style={{ padding: '56px 0 36px', textAlign: 'center', position: 'relative' }}>
      {/* Subtle background rune */}
      <svg style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', opacity: 0.04, pointerEvents: 'none' }}
        width="420" height="420" viewBox="0 0 420 420">
        <polygon points="210,10 410,360 10,360" fill="none" stroke="var(--red-fire)" strokeWidth="1.5" />
        <polygon points="210,410 10,60 410,60" fill="none" stroke="var(--gold)" strokeWidth="1" />
        <circle cx="210" cy="210" r="120" fill="none" stroke="var(--teal)" strokeWidth="1" />
      </svg>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.7rem', color: 'var(--red-fire)', letterSpacing: '0.3em', marginBottom: 14, opacity: 0.8 }}>
          SPIREASON · LAEGNA ANALYSIS
        </div>
        <h1 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(1.7rem, 5vw, 3rem)', color: 'var(--text-parchment)', lineHeight: 1.2, marginBottom: 20, letterSpacing: '0.04em' }}>
          Historical Trauma<br />
          <span style={{ color: 'var(--red-fire)' }}>&amp; Binary Logic</span>
        </h1>
        <p style={{ ...body, maxWidth: 600, margin: '0 auto 24px', color: 'var(--text-muted)' }}>
          When civilisations are shattered — by war, revolution, or purge — the wound does not heal 
          into nuance. It heals into a wall. <em style={{ color: 'var(--text-parchment)' }}>Us versus Them</em> is not a political position.
          It is a <span className="highlight-binary">trauma response</span> encoded in collective memory.
        </p>
        <div className="geo-divider" style={{ maxWidth: 360, margin: '0 auto' }} />
      </div>
    </section>
  );
}

// ── Mechanism ────────────────────────────────────────────────────────────────
function MechanismSection() {
  return (
    <section style={card}>
      <h2 style={sectionTitle}>How Trauma Creates Binary Thinking</h2>
      <p style={body}>
        Under existential threat, the brain collapses its model of reality. Complex social systems —
        economies, ideologies, religions — are compressed into a single axis: <span className="highlight-binary">safe&thinsp;/&thinsp;dangerous</span>.
        This is not a cognitive failure. It is an adaptive shortcut. In a war, nuance kills you.
      </p>
      <p style={{ ...muted, marginTop: 14 }}>
        The tragedy is that peace arrives, but the compression does not reverse. Generations inherit 
        the binary map long after the territory it described has dissolved. The left–right political 
        spectrum, the sacred–profane religious divide, the capitalist–communist economic axis: 
        all are <strong style={{ color: 'var(--text-parchment)' }}>frozen binary oppositions</strong> that originated in historical trauma.
      </p>
      <div style={{ marginTop: 18, padding: '14px 18px', background: 'rgba(232,93,74,0.07)', border: '1px solid rgba(232,93,74,0.2)', borderRadius: 8 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--red-fire)' }}>
          X-ZONE PATTERN:
        </span>
        <span style={{ ...muted, marginLeft: 10, fontSize: '0.88rem' }}>
          Threat → Compression → Binary map → Inherited opposition → New threat generated from the map itself
        </span>
      </div>
    </section>
  );
}

// ── Jungian ──────────────────────────────────────────────────────────────────
function JungianSection() {
  return (
    <section style={card}>
      <h2 style={sectionTitle}>Jungian Shadow &amp; the Projection Game</h2>
      <p style={body}>
        Carl Jung observed that what we cannot integrate within ourselves, we project outward as the Enemy. 
        The revolutionary traumatised by aristocratic oppression does not simply oppose the aristocrat —
        he <em>becomes</em> the mirror image: equally rigid, equally certain, equally violent.
      </p>
      <p style={{ ...muted, marginTop: 14 }}>
        In contemporary politics: a person traumatised by capitalism may proudly call themselves 
        <span className="highlight-binary"> "dangerous communist"</span> — not as a programme, but as a power-gesture.
        The identity is borrowed from the trauma's opposite pole. This is the shadow speaking, 
        not a genuine alternative vision.
      </p>
      <p style={{ ...muted, marginTop: 14 }}>
        <span className="highlight-taoist">Taoist analysis:</span> Both poles of the binary are generated 
        by the same wound. The opposition between them is not a natural tension (like Yin–Yang) 
        but a <strong style={{ color: 'var(--text-parchment)' }}>locked circuit</strong> — energy cycling without escape, 
        each pole feeding the other's existence.
      </p>
    </section>
  );
}

// ── Laegna ───────────────────────────────────────────────────────────────────
function LaegnaSection() {
  return (
    <section style={card}>
      <h2 style={sectionTitle}>Laegna Analysis: X · Y · Z Zones</h2>
      <p style={body}>
        In Laegna mathematics, trauma is a <span className="highlight-laegna">X-zone</span> phenomenon: 
        zero-sum, linear, closed. Every gain for one pole is an equal loss for the other. 
        The four Laegna letters describe the axes of value space:
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, margin: '18px 0' }}>
        {[
          { sym: 'I', label: 'Input', desc: 'What enters — perception, history, wound', color: 'var(--teal)' },
          { sym: 'O', label: 'Output', desc: 'What is projected — enemy, shadow, binary', color: 'var(--red-fire)' },
          { sym: 'A', label: 'Accumulation', desc: 'What crystallises — ideology, identity', color: 'var(--gold)' },
          { sym: 'E', label: 'Expansion', desc: 'What grows — healing, integration, Y-zone', color: 'var(--purple)' },
        ].map(({ sym, label, desc, color }) => (
          <div key={sym} style={{ background: 'rgba(5,8,16,0.6)', border: `1px solid ${color}30`, borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', color, marginBottom: 4 }}>{sym}</div>
            <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.75rem', color: 'var(--text-parchment)', letterSpacing: '0.08em', marginBottom: 6 }}>{label}</div>
            <div style={{ ...muted, fontSize: '0.82rem' }}>{desc}</div>
          </div>
        ))}
      </div>
      <p style={{ ...muted, marginTop: 10 }}>
        <strong style={{ color: 'var(--gold)' }}>X-zone</strong> = trauma-locked opposition (zero-sum).&ensp;
        <strong style={{ color: 'var(--teal)' }}>Y-zone</strong> = recognition of the other's logic (plus-sum).&ensp;
        <strong style={{ color: 'var(--purple)' }}>Z-zone</strong> = stable coexistence without requiring the enemy's defeat.
      </p>
    </section>
  );
}

// ── Visualizations ───────────────────────────────────────────────────────────
function VisualizationsSection() {
  return (
    <section style={{ ...card, borderColor: 'rgba(30,203,225,0.2)' }}>
      <h2 style={sectionTitle}>Geometric Witness</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <TraumaLoopSVG />
          <p style={{ ...muted, fontSize: '0.82rem', marginTop: 10 }}>
            Trauma circulates in a closed loop. Healing opens into a spiral — 
            each cycle slightly larger, slightly less certain of its own walls.
          </p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <BinaryAxisSVG />
          <p style={{ ...muted, fontSize: '0.82rem', marginTop: 10 }}>
            The binary opposition collapses to a single axis (X-zone). 
            The Laegna Y-zone arcs above it — a space that contains both poles 
            without being defined by their conflict.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Trauma Patterns ──────────────────────────────────────────────────────────
function TraumaPatternsSection() {
  return (
    <section>
      <h2 style={{ ...sectionTitle, marginBottom: 20 }}>Three Archetypal Trauma Patterns</h2>
      <TraumaCard
        icon="⚖️"
        title="Economic Trauma → Binary Opposition"
        binary="Capitalism vs. Communism"
        healing="Mixed optima + Laegna A/E balance"
      />
      <TraumaCard
        icon="☽"
        title="Spiritual Trauma → Binary Opposition"
        binary="Materialism vs. Transcendence"
        healing="Immanent-Taoist non-dualism"
      />
      <TraumaCard
        icon="⚔️"
        title="Social Trauma → Binary Identity"
        binary="Us vs. Them (in-group purity)"
        healing="Z-zone stable multi-identity coexistence"
      />
    </section>
  );
}

// ── Healing ──────────────────────────────────────────────────────────────────
function HealingSection() {
  return (
    <section style={{ ...card, borderColor: 'rgba(139,92,246,0.3)', marginTop: 8 }}>
      <h2 style={sectionTitle}>Healing Paths: Taoist &amp; Laegna Logic</h2>
      <p style={body}>
        The Tao Te Ching offers the earliest systematic description of how binary thinking produces 
        its own undoing: <em style={{ color: 'var(--teal)' }}>"Being and non-being create each other."</em> 
        To insist on the absolute reality of one pole is to guarantee the return of the other. 
        Every purge creates the next revolution.
      </p>
      <p style={{ ...muted, marginTop: 14 }}>
        <span className="highlight-laegna">Laegna healing</span> operates differently: it asks the traumatised 
        person to locate the <strong style={{ color: 'var(--text-parchment)' }}>optimisation logic</strong> inside the 
        enemy's position. What is the communist optimising for, seen not as evil but as a problem-solving strategy?
        What constraint is capitalism solving? When you can describe the other's logic from the inside, 
        the binary axis becomes a <em>spectrum of optimisation strategies</em> — and the trauma loop opens.
      </p>
      <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
        {[
          { step: '01', text: 'Name the binary: identify the locked opposition', color: 'var(--red-fire)' },
          { step: '02', text: 'Trace its origin: find the historical wound', color: 'var(--gold)' },
          { step: '03', text: "Model the other's logic: find their optimisation", color: 'var(--teal)' },
          { step: '04', text: 'Locate the Y-zone: a strategy above the axis', color: 'var(--purple)' },
        ].map(({ step, text, color }) => (
          <div key={step} style={{ padding: '14px 16px', background: 'rgba(5,8,16,0.7)', borderRadius: 8, border: `1px solid ${color}25` }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color, marginBottom: 6, letterSpacing: '0.1em' }}>STEP {step}</div>
            <div style={{ ...muted, fontSize: '0.88rem' }}>{text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Footer Links ─────────────────────────────────────────────────────────────
function FooterLinks() {
  return (
    <footer style={{ textAlign: 'center', paddingTop: 36 }}>
      <div className="geo-divider" style={{ maxWidth: 320, margin: '0 auto 28px' }} />
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.82rem', color: 'var(--gold)', letterSpacing: '0.08em', padding: '8px 18px', border: '1px solid var(--border-gold)', borderRadius: 6 }}>
          ← Home
        </Link>
        <Link href="/game-theory" style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.82rem', color: 'var(--teal)', letterSpacing: '0.08em', padding: '8px 18px', border: '1px solid rgba(30,203,225,0.2)', borderRadius: 6 }}>
          Game Theory ↗
        </Link>
        <Link href="/laegna" style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.82rem', color: 'var(--purple)', letterSpacing: '0.08em', padding: '8px 18px', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 6 }}>
          Laegna Letters ↗
        </Link>
      </div>
      <p style={{ ...muted, marginTop: 24, fontSize: '0.78rem', opacity: 0.5 }}>
        SpiReason · Laegna Mathematics · Tambet Väli
      </p>
    </footer>
  );
}
