'use client';

import { ViewType } from './types';
import ThemeToggle from './ThemeToggle';

const MagnifyIcon = () => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px', flexShrink: 0 }}>
    {/* Glass circle - soft glassy look */}
    <circle cx="11.5" cy="11.5" r="8.5" fill="rgba(255,255,255,0.13)" stroke="rgba(255,255,255,0.75)" strokeWidth="2"/>
    {/* Inner glass reflection - top-left shine */}
    <circle cx="8.2" cy="8.2" r="2.6" fill="rgba(255,255,255,0.18)"/>
    {/* Small sparkle inside lens */}
    <circle cx="14.5" cy="9" r="0.9" fill="rgba(255,255,255,0.55)"/>
    {/* Handle - rounded, chubby */}
    <line x1="17.8" y1="17.8" x2="24" y2="24" stroke="rgba(255,255,255,0.85)" strokeWidth="3" strokeLinecap="round"/>
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
        <h1 style={{ display: 'flex', alignItems: 'center' }}><MagnifyIcon />주린이레이더</h1>
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
