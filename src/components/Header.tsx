'use client';

import { ViewType } from './types';
import ThemeToggle from './ThemeToggle';

const MagnifyIcon = () => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px', flexShrink: 0 }}>
    {/* Glass circle */}
    <circle cx="11.5" cy="11.5" r="8.5" fill="none" stroke="currentColor" strokeWidth="2.2" opacity={0.85}/>
    {/* Inner glass reflection */}
    <circle cx="8.2" cy="8.2" r="2.4" fill="currentColor" opacity={0.15}/>
    {/* Small sparkle inside lens */}
    <circle cx="14.5" cy="9" r="0.9" fill="currentColor" opacity={0.45}/>
    {/* Handle */}
    <line x1="17.8" y1="17.8" x2="24" y2="24" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" opacity={0.85}/>
  </svg>
);

interface HeaderProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  lastUpdated: string;
}

export default function Header({ currentView, onViewChange, lastUpdated }: HeaderProps) {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}년 ${now.getMonth() + 1}월`;

  return (
    <header className="header">
      <div className="header-top">
        <h1 style={{ display: 'flex', alignItems: 'center' }}><MagnifyIcon />진솔이키우기</h1>
        <div className="header-right">
          <button
            className={`toggle-btn${currentView === 'week' ? ' active' : ''}`}
            onClick={() => onViewChange('week')}
          >
            이번 주
          </button>
          <button
            className={`toggle-btn${currentView === 'month' ? ' active' : ''}`}
            onClick={() => onViewChange('month')}
          >
            이번 달
          </button>
          <ThemeToggle />
        </div>
      </div>
      <div className="subtitle">
        <span className="month">{currentMonth}</span>
        <span className="last-updated">업데이트: {lastUpdated}</span>
      </div>
    </header>
  );
}
