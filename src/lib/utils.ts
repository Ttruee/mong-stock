/**
 * 주관사 이름에서 '증권' 접미사를 제거하고,
 * 여러 주관사(쉼표·슬래시·&로 구분)를 ' · ' 로 조합해서 반환
 */
export function formatManagers(raw: string): string {
  if (!raw || raw === '미정') return raw;
  return raw
    .split(/[,\/&]+/)
    .map(s => s.trim().replace(/증권$/, '').trim())
    .filter(Boolean)
    .join(' · ');
}
