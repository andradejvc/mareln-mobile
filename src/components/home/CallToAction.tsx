// Chamada para ação de cadastro
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { spacing, typography } from '@/theme';
import { useApp } from '@/contexts/AppContext';

export function CallToAction() {
  const router = useRouter();
  const { theme } = useApp();

  return (
    <View style={[styles.wrap, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Pronto para viver o litoral?</Text>
      <Text style={[styles.text, { color: theme.textMuted }]}>
        Crie sua conta gratuita e não perca nenhum evento perto de você.
      </Text>
      <PrimaryButton
        title="Criar conta"
        variant="pink"
        onPress={() => router.push('/registro' as any)}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing.xxl,
    paddingVertical: 50,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: typography.fontSize.display,
    fontWeight: typography.fontWeight.heavy,
    lineHeight: 40,
  },
  text: {
    marginTop: spacing.md,
    textAlign: 'center',
    fontSize: typography.fontSize.md,
    lineHeight: 21,
  },
  button: {
    marginTop: spacing.xxl - 2,
    width: '100%',
  },
});
