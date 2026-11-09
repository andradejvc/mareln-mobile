// Tela de detalhes do evento selecionado
import React, { useEffect, useState } from 'react';
import { Alert, Image, Linking, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { useApp } from '@/contexts/AppContext';
import { radius, spacing, typography } from '@/theme';
import type { EventItem } from '@/types/event';

export default function EventDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const {
    favorites,
    toggleFavorite,
    confirmedEvents,
    toggleConfirmedPresence,
    getEventById,
    fetchEventDetails,
    theme,
  } = useApp();
  const eventId = Number(id);

  const [event, setEvent] = useState<EventItem | null>(() => getEventById(eventId) || null);
  const [loading, setLoading] = useState(!event);

  // Carregamento dinâmico do evento
  useEffect(() => {
    let active = true;
    const current = getEventById(eventId);
    if (current) {
      setEvent(current);
    }

    fetchEventDetails(eventId)
      .then((item) => {
        if (active && item) {
          setEvent(item);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [eventId, getEventById, fetchEventDetails]);

  if (loading && !event) {
    return (
      <View style={[styles.missing, { backgroundColor: theme.background }]}>
        <Text style={[styles.title, { color: theme.text }]}>Carregando evento...</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View style={[styles.missing, { backgroundColor: theme.background }]}>
        <Text style={[styles.title, { color: theme.text }]}>Evento não encontrado.</Text>
        <PrimaryButton
          title="Voltar para explorar"
          onPress={() => router.replace('/explorar' as any)}
        />
      </View>
    );
  }

  const favorite = favorites.includes(event.id);
  const isConfirmed = confirmedEvents.includes(event.id);

  // Compartilhamento nativo
  const share = async () => {
    try {
      await Share.share({ message: `${event.title} — ${event.place}, ${event.city}` });
    } catch {
      Alert.alert('Compartilhar', 'Não foi possível compartilhar agora.');
    }
  };

  // Abrir no aplicativo de mapa
  const openMap = () => {
    const query = encodeURIComponent(`${event.place}, ${event.city}, SP`);
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
  };

  return (
    <ScrollView
      style={[styles.page, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      <Text
        onPress={() => router.back()}
        style={[styles.back, { color: theme.primary }]}
      >
        ‹ Voltar para eventos
      </Text>

      <Image source={{ uri: event.image }} style={styles.hero} />

      <View style={[styles.badge, { backgroundColor: theme.badgeBg }]}>
        <Text style={[styles.badgeText, { color: theme.badgeText }]}>
          {event.category.toUpperCase()}
        </Text>
      </View>

      <Text style={[styles.title, { color: theme.text }]}>{event.title}</Text>

      <View style={styles.metaRow}>
        <Ionicons name="calendar-outline" size={17} color={theme.primary} />
        <Text style={[styles.meta, { color: theme.textMuted }]}>
          {event.date} • {event.time}
        </Text>
      </View>

      <View style={styles.metaRow}>
        <Ionicons name="location-outline" size={17} color={theme.primary} />
        <Text style={[styles.meta, { color: theme.textMuted }]}>
          {event.place}, {event.city}
        </Text>
      </View>

      {/* Botão de confirmação de presença */}
      <View style={styles.presenceContainer}>
        <PrimaryButton
          title={isConfirmed ? '✓ Presença confirmada' : 'Confirmar presença no evento'}
          variant={isConfirmed ? 'outline' : 'orange'}
          onPress={() => toggleConfirmedPresence(event.id)}
        />
      </View>

      {/* Ações secundárias */}
      <View style={styles.actions}>
        <PrimaryButton
          title={favorite ? 'Remover dos favoritos' : 'Salvar favorito'}
          variant={favorite ? 'outline' : 'pink'}
          onPress={() => toggleFavorite(event.id)}
          style={styles.actionFlex}
        />
        <PrimaryButton
          title="Compartilhar"
          variant="outline"
          onPress={() => void share()}
          style={styles.actionShare}
        />
      </View>

      {/* Bloco de descrição */}
      <View style={[styles.description, { backgroundColor: theme.primary }]}>
        <Text style={styles.sectionTitleLight}>Descrição</Text>
        <Text style={styles.bodyLight}>{event.description}</Text>
        <View style={styles.infoLine}>
          <Text style={styles.infoLabel}>Entrada:</Text>
          <Text style={styles.bodyLight}>
            {event.free === false ? 'Consulte valores' : 'Gratuita (confirme com a organização)'}
          </Text>
        </View>
        <View style={styles.infoLine}>
          <Text style={styles.infoLabel}>Cidade:</Text>
          <Text style={styles.bodyLight}>{event.city}</Text>
        </View>
      </View>

      {/* Recomendações aos visitantes */}
      <View style={[styles.recommendations, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Recomendações</Text>
        {event.recommendations.map((item, index) => (
          <View key={index} style={styles.recommendation}>
            <Ionicons name="checkmark-circle" size={17} color={theme.primary} />
            <Text style={[styles.body, { color: theme.textMuted }]}>{item}</Text>
          </View>
        ))}
      </View>

      <PrimaryButton title="Ver localização no mapa" onPress={openMap} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: 40,
  },
  back: {
    fontWeight: typography.fontWeight.heavy,
    fontSize: typography.fontSize.md,
    marginBottom: 15,
  },
  hero: {
    width: '100%',
    height: 230,
    borderRadius: radius.lg,
  },
  badge: {
    alignSelf: 'center',
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: -15,
  },
  badgeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.heavy,
    letterSpacing: 1.2,
  },
  title: {
    fontSize: typography.fontSize.title - 1,
    fontWeight: typography.fontWeight.heavy,
    textAlign: 'center',
    marginVertical: 15,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  meta: {
    fontSize: typography.fontSize.md - 1,
    flex: 1,
  },
  presenceContainer: {
    marginTop: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    gap: 9,
    marginTop: 10,
  },
  actionFlex: {
    flex: 1,
  },
  actionShare: {
    flex: 0.7,
  },
  description: {
    borderRadius: radius.lg,
    padding: 19,
    marginTop: spacing.xxl,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.heavy,
    marginBottom: 11,
  },
  sectionTitleLight: {
    color: '#FFFFFF',
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.heavy,
    marginBottom: 11,
  },
  body: {
    lineHeight: 22,
    fontSize: typography.fontSize.md - 1,
    flex: 1,
  },
  bodyLight: {
    color: '#FFF4EC',
    lineHeight: 22,
    fontSize: typography.fontSize.md - 1,
    flex: 1,
  },
  infoLine: {
    flexDirection: 'row',
    gap: 6,
    marginTop: spacing.md,
    alignItems: 'center',
  },
  infoLabel: {
    color: '#FFFFFF',
    fontWeight: typography.fontWeight.heavy,
    fontSize: typography.fontSize.sm,
  },
  recommendations: {
    padding: 18,
    marginVertical: spacing.lg,
    borderRadius: radius.lg,
  },
  recommendation: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: 9,
  },
  missing: {
    flex: 1,
    padding: spacing.xxl,
    justifyContent: 'center',
    gap: spacing.xl,
  },
});
