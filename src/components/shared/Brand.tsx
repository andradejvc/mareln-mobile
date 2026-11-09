// Logotipo e nome da marca Maré LN
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { images } from '@/data/images';
import { spacing, typography } from '@/theme';
import { useApp } from '@/contexts/AppContext';

type BrandProps = {
  light?: boolean;
  compact?: boolean;
};

export function Brand({ light = false, compact = false }: BrandProps) {
  const { theme } = useApp();

  return (
    <View style={styles.row}>
      <Image
        source={{ uri: images.logo }}
        style={[styles.logo, compact && styles.logoCompact]}
        resizeMode="contain"
      />
      <Text
        style={[
          styles.name,
          light ? { color: theme.primary } : styles.nameWhite,
          compact && styles.nameCompact,
        ]}
      >
        Maré <Text style={{ color: theme.secondary }}>LN</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logo: {
    width: 46,
    height: 46,
  },
  logoCompact: {
    width: 34,
    height: 34,
  },
  name: {
    fontSize: 23,
    fontWeight: typography.fontWeight.heavy,
    letterSpacing: -0.8,
  },
  nameWhite: {
    color: '#FFFFFF',
  },
  nameCompact: {
    fontSize: 19,
  },
});
