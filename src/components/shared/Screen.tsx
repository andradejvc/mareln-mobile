import React from 'react';
import { ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';

export function Screen({ children, scroll = true, contentStyle }: { children: React.ReactNode; scroll?: boolean; contentStyle?: ViewStyle }) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {scroll ? <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={[styles.content, contentStyle]}>{children}</ScrollView> : <View style={[styles.content, contentStyle]}>{children}</View>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.cream }, content: { flexGrow: 1, paddingBottom: 28 }, });
