export function isPast(mmdd: string): boolean {
  if (!mmdd || mmdd === '미정') return false;
  const now = new Date();
  const [m, d] = mmdd.split('.').map(Number);
  const target = new Date(now.getFullYear(), m - 1, d);
  const today  = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return target < today;
}

// sub_start 월이 다음 달이면 true
export function isNextMonth(mmdd: string): boolean {
  if (!mmdd || mmdd === '미정') return false;
  const now = new Date();
  const nextMonth = (now.getMonth() + 2 > 12) ? 1 : now.getMonth() + 2;
  const [m] = mmdd.split('.').map(Number);
  return m === nextMonth;
}

export function rateClass(rate: number | null): string {
  if (!rate) return '';
  if (rate >= 1000) return 'rate-red';
  if (rate >= 500)  return 'rate-amber';
  return 'rate-normal';
}

// 주관사 이름에서 '증권' 제거 + 복수일 때 ' · '로 연결
export function formatManagers(raw: string): string {
  if (!raw || raw === '미정') return raw;
  return raw
    .split(/[,\/&]+/)
    .map(s => s.trim().replace(/증권$/, '').trim())
    .filter(Boolean)
    .join(' · ');
}

// MM.DD → YYYY-MM-DD (현재 연도 기준)
export function toIsoDate(mmdd: string): string {
  const [m, d] = mmdd.split('.').map(Number);
  const year   = new Date().getFullYear();
  return `${year}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}
