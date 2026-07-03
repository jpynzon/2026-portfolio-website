<script setup lang="ts">
import type {
  ChatFeedItem,
  ConnectionStatus,
  PresenceUser
} from '~/types/community'

const props = defineProps<{
  feed: ChatFeedItem[]
  currentUser: PresenceUser | null
  status: ConnectionStatus
  onlineCount: number
  isLoadingHistory: boolean
  historyError: string | null
  sendError: string | null
  cooldownRemaining: number
}>()

const emit = defineEmits<{
  (event: 'send', text: string): void
  (event: 'rename', name: string): void
}>()

function handleSend(text: string) {
  emit('send', text)
}

function handleRename(name: string) {
  emit('rename', name)
}
</script>

<template>
  <section class="chat-window">
    <ChatHeader
      :online-count="props.onlineCount"
      :username="props.currentUser?.username ?? null"
      :status="props.status"
      @rename="handleRename"
    />

    <p v-if="props.historyError" class="chat-window__banner chat-window__banner--error">
      {{ props.historyError }}
    </p>

    <ChatMessageList
      :items="props.feed"
      :current-user-id="props.currentUser?.userId ?? null"
      :is-loading="props.isLoadingHistory"
    />

    <p v-if="props.sendError" class="chat-window__banner chat-window__banner--warn">
      {{ props.sendError }}
    </p>

    <ChatInput
      :disabled="props.status !== 'connected'"
      :cooldown-remaining="props.cooldownRemaining"
      @submit="handleSend"
    />
  </section>
</template>

<style scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  height: min(72vh, 640px);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: var(--bg-elevated);
  box-shadow: var(--shadow-card);
  overflow: hidden;
}

.chat-window__banner {
  margin: 0;
  padding: 0.5rem var(--space-4);
  font-size: 0.82rem;
  text-align: center;
}

.chat-window__banner--error {
  background: color-mix(in srgb, var(--danger) 14%, transparent);
  color: var(--danger);
}

.chat-window__banner--warn {
  background: color-mix(in srgb, var(--warm) 16%, transparent);
  color: var(--warm);
}
</style>
