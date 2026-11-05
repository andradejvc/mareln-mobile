import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { images } from '@/data/images';
import { colors, radius } from '@/theme/colors';

const categories = [
  { title: 'MUSICAL', image: images.musical, category: 'Música' },
  { title: 'CULTURA', image: images.culture, category: 'Cultura' },
  { title: 'ESPORTES', image: images.sports, category: 'Esporte' },
  { title: 'FEIRAS', image: images.fairs, category: 'Feira' },
];
export function CategoriesSection() {
  const router = useRouter();
  return <View style={styles.wrap}><Text style={styles.title}>EVENTOS</Text><Text style={styles.subtitle}>Encontre experiências que combinam com você</Text>{categories.map((item, index) => <Pressable key={item.title} onPress={() => router.push({ pathname: '/explorar', params: { categoria: item.category } } as any)} style={[styles.card, index % 2 === 1 && styles.reverse]}><Image source={{ uri: item.image }} style={styles.image} /><View style={styles.copy}><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.cardText}>Shows incríveis e experiências que ficam na memória.</Text></View></Pressable>)}</View>;
}
const styles = StyleSheet.create({ wrap: { paddingHorizontal: 20, paddingVertical: 35, backgroundColor: colors.orange, borderTopLeftRadius: 34, borderTopRightRadius: 34 }, title: { textAlign: 'center', color: colors.white, fontSize: 32, fontWeight: '900', letterSpacing: 1 }, subtitle: { textAlign: 'center', color: '#FFE2D2', marginTop: 5, marginBottom: 22, fontSize: 13 }, card: { flexDirection: 'row', overflow: 'hidden', borderRadius: radius.md, backgroundColor: 'rgba(255,255,255,0.16)', marginBottom: 14, minHeight: 124 }, reverse: { flexDirection: 'row-reverse' }, image: { width: '48%', minHeight: 124 }, copy: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 12 }, cardTitle: { color: colors.white, fontWeight: '900', fontSize: 18 }, cardText: { textAlign: 'center', color: '#FFF4EC', marginTop: 6, fontSize: 11, lineHeight: 16 } });
