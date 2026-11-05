import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';

export default function TabLayout() {
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.orange, tabBarInactiveTintColor: '#A8A29E', tabBarStyle: { height: 64, paddingTop: 7, paddingBottom: 7, borderTopColor: '#F0E5DC', backgroundColor: '#FFFFFF' }, tabBarLabelStyle: { fontSize: 10, fontWeight: '800' } }}>
    <Tabs.Screen name="dashboard" options={{ title: 'Início', tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> }} />
    <Tabs.Screen name="explorar" options={{ title: 'Explorar', tabBarIcon: ({ color, size }) => <Ionicons name="search-outline" size={size} color={color} /> }} />
    <Tabs.Screen name="mapa" options={{ title: 'Mapa', tabBarIcon: ({ color, size }) => <Ionicons name="location-outline" size={size} color={color} /> }} />
    <Tabs.Screen name="favoritos" options={{ title: 'Favoritos', tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" size={size} color={color} /> }} />
    <Tabs.Screen name="perfil" options={{ title: 'Perfil', tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} /> }} />
  </Tabs>;
}
