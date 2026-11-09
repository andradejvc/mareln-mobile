// Tela de mapa e localização dos eventos
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '@/contexts/AppContext';
import { radius, spacing, typography } from '@/theme';

export default function MapPage() {
  const { events, theme } = useApp();

  // Abrir rota ou local no aplicativo de mapas
  const openMap = (place: string, city: string) => {
    const query = encodeURIComponent(`${place}, ${city}, SP`);
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
  };

  return (
    <ScrollView
      style={[styles.page, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.heading, { color: theme.secondary }]}>Mapa de eventos</Text>
      <Text style={[styles.sub, { color: theme.textMuted }]}>
        Escolha um evento para abrir sua localização no Google Maps.
      </Text>

      {/* Aviso informativo */}
      <View
        style={[
          styles.notice,
          {
            backgroundColor: theme.cardHighlight,
            borderColor: theme.border,
          },
        ]}
      >
        <Ionicons name="map-outline" size={26} color={theme.primary} />
        <Text style={[styles.noticeText, { color: theme.text }]}>
          O mapa interativo do Desktop (Leaflet) ainda precisa ser substituído por uma solução nativa.
          Nesta versão, os locais são abertos diretamente no Google Maps.
        </Text>
      </View>

      {/* Lista de locais dos eventos */}
      {events.map((event) => (
        <View
          key={event.id}
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={[styles.icon, { backgroundColor: theme.cardHighlight }]}>
            <Ionicons name="location" size={21} color={theme.primary} />
          </View>
          <View style={styles.info}>
            <Text style={[styles.title, { color: theme.text }]}>{event.title}</Text>
            <Text style={[styles.meta, { color: theme.textMuted }]}>
              {event.place}, {event.city}
            </Text>
            <Text style={[styles.date, { color: theme.primary }]}>
              {event.date} • {event.time}
            </Text>
          </View>
          <Pressable
            onPress={() => openMap(event.place, event.city)}
            style={[styles.button, { backgroundColor: theme.primary }]}
          >
            <Ionicons name="navigate" size={17} color="#FFFFFF" />
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: 35,
  },
  heading: {
    fontSize: typography.fontSize.title - 1,
    fontWeight: typography.fontWeight.heavy,
  },
  sub: {
    marginTop: spacing.xs,
    fontSize: typography.fontSize.md - 1,
    lineHeight: 19,
  },
  notice: {
    borderWidth: 1,
    borderRadius: radius.md,
    padding: 14,
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  noticeText: {
    flex: 1,
    fontSize: typography.fontSize.xs + 1,
    lineHeight: 17,
  },
  card: {
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: 10,
    flexDirection: 'row',
    gap: 11,
    alignItems: 'center',
    borderWidth: 1,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: 3,
  },
  title: {
    fontSize: typography.fontSize.md - 1,
    fontWeight: typography.fontWeight.heavy,
  },
  meta: {
    fontSize: typography.fontSize.xs + 1,
  },
  date: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.heavy,
  },
  button: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
