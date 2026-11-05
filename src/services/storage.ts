import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = { user: '@mareln:user', favorites: '@mareln:favorites' } as const;

export type StoredUser = { name: string; email: string };

export async function readUser(): Promise<StoredUser | null> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.user);
    return raw ? (JSON.parse(raw) as StoredUser) : null;
  } catch {
    return null;
  }
}

export async function writeUser(user: StoredUser | null): Promise<void> {
  if (!user) return AsyncStorage.removeItem(KEYS.user);
  await AsyncStorage.setItem(KEYS.user, JSON.stringify(user));
}

export async function readFavorites(): Promise<number[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.favorites);
    return raw ? (JSON.parse(raw) as number[]) : [1, 3, 6];
  } catch {
    return [1, 3, 6];
  }
}

export async function writeFavorites(ids: number[]): Promise<void> {
  await AsyncStorage.setItem(KEYS.favorites, JSON.stringify(ids));
}
