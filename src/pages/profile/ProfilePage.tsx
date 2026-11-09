// Tela de perfil do usuário
import React, { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { useApp } from '@/contexts/AppContext';
import { radius, spacing, typography } from '@/theme';

export default function ProfilePage() {
  const router = useRouter();
  const {
    user,
    events,
    favorites,
    confirmedEvents,
    notifications,
    markAllNotificationsAsRead,
    isDark,
    toggleTheme,
    theme,
  } = useApp();

  // Estado para visibilidade do pop-up de notificações
  const [showNotifications, setShowNotifications] = useState(false);

  // Eventos com presença confirmada e eventos favoritados
  const myEvents = events.filter((event) => confirmedEvents.includes(event.id));
  const myFavorites = events.filter((event) => favorites.includes(event.id));

  // Contagem de notificações não lidas
  const unreadCount = notifications.filter((item) => !item.read).length;

  return (
    <ScrollView
      style={[styles.page, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.heading, { color: theme.secondary }]}>Meu perfil</Text>

      {/* Cabeçalho do perfil com foto, botão de modo escuro e notificações */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarRow}>
          {/* Botão de alternância do modo escuro ao lado da foto */}
          <Pressable
            onPress={toggleTheme}
            style={[
              styles.headerIconButton,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
            accessibilityLabel="Alternar modo escuro"
          >
            <Ionicons
              name={isDark ? 'moon' : 'sunny-outline'}
              size={22}
              color={theme.primary}
            />
          </Pressable>

          {/* Foto do perfil / Avatar */}
          <View style={[styles.avatar, { backgroundColor: theme.tint }]}>
            <Ionicons name="person" size={44} color={theme.primary} />
          </View>

          {/* Botão de notificações ao lado da foto */}
          <Pressable
            onPress={() => setShowNotifications(true)}
            style={[
              styles.headerIconButton,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
            accessibilityLabel="Notificações"
          >
            <Ionicons name="notifications-outline" size={22} color={theme.primary} />
            {unreadCount > 0 ? <View style={styles.badgeDot} /> : null}
          </Pressable>
        </View>

        <Text style={[styles.name, { color: theme.text }]}>
          {user?.name || 'Visitante'}
        </Text>
        <Text style={[styles.email, { color: theme.textMuted }]}>
          {user?.email || 'Nenhum e-mail cadastrado'}
        </Text>
      </View>

      {/* Botão para configurar conta */}
      <Pressable
        style={[
          styles.settingsButton,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
        onPress={() => router.push('/configurar-conta' as any)}
      >
        <View style={styles.settingsButtonContent}>
          <View style={[styles.settingsIconWrap, { backgroundColor: theme.cardHighlight }]}>
            <Ionicons name="settings-outline" size={20} color={theme.primary} />
          </View>
          <View>
            <Text style={[styles.settingsButtonTitle, { color: theme.text }]}>
              Configurar conta
            </Text>
            <Text style={[styles.settingsButtonSubtitle, { color: theme.textMuted }]}>
              Alterar dados, senha e encerramento de sessão
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
      </Pressable>

      {/* Seção: Meus Eventos (Presença confirmada) */}
      <View style={styles.section}>
        <SectionTitle
          title="Meus eventos"
          subtitle={`${myEvents.length} presença(s) confirmada(s)`}
        />
        {myEvents.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {myEvents.map((event) => (
              <Pressable
                key={event.id}
                onPress={() => router.push(`/eventos/${event.id}` as any)}
                style={[
                  styles.eventMiniCard,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                  },
                ]}
              >
                <Image source={{ uri: event.image }} style={styles.eventMiniThumb} />
                <View style={styles.eventMiniBody}>
                  <Text
                    style={[styles.eventMiniTitle, { color: theme.text }]}
                    numberOfLines={1}
                  >
                    {event.title}
                  </Text>
                  <Text style={[styles.eventMiniMeta, { color: theme.primary }]}>
                    ✓ Presença confirmada
                  </Text>
                  <Text style={[styles.eventMiniDate, { color: theme.textMuted }]}>
                    {event.date} • {event.city}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        ) : (
          <View
            style={[
              styles.emptyCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <Ionicons name="calendar-outline" size={32} color={theme.textMuted} />
            <Text style={[styles.emptyText, { color: theme.textMuted }]}>
              Você ainda não confirmou presença em eventos. Abra um evento para confirmar sua participação!
            </Text>
          </View>
        )}
      </View>

      {/* Seção: Meus Favoritos */}
      <View style={styles.section}>
        <SectionTitle
          title="Meus favoritos"
          subtitle={`${myFavorites.length} evento(s) salvo(s)`}
          action={
            <Pressable onPress={() => router.push('/favoritos' as any)}>
              <Text style={[styles.actionLink, { color: theme.secondary }]}>Ver todos</Text>
            </Pressable>
          }
        />
        {myFavorites.length > 0 ? (
          <View style={styles.favoritesList}>
            {myFavorites.slice(0, 3).map((event) => (
              <Pressable
                key={event.id}
                onPress={() => router.push(`/eventos/${event.id}` as any)}
                style={[
                  styles.favoriteRow,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                  },
                ]}
              >
                <Image source={{ uri: event.image }} style={styles.favoriteThumb} />
                <View style={styles.favoriteInfo}>
                  <Text
                    style={[styles.favoriteTitle, { color: theme.text }]}
                    numberOfLines={1}
                  >
                    {event.title}
                  </Text>
                  <Text style={[styles.favoriteMeta, { color: theme.textMuted }]}>
                    {event.date} • {event.place}, {event.city}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={theme.textMuted} />
              </Pressable>
            ))}
          </View>
        ) : (
          <View
            style={[
              styles.emptyCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <Ionicons name="heart-outline" size={32} color={theme.textMuted} />
            <Text style={[styles.emptyText, { color: theme.textMuted }]}>
              Você não possui eventos favoritados. Toque no coração em qualquer evento para salvá-lo aqui.
            </Text>
          </View>
        )}
      </View>

      {/* Pop-up Modal de Notificações */}
      <Modal
        visible={showNotifications}
        transparent
        animationType="fade"
        onRequestClose={() => setShowNotifications(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowNotifications(false)}
        >
          <Pressable
            style={[
              styles.modalContent,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Cabeçalho do modal */}
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleRow}>
                <Ionicons name="notifications" size={20} color={theme.primary} />
                <Text style={[styles.modalTitle, { color: theme.text }]}>Notificações</Text>
                {unreadCount > 0 ? (
                  <View style={[styles.unreadBadge, { backgroundColor: theme.secondary }]}>
                    <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
                  </View>
                ) : null}
              </View>
              <Pressable
                onPress={() => setShowNotifications(false)}
                hitSlop={8}
                style={styles.modalCloseButton}
              >
                <Ionicons name="close" size={22} color={theme.textMuted} />
              </Pressable>
            </View>

            {/* Lista de notificações */}
            <ScrollView style={styles.notificationsList}>
              {notifications.length > 0 ? (
                notifications.map((item) => (
                  <View
                    key={item.id}
                    style={[
                      styles.notificationItem,
                      {
                        backgroundColor: item.read ? 'transparent' : theme.cardHighlight,
                        borderColor: theme.border,
                      },
                    ]}
                  >
                    <View style={styles.notificationItemHeader}>
                      <Text
                        style={[
                          styles.notificationItemTitle,
                          { color: theme.text },
                          !item.read && { color: theme.primary },
                        ]}
                      >
                        {item.title}
                      </Text>
                      <Text style={[styles.notificationItemDate, { color: theme.textMuted }]}>
                        {item.date}
                      </Text>
                    </View>
                    <Text style={[styles.notificationItemMessage, { color: theme.textMuted }]}>
                      {item.message}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={[styles.emptyNotificationsText, { color: theme.textMuted }]}>
                  Nenhuma notificação recebida no momento.
                </Text>
              )}
            </ScrollView>

            {/* Rodapé com botão de marcar como lidas */}
            {unreadCount > 0 ? (
              <Pressable
                onPress={markAllNotificationsAsRead}
                style={[styles.markReadButton, { borderColor: theme.border }]}
              >
                <Text style={[styles.markReadText, { color: theme.primary }]}>
                  Marcar todas como lidas
                </Text>
              </Pressable>
            ) : null}
          </Pressable>
        </Pressable>
      </Modal>
    </ScrollView>
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
  heading: {
    fontSize: typography.fontSize.title - 1,
    fontWeight: typography.fontWeight.heavy,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    marginBottom: spacing.md,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badgeDot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#F43F5E',
  },
  name: {
    fontSize: typography.fontSize.xxl - 2,
    fontWeight: typography.fontWeight.heavy,
    marginTop: spacing.xs,
  },
  email: {
    fontSize: typography.fontSize.md - 1,
    marginTop: 4,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md + 2,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.xl,
  },
  settingsButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  settingsIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsButtonTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.heavy,
  },
  settingsButtonSubtitle: {
    fontSize: typography.fontSize.xs,
    marginTop: 2,
  },
  section: {
    marginBottom: spacing.xxl,
  },
  actionLink: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.heavy,
  },
  eventMiniCard: {
    width: 220,
    borderRadius: radius.md,
    borderWidth: 1,
    overflow: 'hidden',
    marginRight: spacing.md,
  },
  eventMiniThumb: {
    width: '100%',
    height: 100,
  },
  eventMiniBody: {
    padding: spacing.sm + 2,
    gap: 3,
  },
  eventMiniTitle: {
    fontSize: typography.fontSize.sm + 1,
    fontWeight: typography.fontWeight.heavy,
  },
  eventMiniMeta: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
  eventMiniDate: {
    fontSize: typography.fontSize.xs,
  },
  favoritesList: {
    gap: spacing.sm,
  },
  favoriteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.md,
    padding: 10,
    borderWidth: 1,
    gap: spacing.md,
  },
  favoriteThumb: {
    width: 50,
    height: 50,
    borderRadius: radius.sm,
  },
  favoriteInfo: {
    flex: 1,
    gap: 2,
  },
  favoriteTitle: {
    fontSize: typography.fontSize.md - 1,
    fontWeight: typography.fontWeight.heavy,
  },
  favoriteMeta: {
    fontSize: typography.fontSize.xs,
  },
  emptyCard: {
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  emptyText: {
    fontSize: typography.fontSize.sm,
    textAlign: 'center',
    lineHeight: 19,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  modalContent: {
    width: '100%',
    maxHeight: '75%',
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E5DC',
  },
  modalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  modalTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.heavy,
  },
  unreadBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  unreadBadgeText: {
    color: '#FFFFFF',
    fontSize: typography.fontSize.xs - 1,
    fontWeight: typography.fontWeight.heavy,
  },
  modalCloseButton: {
    padding: 4,
  },
  notificationsList: {
    marginVertical: spacing.md,
    maxHeight: 320,
  },
  notificationItem: {
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
  notificationItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationItemTitle: {
    fontSize: typography.fontSize.sm + 1,
    fontWeight: typography.fontWeight.heavy,
  },
  notificationItemDate: {
    fontSize: typography.fontSize.xs,
  },
  notificationItemMessage: {
    fontSize: typography.fontSize.xs + 1,
    lineHeight: 17,
  },
  emptyNotificationsText: {
    textAlign: 'center',
    paddingVertical: spacing.xl,
    fontSize: typography.fontSize.sm,
  },
  markReadButton: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    marginTop: spacing.xs,
  },
  markReadText: {
    fontSize: typography.fontSize.xs + 1,
    fontWeight: typography.fontWeight.bold,
  },
});
