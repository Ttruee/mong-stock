export interface IpoData {
  id: number;
  name: string;
  sector: 'health' | 'it' | 'energy' | 'consumer' | 'etc';
  market: string;
  price: string;
  sub_start: string;
  sub_end: string;
  refund_date: string;
  list_date: string;
  comp_rate: number | null;
  lead_manager: string;
  min_qty: string | null;
  min_amount: string | null;
}

export interface IpoRuntime extends IpoData {
  selected: boolean;
  registered: boolean;
}

export type FilterType = 'all' | 'health' | 'it' | 'energy' | 'consumer' | 'etc';
export type ViewType = 'week' | 'month';
export type EventType = 'sub_start' | 'sub_end' | 'list_date' | 'refund_date';

export const EVENT_LABELS: Record<EventType, string> = {
  sub_start:   '청약 시작',
  sub_end:     '청약 종료',
  list_date:   '상장일',
  refund_date: '환불일',
};

export const SECTOR_LABEL: Record<string, string> = {
  health:   '헬스케어',
  it:       'IT/테크',
  energy:   '에너지',
  consumer: '소비재',
  etc:      '기타',
};

export const SECTOR_CLASS: Record<string, string> = {
  health:   'badge-health',
  it:       'badge-it',
  energy:   'badge-energy',
  consumer: 'badge-consumer',
  etc:      'badge-etc',
};
