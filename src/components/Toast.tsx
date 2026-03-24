'use client';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | '';
  visible: boolean;
}

export default function Toast({ message, type, visible }: ToastProps) {
  const prefix = type === 'success' ? '✓ ' : type === 'error' ? '✕ ' : '';
  return (
    <div className={`toast${type ? ` ${type}` : ''}${visible ? ' show' : ''}`}>
      {prefix}{message}
    </div>
  );
}
