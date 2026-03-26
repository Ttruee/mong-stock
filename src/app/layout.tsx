import type { Metadata, Viewport } from 'next';
import './globals.css';
import SplashScreen from '@/components/SplashScreen';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: '🌱 진솔이키우기',
  description: '공모주 청약 일정 및 Google Calendar 등록 도구',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: '진솔이키우기',
  },
  icons: {
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" data-theme="dark" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: 'html,body{background:#0e0f11}html[data-theme="light"],html[data-theme="light"] body{background:#f5f7fa}' }} />
        <meta name="theme-color" content="#4ade80" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <div className="top-safe-cover" />
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
