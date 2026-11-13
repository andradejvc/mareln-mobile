// Tela de cadastro de novo usuário
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { AuthShell } from '@/components/auth/AuthShell';
import { InputField } from '@/components/shared/InputField';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { useApp } from '@/contexts/AppContext';
import { typography } from '@/theme';

export default function RegisterPage() {
  const router = useRouter();
  const { register, theme } = useApp();

  // Estados do cadastro
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  // Submissão do cadastro
  const submit = async () => {
    if (loading) return;
    if (password !== confirm) { Alert.alert('Confira os dados', 'As senhas não coincidem.'); return; }
    try {
      setLoading(true);
      await register(name, email, password);
      router.replace('/dashboard' as any);
    } catch (error) {
      Alert.alert('Confira os dados', error instanceof Error ? error.message : 'Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Crie sua conta"
      subtitle="Faça parte da comunidade Maré LN."
    >
      <InputField
        label="Nome completo"
        value={name}
        onChangeText={setName}
        placeholder="Como podemos te chamar?"
        autoCapitalize="words"
      />

      <InputField
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        placeholder="seu@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <InputField
        label="Senha"
        value={password}
        onChangeText={setPassword}
        placeholder="Crie uma senha"
        secureTextEntry
      />

      <InputField label="Confirmar senha" value={confirm} onChangeText={setConfirm} placeholder="Repita a senha" secureTextEntry />

      <PrimaryButton
        title="Criar conta"
        onPress={submit}
        loading={loading}
        variant="pink"
      />

      <View style={styles.bottom}>
        <Text style={[styles.text, { color: theme.textMuted }]}>Já tem uma conta?</Text>
        <Link
          href="/login"
          style={[styles.link, { color: theme.primary }]}
        >
          Entrar
        </Link>
      </View>

    </AuthShell>
  );
}

const styles = StyleSheet.create({
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  text: {
    fontSize: typography.fontSize.md,
  },
  link: {
    fontWeight: typography.fontWeight.heavy,
  },
});
