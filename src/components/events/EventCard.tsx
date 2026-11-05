import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import type { EventItem } from '@/types/event';
import { colors, radius } from '@/theme/colors';

export function EventCard({ event, favorite, onToggleFavorite }: { event: EventItem; favorite: boolean; onToggleFavorite: (id: number) => void }) {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push(`/eventos/${event.id}` as any)} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: event.image }} style={styles.image} resizeMode="cover" />
        <View style={styles.category}><Text style={styles.categoryText}>{event.category.toUpperCase()}</Text></View>
        <Pressable onPress={(e) => { e.stopPropagation(); onToggleFavorite(event.id); }} hitSlop={10} style={styles.heart}>
          <Ionicons name={favorite ? 'heart' : 'heart-outline'} size={21} color={favorite ? colors.pink : colors.orange} />
        </Pressable>
      </View>
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>{event.title}</Text>
        <View style={styles.meta}><Ionicons name="calendar-outline" size={14} color={colors.orange} /><Text style={styles.metaText}>{event.date} • {event.time}</Text></View>
        <View style={styles.meta}><Ionicons name="location-outline" size={14} color={colors.orange} /><Text style={styles.metaText} numberOfLines={1}>{event.place}, {event.city}</Text></View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({ card: { width: 260, borderRadius: radius.lg, overflow: 'hidden', backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, marginRight: 12 }, pressed: { opacity: 0.88 }, imageWrap: { height: 148, position: 'relative' }, image: { width: '100%', height: '100%' }, category: { position: 'absolute', left: 10, bottom: 10, backgroundColor: colors.white, borderRadius: 30, paddingHorizontal: 10, paddingVertical: 5 }, categoryText: { color: colors.orange, fontSize: 9, fontWeight: '900', letterSpacing: 0.7 }, heart: { position: 'absolute', top: 9, right: 9, width: 36, height: 36, borderRadius: 18, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' }, body: { padding: 13, gap: 7 }, title: { fontSize: 15, color: colors.ink, fontWeight: '900', minHeight: 38 }, meta: { flexDirection: 'row', alignItems: 'center', gap: 6 }, metaText: { flex: 1, color: colors.muted, fontSize: 11 } });
