import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { AuthShell } from '@/components/auth/AuthShell';
import { InputField } from '@/components/shared/InputField';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { useApp } from '@/contexts/AppContext';
import { colors } from '@/theme/colors';

export default function LoginPage() {
  const router = useRouter(); const { signIn } = useApp();
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [loading, setLoading] = useState(false);
  const submit = async () => { try { setLoading(true); await signIn(email, password); router.replace('/dashboard' as any); } catch (error) { Alert.alert('Não foi possível entrar', error instanceof Error ? error.message : 'Tente novamente.'); } finally { setLoading(false); } };
  return <AuthShell title="Bem-vindo de volta!" subtitle="Entre para descobrir os eventos do litoral."><InputField label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="seu@email.com" autoCapitalize="none" /><InputField label="Senha" value={password} onChangeText={setPassword} placeholder="Digite sua senha" secureTextEntry /><Link href="/recuperar-senha" style={styles.forgot}>Esqueceu sua senha?</Link><PrimaryButton title="Entrar" onPress={submit} loading={loading} /><View style={styles.bottom}><Text style={styles.text}>Ainda não tem conta?</Text><Link href="/registro" style={styles.link}>Criar conta</Link></View><Text style={styles.note}>Modo demonstração: a autenticação é local e ainda não está conectada ao backend.</Text></AuthShell>;
}
const styles = StyleSheet.create({ forgot: { color: colors.pink, fontWeight: '800', textAlign: 'right', marginTop: -5 }, bottom: { flexDirection: 'row', justifyContent: 'center', gap: 5 }, text: { color: colors.muted }, link: { color: colors.orange, fontWeight: '900' }, note: { color: colors.muted, fontSize: 10, textAlign: 'center', lineHeight: 15 } });
