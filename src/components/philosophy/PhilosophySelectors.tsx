'use client';
import React, { useState } from 'react';
import {
  usePhilosophyStore,
  getWorldLabel, getFlowLabel, getSystemLabel,
} from '@/store/philosophyStore';
import type { Mode, Modality, LogicSystem, Theme } from '@/store/philosophyStore';

// ── icon definitions ──────────────────────────────────────────────
const WORLD_ICONS: Record<Mode, string> = { material: '⚙', spiritual: '✦' };
const FLOW_ICONS:  Record<Modality, string> = { 'bottom-up': '☽', 'top-down': '☀' };
const SYS_ICONS:  Record<LogicSystem, string> = { binary: '⚔', taoist: '☯', laegna: 'ℒ' };
const THEME_ICONS: Record<Theme, string> = { night: '🌑', day: '☼', auto: '◑' };

const WORLD_COLOR: Record<Mode, string> = { material: '#cd853f', spiritual: 'var(--purple)' };
const FLOW_COLOR:  Record<Modality, string> = { 'bottom-up': 'var(--teal)', 'top-down': 'var(--gold)' };
const SYS_COLOR:  Record<LogicSystem, string> = { binary: 'var(--red-fire)', taoist: 'var(--teal)', laegna: 'var(--gold)' };

export default function PhilosophySelectors() {
  const { mode, modality, logic, theme, setMode, setModality, setLogic, setTheme } = usePhilosophyStore();
  const [expanded, setExpanded] = useState<'world'|'flow'|'system'|'theme'|null>(null);

  return (
    <div
      style={{
        position: 'fixed',
        left: 6,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <SelectorPill
        groupKey="world"
        label={getWorldLabel(mode)}
        icon={WORLD_ICONS[mode]}
        activeColor={WORLD_COLOR[mode]}
        expanded={expanded === 'world'}
        onToggle={() => setExpanded(expanded === 'world' ? null : 'world')}
        onClose={() => setExpanded(null)}
      >
        <PillOption icon={WORLD_ICONS['material']} label="Material" color={WORLD_COLOR['material']}
          active={mode === 'material'} onClick={() => { setMode('material'); setExpanded(null); }} />
        <PillOption icon={WORLD_ICONS['spiritual']} label="Spiritual" color={WORLD_COLOR['spiritual']}
          active={mode === 'spiritual'} onClick={() => { setMode('spiritual'); setExpanded(null); }} />
      </SelectorPill>

      <SelectorPill
        groupKey="flow"
        label={getFlowLabel(modality)}
        icon={FLOW_ICONS[modality]}
        activeColor={FLOW_COLOR[modality]}
        expanded={expanded === 'flow'}
        onToggle={() => setExpanded(expanded === 'flow' ? null : 'flow')}
        onClose={() => setExpanded(null)}
      >
        <PillOption icon={FLOW_ICONS['bottom-up']} label="Yin" sublabel="bottom-up · root" color={FLOW_COLOR['bottom-up']}
          active={modality === 'bottom-up'} onClick={() => { setModality('bottom-up'); setExpanded(null); }} />
        <PillOption icon={FLOW_ICONS['top-down']} label="Yang" sublabel="top-down · crown" color={FLOW_COLOR['top-down']}
          active={modality === 'top-down'} onClick={() => { setModality('top-down'); setExpanded(null); }} />
      </SelectorPill>

      <SelectorPill
        groupKey="system"
        label={getSystemLabel(logic)}
        icon={SYS_ICONS[logic]}
        activeColor={SYS_COLOR[logic]}
        expanded={expanded === 'system'}
        onToggle={() => setExpanded(expanded === 'system' ? null : 'system')}
        onClose={() => setExpanded(null)}
      >
        <PillOption icon="⚔" label="Either/Or" sublabel="binary · base-2" color="var(--red-fire)"
          active={logic === 'binary'} onClick={() => { setLogic('binary'); setExpanded(null); }} />
        <PillOption icon="☯" label="Both/And" sublabel="taoist · base-4" color="var(--teal)"
          active={logic === 'taoist'} onClick={() => { setLogic('taoist'); setExpanded(null); }} />
        <PillOption icon="ℒ" label="Four-Fold" sublabel="laegna · I·O·A·E" color="var(--gold)"
          active={logic === 'laegna'} onClick={() => { setLogic('laegna'); setExpanded(null); }} />
      </SelectorPill>

      <SelectorPill
        groupKey="theme"
        label=""
        icon={THEME_ICONS[theme]}
        activeColor="var(--text-muted)"
        expanded={expanded === 'theme'}
        onToggle={() => setExpanded(expanded === 'theme' ? null : 'theme')}
        onClose={() => setExpanded(null)}
        small
      >
        <PillOption icon="🌑" label="Night" color="var(--purple)"
          active={theme === 'night'} onClick={() => { setTheme('night'); setExpanded(null); }} />
        <PillOption icon="☼" label="Day" color="var(--gold)"
          active={theme === 'day'} onClick={() => { setTheme('day'); setExpanded(null); }} />
        <PillOption icon="◑" label="Auto" color="var(--teal)"
          active={theme === 'auto'} onClick={() => { setTheme('auto'); setExpanded(null); }} />
      </SelectorPill>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────

function SelectorPill({
  groupKey, label, icon, activeColor, expanded, onToggle, onClose, children, small,
}: {
  groupKey: string; label: string; icon: string; activeColor: string;
  expanded: boolean; onToggle: () => void; onClose: () => void;
  children: React.ReactNode; small?: boolean;
}) {
  return (
    <div style={{ position: 'relative' }}>
      {/* The always-visible pill */}
      <button
        onClick={onToggle}
        title={label || groupKey}
        style={{
          display: 'flex', alignItems: 'center', gap: small ? 0 : 5,
          background: expanded ? activeColor + '22' : 'var(--ui-bg)',
          border: `1px solid ${expanded ? activeColor : 'var(--ui-border)'}`,
          borderRadius: '0 4px 4px 0',
          padding: small ? '5px 7px' : '5px 10px 5px 7px',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.2s',
          minWidth: small ? 28 : 68,
          color: 'var(--text-parchment)',
        }}
      >
        <span style={{ fontSize: small ? '0.9rem' : '1rem', minWidth: 18, textAlign: 'center' }}>{icon}</span>
        {!small && label && (
          <span style={{
            fontFamily: 'var(--font-cinzel)', fontSize: '0.65rem', letterSpacing: '0.06em',
            color: expanded ? activeColor : 'var(--text-muted)', whiteSpace: 'nowrap',
            textTransform: 'uppercase',
          }}>
            {label}
          </span>
        )}
      </button>

      {/* Flyout panel */}
      {expanded && (
        <div
          style={{
            position: 'absolute', left: '100%', top: 0, marginLeft: 6,
            background: 'var(--ui-bg-solid)', border: '1px solid var(--ui-border)',
            borderRadius: '4px', padding: '6px 4px', display: 'flex', flexDirection: 'column', gap: 2,
            backdropFilter: 'blur(14px)', boxShadow: '0 8px 32px var(--ui-shadow)',
            zIndex: 200,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function PillOption({ icon, label, sublabel, color, active, onClick }: {
  icon: string; label: string; sublabel?: string; color: string; active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px 7px 8px',
        background: active ? color + '1a' : 'transparent',
        border: `1px solid ${active ? color : 'transparent'}`,
        borderRadius: '3px', cursor: 'pointer', width: '100%', textAlign: 'left',
        transition: 'all 0.15s',
      }}
    >
      <span style={{ fontSize: '1rem', minWidth: 20, textAlign: 'center' }}>{icon}</span>
      <span>
        <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.72rem', color: active ? color : 'var(--text-parchment)', letterSpacing: '0.06em', display: 'block' }}>
          {label}
        </span>
        {sublabel && (
          <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
            {sublabel}
          </span>
        )}
      </span>
      {active && <span style={{ marginLeft: 'auto', color, fontSize: '0.6rem' }}>◆</span>}
    </button>
  );
}
