# 공모주 대시보드 — Claude Code 구현 가이드

## 프로젝트 개요

한국 공모주 청약 일정을 보여주는 로컬 HTML 대시보드. Cowork가 매달 자동으로 데이터를 업데이트하고, 사용자가 원하는 종목을 선택해 Google Calendar에 등록한다.

## 폴더 구조

```
~/Desktop/공모주대시보드/
├── index.html          ← 메인 대시보드 (이 파일만 있으면 됨)
└── COWORK_GUIDE.md     ← Cowork 자동화 가이드
```

---

## TASK 1 — index.html 기본 구조 잡기

### 목표

단일 HTML 파일로 전체 앱을 구성한다. 외부 의존성은 Google Fonts CDN만 허용.

### 요구사항

**헤더 영역**
- 타이틀: "공모주 대시보드"
- 서브타이틀: 현재 연월 자동 표시 (예: "2026년 3월")
- 마지막 업데이트 시각 표시 (localStorage에서 읽어옴)
- 우측에 이번 주 / 이번 달 토글 버튼

**통계 카드 4개 (가로 배치)**
- 전체 종목 수
- 선택된 종목 수
- 등록 완료 수
- 평균 기관 경쟁률

**필터 버튼**
- 전체 / 바이오 / 의료기기 / 핀테크 / 경쟁률 높은순

**이벤트 유형 선택 패널**
- 체크박스 4개: 청약 시작일 / 청약 종료일 / 상장일 / 환불일
- 기본값: 청약 시작일, 청약 종료일, 상장일 ON
- 최소 1개는 반드시 선택 유지

**공모주 카드 목록**
- 체크박스로 선택/해제
- 선택 시 좌측 컬러 보더 + 배경색 변경

**하단 캘린더 등록 버튼**
- 선택 종목 없으면 비활성화

### 디자인

- 다크 테마, 배경 `#0e0f11`
- 폰트: Noto Sans KR (본문) + DM Mono (숫자/날짜) — Google Fonts CDN
- 포인트 컬러: 그린 `#4ade80`
- 경쟁률 강조: 1000:1 이상 → 레드 `#f87171` / 500:1 이상 → 앰버 `#fbbf24`
- 모바일 반응형 (max-width: 860px 중앙 정렬, 540px 이하 2열 → 1열)

---

## TASK 2 — 공모주 데이터 구조 및 렌더링

### 데이터 모델

파일 상단 `const IPOS` 배열에 데이터를 하드코딩한다. (Cowork가 매달 이 배열을 업데이트함)

```js
const IPOS = [
  {
    id: 1,
    name: "기업명",
    sector: "bio",        // bio | med | fin | etc
    market: "코스닥",      // 코스피 | 코스닥
    price: "20,000원",    // 확정가 또는 "19,000~26,000원"
    sub_start: "03.05",   // 청약 시작일 MM.DD
    sub_end: "03.06",     // 청약 종료일 MM.DD
    refund_date: "03.10", // 환불일 MM.DD
    list_date: "03.14",   // 상장일 MM.DD
    comp_rate: 962,       // 기관 경쟁률 숫자 또는 null
    lead_manager: "한국투자증권",
    selected: false,
    registered: false
  }
];
```

### 카드 렌더링 요구사항

각 카드에 표시:
- 체크박스
- 기업명
- 섹터 배지 (바이오 / 의료기기 / 핀테크 / 기타) — 색상 구분
- HOT 배지 — `comp_rate >= 1000` 일 때만 표시
- 시장 구분, 공모가, 기관 경쟁률
- 청약일 범위, 환불일, 상장일 (우측 정렬)
- 등록 완료 시 "✓ 등록됨" 표시 + 카드 흐리게

### 샘플 데이터 (2026년 3월 실제)

```js
const IPOS = [
  { id:1, name:"카나프테라퓨틱스", sector:"bio", market:"코스닥",
    price:"20,000원", sub_start:"03.05", sub_end:"03.06",
    refund_date:"03.10", list_date:"03.14", comp_rate:962,
    lead_manager:"한국투자증권", selected:false, registered:false },

  { id:2, name:"메쥬", sector:"med", market:"코스닥",
    price:"21,600원", sub_start:"03.05", sub_end:"03.06",
    refund_date:"03.10", list_date:"03.16", comp_rate:null,
    lead_manager:"신한투자증권", selected:false, registered:false },

  { id:3, name:"아이엠바이오로직스", sector:"bio", market:"코스닥",
    price:"19,000~26,000원", sub_start:"03.11", sub_end:"03.12",
    refund_date:"03.14", list_date:"03.20", comp_rate:null,
    lead_manager:"한국투자증권", selected:false, registered:false },

  { id:4, name:"한패스", sector:"fin", market:"코스닥",
    price:"19,000원", sub_start:"03.16", sub_end:"03.17",
    refund_date:"03.19", list_date:"03.25", comp_rate:1172,
    lead_manager:"한국투자증권", selected:false, registered:false },

  { id:5, name:"리센스메디컬", sector:"med", market:"코스닥",
    price:"11,000원", sub_start:"03.19", sub_end:"03.20",
    refund_date:"03.24", list_date:"03.31", comp_rate:1352,
    lead_manager:"KB증권", selected:false, registered:false }
];
```

---

## TASK 3 — 필터 + 정렬 + 이벤트 유형 선택 로직

### 필터 동작

- "전체": 모든 종목 표시
- "바이오": `sector === "bio"`
- "의료기기": `sector === "med"`
- "핀테크": `sector === "fin"`
- "경쟁률 높은순": `comp_rate` 내림차순 정렬 (null은 맨 뒤)

### 이벤트 유형 토글

- 최소 1개 선택 강제
- 1개만 남은 상태에서 해제 시도 → 무시 (버튼 흔들림 애니메이션)

### 통계 카드 실시간 업데이트

- 필터/선택 변경 시마다 재계산
- 평균 경쟁률: `comp_rate`가 있는 종목만 계산, 소수점 없이 정수 표시

---

## TASK 4 — Google Calendar 등록 연동

### 등록 버튼 동작

1. 선택된 종목 × 활성화된 이벤트 유형 조합으로 이벤트 목록 생성
2. Google Calendar API 호출 (OAuth 2.0)
3. 각 이벤트를 종일 이벤트(all-day event)로 등록
4. 성공 시 해당 종목 `registered: true` 처리 → 카드 흐리게 + "✓ 등록됨"
5. localStorage에 등록 이력 저장 (새로고침해도 유지)

### 이벤트 제목 형식

```
[카나프테라퓨틱스] 청약 시작
[카나프테라퓨틱스] 청약 종료
[카나프테라퓨틱스] 상장일
[카나프테라퓨틱스] 환불일
```

### 이벤트 설명(description) 포함 내용

```
시장: 코스닥
공모가: 20,000원
기관 경쟁률: 962:1
주관사: 한국투자증권
청약: 03.05 ~ 03.06
상장: 03.14
```

### Google Calendar OAuth 처리

- 최초 실행 시 Google 로그인 팝업
- 토큰을 localStorage에 저장해 재사용
- 토큰 만료 시 자동 갱신

### Google Cloud Console 설정 안내 (주석으로 파일 상단에 포함)

```js
// ──────────────────────────────────────────
// Google Calendar 연동 설정 방법
// 1. https://console.cloud.google.com 접속
// 2. 새 프로젝트 생성
// 3. Google Calendar API 활성화
// 4. OAuth 2.0 클라이언트 ID 생성 (웹 애플리케이션)
// 5. 승인된 JavaScript 원본에 아래 추가:
//    - http://localhost (로컬 파일 실행 시)
//    - file:// (직접 파일 열기 시)
// 6. 아래 CLIENT_ID에 발급받은 클라이언트 ID 입력
// ──────────────────────────────────────────
const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE';
```

---

## TASK 5 — localStorage 상태 유지 + UX 마무리

### localStorage에 저장할 항목

- 등록 완료된 종목 ID 목록 (`ipo_registered`)
- 마지막 업데이트 시각 (`ipo_last_updated`)
- 선택된 이벤트 유형 (`ipo_active_events`)

### UX 디테일

- 등록 버튼 클릭 시 로딩 스피너 표시
- 성공/실패 토스트 메시지 (하단 중앙, 2.5초 후 자동 사라짐)
- 카드 클릭 시 체크박스 토글 (카드 전체가 클릭 영역)
- 이미 지난 청약일의 종목은 회색 처리 (오늘 날짜 기준 자동 판단)
- 새 달로 바뀌면 localStorage 초기화 (월이 바뀌면 등록 이력 리셋)

### Cowork 자동 업데이트를 위한 주석 마커

Cowork가 데이터를 업데이트할 때 찾을 수 있도록 명확한 마커 삽입:

```js
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COWORK_UPDATE_START — 이 아래 데이터를 매달 업데이트
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const IPOS = [ ... ];
const LAST_UPDATED = "2026-03-01";
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COWORK_UPDATE_END
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 최종 확인 체크리스트

- [ ] 브라우저에서 index.html 직접 열었을 때 정상 렌더링
- [ ] 필터 버튼 동작 확인
- [ ] 체크박스 선택/해제 및 통계 카드 실시간 업데이트 확인
- [ ] 이벤트 유형 최소 1개 강제 확인
- [ ] Google Calendar 등록 버튼 동작 확인
- [ ] 새로고침 후 등록 이력 유지 확인 (localStorage)
- [ ] 모바일 화면(540px) 레이아웃 확인
- [ ] COWORK_UPDATE_START / END 마커 존재 확인
