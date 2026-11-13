// Modal de confirmação e aviso exibido na tela
import React from 'react';
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useApp } from '@/contexts/AppContext';
import { radius, spacing, typography } from '@/theme';

type AppModalProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  // Se não for informado, o modal mostra só um botão (modo aviso)
  cancelText?: string;
  destructive?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
};

export function AppModal({
  visible,
  title,
  message,
  confirmText = 'OK',
  cancelText,
  destructive = false,
  loading = false,
  onConfirm,
  onCancel,
}: AppModalProps) {
  const { theme } = useApp();
  const confirmColor = destructive ? theme.secondary : theme.primary;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onCancel ?? onConfirm}
    >
      {/* Fundo escurecido: tocar fora fecha o modal */}
      <Pressable style={styles.overlay} onPress={loading ? undefined : onCancel ?? onConfirm}>
        {/* Impede que o toque dentro do card feche o modal */}
        <Pressable
          style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
          onPress={() => {}}
        >
          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.message, { color: theme.textMuted }]}>{message}</Text>

          <View style={styles.actions}>
            {cancelText ? (
              <Pressable
                disabled={loading}
                onPress={onCancel}
                style={[styles.button, styles.cancel, { borderColor: theme.border }]}
              >
                <Text style={[styles.buttonText, { color: theme.text }]}>{cancelText}</Text>
              </Pressable>
            ) : null}

            <Pressable
              disabled={loading}
              onPress={onConfirm}
              style={[styles.button, { backgroundColor: confirmColor }]}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={[styles.buttonText, { color: '#fff' }]}>{confirmText}</Text>
              )}
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.xl,
    gap: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.heavy,
  },
  message: {
    fontSize: typography.fontSize.md,
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  button: {
    minWidth: 96,
    height: 44,
    paddingHorizontal: 18,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancel: {
    borderWidth: 1,
  },
  buttonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.heavy,
  },
});