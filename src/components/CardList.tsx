'use client';

import { IpoRuntime, FilterType } from './types';
import { isStillRelevant } from './utils';
import IpoCard from './IpoCard';

interface CardListProps {
  ipos: IpoRuntime[];
  currentFilter: FilterType;
  onToggle: (id: number) => void;
  onDetail: (ipo: IpoRuntime) => void;
}

function parseMmdd(mmdd: string): number {
  if (!mmdd || mmdd === '미정') return 0;
  const [m, d] = mmdd.split('.').map(Number);
  return m * 100 + d;
}

export default function CardList({ ipos, currentFilter, onToggle, onDetail }: CardListProps) {
  // sub_start / sub_end / list_date 중 하나라도 오늘 이후인 종목 표시
  let list = [...ipos].filter(i => isStillRelevant(i));

  // 섹터 필터
  if (currentFilter !== 'all') list = list.filter(i => i.sector === currentFilter);

  // 청약 시작일 오름차순 정렬
  list = list.sort((a, b) => parseMmdd(a.sub_start) - parseMmdd(b.sub_start));

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
