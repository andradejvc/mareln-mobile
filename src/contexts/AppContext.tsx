import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { readFavorites, readUser, writeFavorites, writeUser, type StoredUser } from '@/services/storage';

type AppContextValue = {
  user: StoredUser | null;
  favorites: number[];
  ready: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  toggleFavorite: (id: number) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [favorites, setFavorites] = useState<number[]>([1, 3, 6]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.all([readUser(), readFavorites()]).then(([savedUser, savedFavorites]) => {
      setUser(savedUser);
      setFavorites(savedFavorites);
    }).finally(() => setReady(true));
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!email.trim() || !password.trim()) throw new Error('Informe e-mail e senha.');
    const current = await readUser();
    const name = current?.email.toLowerCase() === email.trim().toLowerCase()
      ? current.name
      : email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
    const nextUser = { name: name || 'Visitante', email: email.trim() };
    setUser(nextUser);
    await writeUser(nextUser);
  };

  const register = async (name: string, email: string, password: string) => {
    if (!name.trim() || !email.trim() || !password.trim()) throw new Error('Preencha todos os campos.');
    const nextUser = { name: name.trim(), email: email.trim() };
    setUser(nextUser);
    await writeUser(nextUser);
  };

  const signOut = async () => {
    setUser(null);
    await writeUser(null);
  };

  const toggleFavorite = (id: number) => {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      void writeFavorites(next);
      return next;
    });
  };

  const value = useMemo(() => ({ user, favorites, ready, signIn, register, signOut, toggleFavorite }), [user, favorites, ready]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp precisa ser usado dentro de AppProvider.');
  return context;
}
