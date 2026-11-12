import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export function AppFooter() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>Maré LN</Text>

      <Text style={styles.description}>
        Conectando você aos melhores eventos e experiências
        do litoral norte de São Paulo.
      </Text>

      <View style={styles.links}>
        <Pressable onPress={() => router.push('/' as any)}>
          <Text style={styles.link}>Início</Text>
        </Pressable>

        <Pressable onPress={() => router.push('/explorar' as any)}>
          <Text style={styles.link}>Eventos</Text>
        </Pressable>

        <Pressable onPress={() => router.push('/registro' as any)}>
          <Text style={styles.link}>Cadastro</Text>
        </Pressable>
      </View>

      <View style={styles.divider} />

      <Text style={styles.copy}>
        © 2026 Maré LN. Todos os direitos reservados.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EF5B18',
    paddingHorizontal: 24,
    paddingTop: 35,
    paddingBottom: 28,
    alignItems: 'center',
  },

  brand: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
  },

  description: {
    color: '#FFE5D5',
    fontSize: 12,
    lineHeight: 19,
    textAlign: 'center',
    maxWidth: 280,
    marginTop: 10,
  },

  links: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 25,
    marginTop: 25,
  },

  link: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginTop: 25,
    marginBottom: 17,
  },

  copy: {
    color: '#FFE5D5',
    fontSize: 10,
    textAlign: 'center',
  },
});