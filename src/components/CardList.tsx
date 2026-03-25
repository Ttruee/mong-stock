'use client';

import { IpoRuntime, FilterType, ViewType } from './types';
import { isThisWeek } from './utils';
import IpoCard from './IpoCard';

interface CardListProps {
  ipos: IpoRuntime[];
  currentFilter: FilterType;
  currentView: ViewType;
  onToggle: (id: number) => void;
  onDetail: (ipo: IpoRuntime) => void;
}

function parseMmdd(mmdd: string): number {
  if (!mmdd || mmdd === '미정') return 0;
  const [m, d] = mmdd.split('.').map(Number);
  return m * 100 + d;
}

export default function CardList({ ipos, currentFilter, currentView, onToggle, onDetail }: CardListProps) {
  // 기본 정렬: 청약 시작일 내림차순 (최신 날짜 먼저)
  let list = [...ipos].sort((a, b) => parseMmdd(b.sub_start) - parseMmdd(a.sub_start));

  // 섹터 필터
  if (currentFilter !== 'all') list = list.filter(i => i.sector === currentFilter);
  // 뷰 필터
  if (currentView === 'week') {
    list = list.filter(i =>
      isThisWeek(i.sub_start) || isThisWeek(i.sub_end) ||
      isThisWeek(i.list_date) || isThisWeek(i.refund_date)
    );
  }

  if (list.length === 0) {
    return (
      <div className="card-list">
        <div className="empty-state">
          <div className="icon">📭</div>
          <p>해당 기간에 공모주 일정이 없습니다</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-list">
      {list.map(ipo => (
        <IpoCard key={ipo.id} ipo={ipo} onToggle={onToggle} onDetail={onDetail} />
      ))}
    </div>
  );
}
