'use client';

import ThemeToggle from './ThemeToggle';

const MagnifyIcon = () => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px', flexShrink: 0 }}>
    <circle cx="11.5" cy="11.5" r="8.5" fill="none" stroke="currentColor" strokeWidth="2.2" opacity={0.85}/>
    <circle cx="8.2" cy="8.2" r="2.4" fill="currentColor" opacity={0.15}/>
    <circle cx="14.5" cy="9" r="0.9" fill="currentColor" opacity={0.45}/>
    <line x1="17.8" y1="17.8" x2="24" y2="24" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" opacity={0.85}/>
  </svg>
);

interface HeaderProps {
  lastUpdated: string;
}

export default function Header({ lastUpdated }: HeaderProps) {
  const now = new Date();
  const nextMonth = now.getMonth() + 2 > 12 ? 1 : now.getMonth() + 2;
  const nextMonthLabel = `${now.getFullYear()}년 ${nextMonth}월`;

  return (
    <header className="header">
      <div className="header-top">
        <h1 style={{ display: 'flex', alignItems: 'center' }}><MagnifyIcon />진솔이키우기</h1>
        <div className="header-right">
          <ThemeToggle />
        </div>
      </div>
      <div className="subtitle">
        <span className="month">{nextMonthLabel} 청약 예정</span>
        <span className="last-updated">업데이트: {lastUpdated}</span>
      </div>
    </header>
  );
}
