// Tela de autenticação e login
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { AuthShell } from '@/components/auth/AuthShell';
import { InputField } from '@/components/shared/InputField';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { useApp } from '@/contexts/AppContext';
import { spacing, typography } from '@/theme';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, theme } = useApp();

  // Estados do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Submissão do login
  const submit = async () => {
    try {
      setLoading(true);
      await signIn(email, password);
      router.replace('/dashboard' as any);
    } catch (error) {
      Alert.alert('Não foi possível entrar', error instanceof Error ? error.message : 'Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Bem-vindo de volta!"
      subtitle="Entre para descobrir os eventos do litoral."
    >
      <InputField
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="seu@email.com"
        autoCapitalize="none"
      />

      <InputField
        label="Senha"
        value={password}
        onChangeText={setPassword}
        placeholder="Digite sua senha"
        secureTextEntry
      />

      <Link
        href="/recuperar-senha"
        style={[styles.forgot, { color: theme.secondary }]}
      >
        Esqueceu sua senha?
      </Link>

      <PrimaryButton title="Entrar" onPress={submit} loading={loading} />

      <View style={styles.bottom}>
        <Text style={[styles.text, { color: theme.textMuted }]}>Ainda não tem conta?</Text>
        <Link
          href="/registro"
          style={[styles.link, { color: theme.primary }]}
        >
          Criar conta
        </Link>
      </View>

      <Text style={[styles.note, { color: theme.textMuted }]}>
        Modo demonstração: a autenticação é local e ainda não está conectada ao backend.
      </Text>
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  forgot: {
    fontWeight: typography.fontWeight.heavy,
    textAlign: 'right',
    marginTop: -5,
  },
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
  note: {
    fontSize: typography.fontSize.xs,
    textAlign: 'center',
    lineHeight: 15,
  },
});
