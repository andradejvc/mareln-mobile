import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';
import { colors, radius } from '@/theme/colors';

export function PrimaryButton({ title, onPress, variant = 'orange', loading = false, style }: { title: string; onPress: () => void; variant?: 'orange' | 'pink' | 'outline' | 'white'; loading?: boolean; style?: ViewStyle }) {
  const background = variant === 'pink' ? colors.pink : variant === 'white' || variant === 'outline' ? colors.white : colors.orange;
  const foreground = variant === 'white' || variant === 'outline' ? colors.orange : colors.white;
  return (
    <Pressable onPress={onPress} disabled={loading} style={({ pressed }) => [styles.button, { backgroundColor: background, borderColor: variant === 'outline' ? colors.orange : background, borderWidth: variant === 'outline' ? 1.5 : 0, opacity: pressed ? 0.86 : 1 }, style]}>
      {loading ? <ActivityIndicator color={foreground} /> : <Text style={[styles.text, { color: foreground }]}>{title}</Text>}
    </Pressable>
  );
}
const styles = StyleSheet.create({ button: { minHeight: 50, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 13 }, text: { fontSize: 16, fontWeight: '800' } });
