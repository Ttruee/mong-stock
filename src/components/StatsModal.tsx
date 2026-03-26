'use client';

import { useEffect } from 'react';
import { IpoRuntime } from './types';
const BarChartIcon = () => (
  <svg width="17" height="17" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1"  y="10" width="4" height="9" rx="1.5" fill="currentColor" opacity="0.6"/>
    <rect x="8"  y="5"  width="4" height="14" rx="1.5" fill="currentColor" opacity="0.8"/>
    <rect x="15" y="1"  width="4" height="18" rx="1.5" fill="currentColor"/>
  </svg>
);

interface StatsModalProps {
  ipos: IpoRuntime[];
  onClose: () => void;
}

export default function StatsModal({ ipos, onClose }: StatsModalProps) {
  // 배경 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // 주관사별 종목 수 집계 (복수 주관사는 각각 카운트)
  const managerMap: Record<string, string[]> = {};
  ipos.forEach(ipo => {
    ipo.lead_manager.split(',').forEach(raw => {
      const name = raw.trim();
      if (!name || name === '미정') return;
      if (!managerMap[name]) managerMap[name] = [];
      managerMap[name].push(ipo.name);
    });
  });

  const sorted = Object.entries(managerMap).sort((a, b) => b[1].length - a[1].length);
  const maxCount = sorted[0]?.[1].length ?? 1;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet stats-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <div className="stats-header">
          <span className="stats-title"><BarChartIcon /> 주관사별 현황</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="stats-total">
          현재 <strong>{ipos.length}</strong>개 종목 진행 중
        </div>
        <div className="stats-list">
          {sorted.map(([name, names]) => (
            <div key={name} className="stats-row">
              <div className="stats-row-top">
                <span className="stats-name">{name}</span>
                <span className="stats-count">{names.length}개</span>
              </div>
              <div className="stats-bar-wrap">
                <div
                  className="stats-bar"
                  style={{ width: `${(names.length / maxCount) * 100}%` }}
                />
              </div>
              <div className="stats-names">{names.join(', ')}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
