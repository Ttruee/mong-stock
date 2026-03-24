'use client';

import { useRef } from 'react';
import { EventType } from './types';

interface EventPanelProps {
  activeEvents: EventType[];
  onToggle: (type: EventType, checked: boolean) => void;
}

const EVENT_ITEMS: { value: EventType; label: string }[] = [
  { value: 'sub_start',   label: '청약 시작일' },
  { value: 'sub_end',     label: '청약 종료일' },
  { value: 'list_date',   label: '상장일' },
  { value: 'refund_date', label: '환불일' },
];

export default function EventPanel({ activeEvents, onToggle }: EventPanelProps) {
  const itemRefs = useRef<Record<string, HTMLLabelElement | null>>({});

  function handleChange(type: EventType, checked: boolean) {
    if (!checked && activeEvents.length <= 1) {
      // 최소 1개 강제 — 흔들림 애니메이션
      const el = itemRefs.current[type];
      if (el) {
        el.classList.remove('shake');
        void el.offsetWidth; // reflow
        el.classList.add('shake');
      }
      return;
    }
    onToggle(type, checked);
  }

  return (
    <div className="event-panel">
      <span className="panel-label">캘린더 등록 유형</span>
      <div className="event-checkboxes">
        {EVENT_ITEMS.map(item => (
          <label
            key={item.value}
            className="event-check-item"
            ref={el => { itemRefs.current[item.value] = el; }}
          >
            <input
              type="checkbox"
              value={item.value}
              checked={activeEvents.includes(item.value)}
              onChange={e => handleChange(item.value, e.target.checked)}
            />
            <span className="check-box" />
            <span className="check-label">{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
