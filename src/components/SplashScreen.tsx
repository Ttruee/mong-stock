'use client';

const FLOATERS = [
  // 상단 행
  { left: 7,  top: 6,  delay: 0.0, dur: 3.2 },
  { left: 48, top: 5,  delay: 0.8, dur: 2.8 },
  { left: 84, top: 8,  delay: 0.4, dur: 3.5 },
  // 중상단 행 (타이틀 양 사이드)
  { left: 18, top: 30, delay: 1.1, dur: 2.6 },
  { left: 78, top: 32, delay: 0.3, dur: 3.0 },
  // 중하단 행 (타이틀 아래)
  { left: 5,  top: 58, delay: 0.6, dur: 3.8 },
  { left: 46, top: 60, delay: 1.3, dur: 2.5 },
  { left: 80, top: 56, delay: 0.2, dur: 3.3 },
  // 하단 행
  { left: 28, top: 80, delay: 0.9, dur: 2.9 },
  { left: 66, top: 78, delay: 0.5, dur: 3.6 },
];

export default function SplashScreen() {
  return (
    <div className="splash" aria-hidden="true">
      {FLOATERS.map((f, i) => (
        <img
          key={i}
          src="/icon.png"
          className="splash-floater"
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.dur}s`,
          }}
        />
      ))}
      <div className="splash-title">🌱 진솔이키우기</div>
      <div className="splash-subtitle">공모주 청약 일정 트래커</div>
      <div className="splash-easter">made in JinsolNara</div>
    </div>
  );
}
