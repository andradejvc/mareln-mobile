import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { PrimaryButton } from '@/components/shared/PrimaryButton';

export function CallToAction() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Pronto para viver o litoral?
      </Text>

      <Text style={styles.description}>
        Crie sua conta gratuita e descubra eventos
        e experiências incríveis perto de você.
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
    paddingVertical: 45,
    alignItems: 'center',
  },

  title: {
    color: '#EF5B18',
    fontSize: 23,
    fontWeight: '900',
    textAlign: 'center',
  },

  description: {
    color: '#777777',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 14,
    maxWidth: 290,
  },

  button: {
    marginTop: 22,
    width: 190,
    borderRadius: 30,
  },
});