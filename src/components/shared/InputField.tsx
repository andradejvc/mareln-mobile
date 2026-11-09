// Campo de texto de formulário
import React from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { colors, radius, spacing, typography } from '@/theme';
import { useApp } from '@/contexts/AppContext';

type InputFieldProps = TextInputProps & {
  label: string;
};

export function InputField({ label, ...props }: InputFieldProps) {
  const { theme } = useApp();

  return (
    <View style={styles.wrap}>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      <TextInput
        {...props}
        placeholderTextColor={theme.textMuted}
        style={[
          styles.input,
          {
            backgroundColor: theme.inputBg,
            borderColor: theme.border,
            color: theme.text,
          },
          props.style,
        ]}
        autoCapitalize={props.autoCapitalize ?? 'none'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
  },
  label: {
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.md,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    fontSize: typography.fontSize.lg,
  },
});
