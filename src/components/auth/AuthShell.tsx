// Estrutura padrão para telas de autenticação
import React from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Brand } from '@/components/shared/Brand';
import { images } from '@/data/images';
import { radius, spacing, typography } from '@/theme';
import { useApp } from '@/contexts/AppContext';

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  const { theme } = useApp();

  return (
    <ImageBackground source={{ uri: images.hero }} style={styles.bg}>
      <View style={styles.tint} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.brand}>
            <Brand />
          </View>

          <View style={[styles.card, { backgroundColor: theme.background }]}>
            <Text style={[styles.title, { color: theme.primary }]}>{title}</Text>
            <Text style={[styles.subtitle, { color: theme.textMuted }]}>{subtitle}</Text>
            {children}
          </View>

          <Text style={styles.footer}>Descubra. Conecte-se. Viva o litoral.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#DCC0A6',
  },
  tint: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(232,89,12,0.18)',
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: 25,
  },
  brand: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  card: {
    borderRadius: radius.xl,
    padding: spacing.xxl,
    gap: spacing.lg,
    shadowColor: '#71320F',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 6,
  },
  title: {
    textAlign: 'center',
    fontSize: 29,
    fontWeight: typography.fontWeight.heavy,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: typography.fontSize.md - 1,
    marginTop: -10,
    marginBottom: 2,
  },
  footer: {
    textAlign: 'center',
    marginTop: 18,
    color: '#FFFFFF',
    fontWeight: typography.fontWeight.heavy,
    fontSize: typography.fontSize.sm,
  },
});
