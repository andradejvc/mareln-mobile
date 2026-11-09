// Cartão de exibição do evento
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import type { EventItem } from '@/types/event';
import { radius, spacing, typography } from '@/theme';
import { useApp } from '@/contexts/AppContext';

type EventCardProps = {
  event: EventItem;
  favorite: boolean;
  onToggleFavorite: (id: number) => void;
};

export function EventCard({ event, favorite, onToggleFavorite }: EventCardProps) {
  const router = useRouter();
  const { theme } = useApp();

  return (
    <Pressable
      onPress={() => router.push(`/eventos/${event.id}` as any)}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.imageWrap}>
        <Image source={{ uri: event.image }} style={styles.image} resizeMode="cover" />
        <View style={[styles.category, { backgroundColor: theme.surface }]}>
          <Text style={[styles.categoryText, { color: theme.primary }]}>
            {event.category.toUpperCase()}
          </Text>
        </View>
        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            onToggleFavorite(event.id);
          }}
          hitSlop={10}
          style={[styles.heart, { backgroundColor: theme.surface }]}
        >
          <Ionicons
            name={favorite ? 'heart' : 'heart-outline'}
            size={21}
            color={favorite ? theme.secondary : theme.primary}
          />
        </Pressable>
      </View>

      <View style={styles.body}>
        <Text
          style={[styles.title, { color: theme.text }]}
          numberOfLines={2}
        >
          {event.title}
        </Text>

        <View style={styles.meta}>
          <Ionicons name="calendar-outline" size={14} color={theme.primary} />
          <Text style={[styles.metaText, { color: theme.textMuted }]}>
            {event.date} • {event.time}
          </Text>
        </View>

        <View style={styles.meta}>
          <Ionicons name="location-outline" size={14} color={theme.primary} />
          <Text
            style={[styles.metaText, { color: theme.textMuted }]}
            numberOfLines={1}
          >
            {event.place}, {event.city}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 260,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    marginRight: spacing.md,
  },
  pressed: {
    opacity: 0.88,
  },
  imageWrap: {
    height: 148,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  category: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  categoryText: {
    fontSize: typography.fontSize.xs - 1,
    fontWeight: typography.fontWeight.heavy,
    letterSpacing: 0.7,
  },
  heart: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    padding: 13,
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.fontSize.lg - 1,
    fontWeight: typography.fontWeight.heavy,
    minHeight: 38,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    flex: 1,
    fontSize: typography.fontSize.sm - 1,
  },
});
