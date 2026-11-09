// Tela de exploração e filtros de eventos
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { EventCard } from '@/components/events/EventCard';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { categories, cities } from '@/data/events';
import type { Category, City } from '@/types/event';
import { useApp } from '@/contexts/AppContext';
import { radius, spacing, typography } from '@/theme';

// Botão tipo chip para filtros
function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  const { theme } = useApp();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: active ? theme.secondary : theme.card,
          borderColor: active ? theme.secondary : theme.border,
        },
      ]}
    >
      <Text
        style={[
          styles.chipText,
          { color: active ? '#FFFFFF' : theme.primary },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function ExplorePage() {
  const params = useLocalSearchParams<{ categoria?: string }>();
  const [search, setSearch] = useState('');
  const [city, setCity] = useState<City | null>(null);
  const [category, setCategory] = useState<Category | null>(
    (categories as string[]).includes(params.categoria || '') ? (params.categoria as Category) : null
  );

  const { favorites, toggleFavorite, events, theme } = useApp();

  // Filtragem dos eventos de forma reativa
  const filtered = useMemo(
    () =>
      events.filter(
        (event) =>
          (!city || event.city === city) &&
          (!category || event.category === category) &&
          `${event.title} ${event.place} ${event.city}`.toLowerCase().includes(search.toLowerCase())
      ),
    [events, search, city, category]
  );

  return (
    <ScrollView
      style={[styles.page, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[styles.heading, { color: theme.secondary }]}>Explorar eventos</Text>
      <Text style={[styles.sub, { color: theme.textMuted }]}>
        Encontre uma experiência no litoral norte.
      </Text>

      {/* Campo de pesquisa */}
      <View
        style={[
          styles.search,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <Ionicons name="search" size={19} color={theme.textMuted} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar eventos..."
          placeholderTextColor={theme.textMuted}
          style={[styles.searchInput, { color: theme.text }]}
        />
      </View>

      {/* Filtro por cidades */}
      <View style={styles.group}>
        <SectionTitle title="Cidades" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {cities.map((item) => (
            <Chip
              key={item}
              label={item}
              active={city === item}
              onPress={() => setCity(city === item ? null : item)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Filtro por categorias */}
      <View style={styles.group}>
        <SectionTitle title="Categorias" />
        <View style={styles.chips}>
          {categories.map((item) => (
            <Chip
              key={item}
              label={item}
              active={category === item}
              onPress={() => setCategory(category === item ? null : item)}
            />
          ))}
        </View>
      </View>

      {/* Resultados filtrados */}
      <View style={styles.results}>
        <SectionTitle
          title={city ? `Eventos em ${city}` : 'Próximos eventos'}
          subtitle={`${filtered.length} evento(s) encontrado(s)`}
        />
        <View style={styles.cards}>
          {filtered.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              favorite={favorites.includes(event.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </View>
        {filtered.length === 0 ? (
          <Text style={[styles.empty, { color: theme.textMuted }]}>
            Nenhum evento encontrado. Tente alterar os filtros.
          </Text>
        ) : null}
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
    fontSize: typography.fontSize.md - 1,
    marginTop: spacing.xs,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginTop: 18,
    borderRadius: radius.pill,
    borderWidth: 1,
    height: 48,
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.md,
  },
  group: {
    marginTop: spacing.xxl,
  },
  chip: {
    paddingHorizontal: 13,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  chipText: {
    fontSize: typography.fontSize.xs + 1,
    fontWeight: typography.fontWeight.heavy,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  results: {
    marginTop: spacing.xxl,
  },
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
  },
  empty: {
    textAlign: 'center',
    marginTop: 25,
    lineHeight: 21,
  },
});
