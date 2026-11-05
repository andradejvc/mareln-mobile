import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Brand } from '@/components/shared/Brand';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { images } from '@/data/images';
import { colors } from '@/theme/colors';

export function HeroSection() {
  const router = useRouter();
  return <ImageBackground source={{ uri: images.hero }} style={styles.hero} imageStyle={styles.photo}>
    <View style={styles.overlay} />
    <View style={styles.top}><Brand /></View>
    <View style={styles.copy}><Text style={styles.title}>Maré LN</Text><Text style={styles.subtitle}>Levando você a descobrir o litoral</Text><PrimaryButton title="Explorar agora" onPress={() => router.push('/login' as any)} style={styles.button} /></View>
    <View style={styles.wave}><Text style={styles.waveText}>VIVA O LITORAL • DESCUBRA NOVAS EXPERIÊNCIAS</Text></View>
  </ImageBackground>;
}
const styles = StyleSheet.create({ hero: { minHeight: 500, justifyContent: 'space-between', backgroundColor: '#F1C7A8' }, photo: { resizeMode: 'cover' }, overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,248,241,0.22)' }, top: { paddingHorizontal: 22, paddingTop: 16 }, copy: { alignItems: 'center', paddingHorizontal: 22, paddingBottom: 80 }, title: { color: colors.orange, fontSize: 60, fontWeight: '900', letterSpacing: -2 }, subtitle: { marginTop: 3, color: colors.ink, fontSize: 17, textAlign: 'center' }, button: { marginTop: 26, minWidth: 210, borderRadius: 30, backgroundColor: colors.pink }, wave: { backgroundColor: colors.pink, padding: 15, transform: [{ skewY: '-2deg' }] }, waveText: { color: colors.white, textAlign: 'center', fontWeight: '900', fontSize: 10, letterSpacing: 1.5 } });
