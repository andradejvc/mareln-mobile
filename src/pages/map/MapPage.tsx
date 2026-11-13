// Tela de mapa e localização dos eventos
import React, { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import EventsMap from '@/components/map/EventsMap';
import { useEventPins } from '@/hooks/useEventPins';
import { useApp } from '@/contexts/AppContext';
import { radius, spacing, typography } from '@/theme';

export default function MapPage() {
  const router = useRouter();
  const { events, theme } = useApp();
  const { pins, loading } = useEventPins(events);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selected = pins.find((pin) => pin.id === selectedId) ?? null;

  // Abre a rota até o evento no app de mapas
  const openRoute = () => {
    if (!selected) return;
    void Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${selected.latitude},${selected.longitude}`
    );
  };

  return (
    <View style={[styles.page, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.heading, { color: theme.secondary }]}>Mapa de eventos</Text>
        <Text style={[styles.sub, { color: theme.textMuted }]}>
          {loading
            ? 'Localizando eventos no mapa...'
            : `${pins.length} ${pins.length === 1 ? 'evento' : 'eventos'} no mapa. Toque em um pin para ver detalhes.`}
        </Text>
      </View>

      {/* Mapa */}
      <View style={[styles.mapBox, { borderColor: theme.border }]}>
        <EventsMap pins={pins} selectedId={selectedId} onSelect={setSelectedId} />
      </View>

      {/* Card do evento selecionado */}
      <View style={styles.bottom}>
        {selected ? (
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.info}>
              <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
                {selected.title}
              </Text>
              <Text style={[styles.meta, { color: theme.textMuted }]} numberOfLines={1}>
                {selected.place}, {selected.city}
              </Text>
              <Text style={[styles.date, { color: theme.primary }]}>
                {selected.date} • {selected.time}
              </Text>
            </View>
            <Pressable
              onPress={() => router.push(`/eventos/${selected.id}` as any)}
              style={[styles.iconButton, { backgroundColor: theme.cardHighlight }]}
            >
              <Ionicons name="information-circle-outline" size={20} color={theme.primary} />
            </Pressable>
            <Pressable onPress={openRoute} style={[styles.iconButton, { backgroundColor: theme.primary }]}>
              <Ionicons name="navigate" size={18} color="#FFFFFF" />
            </Pressable>
          </View>
        ) : (
          <Text style={[styles.hint, { color: theme.textMuted }]}>
            Selecione um pin para ver o evento.
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  header: { paddingHorizontal: spacing.xl, paddingTop: spacing.xl, paddingBottom: spacing.md },
  heading: {
    fontSize: typography.fontSize.title - 1,
    fontWeight: typography.fontWeight.heavy,
  },
  sub: {
    marginTop: spacing.xs,
    fontSize: typography.fontSize.md - 1,
    lineHeight: 19,
  },
  mapBox: {
    flex: 1,
    marginHorizontal: spacing.xl,
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  bottom: { padding: spacing.xl, minHeight: 100, justifyContent: 'center' },
  card: {
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  info: { flex: 1, gap: 3 },
  title: { fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.heavy },
  meta: { fontSize: typography.fontSize.xs + 1 },
  date: { fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.heavy },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: { textAlign: 'center', fontSize: typography.fontSize.md - 1 },
});