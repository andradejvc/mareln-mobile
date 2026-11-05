import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { images } from '@/data/images';
import { colors, radius } from '@/theme/colors';

export function AboutSection() {
  return <View style={styles.wrap}><View style={styles.photoRow}><Image source={{ uri: images.aboutOne }} style={styles.photoA} /><Image source={{ uri: images.aboutTwo }} style={styles.photoB} /></View><Text style={styles.kicker}>SOBRE NÓS</Text><Text style={styles.title}>Sua jornada começa aqui</Text><Text style={styles.text}>A Maré LN nasceu para transformar eventos em memórias. Descubra shows, cultura, esportes e feiras que conectam você ao melhor do litoral norte de São Paulo.</Text><Text style={styles.signature}>Viaje. Descubra. Viva.</Text></View>;
}
const styles = StyleSheet.create({ wrap: { paddingHorizontal: 22, paddingVertical: 38, backgroundColor: colors.cream }, photoRow: { height: 210, flexDirection: 'row', gap: 12, marginBottom: 25 }, photoA: { width: '48%', height: 190, borderRadius: radius.lg, marginTop: 20 }, photoB: { width: '48%', height: 190, borderRadius: radius.lg }, kicker: { color: colors.orange, fontWeight: '900', letterSpacing: 2, fontSize: 12 }, title: { marginTop: 6, fontSize: 28, color: colors.ink, fontWeight: '900' }, text: { marginTop: 10, color: colors.muted, lineHeight: 24, fontSize: 15 }, signature: { marginTop: 18, color: colors.pink, fontSize: 19, fontWeight: '900', fontStyle: 'italic' } });
