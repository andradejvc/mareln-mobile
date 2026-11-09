// Página principal (Dashboard) do usuário autenticado
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { EventCard } from '@/components/events/EventCard';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { useApp } from '@/contexts/AppContext';
import { radius, spacing, typography } from '@/theme';

export default function DashboardPage() {
  const router = useRouter();
  const { user, favorites, toggleFavorite, events, theme } = useApp();

  // Segmentação didática de eventos
  const today = events.slice(0, 2);
  const suggestions = events.slice(2, 6);

  return (
    <ScrollView
      style={[styles.page, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Cabeçalho de boas-vindas */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.hello, { color: theme.text }]}>
            Olá, {user?.name?.split(' ')[0] || 'visitante'}! 👋
          </Text>
          <Text style={[styles.sub, { color: theme.textMuted }]}>
            Veja o que está acontecendo no litoral.
          </Text>
        </View>
        <Pressable
          onPress={() => router.push('/perfil' as any)}
          style={[styles.avatar, { backgroundColor: theme.tint }]}
        >
          <Ionicons name="person" size={21} color={theme.primary} />
        </Pressable>
      </View>

      {/* Barra de busca rápida */}
      <Pressable
        style={[
          styles.search,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
        onPress={() => router.push('/explorar' as any)}
      >
        <Ionicons name="search" size={20} color={theme.textMuted} />
        <Text style={[styles.searchText, { color: theme.textMuted }]}>
          Buscar eventos, cidades...
        </Text>
        <Ionicons name="options-outline" size={20} color={theme.secondary} />
      </Pressable>

      {/* Banner de destaque */}
      <View style={[styles.banner, { backgroundColor: theme.primary }]}>
        <View style={styles.bannerInfo}>
          <Text style={styles.bannerKicker}>DESCUBRA A REGIÃO</Text>
          <Text style={styles.bannerTitle}>Seu próximo passeio começa aqui.</Text>
          <Pressable
            onPress={() => router.push('/explorar' as any)}
            style={[styles.bannerButton, { backgroundColor: theme.background }]}
          >
            <Text style={[styles.bannerButtonText, { color: theme.primary }]}>
              Explorar eventos
            </Text>
            <Ionicons name="arrow-forward" size={15} color={theme.primary} />
          </Pressable>
        </View>
        <Ionicons name="sunny" size={68} color="#FFD8A8" />
      </View>

      {/* Seção de eventos em destaque */}
      <View style={styles.section}>
        <SectionTitle
          title="Eventos em destaque"
          subtitle="Programação cadastrada no Maré LN"
          action={
            <Pressable onPress={() => router.push('/explorar' as any)}>
              <Text style={[styles.action, { color: theme.secondary }]}>Ver todos</Text>
            </Pressable>
          }
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {today.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              favorite={favorites.includes(event.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </ScrollView>
      </View>

      {/* Seção de sugestões */}
      <View style={styles.section}>
        <SectionTitle title="Pode te interessar" subtitle="Mais experiências para descobrir" />
        {suggestions.map((event) => (
          <View
            key={event.id}
            style={[
              styles.listCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <Image source={{ uri: event.image }} style={styles.thumb} />
            <View style={styles.cardDetails}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>{event.title}</Text>
              <Text style={[styles.cardMeta, { color: theme.textMuted }]}>
                {event.date} • {event.city}
              </Text>
              <Pressable onPress={() => router.push(`/eventos/${event.id}` as any)}>
                <Text style={[styles.action, { color: theme.secondary }]}>Ver detalhes</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.xxl,
  },
  header: {
    padding: spacing.xl,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hello: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.heavy,
  },
  sub: {
    fontSize: typography.fontSize.sm,
    marginTop: spacing.xs,
  },
  avatar: {
    width: 43,
    height: 43,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    marginHorizontal: spacing.xl,
    borderRadius: 28,
    paddingHorizontal: 15,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    borderWidth: 1,
  },
  searchText: {
    flex: 1,
    fontSize: typography.fontSize.md - 1,
  },
  banner: {
    margin: spacing.xl,
    padding: spacing.xl,
    borderRadius: radius.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerInfo: {
    flex: 1,
  },
  bannerKicker: {
    color: '#FFE1CF',
    fontSize: typography.fontSize.xs - 1,
    fontWeight: typography.fontWeight.heavy,
    letterSpacing: 1.4,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 23,
    lineHeight: 28,
    fontWeight: typography.fontWeight.heavy,
    marginTop: 7,
    maxWidth: 220,
  },
  bannerButton: {
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 7,
    paddingHorizontal: 13,
    paddingVertical: spacing.sm,
    marginTop: 13,
  },
  bannerButtonText: {
    fontWeight: typography.fontWeight.heavy,
    fontSize: typography.fontSize.xs + 1,
  },
  section: {
    marginTop: spacing.sm,
    paddingLeft: spacing.xl,
    marginBottom: spacing.xl,
  },
  action: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.heavy,
  },
  listCard: {
    flexDirection: 'row',
    borderRadius: radius.md,
    padding: 10,
    marginRight: spacing.xl,
    marginBottom: 10,
    gap: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
  },
  thumb: {
    width: 86,
    height: 78,
    borderRadius: 12,
  },
  cardDetails: {
    flex: 1,
    gap: spacing.xs,
  },
  cardTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.heavy,
  },
  cardMeta: {
    fontSize: typography.fontSize.xs + 1,
  },
});
