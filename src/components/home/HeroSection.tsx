// Seção principal de boas-vindas (Hero)
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Brand } from '@/components/shared/Brand';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { images } from '@/data/images';
import { spacing, typography } from '@/theme';
import { useApp } from '@/contexts/AppContext';

export function HeroSection() {
  const router = useRouter();
  const { theme } = useApp();

  return (
    <ImageBackground source={{ uri: images.hero }} style={styles.hero} imageStyle={styles.photo}>
      <View style={styles.overlay} />
      <View style={styles.top}>
        <Brand />
      </View>
      <View style={styles.copy}>
        <Text style={[styles.title, { color: theme.primary }]}>Maré LN</Text>
        <Text style={styles.subtitle}>Levando você a descobrir o litoral</Text>
        <PrimaryButton
          title="Explorar agora"
          onPress={() => router.push('/login' as any)}
          style={styles.button}
        />
      </View>
      <View style={[styles.wave, { backgroundColor: theme.secondary }]}>
        <Text style={styles.waveText}>VIVA O LITORAL • DESCUBRA NOVAS EXPERIÊNCIAS</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  hero: {
    minHeight: 500,
    justifyContent: 'space-between',
    backgroundColor: '#F1C7A8',
  },
  photo: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255,248,241,0.22)',
  },
  top: {
    paddingHorizontal: 22,
    paddingTop: spacing.lg,
  },
  copy: {
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingBottom: 80,
  },
  title: {
    fontSize: 60,
    fontWeight: typography.fontWeight.heavy,
    letterSpacing: -2,
  },
  subtitle: {
    marginTop: 3,
    color: '#292524',
    fontSize: 17,
    textAlign: 'center',
  },
  button: {
    marginTop: 26,
    minWidth: 210,
    borderRadius: 30,
  },
  wave: {
    padding: spacing.lg - 1,
    transform: [{ skewY: '-2deg' }],
  },
  waveText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: typography.fontWeight.heavy,
    fontSize: typography.fontSize.xs,
    letterSpacing: 1.5,
  },
});
