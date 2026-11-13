// Contexto global da aplicação
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import {
  readConfirmedEvents,
  readFavorites,
  readNotifications,
  readThemePreference,
  readSession,
  writeConfirmedEvents,
  writeFavorites,
  writeNotifications,
  writeThemePreference,
  writeSession,
  type StoredSession,
  type StoredNotification,
  type StoredUser,
} from '@/services/storage';
import { authenticatedRequest, apiRequest, ApiError, fetchEvents, fetchEventById, type AuthResponse, type AuthUser } from '@/services/api';
import { STATIC_FALLBACK_EVENTS, USE_STATIC_FALLBACK } from '@/data/events';
import { darkTheme, lightTheme, type AppTheme } from '@/theme';
import type { EventItem } from '@/types/event';

// Tipagem do contexto
type AppContextValue = {
  user: StoredUser | null;
  favorites: number[];
  confirmedEvents: number[];
  notifications: StoredNotification[];
  ready: boolean;
  events: EventItem[];
  loadingEvents: boolean;
  eventsError: string | null;
  isDark: boolean;
  theme: AppTheme;
  toggleTheme: () => void;
  updateUser: (name: string, email: string) => Promise<void>;
  toggleFavorite: (id: number) => void;
  toggleConfirmedPresence: (id: number) => void;
  markNotificationAsRead: (id: number) => void;
  markAllNotificationsAsRead: () => void;
  refreshEvents: () => Promise<void>;
  getEventById: (id: number) => EventItem | undefined;
  fetchEventDetails: (id: number) => Promise<EventItem | null>;
  signIn: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
};

const AppContext = createContext<AppContextValue | null>(null);

// Provedor de dados da aplicação
export function AppProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [user, setUser] = useState<StoredUser | null>(null);
  const [session, setSession] = useState<StoredSession | null>(null);
  const [favorites, setFavorites] = useState<number[]>([1, 3, 6]);
  const [confirmedEvents, setConfirmedEvents] = useState<number[]>([1]);
  const [notifications, setNotifications] = useState<StoredNotification[]>([]);
  const [ready, setReady] = useState(false);

  // Controle de tema: manual ou herdado do navegador/sistema
  const [manualTheme, setManualTheme] = useState<'light' | 'dark' | null>(null);

  // Lista de eventos e estados de requisição
  const [events, setEvents] = useState<EventItem[]>(() =>
    USE_STATIC_FALLBACK ? STATIC_FALLBACK_EVENTS : []
  );
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [eventsError, setEventsError] = useState<string | null>(null);

  // Define se está escuro com base na preferência manual ou no navegador
  const isDark = useMemo(() => {
    if (manualTheme !== null) {
      return manualTheme === 'dark';
    }
    return systemColorScheme === 'dark';
  }, [manualTheme, systemColorScheme]);

  // Objeto de tema ativo
  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  // Alternar tema claro e escuro
  const toggleTheme = useCallback(() => {
    const nextMode = isDark ? 'light' : 'dark';
    setManualTheme(nextMode);
    void writeThemePreference(nextMode);
  }, [isDark]);

  // Busca de eventos na API HTTP
  const refreshEvents = useCallback(async () => {
    setLoadingEvents(true);
    try {
      const data = await fetchEvents();
      if (Array.isArray(data) && data.length > 0) {
        setEvents(data);
        setEventsError(null);
      } else if (!USE_STATIC_FALLBACK) {
        setEvents([]);
      }
    } catch (err: any) {
      setEventsError(err?.message || 'Falha ao conectar com o servidor da API.');
      if (!USE_STATIC_FALLBACK) {
        setEvents([]);
      }
    } finally {
      setLoadingEvents(false);
    }
  }, []);

  // Obter evento por ID no estado local
  const getEventById = useCallback(
    (id: number): EventItem | undefined => {
      return events.find((item) => item.id === id);
    },
    [events]
  );

  // Obter detalhes de evento na API HTTP
  const fetchEventDetails = useCallback(
    async (id: number): Promise<EventItem | null> => {
      try {
        const item = await fetchEventById(id);
        if (item) {
          setEvents((prev) => {
            const index = prev.findIndex((e) => e.id === id);
            if (index >= 0) {
              const updated = [...prev];
              updated[index] = item;
              return updated;
            }
            return [...prev, item];
          });
          return item;
        }
      } catch (err: any) {
        // Fallback para estado local
      }
      return events.find((item) => item.id === id) || null;
    },
    [events]
  );

  const saveAuthResponse = useCallback(async (response: AuthResponse) => {
    const next: StoredSession = { accessToken: response.accessToken, refreshToken: response.refreshToken, user: { id: response.usuario.id, name: response.usuario.nome, email: response.usuario.email } };
    await writeSession(next);
    setSession(next);
    setUser(next.user);
  }, []);

  // Inicialização dos dados persistidos
  useEffect(() => {
    Promise.all([
      readSession(),
      readFavorites(),
      readConfirmedEvents(),
      readNotifications(),
      readThemePreference(),
    ])
      .then(async ([savedSession, savedFavorites, savedConfirmed, savedNotifications, savedTheme]) => {
        setSession(savedSession);
        setUser(savedSession?.user ?? null);
        setFavorites(savedFavorites);
        setConfirmedEvents(savedConfirmed);
        setNotifications(savedNotifications);
        if (savedTheme) {
          setManualTheme(savedTheme);
        }
        if (savedSession) {
          let active = savedSession;
          try {
            const usuario = await authenticatedRequest<AuthUser>('auth/me', active.accessToken, active.refreshToken, {}, async (response) => {
              await saveAuthResponse(response);
              active = { accessToken: response.accessToken, refreshToken: response.refreshToken, user: { id: response.usuario.id, name: response.usuario.nome, email: response.usuario.email } };
            });
            const next = { ...active, user: { id: usuario.id, name: usuario.nome, email: usuario.email } };
            await writeSession(next); setSession(next); setUser(next.user);
          } catch (error) {
            if (error instanceof ApiError && error.status === 401) await writeSession(null).then(() => { setSession(null); setUser(null); });
          }
        }
      })
      .finally(() => setReady(true));

    void refreshEvents();
  }, [refreshEvents, saveAuthResponse]);

  // Atualizar dados cadastrais do usuário
  const updateUser = useCallback(async (name: string, email: string) => {
    if (!session) throw new Error('Entre novamente para atualizar o perfil.');
    const nome = name.trim(); const normalizedEmail = email.trim().toLowerCase();
    if (!nome) throw new Error('Informe seu nome.');
    if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(normalizedEmail)) throw new Error('Digite um e-mail válido.');
    let active = session;
    const usuario = await authenticatedRequest<AuthUser>(`usuarios/${session.user.id}`, active.accessToken, active.refreshToken, { method: 'PATCH', body: JSON.stringify({ nome, email: normalizedEmail }) }, async (response) => {
      await saveAuthResponse(response);
      active = { accessToken: response.accessToken, refreshToken: response.refreshToken, user: { id: response.usuario.id, name: response.usuario.nome, email: response.usuario.email } };
    });
    const next = { ...active, user: { id: usuario.id, name: usuario.nome, email: usuario.email } };
    await writeSession(next); setSession(next); setUser(next.user);
  }, [saveAuthResponse, session]);

  // Login de usuário
  const signIn = useCallback(async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) throw new Error('Informe e-mail e senha.');
    if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(normalizedEmail)) throw new Error('Digite um e-mail válido.');
    if (password.length < 8) throw new Error('A senha precisa ter pelo menos 8 caracteres.');
    await saveAuthResponse(await apiRequest<AuthResponse>('auth/login', { method: 'POST', body: JSON.stringify({ email: normalizedEmail, senha: password }) }));
  }, [saveAuthResponse]);

  // Cadastro de usuário
  const register = useCallback(async (name: string, email: string, password: string) => {
    const nome = name.trim(); const normalizedEmail = email.trim().toLowerCase();
    if (!nome || !normalizedEmail || !password) throw new Error('Preencha todos os campos.');
    if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(normalizedEmail)) throw new Error('Digite um e-mail válido.');
    if (password.length < 8) throw new Error('A senha precisa ter pelo menos 8 caracteres.');
    await saveAuthResponse(await apiRequest<AuthResponse>('auth/register', { method: 'POST', body: JSON.stringify({ nome, email: normalizedEmail, senha: password }) }));
  }, [saveAuthResponse]);

  // Logout de usuário
  const signOut = useCallback(async () => { await writeSession(null); setSession(null); setUser(null); }, []);
  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    if (!session) throw new Error('Entre novamente para alterar a senha.');
    if (currentPassword.length < 8 || newPassword.length < 8) throw new Error('As senhas precisam ter pelo menos 8 caracteres.');
    await authenticatedRequest('usuarios/me/senha', session.accessToken, session.refreshToken, { method: 'PATCH', body: JSON.stringify({ senhaAtual: currentPassword, novaSenha: newPassword }) }, saveAuthResponse);
    await signOut();
  }, [saveAuthResponse, session, signOut]);

  // Favoritar ou desfavoritar evento
  const toggleFavorite = (id: number) => {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      void writeFavorites(next);
      return next;
    });
  };

  // Confirmar ou cancelar presença em evento
  const toggleConfirmedPresence = (id: number) => {
    setConfirmedEvents((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      void writeConfirmedEvents(next);
      return next;
    });
  };

  // Marcar notificação individual como lida
  const markNotificationAsRead = (id: number) => {
    setNotifications((current) => {
      const next = current.map((item) => (item.id === id ? { ...item, read: true } : item));
      void writeNotifications(next);
      return next;
    });
  };

  // Marcar todas as notificações como lidas
  const markAllNotificationsAsRead = () => {
    setNotifications((current) => {
      const next = current.map((item) => ({ ...item, read: true }));
      void writeNotifications(next);
      return next;
    });
  };

  const value = useMemo(
    () => ({
      user,
      favorites,
      confirmedEvents,
      notifications,
      ready,
      events,
      loadingEvents,
      eventsError,
      isDark,
      theme,
      toggleTheme,
      updateUser,
      refreshEvents,
      getEventById,
      fetchEventDetails,
      signIn,
      register,
      signOut,
      changePassword,
      toggleFavorite,
      toggleConfirmedPresence,
      markNotificationAsRead,
      markAllNotificationsAsRead,
    }),
    [
      user,
      favorites,
      confirmedEvents,
      notifications,
      ready,
      events,
      loadingEvents,
      eventsError,
      isDark,
      theme,
      toggleTheme,
      refreshEvents,
      getEventById,
      fetchEventDetails,
      updateUser,
      signIn,
      register,
      signOut,
      changePassword,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Hook de acesso ao contexto
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp precisa ser usado dentro de AppProvider.');
  }
  return context;
}
