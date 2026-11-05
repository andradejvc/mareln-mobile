import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { colors } from '@/theme/colors';

export function CallToAction() {
  const router = useRouter();
  return <View style={styles.wrap}><Text style={styles.title}>Pronto para viver o litoral?</Text><Text style={styles.text}>Crie sua conta gratuita e não perca nenhum evento perto de você.</Text><PrimaryButton title="Criar conta" variant="pink" onPress={() => router.push('/registro' as any)} style={styles.button} /></View>;
}
const styles = StyleSheet.create({ wrap: { paddingHorizontal: 24, paddingVertical: 50, alignItems: 'center', backgroundColor: colors.cream }, title: { textAlign: 'center', color: colors.orange, fontSize: 34, fontWeight: '900', lineHeight: 40 }, text: { marginTop: 12, color: colors.muted, textAlign: 'center', fontSize: 14, lineHeight: 21 }, button: { marginTop: 22, width: '100%' } });
