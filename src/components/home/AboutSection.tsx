import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { images } from '@/data/images';

export function AboutSection() {
  return (
    <View style={styles.container}>
      <View style={styles.imageArea}>
        <View style={styles.decorationTop} />

        <Image
          source={{ uri: images.hero }}
          style={styles.imageBack}
        />

        <Image
          source={{ uri: images.culture }}
          style={styles.imageFront}
        />

        <View style={styles.decorationBottom} />
      </View>

      <View style={styles.textArea}>
        <Text style={styles.description}>
          <Text style={styles.highlight}>MARÉ LN</Text>
          {' '}é a sua plataforma para descobrir e aproveitar
          eventos, cultura, lazer e experiências incríveis
          no litoral norte de São Paulo.
        </Text>

        <Text style={styles.extra}>
          Descubra novos lugares, participe de eventos e
          aproveite tudo o que nossa região tem a oferecer!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 22,
    paddingTop: 35,
    paddingBottom: 40,
  },

  imageArea: {
    height: 290,
    width: '100%',
    position: 'relative',
    marginBottom: 20,
  },

  imageBack: {
    position: 'absolute',
    width: '59%',
    height: 190,
    right: 0,
    top: 0,
    borderRadius: 10,
    resizeMode: 'cover',
  },

  imageFront: {
    position: 'absolute',
    width: '67%',
    height: 205,
    left: 0,
    bottom: 5,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: '#FFFFFF',
    resizeMode: 'cover',
  },

  decorationTop: {
    position: 'absolute',
    width: 65,
    height: 12,
    backgroundColor: '#EF5B18',
    top: 65,
    left: 20,
    transform: [{ rotate: '-35deg' }],
    zIndex: 2,
  },

  decorationBottom: {
    position: 'absolute',
    width: 45,
    height: 12,
    backgroundColor: '#EF5B18',
    bottom: 30,
    right: 10,
    transform: [{ rotate: '-35deg' }],
  },

  textArea: {
    paddingHorizontal: 2,
  },

  description: {
    color: '#292524',
    fontSize: 17,
    lineHeight: 25,
    fontWeight: '800',
    textTransform: 'uppercase',
  },

  highlight: {
    color: '#EF5B18',
  },

  extra: {
    color: '#777777',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 12,
  },
});