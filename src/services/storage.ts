// Gerenciamento de armazenamento local com AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Chaves de armazenamento
const KEYS = {
  session: '@mareln:session',
  favorites: '@mareln:favorites',
  confirmedEvents: '@mareln:confirmed_events',
  theme: '@mareln:theme',
  notifications: '@mareln:notifications',
} as const;

export type StoredUser = {
  id: number;
  name: string;
  email: string;
};

export type StoredSession = {
  accessToken: string;
  refreshToken: string;
  user: StoredUser;
};

export async function readSession(): Promise<StoredSession | null> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.session);
    if (!raw) return null;
    const session = JSON.parse(raw) as Partial<StoredSession>;
    return session.accessToken && session.refreshToken && session.user && Number.isInteger(session.user.id) ? session as StoredSession : null;
  } catch {
    return null;
  }
}

export async function writeSession(session: StoredSession | null): Promise<void> {
  if (!session) return AsyncStorage.removeItem(KEYS.session);
  await AsyncStorage.setItem(KEYS.session, JSON.stringify(session));
}

export type StoredNotification = {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
};

// Leitura dos eventos favoritos
export async function readFavorites(): Promise<number[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.favorites);
    return raw ? (JSON.parse(raw) as number[]) : [1, 3, 6];
  } catch {
    return [1, 3, 6];
  }
}

// Gravação dos eventos favoritos
export async function writeFavorites(ids: number[]): Promise<void> {
  await AsyncStorage.setItem(KEYS.favorites, JSON.stringify(ids));
}

// Leitura dos eventos com presença confirmada
export async function readConfirmedEvents(): Promise<number[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.confirmedEvents);
    return raw ? (JSON.parse(raw) as number[]) : [1];
  } catch {
    return [1];
  }
}

// Gravação dos eventos com presença confirmada
export async function writeConfirmedEvents(ids: number[]): Promise<void> {
  await AsyncStorage.setItem(KEYS.confirmedEvents, JSON.stringify(ids));
}

// Leitura das notificações salvas
export async function readNotifications(): Promise<StoredNotification[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.notifications);
    if (raw) return JSON.parse(raw) as StoredNotification[];
  } catch {
    // Retorna lista padrão se falhar
  }

  return [
    {
      id: 1,
      title: 'Presença confirmada!',
      message: 'Sua presença no Festival de Jazz na Praia está confirmada.',
      date: 'Hoje, 10:30',
      read: false,
    },
    {
      id: 2,
      title: 'Novo evento no litoral',
      message: 'Confira as novas atrações de gastronomia e cultura em Caraguatatuba.',
      date: 'Ontem',
      read: true,
    },
  ];
}

// Gravação das notificações
export async function writeNotifications(notifications: StoredNotification[]): Promise<void> {
  await AsyncStorage.setItem(KEYS.notifications, JSON.stringify(notifications));
}

// Leitura da preferência de tema
export async function readThemePreference(): Promise<'light' | 'dark' | null> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.theme);
    return raw === 'dark' || raw === 'light' ? raw : null;
  } catch {
    return null;
  }
}

// Gravação da preferência de tema
export async function writeThemePreference(mode: 'light' | 'dark'): Promise<void> {
  await AsyncStorage.setItem(KEYS.theme, mode);
}
