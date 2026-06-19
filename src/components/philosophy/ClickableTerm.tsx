'use client';
import React from 'react';
import { usePhilosophyStore } from '@/store/philosophyStore';
import type { Mode, Modality, LogicSystem } from '@/store/philosophyStore';

type TermAction =
  | { type: 'mode'; value: Mode }
  | { type: 'modality'; value: Modality }
  | { type: 'logic'; value: LogicSystem };

interface Props {
  action: TermAction;
  children: React.ReactNode;
  /** Override display style — defaults to highlighted inline chip */
  style?: React.CSSProperties;
}

const ACTION_COLORS: Record<string, string> = {
  // mode
  material: '#cd853f',
  spiritual: 'var(--purple)',
  // modality
  'bottom-up': 'var(--teal)',
  'top-down': 'var(--gold)',
  // logic
  binary: 'var(--red-fire)',
  taoist: 'var(--teal)',
  laegna: 'var(--gold)',
};

/** Inline clickable word that sets one selector when clicked. */
export default function ClickableTerm({ action, children, style }: Props) {
  const { mode, modality, logic, setMode, setModality, setLogic } = usePhilosophyStore();

  const val = action.value as string;
  const color = ACTION_COLORS[val] ?? 'var(--gold)';

  const isActive =
    (action.type === 'mode'     && mode     === action.value) ||
    (action.type === 'modality' && modality === action.value) ||
    (action.type === 'logic'    && logic    === action.value);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (action.type === 'mode')     setMode(action.value);
    if (action.type === 'modality') setModality(action.value);
    if (action.type === 'logic')    setLogic(action.value);
  }

  return (
    <span
      onClick={handleClick}
      title={`Click to select: ${val}`}
      style={{
        cursor: 'pointer',
        display: 'inline',         // no extra block spacing
        padding: 0,                // no padding that pushes text apart
        fontWeight: isActive ? 600 : 'inherit',
        color: isActive ? color : 'inherit',
        // Underline instead of border/background — zero layout impact
        textDecoration: 'underline',
        textDecorationColor: isActive ? color + 'cc' : 'rgba(255,255,255,0.18)',
        textDecorationStyle: isActive ? 'solid' : 'dotted',
        textUnderlineOffset: '2px',
        transition: 'color 0.2s, text-decoration-color 0.2s',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        ...style,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLSpanElement;
        el.style.color = color;
        el.style.textDecorationColor = color;
        el.style.textDecorationStyle = 'solid';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLSpanElement;
        el.style.color = isActive ? color : 'inherit';
        el.style.textDecorationColor = isActive ? color + 'cc' : 'rgba(255,255,255,0.18)';
        el.style.textDecorationStyle = isActive ? 'solid' : 'dotted';
      }}
    >
      {children}
    </span>
  );
}
