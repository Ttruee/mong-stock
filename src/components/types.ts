export interface IpoData {
  id: number;
  name: string;
  sector: 'bio' | 'med' | 'fin' | 'etc';
  market: string;
  price: string;
  sub_start: string;
  sub_end: string;
  refund_date: string;
  list_date: string;
  comp_rate: number | null;
  lead_manager: string;
}

export interface IpoRuntime extends IpoData {
  selected: boolean;
  registered: boolean;
}

export type FilterType = 'all' | 'bio' | 'med' | 'fin' | 'rate';
export type ViewType = 'week' | 'month';
export type EventType = 'sub_start' | 'sub_end' | 'list_date' | 'refund_date';

export const EVENT_LABELS: Record<EventType, string> = {
  sub_start:   '청약 시작',
  sub_end:     '청약 종료',
  list_date:   '상장일',
  refund_date: '환불일',
};

export const SECTOR_LABEL: Record<string, string> = {
  bio: '바이오',
  med: '의료기기',
  fin: '핀테크',
  etc: '기타',
};

export const SECTOR_CLASS: Record<string, string> = {
  bio: 'badge-bio',
  med: 'badge-med',
  fin: 'badge-fin',
  etc: 'badge-etc',
};
