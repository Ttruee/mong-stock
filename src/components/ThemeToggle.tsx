'use client';

import { useEffect, useState } from 'react';

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
    <button className="toggle-btn theme-btn" onClick={toggle} title="테마 변경">
      {theme === 'dark' ? '라이트' : '다크'}
    </button>
  );
}
