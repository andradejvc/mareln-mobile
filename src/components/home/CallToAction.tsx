import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { useApp } from '@/contexts/AppContext';

export function CallToAction() {
  const router = useRouter();
  const { theme } = useApp();

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      <View style={[styles.decoration, { backgroundColor: theme.primary }]} />

      <Text style={[styles.eyebrow, { color: theme.primary }]}>
        FAÇA PARTE
      </Text>

      <Text style={[styles.title, { color: theme.text }]}>
        Pronto para viver o litoral?
      </Text>

      <Text style={[styles.description, { color: theme.textMuted }]}>
        Crie sua conta gratuita e descubra eventos e experiências incríveis
        perto de você.
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
  container: {
    paddingHorizontal: 25,
    paddingVertical: 42,
    alignItems: 'center',
  },
  decoration: {
    width: 42,
    height: 5,
    borderRadius: 5,
    marginBottom: 20,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.8,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '900',
    textAlign: 'center',
    maxWidth: 300,
  },
  description: {
    fontSize: 13,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 13,
    maxWidth: 300,
  },
  button: {
    marginTop: 24,
    width: 200,
    borderRadius: 14,
  },
});