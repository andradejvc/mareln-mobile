// Contexto global da aplicação
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import {
  readConfirmedEvents,
  readFavorites,
  readNotifications,
  readThemePreference,
  readUser,
  writeConfirmedEvents,
  writeFavorites,
  writeNotifications,
  writeThemePreference,
  writeUser,
  type StoredNotification,
  type StoredUser,
} from '@/services/storage';
import { fetchEvents, fetchEventById } from '@/services/api';
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
};

const AppContext = createContext<AppContextValue | null>(null);

// Provedor de dados da aplicação
export function AppProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [user, setUser] = useState<StoredUser | null>(null);
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

  // Inicialização dos dados persistidos
  useEffect(() => {
    Promise.all([
      readUser(),
      readFavorites(),
      readConfirmedEvents(),
      readNotifications(),
      readThemePreference(),
    ])
      .then(([savedUser, savedFavorites, savedConfirmed, savedNotifications, savedTheme]) => {
        setUser(savedUser);
        setFavorites(savedFavorites);
        setConfirmedEvents(savedConfirmed);
        setNotifications(savedNotifications);
        if (savedTheme) {
          setManualTheme(savedTheme);
        }
      })
      .finally(() => setReady(true));

    void refreshEvents();
  }, [refreshEvents]);

  // Atualizar dados cadastrais do usuário
  const updateUser = async (name: string, email: string) => {
    if (!name.trim() || !email.trim()) {
      throw new Error('Nome e e-mail não podem ficar vazios.');
    }
    const updated = { name: name.trim(), email: email.trim() };
    setUser(updated);
    await writeUser(updated);
  };

  // Login de usuário
  const signIn = async (email: string, password: string) => {
    if (!email.trim() || !password.trim()) {
      throw new Error('Informe e-mail e senha.');
    }
    const current = await readUser();
    const name =
      current?.email.toLowerCase() === email.trim().toLowerCase()
        ? current.name
        : email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    const nextUser = { name: name || 'Visitante', email: email.trim() };
    setUser(nextUser);
    await writeUser(nextUser);
  };

  // Cadastro de usuário
  const register = async (name: string, email: string, password: string) => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      throw new Error('Preencha todos os campos.');
    }
    const nextUser = { name: name.trim(), email: email.trim() };
    setUser(nextUser);
    await writeUser(nextUser);
  };

  // Logout de usuário
  const signOut = async () => {
    setUser(null);
    await writeUser(null);
  };

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
