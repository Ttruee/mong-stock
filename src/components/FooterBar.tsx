'use client';

interface FooterBarProps {
  selectedCount: number;
  loading: boolean;
  onRegister: () => void;
}

export default function FooterBar({ selectedCount, loading, onRegister }: FooterBarProps) {
  return (
    <div className="footer-bar">
      <div className="footer-inner">
        <div className="footer-info">
          <strong>{selectedCount}</strong>개 종목 선택됨
        </div>
        <button
          className="register-btn"
          disabled={selectedCount === 0 || loading}
          onClick={onRegister}
        >
          {loading ? (
            <>
              <span className="spinner" />
              등록 중...
            </>
          ) : (
            '📅 Google Calendar 등록'
          )}
        </button>
      </div>
      <div className="footer-credit">
        <span className="footer-credit-line" />
        <span className="footer-credit-text">made in JinsolNara</span>
        <span className="footer-credit-line" />
      </div>
    </div>
  );
}
