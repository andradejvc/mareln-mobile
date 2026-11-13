import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { images } from '@/data/images';
import { useApp } from '@/contexts/AppContext';

export function AboutSection() {
  const { theme } = useApp();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.imageArea}>
        <View style={[styles.decoration, { backgroundColor: theme.primary }]} />

        <Image source={{ uri: images.hero }} style={styles.imageBack} />

        <Image
          source={{ uri: images.culture }}
          style={[styles.imageFront, { borderColor: theme.background }]}
        />
      </View>

      <View style={styles.textArea}>
        <Text style={[styles.eyebrow, { color: theme.primary }]}>
          SOBRE A PLATAFORMA
        </Text>

        <Text style={[styles.description, { color: theme.text }]}>
          O litoral norte tem muito para oferecer.{' '}
          <Text style={{ color: theme.primary }}>A Maré LN</Text>
          {' '}conecta você aos eventos, à cultura e às experiências da nossa região.
        </Text>

        <Text style={[styles.extra, { color: theme.textMuted }]}>
          Descubra novos lugares, participe de eventos e aproveite tudo o que
          nossa região tem a oferecer.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 23,
    paddingTop: 38,
    paddingBottom: 42,
  },
  imageArea: {
    height: 270,
    width: '100%',
    position: 'relative',
    marginBottom: 28,
  },
  imageBack: {
    position: 'absolute',
    width: '65%',
    height: 185,
    right: 0,
    top: 0,
    borderRadius: 18,
  },
  imageFront: {
    position: 'absolute',
    width: '70%',
    height: 190,
    left: 0,
    bottom: 0,
    borderRadius: 18,
    borderWidth: 5,
  },
  decoration: {
    position: 'absolute',
    width: 65,
    height: 8,
    top: 195,
    right: 4,
    borderRadius: 10,
    transform: [{ rotate: '-45deg' }],
    zIndex: 2,
  },
  textArea: {
    gap: 12,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.7,
  },
  description: {
    fontSize: 21,
    lineHeight: 30,
    fontWeight: '800',
  },
  extra: {
    fontSize: 14,
    lineHeight: 22,
  },
});