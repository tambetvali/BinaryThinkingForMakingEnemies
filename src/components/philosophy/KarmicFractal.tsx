'use client';
import React, { useState, useEffect, useRef } from 'react';
import { usePhilosophyStore } from '@/store/philosophyStore';

// state(t) = shadow ⊕ insight
// Each iteration: shadow and insight interact and produce the next state
// Laegna fractal: self-similar across R levels, crown+root chakra repeat outside body

export function KarmicFractalWidget() {
  const { mode, modality, logic } = usePhilosophyStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [depth, setDepth] = useState(3);
  const [shadow, setShadow] = useState(0.4);
  const [t, setT] = useState(0);
  const rafRef = useRef<number>(0);

  const isMat = mode === 'material';
  const isBot = modality === 'bottom-up';

  // Laegna letter colors
  const lc = { I: '#c8a000', O: '#c0392b', A: '#2e7d32', E: '#1565c0' };
  const logicAlpha = logic === 'binary' ? 0.4 : logic === 'taoist' ? 0.75 : 1.0;

  useEffect(() => {
    let start = 0;
    function tick(ts: number) {
      if (!start) start = ts;
      setT(((ts - start) / 8000) % 1);
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width; const H = canvas.height;

    // Narrow ctx to non-null for the closure below
    const c = ctx as CanvasRenderingContext2D;
    c.clearRect(0, 0, W, H);
    c.fillStyle = '#0d1420';
    c.fillRect(0, 0, W, H);

    // Draw fractal tree: each branch is a karmic state
    // state(t) = shadow ⊕ insight
    const insight = 1 - shadow;

    function drawBranch(x: number, y: number, angle: number, length: number, d: number, phase: number) {
      if (d === 0 || length < 2) return;
      const ratio = d / depth;
      // Map depth to IOAE letters: deep=I, mid-neg=O, mid-pos=A, surface=E
      const letterColor = d === depth ? lc.I : d > depth * 0.67 ? lc.O : d > depth * 0.33 ? lc.A : lc.E;
      const angleOsc = Math.sin(t * Math.PI * 2 + phase) * 0.3 * shadow;

      const x2 = x + Math.cos(angle + angleOsc) * length;
      const y2 = y - Math.sin(angle + angleOsc) * length;

      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(x2, y2);
      c.strokeStyle = letterColor;
      c.globalAlpha = ratio * logicAlpha * 0.85;
      c.lineWidth = Math.max(0.5, ratio * 2.5);
      c.stroke();

      const newLen = length * (0.6 + insight * 0.15);
      const spread = (0.45 + shadow * 0.25) * Math.PI / (depth * 0.7);

      drawBranch(x2, y2, angle - spread, newLen, d - 1, phase + 0.8);
      drawBranch(x2, y2, angle + spread, newLen, d - 1, phase - 0.8);

      // Fractal self-similarity: add tiny branch at midpoint
      if (d === depth - 1 && insight > 0.5) {
        const mx = (x + x2) / 2; const my = (y + y2) / 2;
        drawBranch(mx, my, angle + Math.PI / 2, length * 0.25, 1, phase);
      }
    }

    c.globalAlpha = 1;
    // Trunk
    c.beginPath();
    c.moveTo(W / 2, H);
    c.lineTo(W / 2, H * 0.65);
    c.strokeStyle = lc.O;
    c.lineWidth = 3 * logicAlpha;
    c.globalAlpha = 0.8 * logicAlpha;
    c.stroke();

    drawBranch(W / 2, H * 0.65, Math.PI / 2, H * 0.22, depth, t * Math.PI);

    // Zero-line (meeting of differential and integral)
    c.globalAlpha = 0.15;
    c.beginPath();
    c.moveTo(0, H * 0.65);
    c.lineTo(W, H * 0.65);
    c.strokeStyle = '#f0a500';
    c.lineWidth = 1;
    c.setLineDash([4, 4]);
    c.stroke();
    c.setLineDash([]);

    // Label
    c.globalAlpha = 0.4;
    c.fillStyle = '#f0a500';
    c.font = `8px monospace`;
    c.fillText('R=0 · differential ∩ integral', 6, H * 0.65 - 4);

    c.globalAlpha = 1;
  }, [t, depth, shadow, logic, logicAlpha, lc.I, lc.O, lc.A, lc.E]);

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-gold)', borderRadius: 6, padding: '14px 16px' }}>
      <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.68rem', color: 'var(--gold)', letterSpacing: '0.14em', marginBottom: 4 }}>
        KARMIC FRACTAL · state(t) = shadow ⊕ insight
      </div>
      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 8, lineHeight: 1.4 }}>
        Self-similar karmic tree. Branches = octave levels. Color = I·O·A·E letter at each depth. Shadow/insight ratio changes the tree geometry. {logic === 'binary' ? 'Binary: muted — only X present.' : ''}
      </div>
      <canvas ref={canvasRef} width={320} height={180}
        style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 3, imageRendering: 'crisp-edges' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10 }}>
        <div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 3, fontFamily: 'var(--font-cinzel)', letterSpacing: '0.06em' }}>
            SHADOW {Math.round(shadow * 100)}%
          </div>
          <input type="range" min={0} max={100} value={Math.round(shadow * 100)}
            onChange={e => setShadow(parseInt(e.target.value) / 100)}
            style={{ width: '100%', accentColor: '#c0392b' }} />
        </div>
        <div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 3, fontFamily: 'var(--font-cinzel)', letterSpacing: '0.06em' }}>
            OCTAVE DEPTH {depth}
          </div>
          <input type="range" min={2} max={6} value={depth}
            onChange={e => setDepth(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: '#c8a000' }} />
        </div>
      </div>
      <div style={{ marginTop: 8, padding: '5px 9px', background: 'rgba(21,101,192,0.08)', borderLeft: '2px solid #1565c0', fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.5, borderRadius: '0 3px 3px 0' }}>
        <strong style={{ color: '#1565c0' }}>Fractal law:</strong> "Crown and root chakra repeat their extremes in fractal pattern outside the body. In reincarnations, every infinity — every degree of infinity — is approaching, so you finally meet it." — Tambet Väli
      </div>
    </div>
  );
}
