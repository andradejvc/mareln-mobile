import React from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { colors, radius } from '@/theme/colors';

export function InputField({ label, ...props }: TextInputProps & { label: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...props} placeholderTextColor="#A8A29E" style={[styles.input, props.style]} autoCapitalize={props.autoCapitalize ?? 'none'} />
    </View>
  );
}
const styles = StyleSheet.create({ wrap: { gap: 7 }, label: { color: colors.ink, fontWeight: '700', fontSize: 13 }, input: { height: 50, borderWidth: 1, borderColor: colors.line, borderRadius: radius.md, backgroundColor: '#FFFCFA', paddingHorizontal: 15, color: colors.ink, fontSize: 15 } });
