'use client';
import { create } from 'zustand';

export type Mode = 'material' | 'spiritual';
export type Modality = 'top-down' | 'bottom-up';
export type LogicSystem = 'binary' | 'taoist' | 'laegna';
export type Theme = 'night' | 'day' | 'auto';

interface PhilosophyState {
  mode: Mode;
  modality: Modality;
  logic: LogicSystem;
  theme: Theme;
  setMode: (m: Mode) => void;
  setModality: (m: Modality) => void;
  setLogic: (l: LogicSystem) => void;
  setTheme: (t: Theme) => void;
}

export const usePhilosophyStore = create<PhilosophyState>((set) => ({
  mode: 'material',
  modality: 'bottom-up',
  logic: 'binary',
  theme: 'night',
  setMode: (mode) => set({ mode }),
  setModality: (modality) => set({ modality }),
  setLogic: (logic) => set({ logic }),
  setTheme: (theme) => set({ theme }),
}));

// --- Public labels (user-friendly, no jargon) ---

export function getWorldLabel(mode: Mode) {
  return mode === 'material' ? 'Material' : 'Spiritual';
}

export function getFlowLabel(modality: Modality) {
  // Yin = bottom-up (root rises), Yang = top-down (crown descends)
  return modality === 'bottom-up' ? 'Yin ☽' : 'Yang ☀';
}

export function getSystemLabel(logic: LogicSystem) {
  return { binary: 'Either/Or', taoist: 'Both/And', laegna: 'Four-Fold' }[logic];
}

// Keep legacy names for internal use
export function getLogicLabel(logic: LogicSystem) {
  return { binary: 'Binary (Base-2)', taoist: 'Taoist (Base-4)', laegna: 'Laegna (Base-4)' }[logic];
}
export function getModeLabel(mode: Mode) {
  return mode === 'material' ? 'Material World' : 'Spiritual World';
}
export function getModalityLabel(modality: Modality) {
  return modality === 'top-down' ? 'Yang · Top-Down (Crown)' : 'Yin · Bottom-Up (Root)';
}

// --- Derived ---
export function getOppositionPair(mode: Mode, modality: Modality) {
  if (mode === 'material') {
    return modality === 'bottom-up'
      ? { chosen: 'Capitalism', opposed: 'Communism' }
      : { chosen: 'Communism', opposed: 'Capitalism' };
  } else {
    return modality === 'bottom-up'
      ? { chosen: 'Materialism', opposed: 'Spirituality' }
      : { chosen: 'Spirituality', opposed: 'Materialism' };
  }
}

// Logic color helpers
export function logicColor(logic: LogicSystem) {
  return logic === 'binary' ? 'var(--red-fire)' : logic === 'taoist' ? 'var(--teal)' : 'var(--gold)';
}
export function logicBg(logic: LogicSystem) {
  return logic === 'binary' ? 'var(--red-dim)' : logic === 'taoist' ? 'var(--teal-dim)' : 'var(--gold-dim)';
}
