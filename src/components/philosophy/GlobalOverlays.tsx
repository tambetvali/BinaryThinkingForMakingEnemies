'use client';
// This is imported in the root layout — renders on every page.
// Contains fixed/floating UI that must be available everywhere.
import dynamic from 'next/dynamic';
import ThemeProvider from '@/components/philosophy/ThemeProvider';

// Selector sidebar is client-only (uses Zustand)
const PhilosophySelectors = dynamic(
  () => import('@/components/philosophy/PhilosophySelectors'),
  { ssr: false }
);

export default function GlobalOverlays() {
  return (
    <>
      <ThemeProvider />
      <PhilosophySelectors />
    </>
  );
}
