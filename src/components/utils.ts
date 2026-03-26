export function isPast(mmdd: string): boolean {
  if (!mmdd || mmdd === '미정') return false;
  const now = new Date();
  const [m, d] = mmdd.split('.').map(Number);
  const target = new Date(now.getFullYear(), m - 1, d);
  const today  = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return target < today;
}

// 날짜(MM.DD)가 오늘 이후면 true
function isOnOrAfterToday(mmdd: string): boolean {
  if (!mmdd || mmdd === '미정') return false;
  const now = new Date();
  const [m, d] = mmdd.split('.').map(Number);
  const date  = new Date(now.getFullYear(), m - 1, d);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return date >= today;
}

// sub_start / sub_end / list_date 중 하나라도 오늘 이후면 표시
export function isStillRelevant(ipo: { sub_start: string; sub_end: string; list_date: string }): boolean {
  return (
    isOnOrAfterToday(ipo.sub_start) ||
    isOnOrAfterToday(ipo.sub_end)   ||
    isOnOrAfterToday(ipo.list_date)
  );
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
