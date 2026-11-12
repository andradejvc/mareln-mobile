import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { CallToAction } from '@/components/home/CallToAction';
import { AppFooter } from '@/components/shared/AppFooter';
import { useApp } from '@/contexts/AppContext';

export default function HomePage() {
  const { theme } = useApp();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <HeroSection />
      <AboutSection />
      <CategoriesSection />
      <CallToAction />
      <AppFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});