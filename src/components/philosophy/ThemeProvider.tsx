'use client';
import { useEffect } from 'react';
import { usePhilosophyStore } from '@/store/philosophyStore';

export default function ThemeProvider() {
  const { theme } = usePhilosophyStore();

  useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = theme === 'night' || (theme === 'auto' && prefersDark);

    if (isDark) {
      root.setAttribute('data-theme', 'night');
    } else {
      root.setAttribute('data-theme', 'day');
    }
  }, [theme]);

  return null;
}
