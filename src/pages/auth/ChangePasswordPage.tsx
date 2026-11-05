import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Link } from 'expo-router';
import { AuthShell } from '@/components/auth/AuthShell';
import { InputField } from '@/components/shared/InputField';
import { PrimaryButton } from '@/components/shared/PrimaryButton';

export default function ChangePasswordPage() {
  const [password, setPassword] = useState(''); const [confirm, setConfirm] = useState('');
  return <AuthShell title="Alterar senha" subtitle="Escolha uma nova senha para sua conta."><InputField label="Nova senha" value={password} onChangeText={setPassword} secureTextEntry placeholder="Nova senha" /><InputField label="Confirmar senha" value={confirm} onChangeText={setConfirm} secureTextEntry placeholder="Repita a nova senha" /><PrimaryButton title="Salvar nova senha" onPress={() => Alert.alert('Demonstração', password && password === confirm ? 'Conecte esta etapa ao backend para salvar a senha.' : 'As senhas precisam ser preenchidas e iguais.')} /><Link href="/login" style={{ textAlign: 'center', color: '#E8590C', fontWeight: '800' }}>Voltar para login</Link></AuthShell>;
}
