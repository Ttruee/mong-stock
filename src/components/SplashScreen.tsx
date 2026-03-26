'use client';

const FLOATERS = [
  // 상단
  { left: 5,  top: 6,  delay: 0.0, dur: 3.2 },
  { left: 72, top: 4,  delay: 0.7, dur: 2.8 },
  { left: 38, top: 16, delay: 1.3, dur: 3.6 },
  // 중단 양 사이드 (가운데 타이틀 피해서)
  { left: 4,  top: 42, delay: 0.2, dur: 2.6 },
  { left: 82, top: 38, delay: 1.0, dur: 3.0 },
  // 하단
  { left: 20, top: 65, delay: 0.4, dur: 3.8 },
  { left: 60, top: 62, delay: 0.9, dur: 2.4 },
  { left: 78, top: 75, delay: 0.5, dur: 3.1 },
  { left: 8,  top: 80, delay: 1.2, dur: 2.7 },
  { left: 44, top: 82, delay: 0.3, dur: 3.4 },
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
