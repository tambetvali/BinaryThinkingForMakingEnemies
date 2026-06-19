'use client';
import React, { useState } from 'react';
import { usePhilosophyStore } from '@/store/philosophyStore';
import type { LogicSystem } from '@/store/philosophyStore';

type JType = 'S' | 'N' | 'F' | 'T';

const PATHWAYS: Record<JType, {
  label: string; icon: string; tagline: string;
  intro: string;
  laegnaEntry: Record<LogicSystem, string>;
  practice: string;
  exampleWorld: { material: string; spiritual: string };
}> = {
  S: {
    label: 'Sensory (S)', icon: '⚙',
    tagline: 'You learn by touching, observing, measuring.',
    intro: 'Sensory types ground knowledge in concrete facts, direct experience, and practical application. Laegna offers you a precise counting system — count the sheep once and internalize the structure physically.',
    laegnaEntry: {
      binary: 'Start with the two you know: true/false, win/lose, yes/no. Notice the cost: the suppressed two letters (I and E at global scale) create instability — the "crack in the wall" you have felt.',
      taoist: 'The Yin-Yang symbol you can see and draw. O = black area (stable, measured), A = white area (stable, present). The two seeds (I in Yang, E in Yin) are the observable changes within stability.',
      laegna: 'The RTS system is built for counting: R=1 gives 4 tangible symbols, R=2 gives 16 — count them like the sheep counter. Draw the 4×4 two-digit grid. Touch the number.',
    },
    practice: 'Draw the Laegna Tao symbol with 4 colors: green (A), yellow (I), blue (E), red (O). Count objects around you in base-4: one finger = I, two = O, three = A, four = E. Feel the difference from base-10.',
    exampleWorld: {
      material: 'In business: count cash flows as base-4. Which zone are you in? X (Nash equilibrium, flat, present)? The sensory measurement of market conditions is A (stable positive), depletion is O (stable negative).',
      spiritual: 'Body scan: Z is sub-body tension (Dukka stored somatically). X is the present heartbeat (Karma = current causation). Y is the open expansive sensation after release (Dharma flowing).',
    },
  },
  N: {
    label: 'Intuitive (N)', icon: '✦',
    tagline: 'You learn by pattern, possibility, and connection.',
    intro: 'Intuitive types absorb the systemic whole before the parts. Laegna is designed for you: it is a fractal, self-similar system where every level mirrors every other. See the full structure first.',
    laegnaEntry: {
      binary: 'Binary is the failure mode of intuition: you collapsed a rich field into two poles. The suppressed letters (I, E at global scale) are exactly what your intuition reaches for but cannot name in binary logic — the "there\'s something more" feeling.',
      taoist: 'The Cone paradigm (Z·X·Y) maps your intuitive structure: Z is what you sense below the surface (past, quantum, chaos), Y is where your intuition points (above-infinity, pattern, dharma). X is where you must land to communicate.',
      laegna: 'The inner equation I²+O²+A²+E²=1 is your model: four forces on a unit sphere. Horizon expansion H±(t)=X²±t² is how new dimensions open. Each R level is a new octave of the same truth.',
    },
    practice: 'Map your current intuition onto IOAE: what are you sensing (I, yellow — the moving no)? What feels stable (A, green — the still yes)? Where does it want to go (E, blue — the expansive yes)? What feels absent (O, red — the quiet no)?',
    exampleWorld: {
      material: 'Market intuition: spot when A (capitalism as stable fact) is actually Rosedriad-shifting toward E (overplayed, speculative). The entrepreneur who senses a bubble before data confirms it is reading Y→X phase transitions.',
      spiritual: 'Dharma intuition: the sense that your current path leads somewhere (Y-zone, above-infinity). Translating this into X-karma (present action) requires the O-A local grounding — intuition needs the sensory root to manifest.',
    },
  },
  F: {
    label: 'Feeling (F)', icon: '◈',
    tagline: 'You learn through meaning, relationship, and value.',
    intro: 'Feeling types navigate by what matters, who is affected, and how systems affect wellbeing. Laegna gives you a scientific language for what you already know: that the four truth-values (I,O,A,E) map directly to relationship states.',
    laegnaEntry: {
      binary: 'Binary opposition creates the ZERO-SUM of relationships: if I affirm you, I negate myself (or vice versa). You\'ve felt this trap. The feeling-type solution is exactly what Laegna encodes: all four positions can be present simultaneously.',
      taoist: 'Integration game (Crown/Love): positive of one integrates with positive of the other. This is your natural mode — Laegna formalizes it. Z = past wounds stored in the body, Y = the love that heals across time.',
      laegna: 'Spiponegation (spiritual ponegation) uses "good/bad energies" instead of true/false — this is your native language. E (Posetion, blue, summer) is the active expansive love. I (Negotion, yellow, winter) is the love that challenges without destroying.',
    },
    practice: 'Apply karmic logic to a relationship: "If A (I show up honestly), then B (trust deepens)." Now: "If NOT B (trust erodes), then NOT A (I withdraw honesty)." Watch for Rosedriad — you may have stayed in Position (A) while the other\'s context shifted you to appear as Posetion (E).',
    exampleWorld: {
      material: 'Social economy: communism-as-Posetion (the overplayed positive of collective care) vs. communism-as-Position (genuine cooperative economics). The feeling type senses which is happening before the data arrives.',
      spiritual: 'Integral of Mind (from Spireason): focus → release → paradox. The love meditation cycle. This is the feeling type\'s natural spiritual path — Laegna shows it as: X (present focus) → releasing into Y (integral, flowing insight) → returning to grounded A.',
    },
  },
  T: {
    label: 'Thinking (T)', icon: '⊕',
    tagline: 'You learn through logic, structure, and analysis.',
    intro: 'Thinking types want the formal system first. Laegna delivers: a four-valued logic with precise mathematical definitions, a positional number system, and a game-theory framework that formally defeats binary Nash traps.',
    laegnaEntry: {
      binary: 'Formal proof that binary is incomplete: the inner equation I²+O²+A²+E²=1 has four terms — a binary system uses only two, leaving the sphere under-determined. The suppressed letters create a "Gödel incompleteness" in the logic itself.',
      taoist: 'Taoist logic as Hegel\'s dialectics formalized: Sine(Z) + Cosine(Y) → Cone(X). Thesis + Antithesis → Synthesis. The formal structure is: for any opposition O·A (local pair), the global pair I·E provides the resolution dimension.',
      laegna: 'Full system: T=4^R (frequential), T=2^R (octavian). Ponegation table is the master operation. H±(t)=X²±t² is the horizon expansion. The karmic contrapositive A→B, ¬B→¬A is formally equivalent to modus tollens plus temporal lag.',
    },
    practice: 'Solve: in a game where binary forces you to X-zone Nash equilibrium with payoffs (D,D)=(1,1) vs (C,C)=(3,3), what Y-zone move creates plus-sum? Answer: change the game rule itself (Blue Ocean) — move from X-linear to Y-exponential by introducing a third variable (cooperation surplus).',
    exampleWorld: {
      material: 'LaeLane calculation: find the X=Y balance point where Z-investment (past cost, sub-zero) equals Y-return (future value, above-infinity). This is the formal optimization of the capitalist/communist trade-off — it exists and is computable.',
      spiritual: 'The First Theorem of Infinity applied to Gödel: any formal system (R-level) is incomplete by the next level (R+1). This is mathematically equivalent to the Law of Imperfection. Spirituality is not irrational — it is the formal acknowledgement of R→∞.',
    },
  },
};

export function JungianPathways() {
  const { mode, logic } = usePhilosophyStore();
  const [selected, setSelected] = useState<JType | null>(null);
  const [tab, setTab] = useState<'intro'|'entry'|'practice'|'world'>('intro');
  const pw = selected ? PATHWAYS[selected] : null;

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-gold)', borderRadius: 6, padding: '14px 16px' }}>
      <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.68rem', color: 'var(--gold)', letterSpacing: '0.14em', marginBottom: 4 }}>
        JUNGIAN ENTRY PATHS · S · N · F · T
      </div>
      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 10, lineHeight: 1.4 }}>
        Every cognitive style has a natural entry into Laegna. Choose yours:
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: selected ? 10 : 0 }}>
        {(Object.entries(PATHWAYS) as [JType, typeof PATHWAYS[JType]][]).map(([k, v]) => (
          <button key={k} onClick={() => { setSelected(selected === k ? null : k); setTab('intro'); }}
            style={{
              padding: '8px 10px', textAlign: 'left', cursor: 'pointer',
              background: selected === k ? 'rgba(240,165,0,0.12)' : 'transparent',
              border: `1px solid ${selected === k ? 'var(--gold)' : 'var(--border-gold)'}`,
              borderRadius: 4, transition: 'all 0.2s',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <span style={{ fontSize: '1rem' }}>{v.icon}</span>
              <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.75rem', color: selected === k ? 'var(--gold)' : 'var(--text-parchment)' }}>{v.label}</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>{v.tagline}</div>
          </button>
        ))}
      </div>

      {pw && (
        <div style={{ borderTop: '1px solid var(--border-gold)', paddingTop: 10 }}>
          <div style={{ display: 'flex', gap: 4, marginBottom: 10, flexWrap: 'wrap' }}>
            {(['intro','entry','practice','world'] as const).map(tb => (
              <button key={tb} onClick={() => setTab(tb)} style={{
                padding: '3px 10px', fontSize: '0.62rem', fontFamily: 'var(--font-cinzel)',
                background: tab === tb ? 'rgba(240,165,0,0.15)' : 'transparent',
                border: `1px solid ${tab === tb ? 'var(--gold)' : 'rgba(240,165,0,0.2)'}`,
                color: tab === tb ? 'var(--gold)' : 'var(--text-muted)', cursor: 'pointer', borderRadius: 2,
                letterSpacing: '0.06em',
              }}>
                {tb === 'intro' ? 'Overview' : tb === 'entry' ? `Laegna Entry (${logic})` : tb === 'practice' ? 'Practice' : `${mode} World`}
              </button>
            ))}
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-parchment)', lineHeight: 1.7 }}>
            {tab === 'intro' && pw.intro}
            {tab === 'entry' && pw.laegnaEntry[logic]}
            {tab === 'practice' && pw.practice}
            {tab === 'world' && pw.exampleWorld[mode]}
          </div>
        </div>
      )}
    </div>
  );
}
