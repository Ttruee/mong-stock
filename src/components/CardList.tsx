'use client';

import { IpoRuntime, FilterType, ViewType } from './types';
import { isThisWeek } from './utils';
import IpoCard from './IpoCard';

interface CardListProps {
  ipos: IpoRuntime[];
  currentFilter: FilterType;
  currentView: ViewType;
  onToggle: (id: number) => void;
}

export default function CardList({ ipos, currentFilter, currentView, onToggle }: CardListProps) {
  let list = [...ipos];

  // 섹터 필터
  if (currentFilter === 'bio')  list = list.filter(i => i.sector === 'bio');
  if (currentFilter === 'med')  list = list.filter(i => i.sector === 'med');
  if (currentFilter === 'fin')  list = list.filter(i => i.sector === 'fin');
  if (currentFilter === 'rate') {
    list.sort((a, b) => {
      if (a.comp_rate == null && b.comp_rate == null) return 0;
      if (a.comp_rate == null) return 1;
      if (b.comp_rate == null) return -1;
      return b.comp_rate - a.comp_rate;
    });
  }

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
        <IpoCard key={ipo.id} ipo={ipo} onToggle={onToggle} />
      ))}
    </div>
  );
}
