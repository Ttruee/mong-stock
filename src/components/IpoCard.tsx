'use client';

import { IpoRuntime, SECTOR_LABEL, SECTOR_CLASS } from './types';
import { isPast, rateClass } from './utils';

interface IpoCardProps {
  ipo: IpoRuntime;
  onToggle: (id: number) => void;
}

export default function IpoCard({ ipo, onToggle }: IpoCardProps) {
  const sectorKey   = SECTOR_LABEL[ipo.sector] ? ipo.sector : 'etc';
  const sectorLabel = SECTOR_LABEL[sectorKey];
  const sectorCls   = SECTOR_CLASS[sectorKey];
  const isHot       = ipo.comp_rate != null && ipo.comp_rate >= 1000;

  const past = isPast(ipo.sub_end);
  const cardClasses = [
    'ipo-card',
    ipo.selected   ? 'selected'   : '',
    ipo.registered ? 'registered' : '',
    past && !ipo.registered ? 'past' : '',
    !past && !ipo.registered ? 'upcoming' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClasses}
      onClick={() => onToggle(ipo.id)}
    >
      <div className="card-check" />
      <div className="card-main">
        <div className="card-top">
          <span className="card-name">{ipo.name}</span>
          <span className={`badge ${sectorCls}`}>{sectorLabel}</span>
          {isHot && <span className="badge badge-hot">🔥 HOT</span>}
          {ipo.registered && <span className="badge badge-reg">✓ 등록됨</span>}
        </div>
        <div className="card-meta">
          <span className="item">
            <span className="label">시장</span>
            <span className="val">{ipo.market}</span>
          </span>
          <span className="item">
            <span className="label">공모가</span>
            <span className="val">{ipo.price}</span>
          </span>
          <span className="item">
            <span className="label">경쟁률</span>
            {ipo.comp_rate != null ? (
              <span className={`val ${rateClass(ipo.comp_rate)}`}>
                {ipo.comp_rate.toLocaleString()}:1
              </span>
            ) : (
              <span className="val" style={{ color: 'var(--muted)' }}>미정</span>
            )}
          </span>
          <span className="item">
            <span className="label">주관사</span>
            <span className="val">{ipo.lead_manager}</span>
          </span>
        </div>
      </div>
      <div className="card-dates">
        <div className="date-row">
          <span className="date-label">청약</span>
          <span className="date-val">{ipo.sub_start} ~ {ipo.sub_end}</span>
        </div>
        <div className="date-row">
          <span className="date-label">환불</span>
          <span className="date-val">{ipo.refund_date}</span>
        </div>
        <div className="date-row">
          <span className="date-label">상장</span>
          <span className="date-val">{ipo.list_date}</span>
        </div>
      </div>
    </div>
  );
}
