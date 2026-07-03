<script setup lang="ts">
import { computed, ref } from 'vue'
import { CHAT_LIMITS } from '~/types/community'

const props = defineProps<{
  disabled: boolean
  cooldownRemaining: number
}>()

const emit = defineEmits<{
  (event: 'submit', text: string): void
}>()

const draft = ref('')

const remaining = computed(() => CHAT_LIMITS.MAX_MESSAGE_LENGTH - draft.value.length)
const isCoolingDown = computed(() => props.cooldownRemaining > 0)
const canSend = computed(
  () => !props.disabled && !isCoolingDown.value && draft.value.trim().length > 0
)

const sendLabel = computed(() =>
  isCoolingDown.value ? `${props.cooldownRemaining}s` : 'Send'
)

function submit() {
  if (!canSend.value) return
  emit('submit', draft.value)
  draft.value = ''
}

// Enter sends, Shift+Enter inserts a newline.
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    submit()
  }
}
</script>

<template>
  <form class="chat-input" @submit.prevent="submit">
    <textarea
      v-model="draft"
      class="chat-input__field"
      rows="1"
      :maxlength="CHAT_LIMITS.MAX_MESSAGE_LENGTH"
      :disabled="props.disabled"
      :placeholder="props.disabled ? 'Connecting…' : 'Write a message…'"
      aria-label="Message"
      @keydown="handleKeydown"
    />
    <div class="chat-input__actions">
      <span
        class="chat-input__counter"
        :class="{ 'chat-input__counter--low': remaining < 40 }"
      >{{ remaining }}</span>
      <button
        type="submit"
        class="chat-input__send"
        :class="{ 'chat-input__send--cooldown': isCoolingDown }"
        :disabled="!canSend"
        :title="isCoolingDown ? `Wait ${props.cooldownRemaining}s before sending again` : 'Send message'"
      >
        {{ sendLabel }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.chat-input {
  display: flex;
  align-items: flex-end;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  border-top: 1px solid var(--line);
  background: var(--bg-elevated);
}

.chat-input__field {
  flex: 1;
  resize: none;
  max-height: 8rem;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  background: var(--bg);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 0.92rem;
  line-height: 1.4;
  outline: none;
  transition: border-color 0.2s ease;
}

.chat-input__field:focus {
  border-color: var(--accent);
}

.chat-input__field:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.chat-input__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
}

.chat-input__counter {
  font-size: 0.68rem;
  font-family: var(--font-mono);
  color: var(--text-muted);
}

.chat-input__counter--low {
  color: var(--warm);
}

.chat-input__send {
  min-width: 4.2rem;
  padding: 0.55rem 1.1rem;
  border: none;
  border-radius: var(--radius-pill);
  background: var(--accent);
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.chat-input__send:hover:not(:disabled) {
  transform: translateY(-1px);
}

.chat-input__send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.chat-input__send--cooldown {
  font-family: var(--font-mono);
}
</style>
