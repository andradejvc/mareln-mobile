// Layout raiz da aplicação
import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { AppProvider, useApp } from '@/contexts/AppContext';

function NavigationStack() {
  const { theme } = useApp();

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
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="registro" />
        <Stack.Screen name="recuperar-senha" />
        <Stack.Screen name="alterar-senha" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="eventos/[id]" />
        <Stack.Screen name="configurar-conta" />
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
