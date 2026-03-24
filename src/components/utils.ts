export function isPast(mmdd: string): boolean {
  if (!mmdd || mmdd === '미정') return false;
  const now = new Date();
  const [m, d] = mmdd.split('.').map(Number);
  const target = new Date(now.getFullYear(), m - 1, d);
  const today  = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return target < today;
}

export function isThisWeek(mmdd: string): boolean {
  if (!mmdd || mmdd === '미정') return false;
  const now   = new Date();
  const [m, d] = mmdd.split('.').map(Number);
  const date  = new Date(now.getFullYear(), m - 1, d);
  const mon   = new Date(now);
  mon.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  mon.setHours(0, 0, 0, 0);
  const sun   = new Date(mon);
  sun.setDate(mon.getDate() + 6);
  sun.setHours(23, 59, 59, 999);
  return date >= mon && date <= sun;
}

export function rateClass(rate: number | null): string {
  if (!rate) return '';
  if (rate >= 1000) return 'rate-red';
  if (rate >= 500)  return 'rate-amber';
  return 'rate-normal';
}

// MM.DD → YYYY-MM-DD (현재 연도 기준)
export function toIsoDate(mmdd: string): string {
  const [m, d] = mmdd.split('.').map(Number);
  const year   = new Date().getFullYear();
  return `${year}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}
