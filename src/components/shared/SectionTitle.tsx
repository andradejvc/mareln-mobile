// Título e subtítulo de seção
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { spacing, typography } from '@/theme';
import { useApp } from '@/contexts/AppContext';

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
};

export function SectionTitle({ title, subtitle, action }: SectionTitleProps) {
  const { theme } = useApp();

  return (
    <View style={styles.row}>
      <View style={styles.copy}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.subtitle, { color: theme.textMuted }]}>{subtitle}</Text>
        ) : null}
      </View>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  copy: {
    flex: 1,
    gap: 3,
  },
  title: {
    fontSize: 21,
    fontWeight: typography.fontWeight.heavy,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
  },
});
