import React from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Brand } from '@/components/shared/Brand';
import { images } from '@/data/images';
import { colors, radius } from '@/theme/colors';

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return <ImageBackground source={{ uri: images.hero }} style={styles.bg}><View style={styles.tint} /><KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}><ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled"><View style={styles.brand}><Brand /></View><View style={styles.card}><Text style={styles.title}>{title}</Text><Text style={styles.subtitle}>{subtitle}</Text>{children}</View><Text style={styles.footer}>Descubra. Conecte-se. Viva o litoral.</Text></ScrollView></KeyboardAvoidingView></ImageBackground>;
}
const styles = StyleSheet.create({ bg: { flex: 1, backgroundColor: '#DCC0A6' }, tint: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(232,89,12,0.18)' }, flex: { flex: 1 }, scroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 25 }, brand: { alignItems: 'center', marginBottom: 20 }, card: { backgroundColor: colors.cream, borderRadius: radius.xl, padding: 24, gap: 16, shadowColor: '#71320F', shadowOpacity: 0.18, shadowRadius: 18, elevation: 6 }, title: { textAlign: 'center', color: colors.orange, fontSize: 29, fontWeight: '900' }, subtitle: { textAlign: 'center', color: colors.muted, fontSize: 13, marginTop: -10, marginBottom: 2 }, footer: { textAlign: 'center', marginTop: 18, color: colors.white, fontWeight: '800', fontSize: 12 } });
