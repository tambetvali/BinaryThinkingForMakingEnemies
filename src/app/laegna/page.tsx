'use client';
import React from 'react';
import SiteNav from '@/components/philosophy/SiteNav';
import UpsideDownU from '@/components/philosophy/UpsideDownU';
import { usePhilosophyStore } from '@/store/philosophyStore';
import type { LogicSystem, Mode, Modality } from '@/store/philosophyStore';
import { LaegnaCompass, InfinityVisualizer, PonegationTable, GameStatesWidget, RTSNumberWidget } from '@/components/philosophy/LaegnaWidgets';
import { ConosVizWidget, OctaveIntegralWidget, KarmicFractalWidget, JungianPathways, IlluminationWidget } from '@/components/philosophy/LaegnaAdvanced';

// ─── Types ───────────────────────────────────────────────────────────────────
type ValueLetter = { letter: string; name: string; subtitle: string; meaning: string; color: string; dim: string; };
type SpaceLetter = { letter: string; name: string; zone: string; meaning: string; color: string; description: string };
type WorldCtx = { mode: Mode; modality: Modality; logic: LogicSystem };

// ─── Data ────────────────────────────────────────────────────────────────────
// Canonical Tao colors from Tambet Väli's source:
// I = Yellow (winter, the seed of change inside white), O = Red (evening, black Yin area),
// A = Green (day, white Yang area), E = Blue (summer, seed of change inside black)
const VALUE_LETTERS: ValueLetter[] = [
  { letter: 'I', name: 'Negotion', subtitle: 'signed −2 · active global negation',
    meaning: 'Deep negative assertion. The small black circle inside Yang — the seed of change within the positive. Signed value −2. "Negotion" ≠ "Negation": it is a stronger, more assertive rejection that *restructures the field*, not just denies it. Tao color: yellow. Season: winter.',
    color: '#c8a000', dim: 'rgba(200,160,0,0.13)' },
  { letter: 'O', name: 'Negation', subtitle: 'signed −1 · passive local negation',
    meaning: 'Simple negative assertion. The black area of the Yin-Yang — stable Yin. Signed value −1. Quiet absence, the space of potential before form. Tao color: red. Season: evening. The Z-zone root: early stability, diminishing returns.',
    color: '#c0392b', dim: 'rgba(192,57,43,0.13)' },
  { letter: 'A', name: 'Position', subtitle: 'signed +1 · passive local position',
    meaning: 'Simple positive assertion. The white area of the Yin-Yang — stable Yang. Signed value +1. Honest game: "good, resolves to reason." The present fact that simply is. Tao color: green. Season: day. X-zone equilibrium point.',
    color: '#2e7d32', dim: 'rgba(46,125,50,0.13)' },
  { letter: 'E', name: 'Posetion', subtitle: 'signed +2 · active global position',
    meaning: '"Posetion" ≠ "Position": it is a stronger, creative expression that *exceeds and transforms*. The small white circle inside Yin — the seed of change within the negative. Signed value +2. Warning: Posetion can become "overplayed positive" (fake good) via Rosedriad if context shifts. Tao color: blue. Season: summer. Y-zone crown.',
    color: '#1565c0', dim: 'rgba(21,101,192,0.13)' },
];

/** Compute what each letter means *in context* of current world/flow/system.
 *  Canonical Tao: I=yellow/winter/black-dot-in-yang, O=red/evening/black-yin,
 *  A=green/day/white-yang, E=blue/summer/white-dot-in-yin.
 *  Signed: I=−2, O=−1, A=+1, E=+2.
 */
function getLetterConnection(letter: string, ctx: WorldCtx): string {
  const { mode, modality, logic } = ctx;
  const isMat = mode === 'material';
  const isBot = modality === 'bottom-up';
  const chosen  = isMat ? (isBot ? 'Capitalism' : 'Communism')   : (isBot ? 'Materialism' : 'Spirituality');
  const opposed = isMat ? (isBot ? 'Communism'  : 'Capitalism')  : (isBot ? 'Spirituality' : 'Materialism');

  const map: Record<string, Record<LogicSystem, string>> = {
    I: {
      binary:
        `Binary error marker (−2, active global): ${!isBot ? `TRUE pole for top-down — "${chosen}" is locked here` : 'SUPPRESSED — binary collapses this into invisible'}.` +
        ` Using only 2 of 4 letters is the structural error: I and E carry the global dimension that binary cannot access.`,
      taoist:
        `I (−2, yellow, winter): the black seed inside Yang. In Taoist logic this is the global challenger — the dynamic questioning that moves ${chosen} toward its own transformation. ` +
        `Paired with E in the global arc (I·E). In ${isMat ? 'economics: structural critique of markets, creative destruction' : 'spirit: the dark night of the soul, transformative challenge to comfortable certainty'}.`,
      laegna:
        `Negotion (−2, global scale, winter, yellow): "the force not meant to be on that position." Real acceleration at a single point adds infinitesimals across whole infinity — in finite/local units, this creates a half-infinity of the exponent limit, ≈ 1/4 infinitesimal of the whole scale. ` +
        `${isMat ? 'Structural critique that reshapes market fields; revolutions that restructure all of economics' : 'The destabilizing insight that reconstructs whole worldviews; paradigm shifts in consciousness'}.`,
    },
    O: {
      binary:
        `Binary FALSE pole (−1, passive local): ${!isBot ? 'SUPPRESSED — binary cannot use O when I is the TRUE pole' : `FALSE = "not-${opposed}" — the quiet, unspoken negation of what is affirmed`}.` +
        ` O is the black Yin area — stable absence. Binary collapses it into a simple toggle.`,
      taoist:
        `O (−1, red, evening): the black area of the Yin-Yang — stable Yin. "The still no" that creates space for ${chosen} to be meaningful. ` +
        `Paired with A in the local arc (O·A). In ${isMat ? 'economics: necessary scarcity, void space before market formation, saving as absence enabling future investment' : 'spirit: apophatic theology, neti neti, the pregnant emptiness of meditation'}.`,
      laegna:
        `Negation (−1, local scale, evening, red): simple negative assertion. Z-zone root — early structure provides large gains (first institutions, first spiritual communities), returns diminish. ` +
        `${isMat ? 'The pre-market void: ground zero from which economic forms emerge. Also: necessary loss, bankruptcy as clearing' : 'The apophatic: what cannot be named, the ground of emptiness (sunyata) that enables form'}.`,
    },
    A: {
      binary:
        `Binary TRUE pole (${isBot ? '✓' : '—'}) (−1→+1 = honest): ${isBot ? `"${chosen} = TRUE" — binary locks here, position is affirmed, ${opposed} is FALSE by implication` : `FALSE marker for the negated pole — passive absence of ${chosen}`}.` +
        ` A is the evolutionarily stable strategy: "good, resolves to reason." Sincere is cheaper than deceptive at scale (thermodynamic stability).`,
      taoist:
        `A (+1, green, day): the white area of the Yin-Yang — stable Yang. "${chosen}" as the present fact that simply is. ` +
        `Paired with O in the local arc (O·A). In ${isMat ? 'economics: functioning markets, capital deployed in real production, honest price signals' : 'spirit: the body as ground, material causation as reliable substrate, the senses as trustworthy'}.`,
      laegna:
        `Position (+1, local scale, day, green): "direct positive, good, resolves to reason." X-zone equilibrium point; Z-zone settled base. ` +
        `${chosen} as stable substrate — ${isMat ? 'legal structures, capital accumulation, existing value chains, property rights' : 'the body, material causation, biological drives, the physical ground of all spiritual practice'}. ` +
        `LaeLane (X=Y, 45° balance): when A and E are in perfect proportion, growth is optimal without collapse.`,
    },
    E: {
      binary:
        `Binary TRUE pole (${!isBot ? '✓' : '—'}) or suppressed resolution (+2, active global): ${!isBot ? `"${chosen} = TRUE" — E locks in the top-down affirmed position` : 'SUPPRESSED — binary cannot use E when A is active; yet E contains the plus-sum Y-zone integration that resolves the binary trap'}.` +
        ` WARNING: E becomes Posetion (overstated positive, "fake good") via Rosedriad if R (context) shifts — not by the player's own choice.`,
      taoist:
        `E (+2, blue, summer): the white seed inside Yin. "${opposed}" as the expansive creative principle that exceeds the given. ` +
        `Paired with I in the global arc (I·E). In ${isMat ? 'economics: entrepreneurship, creative emergence, markets creating new value beyond existing supply/demand' : 'spirit: divine creativity, transcendence, the Brahma aspect (creation, futuristic, genetic evolution)'}.`,
      laegna:
        `Posetion (+2, global scale, summer, blue): "overstated positive" — exceeds and transforms. Y-zone crown: every time the whole R-system counts through once, Y phases the system upward. ` +
        `${isMat ? 'Blue Ocean strategy: creating uncontested market space, making competition irrelevant' : 'Dharma: long-term truth, the path of non-return in Buddhism — a mathematical fixed point that does not re-enter the counting loop'}. ` +
        `Rosedriad danger: ${chosen} in Position (A) can appear as Posetion (E) if the world's context (R) shifts — the actor doesn't change but is re-read as overplaying.`,
    },
  };
  return map[letter]?.[logic] ?? '';
}

/** Describe what each space zone means in context. */
function getSpaceConnection(letter: string, ctx: WorldCtx): string {
  const { mode, modality } = ctx;
  const isMat = mode === 'material';
  const isBot = modality === 'bottom-up';
  const chosen  = isMat ? (isBot ? 'capitalism' : 'communism')  : (isBot ? 'materialism' : 'spirituality');
  const opposed = isMat ? (isBot ? 'communism'  : 'capitalism') : (isBot ? 'spirituality' : 'materialism');

  const map: Record<string, string> = {
    Z: `Root zone for ${chosen}: early structure provides large early returns (first institutions, first spiritual practices), gains diminish later. ${isMat ? 'Mixed economies and welfare states operate here' : 'Meditative traditions, stable spiritual communities'} — coexistence of ${chosen} and ${opposed} is stable in Z.`,
    X: `The battleground: where ${chosen} and ${opposed} fight as equals. Linear exchange — every gain is the other's loss. ${isMat ? 'Market share wars, ideological cold wars' : 'Materialist vs spiritualist debates — each negates the other equally'}. Binary logic lives exclusively in X.`,
    Y: `The synthesis zone: ${chosen} and ${opposed} both grow together. ${isMat ? 'Blue Ocean markets, commons-based economies where both private and collective can expand' : 'Integrated spirituality — spirit deepens material understanding, matter grounds spiritual experience'}. Forgiveness becomes rational in Y.`,
  };
  return map[letter] ?? '';
}

// Z=Siinus(Sine)=Dukka, X=Koonus(Cone)=Karma=IOAE span, Y=Koosinus(Cosine)=Dharma
// Lower octave (yin, finite): z≡I (deep neg), x≡OA (the span), y≡E (deep pos)
// Upper octave (yang, infinite): Z≡U (depth), X≡IOAE (the interior living span), Y≡∩∩ (above-infinity)
const SPACE_LETTERS: SpaceLetter[] = [
  {
    letter: 'Z', name: 'Sub-Zero · Sine', zone: 'Logarithmic — past',
    meaning: 'Dukka · chaos · elements · winter · Big Bang',
    color: '#8b5cf6',
    description: 'Sub-zero dimension. Corresponds to the sine function (Estonian: Siinus) and Buddhist Dukka (suffering/impermanence). Compressed space: early gains are large, returns diminish. Equivalent to U (positive zero / exp boundary) in the upper dimension. The Z-zone is *before the game starts* — the chaotic substrate of all structure. In lower octave: z ≡ I (the deep negative seed).',
  },
  {
    letter: 'X', name: 'Lin Zone · Cone', zone: 'Linear — present',
    meaning: 'Karma · life · mind · the four seasons · IOAE span',
    color: '#e85d4a',
    description: 'Present dimension. Corresponds to the cone (Estonian: Koonus) and Buddhist Karma (cause-effect in the living world). Flat space — equal exchange, Nash equilibrium. The entire IOAE system (I, O, A, E) lives here as X = signed range −2..+2. Binary logic is *locked in X*: it cannot access Z or Y. In lower octave: x ≡ O·A (the stable local span). The X=Y balance line is the LaeLane (optimal 45° growth path).',
  },
  {
    letter: 'Y', name: 'Above-Infinity · Cosine', zone: 'Exponential — future',
    meaning: 'Dharma · spirit · long-term change · summer · ∩∩',
    color: '#1ecbe1',
    description: 'Above-infinity dimension. Corresponds to the cosine function (Estonian: Koosinus) and Buddhist Dharma (long-term truth, enlightenment path). Expanding space — returns compound. Equivalent to ∩∩ (positive infinity boundary). *Every time the whole R-system is counted through once*, Y phases the whole system upward by one level. In lower octave: y ≡ E (the deep positive seed). Infinite-game theory lives here: the goal is continuation, not winning.',
  },
];

// ─── Components ──────────────────────────────────────────────────────────────
function NumberLine() {
  return (
    <svg viewBox="0 0 500 80" style={{ width: '100%', height: 'auto' }}>
      <rect width="500" height="80" fill="#060c18" rx="6" />
      {/* Z zone — compressed left */}
      {[20, 35, 47, 57, 65, 72, 78].map((x, i) => (
        <g key={`z${i}`}>
          <line x1={x} y1="35" x2={x} y2="45" stroke="#8b5cf6" strokeWidth="1.5" opacity={0.6 + i * 0.04} />
          {i === 0 && <text x={x} y="58" textAnchor="middle" fill="#8b5cf6" fontSize="7" fontFamily="var(--font-mono)">Z</text>}
        </g>
      ))}
      {/* X zone — linear middle */}
      {[100, 130, 160, 190, 220, 250, 280, 310, 340, 370, 400].map((x, i) => (
        <g key={`x${i}`}>
          <line x1={x} y1="30" x2={x} y2="50" stroke="#e85d4a" strokeWidth="1.5" opacity={0.55} />
          {i === 5 && <text x={x} y="62" textAnchor="middle" fill="#e85d4a" fontSize="7" fontFamily="var(--font-mono)">X</text>}
        </g>
      ))}
      {/* Y zone — expanded right */}
      {[415, 432, 452, 478].map((x, i) => (
        <g key={`y${i}`}>
          <line x1={x} y1="25" x2={x} y2="55" stroke="#1ecbe1" strokeWidth="1.5" opacity={0.5 + i * 0.1} />
          {i === 2 && <text x={x} y="68" textAnchor="middle" fill="#1ecbe1" fontSize="7" fontFamily="var(--font-mono)">Y</text>}
        </g>
      ))}
      {/* base line */}
      <line x1="15" y1="40" x2="490" y2="40" stroke="rgba(240,165,0,0.3)" strokeWidth="1" />
      {/* labels */}
      <text x="50" y="15" textAnchor="middle" fill="#8b5cf6" fontSize="8" fontFamily="var(--font-cinzel)">LOGARITHMIC</text>
      <text x="250" y="15" textAnchor="middle" fill="#e85d4a" fontSize="8" fontFamily="var(--font-cinzel)">LINEAR</text>
      <text x="445" y="15" textAnchor="middle" fill="#1ecbe1" fontSize="8" fontFamily="var(--font-cinzel)">EXPONENTIAL</text>
    </svg>
  );
}

function ValueCard({ v, ctx }: { v: ValueLetter; ctx: WorldCtx }) {
  const connection = getLetterConnection(v.letter, ctx);
  // In binary mode, dim the "suppressed" letters
  const isBinary = ctx.logic === 'binary';
  const isBottom = ctx.modality === 'bottom-up';
  const activeInBinary = isBinary && ((isBottom && (v.letter==='A'||v.letter==='O')) || (!isBottom && (v.letter==='I'||v.letter==='E')));
  const suppressedInBinary = isBinary && !activeInBinary;

  return (
    <div className="phil-card" style={{
      borderColor: suppressedInBinary ? `rgba(139,92,246,0.3)` : `${v.color}44`,
      background: suppressedInBinary
        ? 'linear-gradient(135deg, rgba(139,92,246,0.07) 0%, var(--bg-card) 100%)'
        : `linear-gradient(135deg, ${v.dim} 0%, var(--bg-card) 100%)`,
      opacity: suppressedInBinary ? 0.75 : 1,
      transition: 'all 0.35s',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {suppressedInBinary && (
        <div style={{ position: 'absolute', top: 6, right: 8, fontSize: '0.6rem', color: 'var(--purple)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>SUPPRESSED</div>
      )}
      {activeInBinary && (
        <div style={{ position: 'absolute', top: 6, right: 8, fontSize: '0.6rem', color: 'var(--red-fire)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>ACTIVE</div>
      )}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem' }}>
        <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '3rem', color: suppressedInBinary ? 'var(--purple)' : v.color, lineHeight: 1, minWidth: '3rem', textAlign: 'center', textShadow: `0 0 20px ${v.color}44`, transition: 'color 0.3s' }}>
          {v.letter}
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1rem', color: suppressedInBinary ? 'var(--purple)' : v.color, marginBottom: '0.2rem', transition: 'color 0.3s' }}>{v.name}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{v.subtitle}</div>
        </div>
      </div>
      <p style={{ fontSize: '0.87rem', color: 'var(--text-parchment)', lineHeight: 1.65, marginBottom: '0.75rem' }}>{v.meaning}</p>
      {connection && (
        <div style={{ padding: '0.55rem 0.8rem', background: suppressedInBinary ? 'rgba(139,92,246,0.1)' : `${v.color}14`, borderRadius: 4, borderLeft: `3px solid ${suppressedInBinary ? 'var(--purple)' : v.color}66`, fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, transition: 'all 0.3s' }}>
          <span style={{ color: suppressedInBinary ? 'var(--purple)' : v.color, fontFamily: 'var(--font-cinzel)', fontSize: '0.65rem', letterSpacing: '0.1em' }}>
            {ctx.logic.toUpperCase()} · {ctx.mode.toUpperCase()} · {ctx.modality.toUpperCase()} ·{' '}
          </span>
          {connection}
        </div>
      )}
    </div>
  );
}

function SpaceCard({ s, ctx }: { s: SpaceLetter; ctx: WorldCtx }) {
  const connection = getSpaceConnection(s.letter, ctx);
  // Highlight the zone that matches the current logic
  const isActiveZone = (ctx.logic === 'binary' && s.letter === 'X')
    || (ctx.logic === 'taoist' && (s.letter === 'Z' || s.letter === 'Y'))
    || (ctx.logic === 'laegna');
  return (
    <div className="phil-card" style={{
      borderColor: isActiveZone ? `${s.color}66` : `${s.color}28`,
      background: `linear-gradient(135deg, ${s.color}${isActiveZone ? '12' : '07'} 0%, var(--bg-card) 100%)`,
      transition: 'all 0.35s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
        <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '2.5rem', color: s.color, lineHeight: 1, minWidth: '2.5rem', textAlign: 'center', textShadow: `0 0 16px ${s.color}${isActiveZone ? '88' : '33'}` }}>
          {s.letter}
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.95rem', color: s.color }}>{s.name}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>{s.zone} zone</div>
        </div>
        {isActiveZone && ctx.logic === 'binary' && s.letter === 'X' && (
          <div style={{ marginLeft: 'auto', fontSize: '0.6rem', color: 'var(--red-fire)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>ACTIVE</div>
        )}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: s.color, marginBottom: '0.6rem', opacity: 0.85 }}>{s.meaning}</div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: connection ? '0.6rem' : 0 }}>{s.description}</p>
      {connection && (
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, borderTop: `1px solid ${s.color}22`, paddingTop: '0.5rem', fontStyle: 'italic' }}>
          {connection}
        </div>
      )}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function LaegnaPage() {
  const { mode } = usePhilosophyStore();
  const isMaterial = mode === 'material';
  // Subtle bg tint: warm amber for material, cool indigo for spiritual
  const pageTint = isMaterial
    ? 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(176,120,0,0.07) 0%, transparent 70%)'
    : 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(109,57,200,0.08) 0%, transparent 70%)';
  return (
    <div style={{ minHeight: '100vh', background: `var(--bg-deep)`, backgroundImage: pageTint, color: 'var(--text-parchment)', position: 'relative', zIndex: 1, transition: 'background-image 0.5s' }}>
      <SiteNav />
      
      <main className="max-w-5xl mx-auto px-4 py-10">
        <HeroSection />
        <AttributionSection />
        {/* Two-column widget row: Compass + Infinity */}
        <WidgetRow />
        <ValueLettersSection />
        <SpaceLettersSection />
        <NumberLineSection />
        {/* RTS number system */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1rem', color: 'var(--teal)', marginBottom: '0.75rem' }}>
            RTS Notation — The Precision System
          </h2>
          <RTSNumberWidget />
        </section>
        {/* Ponegation table */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
            Ponegation — Four-Value Logic Table
          </h2>
          <PonegationTable />
        </section>
        {/* Game states */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1rem', color: '#2e7d32', marginBottom: '0.75rem' }}>
            IOAE Game States — Thermodynamic Stability
          </h2>
          <GameStatesWidget />
        </section>
        <ReactiveLetterView />

        {/* Conus paradigm viz */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1rem', color: 'var(--purple)', marginBottom: '0.75rem' }}>
            Sine · Cone · Cosine — Z·X·Y Living Dynamics
          </h2>
          <ConosVizWidget />
        </section>

        {/* Karmic fractal + octave integral side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.85rem', color: 'var(--gold)', marginBottom: '0.6rem', letterSpacing: '0.06em' }}>
              Karmic Fractal Tree
            </h2>
            <KarmicFractalWidget />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.85rem', color: 'var(--teal)', marginBottom: '0.6rem', letterSpacing: '0.06em' }}>
              Octave Integral · Karmic Logic
            </h2>
            <OctaveIntegralWidget />
          </div>
        </div>

        {/* Illumination attractor simulation */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1rem', color: '#2e7d32', marginBottom: '0.75rem' }}>
            Illumination Attractor — Karmic Game Evolution
          </h2>
          <IlluminationWidget />
        </section>

        {/* Jungian pathways */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
            Your Entry Path — S · N · F · T
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>
            Laegna is accessible to all cognitive styles. Whether you learn by sensing, intuiting, feeling, or analyzing — there is a natural doorway in.
          </p>
          <JungianPathways />
        </section>

        <BoundaryDigitsSection />
        <VsLatinSection />
        <OppositionMapSection />
        <SpiReasonSection />
      </main>
    </div>
  );
}

function WidgetRow() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
      <div>
        <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.85rem', color: 'var(--gold)', marginBottom: '0.6rem', letterSpacing: '0.06em' }}>
          IOAE Compass — Tao Quadrant Map
        </h2>
        <LaegnaCompass />
      </div>
      <div>
        <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.85rem', color: 'var(--teal)', marginBottom: '0.6rem', letterSpacing: '0.06em' }}>
          Infinity Theorem — Circle → ∞
        </h2>
        <InfinityVisualizer />
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--teal)', letterSpacing: '0.22em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
        Mathematics · Logic · Philosophy
      </div>
      <h1 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', color: 'var(--gold)', marginBottom: '0.75rem', lineHeight: 1.2 }}>
        Laegna — The Four-Fold Logic
      </h1>
      <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.85rem', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '1rem' }}>
        of Tambet Väli
      </p>
      <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
        A positional number system where values are defined not by quantity but by where they stand on an axis —
        logarithmic, linear, or exponential. Binary becomes base-4. Logic becomes navigable space.
      </p>
      <div className="geo-divider" style={{ margin: '2rem auto', maxWidth: 280 }} />
    </div>
  );
}

function AttributionSection() {
  const links = [
    { href: 'https://spireason.neocities.org', label: 'spireason.neocities.org' },
    { href: 'https://github.com/tambetvali/SimplyAboutInfinities', label: 'SimplyAboutInfinities' },
    { href: 'https://github.com/tambetvali/LaeLane', label: 'LaeLane' },
    { href: 'https://laegna.notaku.site', label: 'laegna.notaku.site' },
  ];
  return (
    <div className="phil-card" style={{ marginBottom: '2.5rem', borderColor: 'rgba(240,165,0,0.2)', textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.18em', marginBottom: '0.6rem' }}>ATTRIBUTION</div>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.9rem', lineHeight: 1.6 }}>
        Laegna was created by{' '}
        <a href="https://github.com/tambetvali" target="_blank" rel="noopener noreferrer"
          style={{ color: 'var(--gold)', borderBottom: '1px solid rgba(240,165,0,0.4)' }}>
          Tambet Väli
        </a>
        . All concepts, number systems, and logical structures on this page originate from his work.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
        {links.map(l => (
          <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
            style={{ padding: '0.35rem 0.75rem', background: 'rgba(240,165,0,0.08)', border: '1px solid rgba(240,165,0,0.25)', borderRadius: 4, fontSize: '0.75rem', color: 'var(--teal)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
            {l.label} ↗
          </a>
        ))}
      </div>
    </div>
  );
}

function ValueLettersSection() {
  const { mode, modality, logic } = usePhilosophyStore();
  const ctx: WorldCtx = { mode, modality, logic };
  const modeColor = mode === 'material' ? '#cd853f' : 'var(--purple)';
  const note = logic === 'binary'
    ? 'In Either/Or logic: only 2 of 4 letters are active — the others are suppressed (shown below). Using fewer than 4 is the structural error of binary thinking.'
    : logic === 'taoist'
    ? 'In Both/And logic: all 4 letters flow between two complementary pairs — local (O·A) and global (I·E).'
    : 'In Four-Fold Laegna: all 4 letters are precise coordinates. Their meaning shifts by zone (Z·X·Y) and by context (world/flow).';
  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.15rem', color: modeColor, marginBottom: '0.4rem' }}>
        The Four VALUE Letters — {mode === 'material' ? 'Material World' : 'Spiritual World'}
      </h2>
      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.6rem', lineHeight: 1.6 }}>
        Where binary logic has 0 and 1, Laegna has four poles: two negations (passive/active) and two positions (passive/active).
      </p>
      <div style={{ fontSize: '0.78rem', color: modeColor, marginBottom: '1.2rem', padding: '6px 12px', background: `${modeColor}11`, borderLeft: `3px solid ${modeColor}66`, lineHeight: 1.55 }}>
        {note}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {VALUE_LETTERS.map(v => <ValueCard key={v.letter} v={v} ctx={ctx} />)}
      </div>
    </section>
  );
}

function SpaceLettersSection() {
  const { mode, modality, logic } = usePhilosophyStore();
  const ctx: WorldCtx = { mode, modality, logic };
  const modeColor = mode === 'material' ? '#cd853f' : 'var(--purple)';
  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.15rem', color: modeColor, marginBottom: '0.4rem' }}>
        The Three SPACE Letters — {logic === 'binary' ? 'X Active' : logic === 'taoist' ? 'Z·Y Active' : 'Z·X·Y Full'}
      </h2>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Space letters define the curvature of the axis itself — how the same value letters project differently depending on zone.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
        {SPACE_LETTERS.map(s => <SpaceCard key={s.letter} s={s} ctx={ctx} />)}
      </div>
    </section>
  );
}

function NumberLineSection() {
  return (
    <section className="phil-card" style={{ marginBottom: '2.5rem', borderColor: 'rgba(240,165,0,0.2)' }}>
      <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1rem', color: 'var(--gold)', marginBottom: '1rem' }}>
        The Laegna Number Line — Z · X · Y
      </h2>
      <NumberLine />
      <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.6, fontFamily: 'var(--font-mono)' }}>
        Z (compressed) · X (equal spacing) · Y (expanding) — one axis, three curvatures
      </p>
    </section>
  );
}

// ─── Reactive letter view ─────────────────────────────────────────────────────

/**
 * The letter roles change depending on which logic system / world / flow
 * the user has selected. Each configuration maps I·O·A·E to contextual
 * meanings, and shows the metalogical binary trap + its resolution.
 */

type LetterRole = {
  letter: string;
  role: string;
  desc: string;
  color: string;
  accent?: string; // 'trap' | 'resolution' | 'neutral'
};

function getLetterRoles(logic: LogicSystem, mode: Mode, modality: Modality): {
  title: string;
  subtitle: string;
  roles: LetterRole[];
  trap?: string;
  resolution?: string;
  spaceNote?: string;
} {
  const isBottom = modality === 'bottom-up';
  const isMaterial = mode === 'material';
  const chosen  = isMaterial ? (isBottom ? 'Capitalism' : 'Communism') : (isBottom ? 'Materialism' : 'Spirituality');
  const opposed = isMaterial ? (isBottom ? 'Communism' : 'Capitalism') : (isBottom ? 'Spirituality' : 'Materialism');

  if (logic === 'binary') {
    // Binary: only two of four letters are "used" — one is TRUE, one is FALSE.
    // The trap: other two are suppressed, making resolution impossible.
    const trueL  = isBottom ? 'A' : 'I';
    const falseL = isBottom ? 'O' : 'E';
    const resL1  = isBottom ? 'I' : 'A';
    const resL2  = isBottom ? 'E' : 'O';
    return {
      title: 'Binary (Either/Or) — Metalogical View',
      subtitle: `In binary logic only two of the four Laegna letters are activated. The other two — which carry the resolution — are suppressed.`,
      roles: [
        { letter: trueL,  role: 'TRUE — activated',    color: isBottom ? '#f0a500' : '#e85d4a', accent: 'trap',
          desc: `${chosen}: the affirmed pole. Binary logic locks "${chosen}" here and treats this as the only real position.` },
        { letter: falseL, role: 'FALSE — activated',   color: '#7a8a9a',                        accent: 'trap',
          desc: `¬${opposed}: the negated pole. Binary collapses ${opposed} into simple absence — the unthinkable other.` },
        { letter: resL1,  role: 'SUPPRESSED — resolution', color: '#8b5cf6',                    accent: 'resolution',
          desc: `Hidden resolution for global/local flip. In binary, this letter is invisible — but it contains the path out of the trap.` },
        { letter: resL2,  role: 'SUPPRESSED — resolution', color: '#1ecbe1',                    accent: 'resolution',
          desc: `Hidden synthesis. The binary frame cannot access this position — yet it holds the integration that dissolves the opposition.` },
      ],
      trap: `Binary trap: "${chosen} = TRUE, ${opposed} = FALSE" is a zero-sum Nash equilibrium. Neither pole can improve without the other losing. The X-zone freezes the game.`,
      resolution: `Resolution exists in the suppressed pair. For a global problem (I↔E scope), resolution lives in the local pair (O↔A). For a local problem (O↔A scope), resolution lives in the global pair (I↔E). One "unit" of real acceleration at a single point adds infinitesimals across whole infinity — in finite/local units this creates a half-infinity of the exponent limit, ≈ 1/4 infinitesimal of the whole number scale.`,
      spaceNote: `Space: X-zone (linear/zero-sum) governs binary logic. No forgiveness, no compounding. Every gain is the other's loss.`,
    };
  }

  if (logic === 'taoist') {
    return {
      title: 'Taoist (Both/And) — Dual Flow View',
      subtitle: 'In Taoist logic all four letters are active. They flow between two complementary pairs: the local (O·A) and the global (I·E).',
      roles: [
        { letter: 'I', role: 'Active Negotion — global reach',   color: '#e85d4a',
          desc: `The dynamic "no" at global scope. In ${isMaterial ? 'politics' : 'spirit'}: the questioning that challenges whole systems. Paired with E.` },
        { letter: 'O', role: 'Passive Negation — local rest',    color: '#7a8a9a',
          desc: `The still "no" at local scope. Creates the space of potential — emptiness that allows new form. Paired with A.` },
        { letter: 'A', role: 'Passive Position — local ground',  color: '#f0a500',
          desc: `The still "yes" at local scope. ${chosen}: stable material/spiritual fact. The root from which flow originates.` },
        { letter: 'E', role: 'Active Posetion — global force',   color: '#1ecbe1',
          desc: `The dynamic "yes" at global scope. ${opposed}: the expansive creative principle that reaches beyond the given.` },
      ],
      resolution: `Taoist: I·E (global pair) and O·A (local pair) interpenetrate. ${chosen} and ${opposed} are not enemies — they are the local and global expressions of the same optimization. Neither can be suppressed without loss.`,
      spaceNote: `Space: Both Z-zone (coexistence root) and Y-zone (plus-sum crown) are accessible. The X-zone equilibrium is temporary, not permanent.`,
    };
  }

  // laegna
  return {
    title: 'Laegna (Four-Fold) — Full Positional View',
    subtitle: 'Laegna activates all four letters with precise positional meaning. Each is a coordinate, not a truth value. Z·X·Y determine whether the axis is compressing, flat, or expanding.',
    roles: [
      { letter: 'I', role: 'Negotion · active −global',  color: '#e85d4a',
        desc: `Active negation at global (infinitary) scale. Real acceleration at one point adds infinitesimals across the whole infinity. In ${isMaterial ? 'economics' : 'consciousness'}: structural critique that reshapes the whole field.` },
      { letter: 'O', role: 'Negation · passive −local',  color: '#7a8a9a',
        desc: `Passive negation at local (finite) scale. The ground of potential. In the Z-zone (log projection), early gains are large; this is the root of coexistence and stability.` },
      { letter: 'A', role: 'Position · passive +local',  color: '#f0a500',
        desc: `Passive position at local scale. ${chosen}: the stable present fact. On the X-axis this is the equilibrium point; on the Z-axis this is the settled base.` },
      { letter: 'E', role: 'Posetion · active +global',  color: '#1ecbe1',
        desc: `Active position at global scale. ${opposed}: the creative expansive force. In the Y-zone (exp projection), this is the region where small inputs compound into large outputs — the plus-sum crown.` },
    ],
    resolution: `The diagonal of I↔A (global neg ↔ local pos) and O↔E (local neg ↔ global pos) divides the space by two — giving half-infinity of the exponent limit, ≈ 1/4 infinitesimal of the whole number scale. This is why integration (Y-zone) always outperforms competition (X-zone) at scale: the axis is not flat but exponentially expanding.`,
    spaceNote: `Z·X·Y zones change how the same letter-coordinates project onto the axis: Z compresses early distances (root stability), X is flat (binary equilibrium), Y expands late distances (plus-sum emergence). The number line is not uniform — it is alive.`,
  };
}

function ReactiveLetterView() {
  const { logic, mode, modality } = usePhilosophyStore();
  const data = getLetterRoles(logic, mode, modality);

  const logicColor = logic === 'binary' ? 'var(--red-fire)' : logic === 'taoist' ? 'var(--teal)' : 'var(--gold)';
  const accentBg   = logic === 'binary' ? 'rgba(232,93,74,0.06)' : logic === 'taoist' ? 'rgba(30,203,225,0.06)' : 'rgba(240,165,0,0.06)';

  return (
    <section style={{ marginBottom: '3rem', background: accentBg, border: `1px solid ${logicColor}33`, borderRadius: 6, padding: '1.5rem', transition: 'all 0.4s' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: logicColor, letterSpacing: '0.18em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
        REACTIVE · CHANGES WITH YOUR SELECTIONS
      </div>
      <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.05rem', color: logicColor, marginBottom: '0.4rem', transition: 'color 0.3s' }}>
        {data.title}
      </h2>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.65, maxWidth: '660px' }}>
        {data.subtitle}
      </p>

      {/* Letter role cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
        {data.roles.map(r => (
          <div key={r.letter} style={{
            padding: '0.9rem',
            background: r.accent === 'trap' ? `${r.color}0f` : r.accent === 'resolution' ? 'rgba(139,92,246,0.08)' : `${r.color}0a`,
            border: `1px solid ${r.accent === 'resolution' ? 'rgba(139,92,246,0.3)' : r.color + '44'}`,
            borderRadius: 4,
            transition: 'all 0.3s',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.8rem', color: r.color, lineHeight: 1, textShadow: `0 0 12px ${r.color}55` }}>
                {r.letter}
              </span>
              <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.62rem', color: r.color, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.85 }}>
                {r.role}
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>{r.desc}</p>
            {r.accent === 'trap' && (
              <div style={{ marginTop: '0.4rem', fontSize: '0.68rem', color: 'var(--red-fire)', fontFamily: 'var(--font-mono)', opacity: 0.7 }}>⚔ binary trap</div>
            )}
            {r.accent === 'resolution' && (
              <div style={{ marginTop: '0.4rem', fontSize: '0.68rem', color: 'var(--purple)', fontFamily: 'var(--font-mono)', opacity: 0.8 }}>◈ resolution path</div>
            )}
          </div>
        ))}
      </div>

      {/* Trap callout */}
      {data.trap && (
        <div style={{ padding: '0.75rem 1rem', background: 'rgba(232,93,74,0.08)', borderLeft: '3px solid var(--red-fire)', borderRadius: '0 3px 3px 0', fontSize: '0.82rem', color: 'var(--text-parchment)', lineHeight: 1.65, marginBottom: '0.75rem' }}>
          <span style={{ color: 'var(--red-fire)', fontFamily: 'var(--font-cinzel)', fontSize: '0.65rem', letterSpacing: '0.1em', display: 'block', marginBottom: '0.3rem' }}>BINARY TRAP</span>
          {data.trap}
        </div>
      )}

      {/* Resolution */}
      {data.resolution && (
        <div style={{ padding: '0.75rem 1rem', background: 'rgba(139,92,246,0.08)', borderLeft: '3px solid var(--purple)', borderRadius: '0 3px 3px 0', fontSize: '0.82rem', color: 'var(--text-parchment)', lineHeight: 1.65, marginBottom: '0.75rem' }}>
          <span style={{ color: 'var(--purple)', fontFamily: 'var(--font-cinzel)', fontSize: '0.65rem', letterSpacing: '0.1em', display: 'block', marginBottom: '0.3rem' }}>
            {logic === 'binary' ? 'RESOLUTION PATH (SUPPRESSED IN BINARY)' : 'INTEGRATION'}
          </span>
          {data.resolution}
        </div>
      )}

      {/* Space note */}
      {data.spaceNote && (
        <div style={{ padding: '0.6rem 0.9rem', background: `${logicColor}08`, border: `1px solid ${logicColor}22`, borderRadius: 3, fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', lineHeight: 1.6 }}>
          {data.spaceNote}
        </div>
      )}
    </section>
  );
}

function BoundaryDigitsSection() {
  const textDigits = ['V', 'W', 'U'];
  const pillarStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    background: 'rgba(139,92,246,0.12)',
    border: '1px solid rgba(139,92,246,0.3)',
    borderRadius: 6,
    fontFamily: 'var(--font-cinzel)',
    fontSize: '1.4rem',
    color: 'var(--purple)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '3rem',
  };
  return (
    <section className="phil-card" style={{ marginBottom: '2.5rem', borderColor: 'rgba(139,92,246,0.25)', background: 'rgba(139,92,246,0.04)' }}>
      <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1rem', color: 'var(--purple)', marginBottom: '0.75rem' }}>
        Boundary Digits — NOT Base Digits
      </h2>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {textDigits.map(d => (
          <div key={d} style={pillarStyle}>{d}</div>
        ))}
        {/* Upside-down U — proper SVG glyph, not Unicode ∪ */}
        <div style={pillarStyle}>
          <UpsideDownU fontSize={22} color="var(--purple)" isSmall={false} />
        </div>
      </div>
      <p style={{ fontSize: '0.87rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
        V, W, U, and upside-down U (
        <UpsideDownU fontSize={14} color="var(--purple)" isSmall={true}
          style={{ verticalAlign: 'middle', position: 'relative', top: '-1px' }} />
        ) are <em style={{ color: 'var(--purple)' }}>boundary digits</em> — used only for limit calculations, not as positional digits in the base system.
        They mark the zone-transition thresholds where logarithmic meets linear meets exponential — the hinges of the axis.
      </p>
    </section>
  );
}

function VsLatinSection() {
  return (
    <section className="phil-card" style={{ marginBottom: '2.5rem', borderColor: 'rgba(30,203,225,0.2)' }}>
      <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1rem', color: 'var(--teal)', marginBottom: '1rem' }}>
        Laegna vs Latin Numbers
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ padding: '0.9rem', background: 'rgba(232,93,74,0.07)', borderRadius: 6, borderTop: '2px solid rgba(232,93,74,0.3)' }}>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.72rem', color: '#e85d4a', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>LATIN (IDEALISTIC)</div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
            Numbers are ideal quantities — 3 is always 3, regardless of context or position. Values are fixed objects.
            The number line is uniformly flat: every step is the same size.
          </p>
        </div>
        <div style={{ padding: '0.9rem', background: 'rgba(30,203,225,0.07)', borderRadius: 6, borderTop: '2px solid rgba(30,203,225,0.3)' }}>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.72rem', color: 'var(--teal)', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>LAEGNA (POSITIONAL)</div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
            Numbers are not values but <em style={{ color: 'var(--text-parchment)' }}>positions on an axis</em> — next/previous points.
            A point-accelerated system: the same numeral means different things depending on which zone (Z, X, Y) it inhabits.
          </p>
        </div>
      </div>
    </section>
  );
}

function OppositionMapSection() {
  const map = [
    { pole: 'A', label: 'Capitalism', color: '#f0a500', note: 'Stable presence — material structures that simply are' },
    { pole: 'E', label: 'Spirituality', color: '#1ecbe1', note: 'Active expression — the creative principle' },
    { pole: 'O', label: 'Communism', color: '#7a8a9a', note: 'Passive negation — emptying of private accumulation' },
    { pole: 'I', label: 'Critique / Revolution', color: '#e85d4a', note: 'Active negation — perpetual opposition to the given' },
  ];
  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.1rem', color: 'var(--gold)', marginBottom: '1.25rem' }}>
        I·O·A·E Opposition Map
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {map.map(item => (
          <div key={item.pole} className="phil-card" style={{ borderColor: `${item.color}44` }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.8rem', color: item.color, textShadow: `0 0 12px ${item.color}44` }}>{item.pole}</span>
              <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.9rem', color: item.color }}>{item.label}</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SpiReasonSection() {
  return (
    <section className="phil-card" style={{ borderColor: 'rgba(240,165,0,0.25)', background: 'linear-gradient(135deg, rgba(240,165,0,0.04) 0%, var(--bg-card) 100%)', textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.2em', marginBottom: '0.75rem' }}>ECOSYSTEM</div>
      <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.1rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>SpiReason — The Laegna Ecosystem</h2>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 1.25rem', lineHeight: 1.7 }}>
        Laegna is the mathematical foundation of the SpiReason project — a living ecosystem connecting logic,
        spirituality, and self-organizing data. The <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--teal)', fontSize: '0.82rem' }}>sheepcounter.json</span> data
        reference tracks emergent patterns across the system.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href="https://spireason.neocities.org" target="_blank" rel="noopener noreferrer"
          style={{ padding: '0.6rem 1.2rem', background: 'rgba(240,165,0,0.12)', border: '1px solid rgba(240,165,0,0.4)', borderRadius: 6, fontFamily: 'var(--font-cinzel)', fontSize: '0.8rem', color: 'var(--gold)', letterSpacing: '0.08em' }}>
          spireason.neocities.org ↗
        </a>
        <a href="https://github.com/tambetvali/SimplyAboutInfinities" target="_blank" rel="noopener noreferrer"
          style={{ padding: '0.6rem 1.2rem', background: 'rgba(30,203,225,0.08)', border: '1px solid rgba(30,203,225,0.3)', borderRadius: 6, fontFamily: 'var(--font-cinzel)', fontSize: '0.8rem', color: 'var(--teal)', letterSpacing: '0.08em' }}>
          SimplyAboutInfinities ↗
        </a>
      </div>
    </section>
  );
}
