import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { AuthShell } from '@/components/auth/AuthShell';
import { InputField } from '@/components/shared/InputField';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { useApp } from '@/contexts/AppContext';
import { colors } from '@/theme/colors';

export default function RegisterPage() {
  const router = useRouter(); const { register } = useApp();
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [loading, setLoading] = useState(false);
  const submit = async () => { try { setLoading(true); await register(name, email, password); router.replace('/dashboard' as any); } catch (error) { Alert.alert('Confira os dados', error instanceof Error ? error.message : 'Tente novamente.'); } finally { setLoading(false); } };
  return <AuthShell title="Crie sua conta" subtitle="Faça parte da comunidade Maré LN."><InputField label="Nome completo" value={name} onChangeText={setName} placeholder="Como podemos te chamar?" autoCapitalize="words" /><InputField label="E-mail" value={email} onChangeText={setEmail} placeholder="seu@email.com" keyboardType="email-address" /><InputField label="Senha" value={password} onChangeText={setPassword} placeholder="Crie uma senha" secureTextEntry /><PrimaryButton title="Criar conta" onPress={submit} loading={loading} variant="pink" /><View style={styles.bottom}><Text style={styles.text}>Já tem uma conta?</Text><Link href="/login" style={styles.link}>Entrar</Link></View><Text style={styles.note}>Cadastro demonstrativo: os dados ficam somente neste dispositivo.</Text></AuthShell>;
}
const styles = StyleSheet.create({ bottom: { flexDirection: 'row', justifyContent: 'center', gap: 5 }, text: { color: colors.muted }, link: { color: colors.orange, fontWeight: '900' }, note: { color: colors.muted, fontSize: 10, textAlign: 'center' } });
