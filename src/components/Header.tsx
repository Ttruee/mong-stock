'use client';

import { ViewType } from './types';
import ThemeToggle from './ThemeToggle';

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
      <div className="header-left">
        <h1>🔍 주린이레이더</h1>
        <div className="subtitle">
          <span className="month">{currentMonth}</span>
          <span className="last-updated">업데이트: {lastUpdated}</span>
        </div>
      </div>
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
    </header>
  );
}
