'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home', icon: '⬡' },
  { href: '/trauma', label: 'Trauma', icon: '⚡' },
  { href: '/game-theory', label: 'Games', icon: '♟' },
  { href: '/business-theory', label: 'Strategy', icon: '◉' },
  { href: '/laegna', label: 'Laegna', icon: 'ℒ' },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav style={{
      borderBottom: '1px solid var(--ui-border)',
      background: 'var(--ui-bg)',
      position: 'sticky', top: 0, zIndex: 90,
      backdropFilter: 'blur(12px)',
    }}>
      <div className="max-w-6xl mx-auto px-4" style={{ display: 'flex', alignItems: 'center', height: 44, gap: 0 }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 16 }}>
          <YinYangIcon size={22} />
          <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.78rem', color: 'var(--gold)', letterSpacing: '0.12em' }}>
            SPIREASON
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center" style={{ gap: 0, flex: 1 }}>
          {navLinks.map(({ href, label, icon }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} style={{
                padding: '0 12px', height: 44, display: 'flex', alignItems: 'center', gap: 5,
                fontSize: '0.75rem', letterSpacing: '0.05em', fontFamily: 'var(--font-cinzel)',
                color: active ? 'var(--gold)' : 'var(--text-muted)',
                borderBottom: active ? '2px solid var(--gold)' : '2px solid transparent',
                transition: 'color 0.2s', whiteSpace: 'nowrap',
              }}>
                <span style={{ fontSize: '0.85rem' }}>{icon}</span>
                {label}
              </Link>
            );
          })}

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <a href="https://spireason.neocities.org" target="_blank" rel="noopener noreferrer"
              style={{ padding: '0 10px', height: 44, display: 'flex', alignItems: 'center', fontSize: '0.72rem', fontFamily: 'var(--font-cinzel)', color: 'var(--teal)', opacity: 0.8, letterSpacing: '0.06em' }}>
              SpiReason ↗
            </a>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button className="sm:hidden" style={{ marginLeft: 'auto', color: 'var(--gold)', fontSize: '1.1rem', background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => setOpen(!open)}>
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ padding: '8px 16px 12px', display: 'flex', flexDirection: 'column', gap: 2, borderTop: '1px solid rgba(240,165,0,0.1)' }}>
          {navLinks.map(({ href, label, icon }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              style={{ padding: '8px 4px', color: pathname === href ? 'var(--gold)' : 'var(--text-muted)', fontFamily: 'var(--font-cinzel)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>{icon}</span>{label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

function YinYangIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="none" stroke="var(--gold)" strokeWidth="2" opacity="0.5" />
      <path d="M50 2 A48 48 0 0 1 50 98 A24 24 0 0 1 50 50 A24 24 0 0 0 50 2Z" fill="var(--gold)" opacity="0.65" />
      <circle cx="50" cy="26" r="8" fill="var(--bg-deep)" />
      <circle cx="50" cy="74" r="8" fill="var(--gold)" opacity="0.9" />
      <circle cx="50" cy="26" r="3" fill="var(--gold)" opacity="0.9" />
      <circle cx="50" cy="74" r="3" fill="var(--bg-deep)" />
    </svg>
  );
}
