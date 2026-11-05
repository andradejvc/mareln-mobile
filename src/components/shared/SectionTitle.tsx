import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';

export function SectionTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return <View style={styles.row}><View style={styles.copy}><Text style={styles.title}>{title}</Text>{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}</View>{action}</View>;
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, gap: 10 }, copy: { flex: 1, gap: 3 }, title: { fontSize: 21, color: colors.ink, fontWeight: '900' }, subtitle: { fontSize: 12, color: colors.muted } });
