import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { images } from '@/data/images';
import { useApp } from '@/contexts/AppContext';

const categoryItems = [
  {
    title: 'MÚSICA',
    description: 'Shows, apresentações e festivais.',
    image: images.musical,
    category: 'Música',
  },
  {
    title: 'CULTURA',
    description: 'Arte, exposições e experiências culturais.',
    image: images.culture,
    category: 'Cultura',
  },
  {
    title: 'ESPORTES',
    description: 'Atividades esportivas e competições.',
    image: images.sports,
    category: 'Esporte',
  },
  {
    title: 'FEIRAS',
    description: 'Feiras, gastronomia e artesanato.',
    image: images.fairs,
    category: 'Feira',
  },
];

export function CategoriesSection() {
  const router = useRouter();
  const { theme } = useApp();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.heading}>
        <Text style={[styles.eyebrow, { color: theme.primary }]}>
          EXPLORE
        </Text>
        <Text style={[styles.title, { color: theme.text }]}>
          O que você procura?
        </Text>
        <Text style={[styles.subtitle, { color: theme.textMuted }]}>
          Descubra experiências pelo litoral.
        </Text>
      </View>

      <View style={styles.cards}>
        {categoryItems.map((item) => (
          <Pressable
            key={item.title}
            onPress={() =>
              router.push({
                pathname: '/explorar',
                params: { categoria: item.category },
              } as any)
            }
            style={({ pressed }) => [
              styles.card,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
              pressed && styles.pressed,
            ]}
          >
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>
                {item.title}
              </Text>
              <Text style={[styles.cardDescription, { color: theme.textMuted }]}>
                {item.description}
              </Text>
              <Text style={[styles.link, { color: theme.primary }]}>
                Explorar →
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 40,
  },
  heading: {
    marginBottom: 23,
    gap: 6,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.7,
  },
  title: {
    fontSize: 25,
    fontWeight: '900',
    letterSpacing: -0.7,
  },
  subtitle: {
    fontSize: 13,
  },
  cards: {
    gap: 13,
  },
  card: {
    flexDirection: 'row',
    minHeight: 120,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
  },
  image: {
    width: '42%',
    minHeight: 120,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 5,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  cardDescription: {
    fontSize: 11,
    lineHeight: 16,
  },
  link: {
    fontSize: 11,
    fontWeight: '800',
    marginTop: 4,
  },
  pressed: {
    opacity: 0.8,
  },
});