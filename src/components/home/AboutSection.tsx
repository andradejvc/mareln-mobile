// Seção sobre a proposta do projeto
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { images } from '@/data/images';
import { radius, spacing, typography } from '@/theme';
import { useApp } from '@/contexts/AppContext';

export function AboutSection() {
  const { theme } = useApp();

  return (
    <View style={[styles.wrap, { backgroundColor: theme.background }]}>
      <View style={styles.photoRow}>
        <Image source={{ uri: images.aboutOne }} style={styles.photoA} />
        <Image source={{ uri: images.aboutTwo }} style={styles.photoB} />
      </View>
      <Text style={[styles.kicker, { color: theme.primary }]}>SOBRE NÓS</Text>
      <Text style={[styles.title, { color: theme.text }]}>Sua jornada começa aqui</Text>
      <Text style={[styles.text, { color: theme.textMuted }]}>
        A Maré LN nasceu para transformar eventos em memórias. Descubra shows, cultura, esportes e
        feiras que conectam você ao melhor do litoral norte de São Paulo.
      </Text>
      <Text style={[styles.signature, { color: theme.secondary }]}>Viaje. Descubra. Viva.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 22,
    paddingVertical: 38,
  },
  photoRow: {
    height: 210,
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  photoA: {
    width: '48%',
    height: 190,
    borderRadius: radius.lg,
    marginTop: spacing.xl,
  },
  photoB: {
    width: '48%',
    height: 190,
    borderRadius: radius.lg,
  },
  kicker: {
    fontWeight: typography.fontWeight.heavy,
    letterSpacing: 2,
    fontSize: typography.fontSize.sm,
  },
  title: {
    marginTop: 6,
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.heavy,
  },
  text: {
    marginTop: spacing.sm,
    lineHeight: 24,
    fontSize: typography.fontSize.lg - 1,
  },
  signature: {
    marginTop: spacing.lg,
    fontSize: 19,
    fontWeight: typography.fontWeight.heavy,
    fontStyle: 'italic',
  },
});
