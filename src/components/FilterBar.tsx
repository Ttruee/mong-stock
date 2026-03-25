'use client';

import { FilterType } from './types';

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all',      label: '전체' },
  { value: 'health',   label: '헬스케어' },
  { value: 'it',       label: 'IT/테크' },
  { value: 'energy',   label: '에너지' },
  { value: 'consumer', label: '소비재' },
  { value: 'etc',      label: '기타' },
];

export default function FilterBar({ currentFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="controls">
      {FILTERS.map(f => (
        <button
          key={f.value}
          className={`filter-btn${currentFilter === f.value ? ' active' : ''}`}
          onClick={() => onFilterChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
