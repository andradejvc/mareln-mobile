// Tela de alteração de senha
import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { AuthShell } from '@/components/auth/AuthShell';
import { InputField } from '@/components/shared/InputField';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { useApp } from '@/contexts/AppContext';
import { typography } from '@/theme';

export default function ChangePasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const { theme } = useApp();

  // Salvar nova senha
  const handleSave = () => {
    if (!password || password !== confirm) {
      Alert.alert('Aviso', 'As senhas precisam ser preenchidas e iguais.');
      return;
    }
    Alert.alert('Demonstração', 'Conecte esta etapa ao backend para salvar a senha.');
  };

  return (
    <AuthShell
      title="Alterar senha"
      subtitle="Escolha uma nova senha para sua conta."
    >
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

      <PrimaryButton title="Salvar nova senha" onPress={handleSave} />

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
