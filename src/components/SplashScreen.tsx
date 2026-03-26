'use client';

const FLOATERS = [
  { left: 3,  top: 8,  delay: 0.0, dur: 3.2 },
  { left: 70, top: 5,  delay: 0.7, dur: 2.8 },
  { left: 38, top: 18, delay: 1.3, dur: 3.6 },
  { left: 80, top: 38, delay: 0.2, dur: 2.6 },
  { left: 8,  top: 48, delay: 1.0, dur: 3.0 },
  { left: 55, top: 55, delay: 0.4, dur: 3.8 },
  { left: 25, top: 72, delay: 0.9, dur: 2.4 },
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
