'use client';

import { IpoRuntime } from './types';

interface StatCardsProps {
  ipos: IpoRuntime[];
}

export default function StatCards({ ipos }: StatCardsProps) {
  const total      = ipos.length;
  const selected   = ipos.filter(i => i.selected).length;
  const registered = ipos.filter(i => i.registered).length;
  const rateList = ipos.filter(i => i.comp_rate != null).map(i => i.comp_rate as number);
  const avgRate  = rateList.length
    ? Math.round(rateList.reduce((a, b) => a + b, 0) / rateList.length)
    : null;

  return (
    <div className="stats">
      <div className="stat-card">
        <div className="label">전체 종목</div>
        <div className="value mono">
          {total}<span>개</span>
        </div>
      </div>
      <div className="stat-card highlight">
        <div className="label">선택된 종목</div>
        <div className="value mono">
          {selected}<span>개</span>
        </div>
      </div>
      <div className="stat-card">
        <div className="label">등록 완료</div>
        <div className="value mono">
          {registered}<span>개</span>
        </div>
      </div>
      <div className="stat-card">
        <div className="label">평균 경쟁률</div>
        <div className="value mono">
          {avgRate ? avgRate.toLocaleString() : '—'}<span>:1</span>
        </div>
      </div>
    </div>
  );
}
