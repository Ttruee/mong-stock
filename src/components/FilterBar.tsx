'use client';

import { FilterType } from './types';

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all',  label: '전체' },
  { value: 'bio',  label: '바이오' },
  { value: 'med',  label: '의료기기' },
  { value: 'fin',  label: '핀테크' },
  { value: 'rate', label: '경쟁률 높은순' },
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
