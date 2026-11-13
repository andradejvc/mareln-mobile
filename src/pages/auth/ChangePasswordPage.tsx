// Tela de alteração de senha
import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { AuthShell } from '@/components/auth/AuthShell';
import { InputField } from '@/components/shared/InputField';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { useApp } from '@/contexts/AppContext';
import { typography } from '@/theme';

export default function ChangePasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { changePassword, theme } = useApp();

  // Salvar nova senha
  const handleSave = async () => {
    if (loading) return;
    if (!currentPassword || !password || password !== confirm) {
      Alert.alert('Aviso', 'As senhas precisam ser preenchidas e iguais.');
      return;
    }
    try {
      setLoading(true);
      await changePassword(currentPassword, password);
      Alert.alert('Senha alterada', 'Entre novamente com sua nova senha.', [{ text: 'Entrar', onPress: () => router.replace('/login' as any) }]);
    } catch (error) {
      Alert.alert('Não foi possível alterar a senha', error instanceof Error ? error.message : 'Tente novamente.');
    } finally { setLoading(false); }
  };

  return (
    <AuthShell
      title="Alterar senha"
      subtitle="Escolha uma nova senha para sua conta."
    >
      <InputField label="Senha atual" value={currentPassword} onChangeText={setCurrentPassword} secureTextEntry placeholder="Senha atual" />
      <InputField
        label="Nova senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Nova senha"
      />

      <InputField
        label="Confirmar senha"
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry
        placeholder="Repita a nova senha"
      />

      <PrimaryButton title="Salvar nova senha" onPress={handleSave} loading={loading} />

      <Link
        href="/login"
        style={[styles.backLink, { color: theme.primary }]}
      >
        Voltar para login
      </Link>
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  backLink: {
    textAlign: 'center',
    fontWeight: typography.fontWeight.heavy,
  },
});
