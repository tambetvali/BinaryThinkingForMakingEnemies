'use client';
import React, { useState, useEffect, useRef } from 'react';
import { usePhilosophyStore } from '@/store/philosophyStore';

// "Illumination is the point where sincerity is cheaper than deception."
// Strategies that come to gain collapse under their own cost.
// Strategies that come to offer become the stable attractor.
// This widget simulates karmic attractor dynamics: deceptive vs sincere strategies over time.

type Strategy = { name: string; score: number; sincere: number; color: string };

export function IlluminationWidget() {
  const { mode, modality, logic } = usePhilosophyStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = useState(false);
  const [round, setRound] = useState(0);
  const [strategies, setStrategies] = useState<Strategy[]>([
    { name: 'I — Negotion (destroy)', score: 20, sincere: 0.1, color: '#c8a000' },
    { name: 'O — Negation (survive)', score: 30, sincere: 0.35, color: '#c0392b' },
    { name: 'A — Position (honest)',  score: 40, sincere: 0.8, color: '#2e7d32' },
    { name: 'E — Posetion (overplay)', score: 10, sincere: 0.2, color: '#1565c0' },
  ]);
  const [history, setHistory] = useState<Strategy[][]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isMat = mode === 'material';
  const isBot = modality === 'bottom-up';

  // One evolution step: sincere strategies gain, deceptive ones pay entropy cost
  function step(prev: Strategy[]): Strategy[] {
    const total = prev.reduce((s, x) => s + x.score, 0);
    return prev.map(s => {
      // Sincere: slightly grows based on proportion (cooperative dividend)
      // Deceptive: pays entropy cost proportional to their own gain
      const shareFraction = s.score / total;
      const entropyCost = (1 - s.sincere) * s.score * 0.08;
      const cooperativeDividend = s.sincere * (total * 0.04 + 1);
      const perturbation = (Math.random() - 0.5) * 3;
      const newScore = Math.max(1, Math.min(200, s.score - entropyCost + cooperativeDividend + perturbation));
      return { ...s, score: parseFloat(newScore.toFixed(1)) };
    });
  }

  useEffect(() => {
    if (!running) return;
    timerRef.current = setTimeout(() => {
      setStrategies(prev => {
        const next = step(prev);
        setHistory(h => [...h.slice(-30), next]);
        return next;
      });
      setRound(r => r + 1);
    }, 200);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [running, strategies]);

  function reset() {
    setRunning(false);
    setRound(0);
    setHistory([]);
    setStrategies([
      { name: 'I — Negotion (destroy)', score: 20, sincere: 0.1, color: '#c8a000' },
      { name: 'O — Negation (survive)', score: 30, sincere: 0.35, color: '#c0392b' },
      { name: 'A — Position (honest)',  score: 40, sincere: 0.8, color: '#2e7d32' },
      { name: 'E — Posetion (overplay)', score: 10, sincere: 0.2, color: '#1565c0' },
    ]);
  }

  // Draw history chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || history.length < 2) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width; const H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0d1420';
    ctx.fillRect(0, 0, W, H);

    const maxScore = Math.max(...history.flatMap(h => h.map(s => s.score)), 100);
    const stepW = W / Math.max(history.length - 1, 1);

    strategies.forEach((_, si) => {
      ctx.beginPath();
      history.forEach((frame, fi) => {
        const x = fi * stepW;
        const y = H - (frame[si].score / maxScore) * H * 0.9 - 4;
        fi === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.strokeStyle = strategies[si].color;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.85;
      ctx.stroke();
    });
    ctx.globalAlpha = 1;
  }, [history, strategies]);

  const total = strategies.reduce((s, x) => s + x.score, 0);

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid rgba(46,125,50,0.3)', borderRadius: 6, padding: '14px 16px' }}>
      <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.68rem', color: '#2e7d32', letterSpacing: '0.14em', marginBottom: 4 }}>
        ILLUMINATION ATTRACTOR · KARMIC GAME SIMULATION
      </div>
      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 10, lineHeight: 1.45 }}>
        "Strategies that come to gain collapse under their own cost. Strategies that come to offer become the stable attractor." — Book of Shadows 2
      </div>

      {/* Score bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 10 }}>
        {strategies.map((s) => (
          <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.72rem', color: s.color, minWidth: 18 }}>{s.name[0]}</span>
            <div style={{ flex: 1, height: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ width: `${(s.score / total) * 100}%`, height: '100%', background: s.color, borderRadius: 2, transition: 'width 0.18s' }} />
            </div>
            <span style={{ fontSize: '0.65rem', color: s.color, minWidth: 36, fontFamily: 'var(--font-mono)', textAlign: 'right' }}>{s.score.toFixed(0)}</span>
            <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', minWidth: 40 }}>
              {((s.score / total) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>

      {/* History canvas */}
      <canvas ref={canvasRef} width={300} height={80}
        style={{ width: '100%', height: 80, display: 'block', borderRadius: 3, marginBottom: 8, imageRendering: 'crisp-edges' }} />

      <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
        <button onClick={() => setRunning(r => !r)} style={{
          flex: 1, padding: '5px', fontFamily: 'var(--font-cinzel)', fontSize: '0.68rem',
          background: running ? 'rgba(46,125,50,0.2)' : 'rgba(240,165,0,0.12)',
          border: `1px solid ${running ? '#2e7d32' : 'var(--gold)'}`,
          color: running ? '#2e7d32' : 'var(--gold)', cursor: 'pointer', borderRadius: 2,
        }}>{running ? `■ PAUSE (Round ${round})` : '▶ EVOLVE'}</button>
        <button onClick={reset} style={{
          padding: '5px 10px', fontFamily: 'var(--font-cinzel)', fontSize: '0.68rem',
          background: 'transparent', border: '1px solid var(--border-gold)',
          color: 'var(--text-muted)', cursor: 'pointer', borderRadius: 2,
        }}>RESET</button>
      </div>

      {round > 20 && (
        <div style={{ padding: '6px 10px', background: 'rgba(46,125,50,0.1)', border: '1px solid rgba(46,125,50,0.3)', borderRadius: 3, fontSize: '0.72rem', color: 'var(--text-parchment)', lineHeight: 1.5 }}>
          <strong style={{ color: '#2e7d32' }}>Round {round}:</strong>{' '}
          {strategies[2].score > strategies[0].score + strategies[3].score
            ? `A (Position/honest) dominates. Illumination point reached — sincerity is structurally cheaper than deception. ${isMat ? `${isBot ? 'Capitalism' : 'Communism'} as honest value creation wins long-term.` : 'Genuine practice outlasts spiritual performance.'}`
            : `Deceptive strategies still competing. Entropy cost accumulating. ${logic === 'binary' ? 'Binary X-zone sustains the competition longer.' : 'Non-binary logic enables faster convergence to A.'}`
          }
        </div>
      )}

      <div style={{ marginTop: 8, fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
        Simulation: each round, sincere strategies (A) earn cooperative dividend; deceptive (I, E-as-Rosedriad) pay entropy cost proportional to their gain. Thermodynamic law, not moral judgment.
      </div>
    </div>
  );
}
