'use client';

const ITEMS = [
  // bottom row — 딜레이 0.05~0.58s 에 고르게 분산
  { icon: '💰', left: 4,  delay: 0.05, dur: 0.72, bottom: 4,  size: 28, rot: -15 },
  { icon: '💎', left: 52, delay: 0.10, dur: 0.75, bottom: 4,  size: 26, rot: -12 },
  { icon: '📊', left: 16, delay: 0.22, dur: 0.65, bottom: 4,  size: 24, rot: 10  },
  { icon: '💵', left: 76, delay: 0.28, dur: 0.78, bottom: 4,  size: 28, rot: -18 },
  { icon: '🌱', left: 28, delay: 0.38, dur: 0.80, bottom: 4,  size: 26, rot: -8  },
  { icon: '🪙', left: 88, delay: 0.42, dur: 0.63, bottom: 4,  size: 24, rot: 14  },
  { icon: '📈', left: 40, delay: 0.48, dur: 0.68, bottom: 4,  size: 28, rot: 20  },
  { icon: '🏦', left: 64, delay: 0.58, dur: 0.70, bottom: 4,  size: 24, rot: 8   },
  // middle row — 딜레이 0.55~0.90s
  { icon: '📉', left: 10, delay: 0.55, dur: 0.75, bottom: 40, size: 24, rot: 12  },
  { icon: '📈', left: 58, delay: 0.62, dur: 0.65, bottom: 40, size: 24, rot: 17  },
  { icon: '🤑', left: 34, delay: 0.65, dur: 0.80, bottom: 40, size: 24, rot: 9   },
  { icon: '🌱', left: 82, delay: 0.70, dur: 0.78, bottom: 40, size: 24, rot: 7   },
  { icon: '💹', left: 22, delay: 0.75, dur: 0.68, bottom: 40, size: 26, rot: -16 },
  { icon: '💰', left: 70, delay: 0.82, dur: 0.72, bottom: 40, size: 26, rot: -13 },
  { icon: '💸', left: 46, delay: 0.90, dur: 0.70, bottom: 40, size: 26, rot: -10 },
  // top row — 딜레이 1.00~1.28s
  { icon: '💎', left: 16, delay: 1.00, dur: 0.70, bottom: 76, size: 22, rot: -11 },
  { icon: '🏦', left: 42, delay: 1.08, dur: 0.72, bottom: 76, size: 22, rot: -8  },
  { icon: '🪙', left: 68, delay: 1.12, dur: 0.75, bottom: 76, size: 22, rot: -17 },
  { icon: '📊', left: 29, delay: 1.18, dur: 0.65, bottom: 76, size: 24, rot: 15  },
  { icon: '💵', left: 55, delay: 1.28, dur: 0.68, bottom: 76, size: 24, rot: 13  },
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
            bottom: item.bottom,
            fontSize: item.size,
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
