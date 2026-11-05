import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { AppProvider } from '@/contexts/AppContext';
import { colors } from '@/theme/colors';

export default function RootLayout() {
  return <AppProvider><StatusBar barStyle="dark-content" backgroundColor={colors.cream} /><Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.cream } }}><Stack.Screen name="index" /><Stack.Screen name="login" /><Stack.Screen name="registro" /><Stack.Screen name="recuperar-senha" /><Stack.Screen name="alterar-senha" /><Stack.Screen name="(tabs)" /><Stack.Screen name="eventos/[id]" /></Stack></AppProvider>;
}
