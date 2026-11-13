// Tela de configurações da conta do usuário
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { InputField } from '@/components/shared/InputField';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { AppModal } from '@/components/shared/AppModal';
import { useApp } from '@/contexts/AppContext';
import { radius, spacing, typography } from '@/theme';

// Estado do modal de aviso (sucesso/erro)
type FeedbackState = { title: string; message: string } | null;

export default function AccountSettingsPage() {
  const router = useRouter();
  const { user, updateUser, signOut, theme } = useApp();

  // Estados do formulário de dados cadastrais
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [saving, setSaving] = useState(false);

  // Estados dos modais
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Salvar alterações de nome e e-mail
  const handleSaveProfile = async () => {
    if (saving) return;
    try {
      setSaving(true);
      await updateUser(name, email);
      setFeedback({ title: 'Sucesso', message: 'Informações atualizadas com sucesso.' });
    } catch (error) {
      setFeedback({
        title: 'Erro',
        message: error instanceof Error ? error.message : 'Falha ao salvar informações.',
      });
    } finally {
      setSaving(false);
    }
  };

  // Confirmar logout: o guard do layout raiz leva pro index quando user vira null
  const confirmLogout = async () => {
    if (loggingOut) return;
    try {
      setLoggingOut(true);
      await signOut();
    } catch (error) {
      setLoggingOut(false);
      setLogoutVisible(false);
      setFeedback({ title: 'Erro', message: 'Não foi possível sair da conta. Tente novamente.' });
    }
  };

  return (
    <>
      <ScrollView
        style={[styles.page, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.content}
      >
        {/* Botão de retorno */}
        <Text
          onPress={() => router.back()}
          style={[styles.back, { color: theme.primary }]}
        >
          ‹ Voltar para o perfil
        </Text>

        <Text style={[styles.heading, { color: theme.secondary }]}>Configurações da conta</Text>
        <Text style={[styles.sub, { color: theme.textMuted }]}>
          Gerencie seus dados pessoais, senha e sessão.
        </Text>

        {/* Seção 1: Alterar informações pessoais */}
        <View
          style={[
            styles.card,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: theme.text }]}>Alterar informações</Text>
          <InputField
            label="Nome completo"
            value={name}
            onChangeText={setName}
            placeholder="Seu nome completo"
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
          <PrimaryButton
            title="Salvar alterações"
            onPress={handleSaveProfile}
            loading={saving}
            style={styles.saveButton}
          />
        </View>

        {/* Seção 2: Alterar senha */}
        <View
          style={[
            styles.card,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: theme.text }]}>Segurança</Text>
          <Pressable
            style={[
              styles.optionRow,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
            onPress={() => router.push('/alterar-senha' as any)}
          >
            <View style={styles.optionLeft}>
              <Ionicons name="lock-closed-outline" size={20} color={theme.primary} />
              <Text style={[styles.optionText, { color: theme.text }]}>Alterar senha</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
          </Pressable>
        </View>

        {/* Seção 3: Sair da conta */}
        <View
          style={[
            styles.card,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: theme.text }]}>Sessão</Text>
          <Pressable
            style={[
              styles.optionRow,
              { backgroundColor: theme.surface, borderColor: theme.secondary },
            ]}
            onPress={() => setLogoutVisible(true)}
          >
            <View style={styles.optionLeft}>
              <Ionicons name="log-out-outline" size={20} color={theme.secondary} />
              <Text style={[styles.optionText, { color: theme.secondary }]}>Sair da conta</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.secondary} />
          </Pressable>
        </View>
      </ScrollView>

      {/* Modal de confirmação de logout */}
      <AppModal
        visible={logoutVisible}
        title="Sair da conta"
        message="Tem certeza que deseja encerrar sua sessão?"
        confirmText="Sair"
        cancelText="Cancelar"
        destructive
        loading={loggingOut}
        onConfirm={confirmLogout}
        onCancel={() => setLogoutVisible(false)}
      />

      {/* Modal de aviso (sucesso/erro) */}
      <AppModal
        visible={feedback !== null}
        title={feedback?.title ?? ''}
        message={feedback?.message ?? ''}
        confirmText="OK"
        onConfirm={() => setFeedback(null)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: 40,
  },
  back: {
    fontWeight: typography.fontWeight.heavy,
    fontSize: typography.fontSize.md,
    marginBottom: 15,
  },
  heading: {
    fontSize: typography.fontSize.title - 1,
    fontWeight: typography.fontWeight.heavy,
  },
  sub: {
    marginTop: spacing.xs,
    fontSize: typography.fontSize.md - 1,
    marginBottom: spacing.xl,
  },
  card: {
    borderRadius: radius.lg,
    padding: spacing.xl,
    borderWidth: 1,
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  cardTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.heavy,
    marginBottom: spacing.xs,
  },
  saveButton: {
    marginTop: spacing.sm,
  },
  optionRow: {
    borderRadius: radius.md,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  optionText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.heavy,
  },
});