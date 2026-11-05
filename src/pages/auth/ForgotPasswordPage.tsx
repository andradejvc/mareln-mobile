import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Link } from 'expo-router';
import { AuthShell } from '@/components/auth/AuthShell';
import { InputField } from '@/components/shared/InputField';
import { PrimaryButton } from '@/components/shared/PrimaryButton';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  return <AuthShell title="Recuperar senha" subtitle="Informe seu e-mail para continuar."><InputField label="E-mail cadastrado" value={email} onChangeText={setEmail} placeholder="seu@email.com" keyboardType="email-address" /><PrimaryButton title="Enviar instruções" onPress={() => Alert.alert('Demonstração', 'A recuperação de senha precisa ser conectada ao backend.')} /><Link href="/login" style={{ textAlign: 'center', color: '#E8590C', fontWeight: '800' }}>Voltar para login</Link></AuthShell>;
}
