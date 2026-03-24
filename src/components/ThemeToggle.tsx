'use client';

import { useEffect, useState } from 'react';

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Center circle */}
    <circle cx="12" cy="12" r="4.5" fill="#fbbf24" />
    {/* Rays — rounded short stubs */}
    <line x1="12" y1="2.5" x2="12" y2="5"   stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="12" y1="19" x2="12" y2="21.5" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="2.5" y1="12" x2="5"   y2="12" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="19"  y1="12" x2="21.5" y2="12" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="5.4" y1="5.4"   x2="7.2" y2="7.2"   stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="16.8" y1="16.8" x2="18.6" y2="18.6" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="18.6" y1="5.4"  x2="16.8" y2="7.2"  stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="7.2"  y1="16.8" x2="5.4"  y2="18.6" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Crescent moon */}
    <path
      d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
      fill="#a78bfa"
      stroke="#a78bfa"
      strokeWidth="0.5"
    />
    {/* Tiny star 1 */}
    <circle cx="17" cy="5"  r="1.1" fill="#c4b5fd"/>
    {/* Tiny star 2 */}
    <circle cx="20" cy="9"  r="0.8" fill="#c4b5fd"/>
  </svg>
);

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', saved === 'dark' ? '#0e0f11' : '#f5f7fa');
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', next === 'dark' ? '#0e0f11' : '#f5f7fa');
  };

  return (
    <button
      className="toggle-btn theme-btn"
      onClick={toggle}
      title={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
