<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import type { ChatFeedItem } from '~/types/community'

const props = defineProps<{
  items: ChatFeedItem[]
  currentUserId: string | null
  isLoading: boolean
}>()

const scrollContainer = ref<HTMLElement | null>(null)

// Auto-scroll to the newest item. Purely a view behaviour, kept local to the
// list. Skips auto-scroll if the user has scrolled up to read older messages.
const isPinnedToBottom = ref(true)

const handleScroll = () => {
  const el = scrollContainer.value
  if (!el) return
  const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
  isPinnedToBottom.value = distanceFromBottom < 80
}

const scrollToBottom = () => {
  const el = scrollContainer.value
  if (el) el.scrollTop = el.scrollHeight
}

watch(
  () => props.items.length,
  () => {
    if (!isPinnedToBottom.value) return
    nextTick(scrollToBottom)
  }
)
</script>

<template>
  <div ref="scrollContainer" class="chat-list" @scroll="handleScroll">
    <p v-if="props.isLoading" class="chat-list__state">Loading messages…</p>

    <p v-else-if="props.items.length === 0" class="chat-list__state">
      No messages yet. Say hello 👋
    </p>

    <ul v-else class="chat-list__items">
      <template v-for="item in props.items" :key="item.id">
        <li v-if="item.kind === 'system'" class="chat-list__notice">
          <span v-if="item.type === 'rename'">
            {{ item.previousUsername }} is now {{ item.username }}
          </span>
          <span v-else>
            {{ item.username }}
            {{ item.type === 'join' ? 'joined the chat' : 'left the chat' }}
          </span>
        </li>
        <ChatMessage
          v-else
          :message="item"
          :is-own="item.userId === props.currentUserId"
        />
      </template>
    </ul>
  </div>
</template>

<style scoped>
.chat-list {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: var(--space-4);
}

.chat-list__items {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.chat-list__state {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  color: var(--text-muted);
  font-size: 0.92rem;
}

.chat-list__notice {
  align-self: center;
  padding: 0.2rem 0.7rem;
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, var(--surface-2) 70%, transparent);
  color: var(--text-muted);
  font-size: 0.74rem;
}
</style>
