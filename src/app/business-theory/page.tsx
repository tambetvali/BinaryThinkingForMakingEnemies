'use client';
import React, { useState } from 'react';
import SiteNav from '@/components/philosophy/SiteNav';

// ─── Ocean Visualization ────────────────────────────────────────────────────
function OceanViz({ mode }: { mode: 'split' | 'laegna' }) {
  return (
    <svg viewBox="0 0 420 200" style={{ width: '100%', height: 'auto', borderRadius: 8 }}>
      {/* Background */}
      <rect width="420" height="200" fill="#060c18" rx="8" />
      {/* Red Ocean — left half */}
      <rect x="0" y="0" width="210" height="200" fill="rgba(232,93,74,0.07)" rx="8" />
      <text x="105" y="24" textAnchor="middle" fill="#e85d4a" fontSize="11" fontFamily="var(--font-cinzel)" opacity="0.9">RED OCEAN</text>
      {/* crowded dots */}
      {[40,70,55,90,120,105,80,145,160,135,170,190,60,100,130,155,45,85,115,145].map((cx, i) => (
        <circle key={i} cx={cx} cy={40 + (i % 7) * 22} r={3 + (i % 3)} fill="#e85d4a" opacity={0.5 + (i % 4) * 0.1} />
      ))}
      <text x="105" y="185" textAnchor="middle" fill="#e85d4a" fontSize="8" fontFamily="var(--font-crimson)" opacity="0.7">Zero-sum · Nash equilibrium · X-zone</text>
      {/* Divider */}
      <line x1="210" y1="10" x2="210" y2="190" stroke="rgba(240,165,0,0.3)" strokeWidth="1" strokeDasharray="4,3" />
      {/* Blue Ocean — right half */}
      <rect x="210" y="0" width="210" height="200" fill="rgba(30,203,225,0.06)" rx="8" />
      <text x="315" y="24" textAnchor="middle" fill="#1ecbe1" fontSize="11" fontFamily="var(--font-cinzel)" opacity="0.9">BLUE OCEAN</text>
      {/* sparse dots */}
      {[240,290,350,380,260,330,400].map((cx, i) => (
        <circle key={i} cx={cx} cy={60 + i * 18} r={2 + (i % 2)} fill="#1ecbe1" opacity={0.35 + i * 0.06} />
      ))}
      {/* open space arrow */}
      <path d="M230 100 Q315 80 400 60" stroke="#1ecbe1" strokeWidth="1.5" fill="none" opacity="0.4" strokeDasharray="5,3" />
      <text x="315" y="185" textAnchor="middle" fill="#1ecbe1" fontSize="8" fontFamily="var(--font-crimson)" opacity="0.7">Plus-sum · Moving target · Y-zone</text>
    </svg>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function BusinessTheoryPage() {
  const [vizMode, setVizMode] = useState<'split' | 'laegna'>('split');
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', color: 'var(--text-parchment)', position: 'relative', zIndex: 1 }}>
      <SiteNav />
      
      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* HERO */}
        <HeroSection />
        {/* OCEAN PANELS */}
        <OceanPanels />
        {/* GAME THEORY LINK */}
        <GameTheorySection />
        {/* IDEOLOGY SECTION */}
        <IdeologySection />
        {/* SPIRITUALITY SECTION */}
        <SpiritualitySection />
        {/* MOVING TARGET */}
        <MovingTargetSection />
        {/* VIZ */}
        <VizSection vizMode={vizMode} setVizMode={setVizMode} />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--teal)', letterSpacing: '0.2em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
        Strategy · Game Theory · Logic Systems
      </div>
      <h1 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', color: 'var(--gold)', marginBottom: '1rem', lineHeight: 1.2 }}>
        Business Strategy &amp; Logic Systems
      </h1>
      <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7, fontSize: '1rem' }}>
        Every market is a field of logic. How you frame the field determines whether you compete — or create.
        Explore how Red and Blue Ocean strategies map to deeper patterns of thought.
      </p>
      <div className="geo-divider" style={{ margin: '2rem auto', maxWidth: 300 }} />
    </div>
  );
}

function OceanPanels() {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Red Ocean */}
        <div className="phil-card" style={{ borderColor: 'rgba(232,93,74,0.35)', background: 'linear-gradient(135deg, rgba(232,93,74,0.08) 0%, var(--bg-card) 100%)' }}>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.7rem', letterSpacing: '0.18em', color: '#e85d4a', marginBottom: '0.5rem' }}>X-ZONE</div>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.25rem', color: '#e85d4a', marginBottom: '0.75rem' }}>Red Ocean</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
            Compete in existing market space. Fight over existing demand. Exploit the value-cost trade-off. Beat the competition.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.82rem', lineHeight: 2 }}>
            {['Zero-sum game', 'Nash equilibrium', 'Binary logic', 'Static target'].map(t => (
              <li key={t} style={{ color: 'var(--text-muted)' }}>
                <span style={{ color: '#e85d4a', marginRight: '0.5rem' }}>▸</span>{t}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '1rem', padding: '0.6rem 0.8rem', background: 'rgba(232,93,74,0.1)', borderRadius: 4, fontSize: '0.78rem', color: '#e85d4a', fontFamily: 'var(--font-mono)' }}>
            Established by W. Chan Kim &amp; Renée Mauborgne
          </div>
        </div>
        {/* Blue Ocean */}
        <div className="phil-card" style={{ borderColor: 'rgba(30,203,225,0.35)', background: 'linear-gradient(135deg, rgba(30,203,225,0.08) 0%, var(--bg-card) 100%)' }}>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.7rem', letterSpacing: '0.18em', color: 'var(--teal)', marginBottom: '0.5rem' }}>Y-ZONE</div>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.25rem', color: 'var(--teal)', marginBottom: '0.75rem' }}>Blue Ocean</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
            Create uncontested market space. Make competition irrelevant. Create and capture new demand. Break the value-cost trade-off.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.82rem', lineHeight: 2 }}>
            {['Plus-sum game', 'Moving target', 'Emergent logic', 'Dynamic creation'].map(t => (
              <li key={t} style={{ color: 'var(--text-muted)' }}>
                <span style={{ color: 'var(--teal)', marginRight: '0.5rem' }}>▸</span>{t}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '1rem', padding: '0.6rem 0.8rem', background: 'rgba(30,203,225,0.08)', borderRadius: 4, fontSize: '0.78rem', color: 'var(--teal)', fontFamily: 'var(--font-mono)' }}>
            Kim &amp; Mauborgne — same authors, deeper insight
          </div>
        </div>
      </div>
    </section>
  );
}

function GameTheorySection() {
  return (
    <section className="phil-card" style={{ marginBottom: '2.5rem', borderColor: 'rgba(240,165,0,0.25)' }}>
      <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.1rem', color: 'var(--gold)', marginBottom: '1rem' }}>
        Game Theory Link
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
        <div style={{ padding: '1rem', background: 'rgba(232,93,74,0.07)', borderRadius: 6, borderLeft: '3px solid #e85d4a' }}>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.75rem', color: '#e85d4a', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>RED OCEAN = X-ZONE</div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Zero-sum Nash equilibrium. Every gain is another&apos;s loss. Players converge on a static optimal point. The game has a fixed ruleset.
          </p>
        </div>
        <div style={{ padding: '1rem', background: 'rgba(30,203,225,0.07)', borderRadius: 6, borderLeft: '3px solid var(--teal)' }}>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.75rem', color: 'var(--teal)', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>BLUE OCEAN = Y-ZONE</div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Plus-sum emergent equilibrium. Value is created, not divided. The game rewrites its own rules as players discover new spaces.
          </p>
        </div>
      </div>
    </section>
  );
}

function IdeologySection() {
  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.2rem', color: 'var(--gold)', marginBottom: '1.25rem' }}>
        Capitalism &amp; Communism — Two Logics
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="phil-card" style={{ borderColor: 'rgba(232,93,74,0.25)' }}>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.7rem', color: '#e85d4a', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>BINARY LOGIC → RED OCEAN</div>
          <p style={{ fontSize: '0.87rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Both ideologies compete for the same ideological market share: <em style={{ color: 'var(--text-parchment)' }}>my worldview must defeat yours</em>.
            This is zero-sum thinking applied to meaning itself — a Nash trap at civilizational scale.
          </p>
        </div>
        <div className="phil-card" style={{ borderColor: 'rgba(30,203,225,0.25)' }}>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.7rem', color: 'var(--teal)', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>LAEGNA LOGIC → BLUE OCEAN</div>
          <p style={{ fontSize: '0.87rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Each system creates value the other cannot access: capitalism generates innovation and individual expression,
            while communism generates solidarity and collective care. Integration becomes possible — a new market neither alone could reach.
          </p>
        </div>
      </div>
    </section>
  );
}

function SpiritualitySection() {
  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.2rem', color: 'var(--gold)', marginBottom: '1.25rem' }}>
        Spirituality &amp; Materialism — Two Oceans
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="phil-card" style={{ borderColor: 'rgba(232,93,74,0.2)' }}>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.7rem', color: '#e85d4a', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>BINARY → RED OCEAN</div>
          <p style={{ fontSize: '0.87rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            <em style={{ color: 'var(--text-parchment)' }}>My worldview must defeat yours.</em> Materialists fight to eliminate spiritual claims; spiritualists fight to overcome materialist reductions.
            Both occupy the same conceptual territory, creating an X-zone war of worldviews.
          </p>
        </div>
        <div className="phil-card" style={{ borderColor: 'rgba(139,92,246,0.3)' }}>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.7rem', color: 'var(--purple)', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>NON-DUAL → BLUE OCEAN</div>
          <p style={{ fontSize: '0.87rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Spirituality and materialism grant <em style={{ color: 'var(--text-parchment)' }}>different access to different truths</em>.
            Neither can fully replace the other. In Y-zone logic, both coexist as complementary instruments — each revealing what the other cannot.
          </p>
        </div>
      </div>
    </section>
  );
}

function MovingTargetSection() {
  return (
    <section className="phil-card" style={{ marginBottom: '2.5rem', borderColor: 'rgba(240,165,0,0.2)', background: 'linear-gradient(135deg, rgba(240,165,0,0.04) 0%, var(--bg-card) 100%)' }}>
      <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.1rem', color: 'var(--gold)', marginBottom: '1rem' }}>
        The Moving Target &amp; Forgiveness
      </h2>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '1rem' }}>
        In the Y-zone, the &ldquo;target&rdquo; — the market, the truth, the goal — <em style={{ color: 'var(--text-parchment)' }}>moves with new understanding</em>.
        What was the frontier yesterday becomes the baseline tomorrow. This motion is generative, not destabilizing.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ padding: '0.9rem', background: 'rgba(232,93,74,0.07)', borderRadius: 6, borderTop: '2px solid rgba(232,93,74,0.3)' }}>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.72rem', color: '#e85d4a', marginBottom: '0.4rem', letterSpacing: '0.1em' }}>X-ZONE — CANNOT FORGIVE</div>
          <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Static equilibrium has no mechanism for growth. Past errors remain as fixed debits. Zero-sum logic requires accountability that never expires.
          </p>
        </div>
        <div style={{ padding: '0.9rem', background: 'rgba(30,203,225,0.07)', borderRadius: 6, borderTop: '2px solid rgba(30,203,225,0.3)' }}>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.72rem', color: 'var(--teal)', marginBottom: '0.4rem', letterSpacing: '0.1em' }}>Y-ZONE — ENABLES FORGIVENESS</div>
          <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Past errors are overtaken by new growth. The target has moved — the past mistake no longer defines the present position. Forgiveness is not moral weakness; it is Y-zone logic.
          </p>
        </div>
      </div>
    </section>
  );
}

function VizSection({ vizMode, setVizMode }: { vizMode: 'split' | 'laegna'; setVizMode: (m: 'split' | 'laegna') => void }) {
  return (
    <section className="phil-card" style={{ borderColor: 'rgba(240,165,0,0.2)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1rem', color: 'var(--gold)' }}>Market Space Visualization</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['split', 'laegna'] as const).map(m => (
            <button key={m} className="selector-btn" onClick={() => setVizMode(m)}
              style={vizMode === m ? { borderColor: 'var(--gold)', color: 'var(--gold)', background: 'var(--gold-dim)' } : {}}>
              {m === 'split' ? 'Market View' : 'Laegna View'}
            </button>
          ))}
        </div>
      </div>
      <OceanViz mode={vizMode} />
      <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
        {vizMode === 'split'
          ? 'Left: crowded red ocean (X-zone) · Right: open blue ocean (Y-zone)'
          : 'Laegna perspective: Z·X·Y zones — coexistence, competition, and expansion'}
      </p>
    </section>
  );
}
