'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Header from '@/components/Header';
import StatCards from '@/components/StatCards';
import FilterBar from '@/components/FilterBar';
import EventPanel from '@/components/EventPanel';
import CardList from '@/components/CardList';
import FooterBar from '@/components/FooterBar';
import Toast from '@/components/Toast';
import {
  IpoRuntime,
  IpoData,
  FilterType,
  ViewType,
  EventType,
  EVENT_LABELS,
} from '@/components/types';
import { toIsoDate } from '@/components/utils';

const CLIENT_ID = '416628876905-btnptt8qjkd71o4a4i5mlg67m1gg4c2s.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

const DEFAULT_ACTIVE_EVENTS: EventType[] = ['sub_start', 'sub_end', 'list_date'];

// ─── Google API 타입 선언 ───
declare global {
  interface Window {
    gapi: {
      load: (lib: string, cb: () => void) => void;
      client: {
        init: (config: Record<string, unknown>) => Promise<void>;
        load: (url: string) => Promise<void>;
        setToken: (token: { access_token: string }) => void;
        calendar: {
          events: {
            insert: (params: {
              calendarId: string;
              resource: CalendarEvent;
            }) => Promise<unknown>;
          };
        };
      };
    };
    google: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (resp: TokenResponse) => void;
          }) => TokenClient;
        };
      };
    };
  }
}

interface TokenResponse {
  access_token: string;
  expires_in: number;
  error?: string;
}

interface TokenClient {
  requestAccessToken: (config: { prompt: string }) => void;
}

interface CalendarEvent {
  summary: string;
  description: string;
  start: { date: string };
  end: { date: string };
}

interface StoredToken {
  access_token: string;
  expires_at: number;
}

export default function Home() {
  const [ipos, setIpos] = useState<IpoRuntime[]>([]);
  const [lastUpdated, setLastUpdated] = useState('');
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [currentView, setCurrentView] = useState<ViewType>('week');
  const [activeEvents, setActiveEvents] = useState<EventType[]>(DEFAULT_ACTIVE_EVENTS);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | ''; visible: boolean }>({
    message: '',
    type: '',
    visible: false,
  });

  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gapiReadyRef   = useRef(false);
  const tokenClientRef = useRef<TokenClient | null>(null);

  // ── 데이터 로드 ──
  useEffect(() => {
    fetch('/data/ipos.json')
      .then(r => r.json())
      .then((json: { lastUpdated: string; ipos: IpoData[] }) => {
        const now = new Date();
        const thisMonth = `${now.getFullYear()}-${now.getMonth() + 1}`;

        // 월 단위 등록 이력 초기화
        const savedMonth = localStorage.getItem('ipo_saved_month');
        if (savedMonth !== thisMonth) {
          localStorage.removeItem('ipo_registered');
          localStorage.setItem('ipo_saved_month', thisMonth);
        }

        const registeredIds: number[] = JSON.parse(localStorage.getItem('ipo_registered') || '[]');

        const runtime: IpoRuntime[] = json.ipos.map(ipo => ({
          ...ipo,
          selected: false,
          registered: registeredIds.includes(ipo.id),
        }));

        setIpos(runtime);
        setLastUpdated(json.lastUpdated);
        localStorage.setItem('ipo_last_updated', json.lastUpdated);
      })
      .catch(console.error);

    // 이벤트 유형 복원
    const savedEvents = JSON.parse(localStorage.getItem('ipo_active_events') || 'null') as EventType[] | null;
    if (savedEvents && savedEvents.length > 0) {
      setActiveEvents(savedEvents);
    } else {
      localStorage.setItem('ipo_active_events', JSON.stringify(DEFAULT_ACTIVE_EVENTS));
    }
  }, []);

  // ── Toast ──
  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ message, type, visible: true });
    toastTimerRef.current = setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 2500);
  }, []);

  // ── 카드 토글 ──
  const handleToggleCard = useCallback((id: number) => {
    setIpos(prev =>
      prev.map(ipo =>
        ipo.id === id && !ipo.registered
          ? { ...ipo, selected: !ipo.selected }
          : ipo
      )
    );
  }, []);

  // ── 이벤트 유형 토글 ──
  const handleToggleEvent = useCallback((type: EventType, checked: boolean) => {
    setActiveEvents(prev => {
      const next = checked
        ? [...prev, type]
        : prev.filter(e => e !== type);
      localStorage.setItem('ipo_active_events', JSON.stringify(next));
      return next;
    });
  }, []);

  // ── Google Calendar 연동 ──
  function loadGoogleScripts(): Promise<void> {
    return new Promise((resolve, reject) => {
      let loaded = 0;
      const check = () => { if (++loaded === 2) resolve(); };

      if (!document.getElementById('gapi-script')) {
        const s = document.createElement('script');
        s.id  = 'gapi-script';
        s.src = 'https://apis.google.com/js/api.js';
        s.onload  = () => { window.gapi.load('client', () => { gapiReadyRef.current = true; check(); }); };
        s.onerror = () => reject(new Error('gapi load failed'));
        document.head.appendChild(s);
      } else {
        check();
      }

      if (!document.getElementById('gis-script')) {
        const s = document.createElement('script');
        s.id  = 'gis-script';
        s.src = 'https://accounts.google.com/gsi/client';
        s.onload  = () => check();
        s.onerror = () => reject(new Error('gis load failed'));
        document.head.appendChild(s);
      } else {
        check();
      }
    });
  }

  async function initGapi(): Promise<void> {
    await window.gapi.client.init({});
    await window.gapi.client.load('https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest');
  }

  function getStoredToken(): string | null {
    try {
      const t = JSON.parse(localStorage.getItem('gcal_token') || 'null') as StoredToken | null;
      if (!t) return null;
      if (Date.now() > t.expires_at - 60000) {
        localStorage.removeItem('gcal_token');
        return null;
      }
      return t.access_token;
    } catch {
      return null;
    }
  }

  function storeToken(tokenResponse: TokenResponse): void {
    const expires_at = Date.now() + (tokenResponse.expires_in || 3600) * 1000;
    localStorage.setItem('gcal_token', JSON.stringify({
      access_token: tokenResponse.access_token,
      expires_at,
    }));
  }

  function requestToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!tokenClientRef.current) {
        tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPES,
          callback: (resp: TokenResponse) => {
            if (resp.error) { reject(new Error(resp.error)); return; }
            storeToken(resp);
            resolve(resp.access_token);
          },
        });
      }
      tokenClientRef.current.requestAccessToken({ prompt: '' });
    });
  }

  async function getAccessToken(): Promise<string> {
    const stored = getStoredToken();
    if (stored) return stored;
    return requestToken();
  }

  function buildDescription(ipo: IpoRuntime): string {
    const rateStr = ipo.comp_rate ? `${ipo.comp_rate.toLocaleString()}:1` : '미정';
    return [
      `시장: ${ipo.market}`,
      `공모가: ${ipo.price}`,
      `기관 경쟁률: ${rateStr}`,
      `주관사: ${ipo.lead_manager}`,
      `청약: ${ipo.sub_start} ~ ${ipo.sub_end}`,
      `상장: ${ipo.list_date}`,
    ].join('\n');
  }

  function buildCalendarEvents(selectedIpos: IpoRuntime[], eventTypes: EventType[]): CalendarEvent[] {
    const DATE_FIELD: Record<EventType, keyof IpoRuntime> = {
      sub_start:   'sub_start',
      sub_end:     'sub_end',
      list_date:   'list_date',
      refund_date: 'refund_date',
    };
    const events: CalendarEvent[] = [];
    selectedIpos.forEach(ipo => {
      eventTypes.forEach(type => {
        const dateStr = ipo[DATE_FIELD[type]] as string;
        if (!dateStr || dateStr === '미정') return;
        events.push({
          summary: `[공모주] ${ipo.name} ${EVENT_LABELS[type]}`,
          description: buildDescription(ipo),
          start: { date: toIsoDate(dateStr) },
          end:   { date: toIsoDate(dateStr) },
        });
      });
    });
    return events;
  }

  async function createCalendarEvents(events: CalendarEvent[], accessToken: string) {
    window.gapi.client.setToken({ access_token: accessToken });
    const results = await Promise.allSettled(
      events.map(ev =>
        window.gapi.client.calendar.events.insert({ calendarId: 'primary', resource: ev })
      )
    );
    const failed = results.filter(r => r.status === 'rejected').length;
    return { total: events.length, failed };
  }

  function markRegistered(ids: number[]) {
    setIpos(prev => {
      const next = prev.map(ipo =>
        ids.includes(ipo.id)
          ? { ...ipo, registered: true, selected: false }
          : ipo
      );
      const allRegistered = next.filter(i => i.registered).map(i => i.id);
      localStorage.setItem('ipo_registered', JSON.stringify(allRegistered));
      return next;
    });
  }

  const handleRegister = async () => {
    const selectedIpos = ipos.filter(i => i.selected && !i.registered);
    if (selectedIpos.length === 0) return;

    const events = buildCalendarEvents(selectedIpos, activeEvents);
    if (events.length === 0) return;

    setLoading(true);

    try {
      await loadGoogleScripts();
      if (!gapiReadyRef.current || !window.gapi.client.calendar) {
        await initGapi();
      }

      const token = await getAccessToken();
      const { total, failed } = await createCalendarEvents(events, token);

      if (failed === 0) {
        markRegistered(selectedIpos.map(i => i.id));
        showToast(`${total}개 이벤트를 Google Calendar에 등록했습니다.`, 'success');
      } else if (failed < total) {
        markRegistered(selectedIpos.map(i => i.id));
        showToast(`일부 등록 실패 (${total - failed}/${total}건 성공)`, 'error');
      } else {
        showToast('등록에 실패했습니다. 다시 시도해주세요.', 'error');
      }
    } catch (err) {
      const error = err as Error;
      console.error('Calendar registration error:', error);
      const msg = error.message?.includes('popup')
        ? '팝업이 차단되었습니다. 팝업을 허용해주세요.'
        : error.message?.includes('access_denied')
        ? 'Google 로그인이 취소되었습니다.'
        : '등록 중 오류가 발생했습니다.';
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const selectedCount = ipos.filter(i => i.selected).length;

  return (
    <div className="wrapper">
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        lastUpdated={lastUpdated}
      />
      <StatCards ipos={ipos} />
      <FilterBar currentFilter={currentFilter} onFilterChange={setCurrentFilter} />
      <EventPanel activeEvents={activeEvents} onToggle={handleToggleEvent} />
      <CardList
        ipos={ipos}
        currentFilter={currentFilter}
        currentView={currentView}
        onToggle={handleToggleCard}
      />
      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
      <FooterBar
        selectedCount={selectedCount}
        loading={loading}
        onRegister={handleRegister}
      />
    </div>
  );
}
