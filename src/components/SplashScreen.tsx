'use client';

const ITEMS = [
  { icon: '💰', left: 2,  delay: 0.05, dur: 0.70, rot: -15 },
  { icon: '📉', left: 11, delay: 0.18, dur: 0.65, rot: 12  },
  { icon: '🌱', left: 20, delay: 0.08, dur: 0.75, rot: -8  },
  { icon: '💹', left: 29, delay: 0.30, dur: 0.68, rot: -16 },
  { icon: '📈', left: 38, delay: 0.14, dur: 0.72, rot: 20  },
  { icon: '🤑', left: 47, delay: 0.38, dur: 0.67, rot: 9   },
  { icon: '💎', left: 56, delay: 0.22, dur: 0.78, rot: -12 },
  { icon: '💸', left: 65, delay: 0.45, dur: 0.70, rot: -10 },
  { icon: '🏦', left: 74, delay: 0.10, dur: 0.73, rot: 8   },
  { icon: '🪙', left: 83, delay: 0.33, dur: 0.66, rot: 14  },
  { icon: '📊', left: 92, delay: 0.25, dur: 0.71, rot: 17  },
];

export default function SplashScreen() {
  return (
    <div className="splash" aria-hidden="true">
      {ITEMS.map((item, i) => (
        <span
          key={i}
          className="splash-icon"
          style={{
            left: `${item.left}%`,
            bottom: 4,
            fontSize: 26,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.dur}s`,
            ['--r' as string]: `${item.rot}deg`,
          }}
        >
          {item.icon}
        </span>
      ))}
      <div className="splash-title">🌱 진솔이키우기</div>
      <div className="splash-subtitle">공모주 청약 일정 트래커</div>
    </div>
  );
}
