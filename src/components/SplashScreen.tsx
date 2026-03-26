'use client';

const FLOATERS = [
  { left: 5,  top: 12, size: 80,  delay: 0.0, dur: 2.8 },
  { left: 68, top: 8,  size: 60,  delay: 0.5, dur: 3.2 },
  { left: 30, top: 20, size: 90,  delay: 1.0, dur: 2.5 },
  { left: 82, top: 42, size: 65,  delay: 0.3, dur: 3.0 },
  { left: 12, top: 52, size: 70,  delay: 0.8, dur: 2.7 },
  { left: 52, top: 58, size: 75,  delay: 0.2, dur: 3.4 },
  { left: 40, top: 78, size: 55,  delay: 0.6, dur: 2.9 },
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
            width: f.size,
            height: f.size,
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.dur}s`,
          }}
        />
      ))}
      <div className="splash-title">🌱 진솔이키우기</div>
      <div className="splash-subtitle">공모주 청약 일정 트래커</div>
    </div>
  );
}
