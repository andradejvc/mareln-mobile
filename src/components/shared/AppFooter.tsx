// Rodapé padrão da aplicação
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { spacing, typography } from '@/theme';
import { useApp } from '@/contexts/AppContext';

export function AppFooter() {
  const router = useRouter();
  const { theme } = useApp();

  return (
    <View style={[styles.wrap, { backgroundColor: theme.primary }]}>
      <Text style={styles.brand}>Maré LN</Text>
      <Text style={styles.description}>
        Conectando você aos melhores eventos e experiências do litoral norte.
      </Text>
      <View style={styles.links}>
        <Pressable onPress={() => router.push('/' as any)}>
          <Text style={styles.link}>Início</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/login' as any)}>
          <Text style={styles.link}>Eventos</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/registro' as any)}>
          <Text style={styles.link}>Criar conta</Text>
        </Pressable>
      </View>
      <Text style={styles.copy}>© 2026 Maré LN. Todos os direitos reservados.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing.xxl,
    paddingVertical: 30,
    alignItems: 'center',
  },
  brand: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: typography.fontWeight.heavy,
  },
  description: {
    color: '#FFE7DA',
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 20,
    maxWidth: 280,
  },
  links: {
    flexDirection: 'row',
    gap: 22,
    marginTop: 22,
  },
  link: {
    color: '#FFFFFF',
    fontWeight: typography.fontWeight.heavy,
  },
  copy: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.3)',
    width: '100%',
    paddingTop: 17,
    marginTop: 25,
    color: '#FFE7DA',
    textAlign: 'center',
    fontSize: typography.fontSize.xs,
  },
});
