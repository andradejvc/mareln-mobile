// Seção de categorias em destaque
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { images } from '@/data/images';
import { radius, spacing, typography } from '@/theme';
import { useApp } from '@/contexts/AppContext';

const categoryItems = [
  { title: 'MUSICAL', image: images.musical, category: 'Música' },
  { title: 'CULTURA', image: images.culture, category: 'Cultura' },
  { title: 'ESPORTES', image: images.sports, category: 'Esporte' },
  { title: 'FEIRAS', image: images.fairs, category: 'Feira' },
];

export function CategoriesSection() {
  const router = useRouter();
  const { theme } = useApp();

  return (
    <View style={[styles.wrap, { backgroundColor: theme.primary }]}>
      <Text style={styles.title}>EVENTOS</Text>
      <Text style={styles.subtitle}>Encontre experiências que combinam com você</Text>

      {categoryItems.map((item, index) => (
        <Pressable
          key={item.title}
          onPress={() =>
            router.push({
              pathname: '/explorar',
              params: { categoria: item.category },
            } as any)
          }
          style={[styles.card, index % 2 === 1 && styles.reverse]}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.copy}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardText}>
              Shows incríveis e experiências que ficam na memória.
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing.xl,
    paddingVertical: 35,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
  },
  title: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: typography.fontWeight.heavy,
    letterSpacing: 1,
  },
  subtitle: {
    textAlign: 'center',
    color: '#FFE2D2',
    marginTop: 5,
    marginBottom: spacing.xxl,
    fontSize: typography.fontSize.sm + 1,
  },
  card: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.16)',
    marginBottom: spacing.md + 2,
    minHeight: 124,
  },
  reverse: {
    flexDirection: 'row-reverse',
  },
  image: {
    width: '48%',
    minHeight: 124,
  },
  copy: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontWeight: typography.fontWeight.heavy,
    fontSize: typography.fontSize.xl - 2,
  },
  cardText: {
    textAlign: 'center',
    color: '#FFF4EC',
    marginTop: 6,
    fontSize: typography.fontSize.xs + 1,
    lineHeight: 16,
  },
});
