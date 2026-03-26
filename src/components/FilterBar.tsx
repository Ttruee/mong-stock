'use client';

import { FilterType } from './types';

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all',      label: '전체' },
  { value: 'it',       label: 'IT/테크' },
  { value: 'battery',  label: '2차전지' },
  { value: 'robot',    label: '로봇' },
  { value: 'semi',     label: '반도체' },
  { value: 'consumer', label: '소비재' },
  { value: 'energy',   label: '에너지' },
  { value: 'enter',    label: '엔터' },
  { value: 'pharma',   label: '제약/의약' },
  { value: 'ship',     label: '조선' },
  { value: 'health',   label: '헬스케어' },
  { value: 'beauty',   label: '화장품' },
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
