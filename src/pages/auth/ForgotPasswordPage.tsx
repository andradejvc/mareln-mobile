// Tela de recuperação de senha
import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { AuthShell } from '@/components/auth/AuthShell';
import { InputField } from '@/components/shared/InputField';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { useApp } from '@/contexts/AppContext';
import { typography } from '@/theme';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const { theme } = useApp();

  // Envio do pedido de recuperação
  const handleRecover = () => {
    Alert.alert('Demonstração', 'A recuperação de senha precisa ser conectada ao backend.');
  };

  return (
    <AuthShell
      title="Recuperar senha"
      subtitle="Informe seu e-mail para continuar."
    >
      <InputField
        label="E-mail cadastrado"
        value={email}
        onChangeText={setEmail}
        placeholder="seu@email.com"
        keyboardType="email-address"
      />

      <PrimaryButton title="Enviar instruções" onPress={handleRecover} />

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
