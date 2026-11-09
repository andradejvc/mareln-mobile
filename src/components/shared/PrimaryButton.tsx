// Botão principal customizado
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';
import { radius, spacing, typography } from '@/theme';
import { useApp } from '@/contexts/AppContext';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'orange' | 'pink' | 'outline' | 'white';
  loading?: boolean;
  style?: ViewStyle;
};

export function PrimaryButton({
  title,
  onPress,
  variant = 'orange',
  loading = false,
  style,
}: PrimaryButtonProps) {
  const { theme } = useApp();

  const getBackgroundColor = () => {
    switch (variant) {
      case 'pink':
        return theme.secondary;
      case 'white':
      case 'outline':
        return theme.surface;
      default:
        return theme.primary;
    }
  };

  const getTextColor = () => {
    if (variant === 'white' || variant === 'outline') {
      return theme.primary;
    }
    return '#FFFFFF';
  };

  const background = getBackgroundColor();
  const textColor = getTextColor();

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: background,
          borderColor: variant === 'outline' ? theme.primary : background,
          borderWidth: variant === 'outline' ? 1.5 : 0,
          opacity: pressed ? 0.86 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  text: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.heavy,
  },
});
