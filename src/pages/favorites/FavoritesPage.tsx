import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { EventCard } from '@/components/events/EventCard';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { events } from '@/data/events';
import { useApp } from '@/contexts/AppContext';
import { colors } from '@/theme/colors';

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useApp(); const saved = events.filter((event) => favorites.includes(event.id));
  return <ScrollView style={styles.page} contentContainerStyle={styles.content}><Text style={styles.heading}>Meus favoritos</Text><Text style={styles.sub}>Guarde os eventos que você não quer perder.</Text><View style={styles.section}><SectionTitle title={`${saved.length} evento(s) salvo(s)`} />{saved.length ? <View style={styles.cards}>{saved.map((event) => <EventCard key={event.id} event={event} favorite onToggleFavorite={toggleFavorite} />)}</View> : <Text style={styles.empty}>Você ainda não salvou eventos. Toque no coração de um evento para adicioná-lo aqui.</Text>}</View></ScrollView>;
}
const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: colors.cream }, content: { padding: 20, paddingBottom: 35 }, heading: { color: colors.pink, fontWeight: '900', fontSize: 27 }, sub: { color: colors.muted, marginTop: 4, fontSize: 13 }, section: { marginTop: 25 }, cards: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 14 }, empty: { backgroundColor: colors.white, color: colors.muted, textAlign: 'center', padding: 25, borderRadius: 18, lineHeight: 21 } });
