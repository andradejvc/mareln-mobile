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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EVENTOS</Text>

      <Text style={styles.subtitle}>
        Descubra experiências pelo litoral
      </Text>

      <View style={styles.cards}>
        {categoryItems.map((item, index) => (
          <Pressable
            key={item.title}
            onPress={() =>
              router.push({
                pathname: '/explorar',
                params: { categoria: item.category },
              } as any)
            }
            style={[
              styles.card,
              index % 2 !== 0 && styles.reverse,
            ]}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>
                {item.title}
              </Text>

              <Text style={styles.cardDescription}>
                {item.description}
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
    backgroundColor: '#EF5B18',
    paddingHorizontal: 18,
    paddingTop: 28,
    paddingBottom: 35,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 1,
  },

  subtitle: {
    color: '#FFE5D5',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 23,
  },

  cards: {
    gap: 13,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#C9784C',
    borderRadius: 12,
    overflow: 'hidden',
    minHeight: 112,
  },

  reverse: {
    flexDirection: 'row-reverse',
  },

  image: {
    width: '48%',
    height: 112,
    resizeMode: 'cover',
  },

  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
  },

  cardDescription: {
    color: '#FFF1E8',
    fontSize: 10,
    lineHeight: 15,
    textAlign: 'center',
    marginTop: 6,
  },
});