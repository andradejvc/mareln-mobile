import React from 'react';
import { ScrollView } from 'react-native';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { CallToAction } from '@/components/home/CallToAction';
import { AppFooter } from '@/components/shared/AppFooter';

export default function HomePage() {
  return <ScrollView style={{ flex: 1, backgroundColor: '#FFF8F1' }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}><HeroSection /><AboutSection /><CategoriesSection /><CallToAction /><AppFooter /></ScrollView>;
}
