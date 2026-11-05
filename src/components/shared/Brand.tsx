import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { images } from '@/data/images';
import { colors } from '@/theme/colors';

export function Brand({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <View style={styles.row}>
      <Image source={{ uri: images.logo }} style={[styles.logo, compact && styles.logoCompact]} resizeMode="contain" />
      <Text style={[styles.name, light && styles.light, compact && styles.nameCompact]}>Maré <Text style={styles.ln}>LN</Text></Text>
    </View>
  );
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'center', gap: 7 }, logo: { width: 46, height: 46 }, logoCompact: { width: 34, height: 34 }, name: { color: colors.white, fontSize: 23, fontWeight: '900', letterSpacing: -0.8 }, nameCompact: { fontSize: 19 }, light: { color: colors.orange }, ln: { color: colors.pink } });
