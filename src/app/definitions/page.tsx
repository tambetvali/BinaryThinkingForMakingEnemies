'use client';
import React, { useState } from 'react';
import SiteNav from '@/components/philosophy/SiteNav';
import { usePhilosophyStore } from '@/store/philosophyStore';

// ── Types ─────────────────────────────────────────────────────────────────────
type SecondLetter = 'A' | 'O' | 'I' | 'E';
type FirstLetter  = 'A' | 'O' | 'I' | 'E';

interface Definition {
  first: FirstLetter;   // row: world (A=Capital, O=Commun, E=Spirit, I=Material)
  second: SecondLetter; // col: mode  (A=Pos, O=Neg, I=Neg, E=Pos)
  hex: string;          // single laegna hex letter
  title: string;
  body: string;
}

// ── Laegna hex table ──────────────────────────────────────────────────────────
// Primary digit (row, first letter) from bottom to top: I O A E
// Secondary digit (col, second letter) left to right:   I O A E
// Row E: G F E H  (EI EO EA EE)
// Row A: C B A D  (AI AO AA AE)
// Row O: Q P O R  (OI OO OA OE)
// Row I: K J I L  (II IO IA IE)
const HEX: Record<FirstLetter, Record<SecondLetter, string>> = {
  E: { I: 'G', O: 'F', A: 'E', E: 'H' },
  A: { I: 'C', O: 'B', A: 'A', E: 'D' },
  O: { I: 'Q', O: 'P', A: 'O', E: 'R' },
  I: { I: 'K', O: 'J', A: 'I', E: 'L' },
};

// ── Letter colors (canonical Tao) ─────────────────────────────────────────────
const LC: Record<FirstLetter | SecondLetter, string> = {
  I: '#c8a000', O: '#c0392b', A: '#2e7d32', E: '#1565c0',
};

const SECOND_NAMES: Record<SecondLetter, string> = {
  A: 'Position', O: 'Negation', I: 'Negotion', E: 'Posetion',
};
const FIRST_NAMES: Record<FirstLetter, string> = {
  A: 'Capitalism', O: 'Communism', E: 'Spiritualism', I: 'Materialism',
};

// ── All 16 definitions ────────────────────────────────────────────────────────
const DEFS: Definition[] = [
  // ── MATERIALISM (I = −2, yellow, global-scale negation) ──
  {
    first: 'I', second: 'A', hex: 'I',
    title: 'Being materialist (Position)',
    body: 'Reasoning about matter in yin, cause-and-effect, material logic. Understanding science: the world is as it is, things follow from prior things, observations are primary. This is the grounded, honest scientific stance — A within I. Signed: IA = I(−2) · A(+1).',
  },
  {
    first: 'I', second: 'O', hex: 'J',
    title: 'Being materialist (Negation)',
    body: 'Healthily breaking all rules and seeing correspondences. One somewhat shares resources and must balance in the negation of the base materialist instinct — acknowledging that pure accumulation is not possible, that the negative is also real. The scientist who says "this hypothesis is wrong." Signed: IO.',
  },
  {
    first: 'I', second: 'I', hex: 'K',
    title: 'Being materialist (Negotion)',
    body: 'Not reasoning about matter in material logic. This is the trivialy-true binary error: applying I (negotion, strong negation) to the I-frame (materialism) negates itself — you are a materialist who refuses material reasoning. In binary logic, this is the suppressed, invisible contradiction. Signed: II = −4.',
  },
  {
    first: 'I', second: 'E', hex: 'L',
    title: 'Being materialist (Posetion)',
    body: 'Reasoning about spirit in yin, cause-and-effect, material logic. This appears in narrow thinking where lack of other perspectives brings madness: the reductionist who explains love as brain chemistry, creativity as dopamine, consciousness as mere mechanism — not wrong, but dangerously over-extended. Signed: IE.',
  },

  // ── COMMUNISM (O = −1, red, local-scale negation) ──
  {
    first: 'O', second: 'A', hex: 'O',
    title: 'Being communist (Position)',
    body: 'Positive thesis: to think about the social in terms of the social, using correct macroeconomic math. Recognizing that collective dynamics have their own laws, not reducible to individual incentives alone. Honest collective reasoning — A within O. Signed: OA = −1 · +1.',
  },
  {
    first: 'O', second: 'O', hex: 'P',
    title: 'Being communist (Negation)',
    body: 'Social work takes time from private entrepreneurship. There is a healthy "no" — not everything can be shared; some resources require private initiative. The communist who acknowledges the cost of collectivization, who applies productive negation to their own program. Signed: OO = −2.',
  },
  {
    first: 'O', second: 'I', hex: 'Q',
    title: 'Being communist (Negotion)',
    body: 'Not thinking of social dynamics in terms of social scale — or thinking it is not the case that both private and social exist and can be integrated. The error of denying that collective phenomena are real in their own right. In binary logic, O and I together form the suppressed global-negative arc. Signed: OI.',
  },
  {
    first: 'O', second: 'E', hex: 'R',
    title: 'Being communist (Posetion)',
    body: 'To think of capitalism as if it were a large-scale communal business — as if everyone is interested in your direct plan, as if the market were a cooperative. The naive over-extension of social logic into capitalist territory: forced collectivization treating private actors as planned units. Signed: OE.',
  },

  // ── CAPITALISM (A = +1, green, local-scale position) ──
  {
    first: 'A', second: 'A', hex: 'A',
    title: 'Being capitalist (Position)',
    body: 'Doing local economics in local terms, accepting evolution: how high goals project to short-term best selections and integrate in evolution, which recognizes creativity and intuition on stock markets. Honest, grounded market participation. Signed: AA = +2.',
  },
  {
    first: 'A', second: 'O', hex: 'B',
    title: 'Being capitalist (Negation)',
    body: 'One cannot always share. There is a productive "no" in capitalism — not every resource can be freely distributed, not every profit can be socialized. Healthy limits on generosity protect productive investment. The capitalist who acknowledges cost and scarcity honestly. Signed: AO.',
  },
  {
    first: 'A', second: 'I', hex: 'C',
    title: 'Being capitalist (Negotion)',
    body: 'To not think about local business in terms of capitalism. The refusal to apply market logic to market phenomena — an entrepreneur who denies that incentives shape behavior, or a business that ignores profit signals. This is the suppressed contradiction within the capitalist frame. Signed: AI.',
  },
  {
    first: 'A', second: 'E', hex: 'D',
    title: 'Being capitalist (Posetion)',
    body: 'To think about sharing and community in terms of prevailing self-interest — applying capitalist logic to communal domains, measuring friendship by ROI, treating altruism as brand strategy. The over-extension of market logic into non-market spheres. Signed: AE.',
  },

  // ── SPIRITUALISM (E = +2, blue, global-scale posetion) ──
  {
    first: 'E', second: 'A', hex: 'E',
    title: 'Being spiritual (Position)',
    body: 'Reasoning about spirit in yang, brain-based, goal-based spiritual logic. Genuine spiritual practice that is honest about its own mechanisms — meditation that acknowledges neurological correlates, prayer that understands its psychological function. Spirit grounded in position. Signed: EA.',
  },
  {
    first: 'E', second: 'O', hex: 'F',
    title: 'Being spiritual (Negation)',
    body: 'One must still sacrifice to do the material thing, because not all resources are free. There is a healthy "no" even in spiritual life — life involves deduction, negation, limits. The spiritual person who acknowledges suffering (Dukka) as the first truth, who does not bypass material reality. Signed: EO.',
  },
  {
    first: 'E', second: 'I', hex: 'G',
    title: 'Being spiritual (Negotion)',
    body: 'Not reasoning about spirit in spiritual logic. This is unsafe but like a natural binary contradiction — the mystic who denies the spiritual dimension, the yogi who lives the practice but refuses to acknowledge what they are doing. The suppressed global positive in a binary frame. Signed: EI.',
  },
  {
    first: 'E', second: 'E', hex: 'H',
    title: 'Being spiritual (Posetion)',
    body: 'Reasoning about matter in yang, goal-based, spiritual logic. This leads to naive idealism: nature is expected to "work for you," the universe to manifest your wishes, or even plain math to bend to intention. The over-extension of spiritual logic into material territory. Signed: EE = +4.',
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DefinitionsPage() {
  const { mode, modality, logic } = usePhilosophyStore();
  const [active, setActive] = useState<string | null>(null);
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);

  function select(first: FirstLetter, second: SecondLetter) {
    const key = `${first}${second}`;
    setActive(key);
    setScrollTarget(key);
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', color: 'var(--text-parchment)' }}>
      <SiteNav />
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 16px 80px' }}>
        <Hero />
        <HexGrid active={active} onSelect={select} logic={logic} mode={mode} modality={modality} />
        <DefinitionsList active={active} scrollTarget={scrollTarget} onSelect={select} logic={logic} mode={mode} modality={modality} />
      </main>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <div style={{ textAlign: 'center', marginBottom: 36 }}>
      <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.68rem', color: 'var(--teal)', letterSpacing: '0.2em', marginBottom: 10 }}>
        LAEGNA · FOUR-FOLD DEFINITIONS
      </div>
      <h1 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(1.4rem,4vw,2.2rem)', color: 'var(--gold)', marginBottom: 12 }}>
        16 Positions of Being
      </h1>
      <p style={{ color: 'var(--text-muted)', maxWidth: 620, margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.75 }}>
        Every world-view (Capitalism A, Communism O, Spiritualism E, Materialism I) holds four logical positions: Position A, Negation O, Negotion I, Posetion E. Together they form 16 two-digit Laegna numbers, each with a unique hex letter. Click any cell to explore.
      </p>
    </div>
  );
}

// ── HexGrid ───────────────────────────────────────────────────────────────────
function HexGrid({ active, onSelect, logic, mode, modality }: {
  active: string | null;
  onSelect: (f: FirstLetter, s: SecondLetter) => void;
  logic: string; mode: string; modality: string;
}) {
  const rows: FirstLetter[] = ['E','A','O','I'];
  const cols: SecondLetter[] = ['I','O','A','E'];

  // Highlight the "current" cell based on mode/modality/logic
  const currentFirst: FirstLetter = mode === 'spiritual' ? 'E' : mode === 'material' ? 'I' :
    modality === 'bottom-up' ? 'A' : 'O';
  const currentSecond: SecondLetter = logic === 'binary' ? 'A' : logic === 'taoist' ? 'O' : 'E';

  return (
    <div style={{ marginBottom: 40 }}>
      {/* Column headers */}
      <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(4, 1fr)', gap: 6, marginBottom: 6 }}>
        <div />
        {cols.map(c => (
          <div key={c} style={{ textAlign: 'center', fontFamily: 'var(--font-cinzel)', fontSize: '0.72rem', color: LC[c], letterSpacing: '0.1em' }}>
            {c}<br/><span style={{ fontSize: '0.58rem', opacity: 0.7 }}>{SECOND_NAMES[c]}</span>
          </div>
        ))}
      </div>
      {/* Rows */}
      {rows.map(r => (
        <div key={r} style={{ display: 'grid', gridTemplateColumns: '100px repeat(4, 1fr)', gap: 6, marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1rem', color: LC[r] }}>{r}</span>
            <span style={{ fontSize: '0.6rem', color: LC[r], opacity: 0.8 }}>{FIRST_NAMES[r]}</span>
          </div>
          {cols.map(c => {
            const hex = HEX[r][c];
            const key = `${r}${c}`;
            const isActive = active === key;
            const isCurrent = r === currentFirst && c === currentSecond;
            return (
              <button key={c} onClick={() => onSelect(r, c)}
                title={`${FIRST_NAMES[r]} · ${SECOND_NAMES[c]} = ${hex}`}
                style={{
                  padding: '14px 6px', textAlign: 'center', cursor: 'pointer', borderRadius: 4,
                  background: isActive ? `${LC[r]}22` : isCurrent ? `${LC[c]}12` : 'var(--bg-card)',
                  border: `1px solid ${isActive ? LC[r] : isCurrent ? LC[c] + '88' : 'rgba(240,165,0,0.12)'}`,
                  transition: 'all 0.2s',
                  boxShadow: isActive ? `0 0 12px ${LC[r]}44` : 'none',
                }}>
                <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.25rem', color: isActive ? LC[r] : 'var(--text-parchment)', marginBottom: 2 }}>{hex}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)' }}>{r}{c}</div>
              </button>
            );
          })}
        </div>
      ))}
      {/* Legend */}
      <div style={{ marginTop: 10, display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
        {(['I','O','A','E'] as FirstLetter[]).map(l => (
          <span key={l}><span style={{ color: LC[l], fontFamily: 'var(--font-cinzel)' }}>{l}</span> = {FIRST_NAMES[l]}</span>
        ))}
        <span style={{ marginLeft: 8 }}>·</span>
        {(['I','O','A','E'] as SecondLetter[]).map(l => (
          <span key={l}><span style={{ color: LC[l], fontFamily: 'var(--font-cinzel)' }}>{l}</span> = {SECOND_NAMES[l]}</span>
        ))}
      </div>
    </div>
  );
}

// ── DefinitionsList ───────────────────────────────────────────────────────────
function DefinitionsList({ active, scrollTarget, onSelect, logic, mode, modality }: {
  active: string | null; scrollTarget: string | null;
  onSelect: (f: FirstLetter, s: SecondLetter) => void;
  logic: string; mode: string; modality: string;
}) {
  const rows: FirstLetter[] = ['I','O','A','E'];
  const cols: SecondLetter[] = ['I','O','A','E'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {rows.map(r => (
        <WorldBlock key={r} first={r} cols={cols} active={active} scrollTarget={scrollTarget}
          onSelect={onSelect} logic={logic} mode={mode} modality={modality} />
      ))}
    </div>
  );
}

function WorldBlock({ first, cols, active, scrollTarget, onSelect, logic, mode, modality }: {
  first: FirstLetter; cols: SecondLetter[]; active: string | null; scrollTarget: string | null;
  onSelect: (f: FirstLetter, s: SecondLetter) => void;
  logic: string; mode: string; modality: string;
}) {
  const def = DEFS.filter(d => d.first === first);
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, borderBottom: `1px solid ${LC[first]}33`, paddingBottom: 10 }}>
        <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '2rem', color: LC[first] }}>{first}</span>
        <div>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1rem', color: LC[first] }}>{FIRST_NAMES[first]}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{getWorldSubtitle(first)}</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
        {def.map(d => <DefCard key={d.hex} d={d} isActive={active === `${d.first}${d.second}`}
          isScrollTarget={scrollTarget === `${d.first}${d.second}`}
          onClick={() => onSelect(d.first, d.second)} logic={logic} mode={mode} modality={modality} />)}
      </div>
    </section>
  );
}

function getWorldSubtitle(f: FirstLetter): string {
  return {
    I: 'Materialism · signed −2 · yellow · winter · global-scale negation',
    O: 'Communism · signed −1 · red · evening · local-scale negation',
    A: 'Capitalism · signed +1 · green · day · local-scale position',
    E: 'Spiritualism · signed +2 · blue · summer · global-scale posetion',
  }[f];
}

function DefCard({ d, isActive, isScrollTarget, onClick, logic, mode, modality }: {
  d: Definition; isActive: boolean; isScrollTarget: boolean;
  onClick: () => void; logic: string; mode: string; modality: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (isScrollTarget && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isScrollTarget]);

  const contextNote = getContextNote(d, logic, mode, modality);

  return (
    <div ref={ref} onClick={onClick} style={{
      padding: '16px', cursor: 'pointer',
      background: isActive ? `${LC[d.first]}18` : 'var(--bg-card)',
      border: `1px solid ${isActive ? LC[d.first] : `${LC[d.first]}28`}`,
      borderRadius: 5, transition: 'all 0.25s',
      boxShadow: isActive ? `0 0 16px ${LC[d.first]}33` : 'none',
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.6rem', color: LC[d.first], lineHeight: 1, minWidth: 28 }}>{d.hex}</div>
        <div>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.78rem', color: LC[d.first], letterSpacing: '0.06em' }}>
            {FIRST_NAMES[d.first]} · {SECOND_NAMES[d.second]}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)' }}>
            {d.first}{d.second} · {d.hex}
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.75rem', color: LC[d.second] }}>{d.second}</span>
        </div>
      </div>
      {/* Title */}
      <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-parchment)', marginBottom: 6, lineHeight: 1.35 }}>
        {d.title}
      </div>
      {/* Body — the original definition */}
      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>{d.body}</p>
      {/* Context note — changes with logic/mode/modality */}
      {contextNote && (
        <div style={{ marginTop: 10, padding: '6px 10px', background: `${LC[d.second]}10`,
          borderLeft: `2px solid ${LC[d.second]}66`, fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          <span style={{ color: LC[d.second], fontFamily: 'var(--font-cinzel)', fontSize: '0.6rem', letterSpacing: '0.08em' }}>
            {logic.toUpperCase()} · {mode.toUpperCase()} · {modality.toUpperCase()} ·{' '}
          </span>
          {contextNote}
        </div>
      )}
    </div>
  );
}

function getContextNote(d: Definition, logic: string, mode: string, modality: string): string {
  // Show how the current selection changes the reading of each definition
  const isBinary = logic === 'binary';
  if (isBinary) {
    if (d.second === 'I' || d.second === 'E') return 'In binary logic, this position is SUPPRESSED — the global letters I and E are invisible. This is the structural error: only O·A (local) are activated.';
    return 'In binary logic, this is one of the two active poles. The other (I or E at global scale) is suppressed, creating the zero-sum Nash trap.';
  }
  if (logic === 'taoist') {
    return `Taoist view: this position coexists with its complement. ${d.second === 'A' ? 'Position integrates with Posetion (E) to form the global positive arc.' : d.second === 'O' ? 'Negation grounds Negotion (I) — together they form the global negative arc.' : d.second === 'E' ? 'Posetion is the expansive force; it pairs with Position (A) for stable growth.' : 'Negotion challenges and transforms — it pairs with Negation (O) to clear the field.'}`;
  }
  return `Laegna full view: ${d.first}${d.second} = ${d.hex}. First digit ${d.first} (signed ${['A','O','I','E'].indexOf(d.first) === 0 ? '+1' : ['A','O','I','E'].indexOf(d.first) === 1 ? '-1' : ['A','O','I','E'].indexOf(d.first) === 2 ? '-2' : '+2'}) sets the world-frame; second digit ${d.second} (signed ${d.second === 'A' ? '+1' : d.second === 'O' ? '-1' : d.second === 'I' ? '-2' : '+2'}) sets the logical stance within it. Their ponegation sum gives the resultant state.`;
}
