
import React, { useState } from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';
import { images } from '@/data/images';

export function HeroSection() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (route: string) => {
    setMenuOpen(false);
    router.push(route as any);
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>

          <Pressable onPress={() => navigate('/')}>
            <Text style={styles.logo}>
              Maré <Text style={styles.logoLN}>LN</Text>
            </Text>

            <Text style={styles.logoSubtitle}>
              EVENTOS DO LITORAL NORTE
            </Text>
          </Pressable>

          <Pressable
            style={styles.menuButton}
            onPress={() => setMenuOpen(!menuOpen)}
            accessibilityRole="button"
            accessibilityLabel="Abrir menu"
          >
            <Text style={styles.menuIcon}>
              {menuOpen ? '✕' : '☰'}
            </Text>
          </Pressable>
        </View>

        {/* MENU */}
        {menuOpen && (
          <View style={styles.menu}>
            <Pressable
              style={styles.menuItem}
              onPress={() => navigate('/')}
            >
              <Text style={styles.menuText}>Início</Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => navigate('/explorar')}
            >
              <Text style={styles.menuText}>Eventos</Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => navigate('/login')}
            >
              <Text style={styles.menuText}>Entrar</Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => navigate('/registro')}
            >
              <Text style={styles.menuText}>Cadastrar</Text>
            </Pressable>
          </View>
        )}
      </View>

      {/* IMAGEM PRINCIPAL */}
      <ImageBackground
        source={{ uri: images.hero }}
        style={styles.hero}
        imageStyle={styles.photo}
      >
        {/* OVERLAY CORRIGIDO */}
        <View style={styles.overlay} />

        <View style={styles.heroContent}>
          <Text style={styles.title}>Maré LN</Text>

          <Text style={styles.subtitle}>
            Levando você a descobrir o litoral
          </Text>

          <Text style={styles.description}>
            DESCUBRA EVENTOS E VIVA NOVAS EXPERIÊNCIAS
          </Text>
        </View>
      </ImageBackground>

      {/* ÁREA DE ACESSO */}
      <View style={styles.accessSection}>
        <Pressable
          style={styles.accessButton}
          onPress={() => navigate('/login')}
        >
          <Text style={styles.accessText}>Acessar</Text>
        </Pressable>

        <View style={styles.accessLine} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
  },

  // HEADER
  headerWrapper: {
    backgroundColor: '#EF5B18',
    position: 'relative',
    zIndex: 10,
    elevation: 5,
  },

  header: {
    height: 62,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '900',
    letterSpacing: -0.7,
  },

  logoLN: {
    color: '#FFD5B8',
  },

  logoSubtitle: {
    color: '#FFFFFF',
    fontSize: 7,
    fontWeight: '700',
    letterSpacing: 1.1,
    marginTop: -2,
  },

  menuButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuIcon: {
    fontSize: 25,
    color: '#FFFFFF',
    fontWeight: '700',
  },

  menu: {
    position: 'absolute',
    top: 57,
    right: 14,
    width: 175,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 8,
    elevation: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    zIndex: 20,
  },

  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 17,
  },

  menuText: {
    color: '#444444',
    fontSize: 14,
    fontWeight: '600',
  },

  // HERO
  hero: {
    height: 330,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1C7A8',
  },

  photo: {
    resizeMode: 'cover',
  },

  // POSICIONAMENTO EXPLÍCITO: SEM absoluteFillObject
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(255, 244, 230, 0.18)',
  },

  heroContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
  },

  title: {
    color: '#EF5B18',
    fontSize: 49,
    fontWeight: '900',
    letterSpacing: -1.5,
    textAlign: 'center',
  },

  subtitle: {
    color: '#292524',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 3,
  },

  description: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.2,
    textAlign: 'center',
    marginTop: 13,
  },

  // ACESSO
  accessSection: {
    minHeight: 125,
    backgroundColor: '#EC4165',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 22,
  },

  accessButton: {
    minWidth: 175,
    height: 43,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  accessText: {
    color: '#EC4165',
    fontSize: 15,
    fontWeight: '900',
  },

  accessLine: {
    width: 85,
    height: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 12,
  },
});
