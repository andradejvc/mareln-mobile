// Tela de eventos salvos como favoritos
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { EventCard } from '@/components/events/EventCard';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { useApp } from '@/contexts/AppContext';
import { radius, spacing, typography } from '@/theme';

export default function FavoritesPage() {
  const { favorites, toggleFavorite, events, theme } = useApp();

  // Filtragem dos eventos marcados como favoritos
  const saved = events.filter((event) => favorites.includes(event.id));

  return (
    <ScrollView
      style={[styles.page, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.heading, { color: theme.secondary }]}>Meus favoritos</Text>
      <Text style={[styles.sub, { color: theme.textMuted }]}>
        Guarde os eventos que você não quer perder.
      </Text>

      <View style={styles.section}>
        <SectionTitle title={`${saved.length} evento(s) salvo(s)`} />
        {saved.length ? (
          <View style={styles.cards}>
            {saved.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                favorite
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </View>
        ) : (
          <Text
            style={[
              styles.empty,
              {
                backgroundColor: theme.card,
                color: theme.textMuted,
              },
            ]}
          >
            Você ainda não salvou eventos. Toque no coração de um evento para adicioná-lo aqui.
          </Text>
        )}
      </View>
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
    fontWeight: typography.fontWeight.heavy,
    fontSize: typography.fontSize.title - 1,
  },
  sub: {
    marginTop: spacing.xs,
    fontSize: typography.fontSize.md - 1,
  },
  section: {
    marginTop: 25,
  },
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
  },
  empty: {
    textAlign: 'center',
    padding: 25,
    borderRadius: radius.md + 2,
    lineHeight: 21,
  },
});
