
import React from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { images } from '@/data/images';
import { useApp } from '@/contexts/AppContext';

export function HeroSection() {
  const router = useRouter();
  const { theme, toggleTheme, isDark } = useApp();

  const navigate = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.card,
            borderBottomColor: theme.border,
          },
        ]}
      >
        <Pressable onPress={() => navigate('/')}>
          <Text style={[styles.logo, { color: theme.text }]}>
            Maré <Text style={{ color: theme.primary }}>LN</Text>
          </Text>
          <Text style={[styles.logoSubtitle, { color: theme.textMuted }]}>
            EVENTOS DO LITORAL NORTE
          </Text>
        </Pressable>

        <Pressable
          onPress={toggleTheme}
          style={[
            styles.headerIconButton,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
          accessibilityLabel="Alternar modo escuro"
        >
          <Ionicons
            name={isDark ? 'moon' : 'sunny-outline'}
            size={22}
            color={theme.primary}
          />
        </Pressable>
      </View>

      <ImageBackground
        source={{ uri: images.hero }}
        style={styles.hero}
        imageStyle={styles.photo}
      >
        <View
          style={[
            styles.overlay,
            {
              backgroundColor: isDark
                ? 'rgba(10, 20, 18, 0.62)'
                : 'rgba(10, 20, 18, 0.30)',
            },
          ]}
        />

        <View style={styles.heroContent}>
          <View style={styles.tag}>
            <View style={styles.tagDot} />
            <Text style={styles.tagText}>LITORAL NORTE DE SÃO PAULO</Text>
          </View>

          <Text style={styles.title}>
            Descubra o que acontece{'\n'}
            <Text style={styles.titleHighlight}>na nossa região.</Text>
          </Text>

          <Text style={styles.description}>
            Eventos, cultura e experiências esperando por você.
          </Text>
        </View>
      </ImageBackground>

      <View style={[styles.accessSection, { backgroundColor: theme.primary }]}>
        <Pressable
          style={[styles.accessButton, { backgroundColor: theme.surface }]}
          onPress={() => navigate('/login')}
        >
          <Text style={[styles.accessText, { color: theme.primary }]}>
            Acessar
          </Text>
        </Pressable>

        <View style={[styles.accessLine, { backgroundColor: theme.surface }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    minHeight: 76,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    zIndex: 10,
    elevation: 4,
  },
  logo: {
    fontSize: 25,
    fontWeight: '900',
    letterSpacing: -1,
  },
  logoSubtitle: {
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginTop: 1,
  },
  headerIconButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    minHeight: 440,
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#263D38',
  },
  photo: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 20, 18, 0.62)',
  },
  heroContent: {
    paddingHorizontal: 25,
    paddingVertical: 65,
    alignItems: 'flex-start',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 23,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  tagDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#FF9A55',
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 37,
    lineHeight: 44,
    fontWeight: '900',
    letterSpacing: -1.2,
  },
  titleHighlight: {
    color: '#FFAD72',
  },
  description: {
    color: '#F1F1F1',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 15,
    maxWidth: 300,
  },
  accessSection: {
    height: 145,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  accessButton: {
    width: 156,
    height: 42,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accessText: {
    fontFamily: 'serif',
    fontSize: 21,
    fontWeight: '900',
  },
  accessLine: {
    width: 102,
    height: 2,
    borderRadius: 2,
  },
});
