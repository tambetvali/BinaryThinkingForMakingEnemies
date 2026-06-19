'use client';
import React, { useState, useEffect, useRef } from 'react';
import { usePhilosophyStore } from '@/store/philosophyStore';

// Z = Sine = Dukka (suffering, sub-zero, past)
// X = Cone = Karma  (present, balanced, living)
// Y = Cosine = Dharma (above-infinity, spirit, future)
// Sine is paranoia (excess caution), Cosine is impractical idealism (excess positive)
// Cone is Aristotle's golden mean — the synthesis

export function ConosVizWidget() {
  const { mode, modality, logic } = usePhilosophyStore();
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(true);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    if (!playing) { cancelAnimationFrame(rafRef.current); return; }
    function tick(ts: number) {
      if (!startRef.current) startRef.current = ts;
      setT(((ts - startRef.current) / 4000) % 1);
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  const W = 340; const H = 180;
  const cx = W / 2; const groundY = H - 20;

  // Z/X/Y curves across time (0..1 = one cycle)
  const pts = Array.from({ length: 61 }, (_, i) => i / 60);

  // Sine = Z (sub-zero, dukka): sin curve below center
  const zPath = pts.map(x => ({
    x: x * W,
    y: groundY * 0.5 + Math.sin(x * Math.PI * 2) * 35 * (logic === 'binary' ? 0.4 : 1),
  }));

  // Cosine = Y (above-infinity, dharma): cos curve above center  
  const yPath = pts.map(x => ({
    x: x * W,
    y: groundY * 0.5 - Math.cos(x * Math.PI * 2) * 35 * (logic === 'binary' ? 0.4 : 1),
  }));

  // Cone = X (karma, present): constant mid line, slightly oscillating
  const xPath = pts.map(x => ({
    x: x * W,
    y: groundY * 0.5 + Math.sin(x * Math.PI * 2 * 2) * 8,
  }));

  function toPath(pts: {x:number;y:number}[]) {
    return pts.map((p, i) => `${i===0?'M':'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  }

  // Animated position marker
  const posX = t * W;
  const zY   = groundY * 0.5 + Math.sin(t * Math.PI * 2) * 35;
  const yY   = groundY * 0.5 - Math.cos(t * Math.PI * 2) * 35;
  const xY   = groundY * 0.5 + Math.sin(t * Math.PI * 4) * 8;

  // Context label
  const isMat = mode === 'material';
  const isBot = modality === 'bottom-up';
  const chosen  = isMat ? (isBot ? 'Capitalism' : 'Communism')  : (isBot ? 'Materialism' : 'Spirituality');
  const opposed = isMat ? (isBot ? 'Communism'  : 'Capitalism') : (isBot ? 'Spirituality' : 'Materialism');

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-gold)', borderRadius: 6, padding: '14px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.68rem', color: 'var(--gold)', letterSpacing: '0.14em' }}>
            CONUS PARADIGM · SINE / CONE / COSINE
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
            Z (Dukka/past) · X (Karma/present) · Y (Dharma/future)
          </div>
        </div>
        <button onClick={() => setPlaying(p => !p)} style={{
          background: 'transparent', border: '1px solid var(--border-gold)', color: 'var(--gold)',
          padding: '3px 10px', fontSize: '0.68rem', cursor: 'pointer', borderRadius: 2, fontFamily: 'var(--font-cinzel)',
        }}>{playing ? 'PAUSE' : 'PLAY'}</button>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        {/* Background grid */}
        <line x1="0" y1={groundY * 0.5} x2={W} y2={groundY * 0.5} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        {[0.25, 0.5, 0.75].map(x => (
          <line key={x} x1={x*W} y1="0" x2={x*W} y2={H} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        ))}

        {/* Z — Sine (Dukka) */}
        <path d={toPath(zPath)} fill="none" stroke="#8b5cf6" strokeWidth="1.8" opacity={logic === 'binary' ? 0.3 : 0.75} />
        <text x="6" y="28" fill="#8b5cf6" style={{ fontSize: '7.5px', fontFamily: 'var(--font-cinzel)', opacity: 0.8 }}>Z Dukka</text>
        <text x="6" y="38" fill="#8b5cf6" style={{ fontSize: '6.5px', opacity: 0.55 }}>Sine · sub-zero</text>

        {/* Y — Cosine (Dharma) */}
        <path d={toPath(yPath)} fill="none" stroke="#1ecbe1" strokeWidth="1.8" opacity={logic === 'binary' ? 0.3 : 0.75} />
        <text x={W - 58} y="28" fill="#1ecbe1" style={{ fontSize: '7.5px', fontFamily: 'var(--font-cinzel)', opacity: 0.8 }}>Y Dharma</text>
        <text x={W - 58} y="38" fill="#1ecbe1" style={{ fontSize: '6.5px', opacity: 0.55 }}>Cosine · above-∞</text>

        {/* X — Cone (Karma) */}
        <path d={toPath(xPath)} fill="none" stroke="#e85d4a" strokeWidth={logic === 'binary' ? 2.5 : 1.5} opacity={0.85} />
        <text x={W/2 - 20} y={groundY * 0.5 - 18} fill="#e85d4a" style={{ fontSize: '7.5px', fontFamily: 'var(--font-cinzel)', opacity: 0.85 }}>X Karma</text>
        <text x={W/2 - 16} y={groundY * 0.5 - 8} fill="#e85d4a" style={{ fontSize: '6.5px', opacity: 0.55 }}>Cone · present</text>

        {/* Animated markers */}
        <circle cx={posX} cy={zY} r="4" fill="#8b5cf6" opacity={logic === 'binary' ? 0.3 : 0.9} />
        <circle cx={posX} cy={yY} r="4" fill="#1ecbe1" opacity={logic === 'binary' ? 0.3 : 0.9} />
        <circle cx={posX} cy={xY} r="4" fill="#e85d4a" opacity="0.95" />
        {/* vertical connector */}
        <line x1={posX} y1={zY} x2={posX} y2={yY} stroke="rgba(240,165,0,0.2)" strokeWidth="0.8" />

        {/* Context annotation */}
        <text x={W/2} y={H - 6} textAnchor="middle" fill="rgba(240,165,0,0.4)" style={{ fontSize: '7px', fontFamily: 'var(--font-cinzel)' }}>
          {logic === 'binary' ? `Binary locks in X-Karma. Z+Y suppressed. ${chosen}↔${opposed} as zero-sum.` : `Z·X·Y all active. ${chosen} in A/X-zone, ${opposed} seeks Y.`}
        </text>
      </svg>

      {/* Row of three explanations */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginTop: 8 }}>
        {[
          { letter: 'Z', name: 'Sine · Dukka', color: '#8b5cf6', val: 'sub-zero',
            note: 'Excess = paranoia. The past, chaos, investment. Buddhist suffering as the starting condition.', dim: logic === 'binary' ? 0.35 : 1 },
          { letter: 'X', name: 'Cone · Karma', color: '#e85d4a', val: 'present',
            note: "Aristotle's Golden Mean. Cause-effect in the living world. Binary logic lives exclusively here.", dim: 1 },
          { letter: 'Y', name: 'Cosine · Dharma', color: '#1ecbe1', val: 'above-∞',
            note: 'Excess = impractical idealism. Long-term truth, spiritual evolution. Every R-cycle phases the system up.', dim: logic === 'binary' ? 0.35 : 1 },
        ].map(s => (
          <div key={s.letter} style={{ padding: '6px 8px', background: s.color + '0e', border: `1px solid ${s.color}33`, borderRadius: 3, opacity: s.dim, transition: 'opacity 0.4s' }}>
            <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.85rem', color: s.color, marginBottom: 2 }}>{s.letter}</div>
            <div style={{ fontSize: '0.62rem', color: s.color, marginBottom: 3, opacity: 0.85 }}>{s.name}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>{s.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
