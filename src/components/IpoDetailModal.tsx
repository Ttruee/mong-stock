'use client';

import { useEffect } from 'react';
import { IpoRuntime, SECTOR_LABEL, SECTOR_CLASS } from './types';
import { rateClass } from './utils';

interface Props {
  ipo: IpoRuntime;
  onClose: () => void;
}

export default function IpoDetailModal({ ipo, onClose }: Props) {
  const sectorKey   = SECTOR_LABEL[ipo.sector] ? ipo.sector : 'etc';
  const sectorLabel = SECTOR_LABEL[sectorKey];
  const sectorCls   = SECTOR_CLASS[sectorKey];
  const isHot       = ipo.comp_rate != null && ipo.comp_rate >= 1000;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <div className="modal-header">
          <div className="modal-title-block">
            <span className="modal-name">{ipo.name}</span>
            <div className="modal-badges">
              <span className={`badge ${sectorCls}`}>{sectorLabel}</span>
              {isHot && <span className="badge badge-hot">🔥 HOT</span>}
              {ipo.registered && <span className="badge badge-reg">✓ 등록됨</span>}
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <div className="modal-row">
              <span className="modal-label">시장</span>
              <span className="modal-val">{ipo.market}</span>
            </div>
            <div className="modal-row">
              <span className="modal-label">공모가</span>
              <span className="modal-val mono">{ipo.price}</span>
            </div>
            <div className="modal-row">
              <span className="modal-label">경쟁률</span>
              {ipo.comp_rate != null ? (
                <span className={`modal-val mono ${rateClass(ipo.comp_rate)}`}>
                  {ipo.comp_rate.toLocaleString()}:1
                </span>
              ) : (
                <span className="modal-val modal-muted">미정</span>
              )}
            </div>
            <div className="modal-row">
              <span className="modal-label">최소청약수량</span>
              <span className="modal-val mono">{ipo.min_qty ?? '미정'}</span>
            </div>
            <div className="modal-row">
              <span className="modal-label">최소청약금액</span>
              <span className="modal-val mono">{ipo.min_amount ?? '미정'}</span>
            </div>
            <div className="modal-row">
              <span className="modal-label">주관사</span>
              <span className="modal-val">{ipo.lead_manager}</span>
            </div>
          </div>

          <div className="modal-divider" />

          <div className="modal-section">
            <p className="modal-section-title">청약 일정</p>
            <div className="modal-row">
              <span className="modal-label">청약 시작</span>
              <span className="modal-val mono">{ipo.sub_start}</span>
            </div>
            <div className="modal-row">
              <span className="modal-label">청약 종료</span>
              <span className="modal-val mono">{ipo.sub_end}</span>
            </div>
            <div className="modal-row">
              <span className="modal-label">환불일</span>
              <span className="modal-val mono">{ipo.refund_date}</span>
            </div>
            <div className="modal-row">
              <span className="modal-label">상장일</span>
              <span className="modal-val mono">{ipo.list_date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
