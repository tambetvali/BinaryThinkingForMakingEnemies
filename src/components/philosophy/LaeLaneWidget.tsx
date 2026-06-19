'use client';
import React, { useState } from 'react';
import { usePhilosophyStore } from '@/store/philosophyStore';

// LaeLane: the X=Y balance line — optimal 45° growth, Z-investment vs Y-return
// Blue Ocean lives here: neither pure X-competition nor pure Y-idealism

export function LaeLaneWidget() {
  const { mode, modality, logic } = usePhilosophyStore();
  const [zInvest, setZInvest] = useState(40); // % of energy in Z (past investment)
  const [yReturn, setYReturn] = useState(40); // % of energy in Y (future vision)
  const xBalance = Math.max(0, 100 - zInvest - yReturn);

  const isMat = mode === 'material';
  const isBot = modality === 'bottom-up';
  const chosen  = isMat ? (isBot ? 'Capitalism'  : 'Communism')  : (isBot ? 'Materialism'  : 'Spirituality');
  const opposed = isMat ? (isBot ? 'Communism'   : 'Capitalism') : (isBot ? 'Spirituality' : 'Materialism');

  // LaeLane score: how close to X=Y balance (Z=Y symmetry)
  const symmetry = 100 - Math.abs(zInvest - yReturn) * 0.8;
  const laneScore = Math.round(symmetry * (xBalance / 100 + 0.5));

  const W = 300; const H = 220;
  // Axes
  const ox = 40; const oy = H - 30;
  const aw = W - 60; const ah = H - 50;

  // Points on the diagram
  const zX = ox + (zInvest / 100) * aw;
  const zY = oy - (yReturn / 100) * ah;
  // LaeLane (X=Y line): from (ox,oy) to (ox+aw, oy-ah)
  // Current point
  const ptX = ox + (zInvest / 100) * aw * 0.8;
  const ptY = oy - (yReturn / 100) * ah * 0.8;

  const laneColor = laneScore > 70 ? '#1ecbe1' : laneScore > 40 ? '#f0a500' : '#c0392b';

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-teal)', borderRadius: 6, padding: '14px 16px' }}>
      <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.68rem', color: 'var(--teal)', letterSpacing: '0.14em', marginBottom: 4 }}>
        LAELANE · X=Y BALANCE · OPTIMAL 45° GROWTH PATH
      </div>
      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 10, lineHeight: 1.4 }}>
        The LaeLane is the equilibrium where Z-investment (past) and Y-return (future) are in perfect proportion. Blue Ocean emerges here.
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, height: 'auto', display: 'block' }}>
        {/* Axes */}
        <line x1={ox} y1={oy} x2={ox + aw} y2={oy} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1={ox} y1={oy} x2={ox} y2={oy - ah} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <text x={ox + aw / 2} y={oy + 14} textAnchor="middle" fill="#8b5cf6" style={{ fontSize: '8px', fontFamily: 'var(--font-cinzel)' }}>Z — past investment (Dukka)</text>
        <text x={ox - 12} y={oy - ah / 2} textAnchor="middle" fill="#1ecbe1" style={{ fontSize: '8px', fontFamily: 'var(--font-cinzel)', writingMode: 'vertical-rl' as never } as React.CSSProperties}>Y — future return (Dharma)</text>

        {/* Background zones */}
        {/* Red ocean: high Z, low Y */}
        <rect x={ox + aw * 0.5} y={oy - ah * 0.5} width={aw * 0.5} height={ah * 0.5} fill="rgba(192,57,43,0.06)" />
        <text x={ox + aw * 0.75} y={oy - 8} textAnchor="middle" fill="rgba(192,57,43,0.4)" style={{ fontSize: '6.5px', fontFamily: 'var(--font-cinzel)' }}>RED OCEAN</text>

        {/* Blue ocean: balanced */}
        <path d={`M ${ox} ${oy} L ${ox + aw * 0.5} ${oy} L ${ox + aw * 0.5} ${oy - ah * 0.5} Z`} fill="rgba(30,203,225,0.05)" />

        {/* LaeLane (X=Y, 45° line) */}
        <line x1={ox} y1={oy} x2={ox + Math.min(aw, ah)} y2={oy - Math.min(aw, ah)} stroke="var(--teal)" strokeWidth="1.5" strokeDasharray="5,3" opacity="0.6" />
        <text x={ox + 90} y={oy - 95} fill="var(--teal)" style={{ fontSize: '7px', fontFamily: 'var(--font-cinzel)', opacity: 0.7 }}>LaeLane (X=Y)</text>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map(f => (
          <g key={f}>
            <line x1={ox + f * aw} y1={oy} x2={ox + f * aw} y2={oy - ah} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            <line x1={ox} y1={oy - f * ah} x2={ox + aw} y2={oy - f * ah} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          </g>
        ))}

        {/* Current position point */}
        <circle cx={ptX} cy={ptY} r="6" fill={laneColor} opacity="0.9" />
        <circle cx={ptX} cy={ptY} r="10" fill="none" stroke={laneColor} strokeWidth="1" opacity="0.4" />

        {/* Distance to LaeLane */}
        {Math.abs(zInvest - yReturn) > 5 && (
          <line x1={ptX} y1={ptY}
            x2={ox + (zInvest + yReturn) / 2 / 100 * Math.min(aw, ah)}
            y2={oy - (zInvest + yReturn) / 2 / 100 * Math.min(aw, ah)}
            stroke={laneColor} strokeWidth="0.8" strokeDasharray="3,2" opacity="0.5" />
        )}

        {/* Label */}
        <text x={ptX + 10} y={ptY - 4} fill={laneColor} style={{ fontSize: '7px', fontFamily: 'var(--font-cinzel)' }}>
          {chosen}
        </text>

        {/* Origin context */}
        <text x={ox + 4} y={oy - 4} fill="rgba(46,125,50,0.6)" style={{ fontSize: '6.5px', fontFamily: 'var(--font-cinzel)' }}>A (now)</text>
      </svg>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
        <div>
          <div style={{ fontSize: '0.65rem', color: '#8b5cf6', marginBottom: 3, fontFamily: 'var(--font-cinzel)' }}>
            Z-INVEST (past) {zInvest}%
          </div>
          <input type="range" min={0} max={90} value={zInvest}
            onChange={e => setZInvest(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: '#8b5cf6' }} />
        </div>
        <div>
          <div style={{ fontSize: '0.65rem', color: 'var(--teal)', marginBottom: 3, fontFamily: 'var(--font-cinzel)' }}>
            Y-RETURN (future) {yReturn}%
          </div>
          <input type="range" min={0} max={90} value={yReturn}
            onChange={e => setYReturn(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--teal)' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <div style={{ flex: 1, padding: '6px 10px', background: `${laneColor}12`, border: `1px solid ${laneColor}44`, borderRadius: 3 }}>
          <div style={{ fontSize: '0.6rem', color: laneColor, fontFamily: 'var(--font-cinzel)', marginBottom: 2 }}>LANE BALANCE</div>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.1rem', color: laneColor }}>{laneScore}%</div>
        </div>
        <div style={{ flex: 2, padding: '6px 10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 3 }}>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            X-present: {xBalance}% ·{' '}
            {laneScore > 70
              ? `${chosen} and ${opposed} co-evolve. Blue Ocean zone.`
              : laneScore > 40
              ? 'Some imbalance. Adjust Z/Y proportion.'
              : `Red Ocean risk. ${zInvest > yReturn ? 'Too much Z-investment, insufficient Y-vision.' : 'Too much Y-idealism, insufficient Z-grounding.'}`
            }
          </div>
        </div>
      </div>
    </div>
  );
}
