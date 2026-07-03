<script setup lang="ts">
import { computed } from 'vue'
import type { CommunityMessage } from '~/types/community'

const props = defineProps<{
  message: CommunityMessage
  isOwn: boolean
}>()

// View-only formatting; text is rendered via interpolation (auto-escaped).
const time = computed(() =>
  new Date(props.message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
)
</script>

<template>
  <li :class="['chat-message', { 'chat-message--own': props.isOwn }]">
    <div class="chat-message__bubble">
      <header class="chat-message__meta">
        <span class="chat-message__author">{{ props.isOwn ? 'You' : props.message.username }}</span>
        <time class="chat-message__time" :datetime="props.message.timestamp">{{ time }}</time>
      </header>
      <p class="chat-message__text">{{ props.message.text }}</p>
    </div>
  </li>
</template>

<style scoped>
.chat-message {
  display: flex;
  justify-content: flex-start;
}

.chat-message--own {
  justify-content: flex-end;
}

.chat-message__bubble {
  max-width: min(72%, 34rem);
  padding: 0.55rem 0.8rem;
  border-radius: var(--radius-md);
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-bottom-left-radius: 4px;
}

.chat-message--own .chat-message__bubble {
  background: var(--accent);
  border-color: transparent;
  border-bottom-left-radius: var(--radius-md);
  border-bottom-right-radius: 4px;
}

.chat-message__meta {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.15rem;
}

.chat-message__author {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.chat-message--own .chat-message__author,
.chat-message--own .chat-message__time {
  color: rgba(255, 255, 255, 0.85);
}

.chat-message__time {
  font-size: 0.68rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.chat-message__text {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.45;
  color: var(--text-primary);
  word-break: break-word;
  white-space: pre-wrap;
}

.chat-message--own .chat-message__text {
  color: #fff;
}
</style>
