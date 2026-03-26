'use client';

const ITEMS = [
  // Row 1 - 바닥 (먼저 떨어짐)
  { icon: '💰', left: 4,  delay: 0.06, bottom: 4,  size: 28, rot: -15 },
  { icon: '📊', left: 16, delay: 0.14, bottom: 4,  size: 24, rot: 10  },
  { icon: '🌱', left: 28, delay: 0.10, bottom: 4,  size: 26, rot: -8  },
  { icon: '📈', left: 40, delay: 0.22, bottom: 4,  size: 28, rot: 20  },
  { icon: '💎', left: 52, delay: 0.07, bottom: 4,  size: 26, rot: -12 },
  { icon: '🏦', left: 64, delay: 0.28, bottom: 4,  size: 24, rot: 8   },
  { icon: '💵', left: 76, delay: 0.17, bottom: 4,  size: 28, rot: -18 },
  { icon: '🪙', left: 88, delay: 0.13, bottom: 4,  size: 24, rot: 14  },
  // Row 2
  { icon: '📉', left: 10, delay: 0.56, bottom: 40, size: 24, rot: 12  },
  { icon: '💹', left: 22, delay: 0.64, bottom: 40, size: 26, rot: -16 },
  { icon: '🤑', left: 34, delay: 0.60, bottom: 40, size: 24, rot: 9   },
  { icon: '💸', left: 46, delay: 0.70, bottom: 40, size: 26, rot: -10 },
  { icon: '📈', left: 58, delay: 0.59, bottom: 40, size: 24, rot: 17  },
  { icon: '💰', left: 70, delay: 0.67, bottom: 40, size: 26, rot: -13 },
  { icon: '🌱', left: 82, delay: 0.62, bottom: 40, size: 24, rot: 7   },
  // Row 3
  { icon: '💎', left: 16, delay: 1.04, bottom: 76, size: 22, rot: -11 },
  { icon: '📊', left: 29, delay: 1.09, bottom: 76, size: 24, rot: 15  },
  { icon: '🏦', left: 42, delay: 1.06, bottom: 76, size: 22, rot: -8  },
  { icon: '💵', left: 55, delay: 1.12, bottom: 76, size: 24, rot: 13  },
  { icon: '🪙', left: 68, delay: 1.08, bottom: 76, size: 22, rot: -17 },
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
