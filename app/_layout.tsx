// Layout raiz da aplicação
import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { AppProvider, useApp } from '@/contexts/AppContext';

function NavigationStack() {
  const { theme, user, ready } = useApp();

  // Espera ler a sessão do storage antes de decidir qual rota liberar
  if (!ready) return null;

  const isLoggedIn = !!user;

  return (
    <>
      <StatusBar
        barStyle={theme.statusBar}
        backgroundColor={theme.background}
      />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        {/* Só acessíveis SEM sessão */}
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="registro" />
          <Stack.Screen name="recuperar-senha" />
        </Stack.Protected>

        {/* Só acessíveis COM sessão */}
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="eventos/[id]" />
          <Stack.Screen name="configurar-conta" />
          <Stack.Screen name="alterar-senha" />
        </Stack.Protected>
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AppProvider>
      <NavigationStack />
    </AppProvider>
  );
}