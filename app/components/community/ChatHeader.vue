<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { USERNAME_LIMITS, type ConnectionStatus } from '~/types/community'

const props = defineProps<{
  onlineCount: number
  username: string | null
  status: ConnectionStatus
}>()

const emit = defineEmits<{
  (event: 'rename', name: string): void
}>()

const isEditing = ref(false)
const draftName = ref('')
const nameInput = ref<HTMLInputElement | null>(null)

async function startEditing() {
  draftName.value = props.username ?? ''
  isEditing.value = true
  await nextTick()
  nameInput.value?.focus()
  nameInput.value?.select()
}

function cancel() {
  isEditing.value = false
}

function save() {
  const name = draftName.value.trim()
  if (name && name !== props.username) {
    emit('rename', name)
  }
  isEditing.value = false
}

// Close the editor if identity is (re)assigned externally, e.g. on reconnect.
watch(
  () => props.username,
  () => {
    isEditing.value = false
  }
)
</script>

<template>
  <header class="chat-header">
    <div class="chat-header__titles">
      <h1 class="chat-header__title">Community Chat</h1>

      <p v-if="!isEditing" class="chat-header__subtitle">
        <span class="chat-header__online">{{ props.onlineCount }} online</span>
        <template v-if="props.username">
          · you are <strong>{{ props.username }}</strong>
          <button type="button" class="chat-header__edit" @click="startEditing">
            Edit name
          </button>
        </template>
      </p>

      <form v-else class="chat-header__rename" @submit.prevent="save">
        <input
          ref="nameInput"
          v-model="draftName"
          class="chat-header__input"
          :minlength="USERNAME_LIMITS.MIN_LENGTH"
          :maxlength="USERNAME_LIMITS.MAX_LENGTH"
          placeholder="Your name"
          aria-label="Display name"
          @keydown.esc="cancel"
        />
        <button type="submit" class="chat-header__save">Save</button>
        <button type="button" class="chat-header__cancel" @click="cancel">Cancel</button>
      </form>
    </div>

    <ConnectionStatus :status="props.status" />
  </header>
</template>

<style scoped>
.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-4);
  border-bottom: 1px solid var(--line);
  background: var(--bg-elevated);
}

.chat-header__title {
  margin: 0;
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.chat-header__subtitle {
  margin: 0.1rem 0 0;
  font-size: 0.82rem;
  color: var(--text-secondary);
}

.chat-header__online {
  color: var(--text-primary);
  font-weight: 600;
}

.chat-header__edit {
  margin-left: 0.5rem;
  padding: 0;
  border: none;
  background: none;
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
}

.chat-header__edit:hover {
  text-decoration: underline;
}

.chat-header__rename {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.35rem;
}

.chat-header__input {
  padding: 0.35rem 0.55rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  background: var(--bg);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 0.85rem;
  outline: none;
}

.chat-header__input:focus {
  border-color: var(--accent);
}

.chat-header__save,
.chat-header__cancel {
  padding: 0.35rem 0.7rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--line);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}

.chat-header__save {
  border-color: transparent;
  background: var(--accent);
  color: #fff;
}

.chat-header__cancel {
  background: transparent;
  color: var(--text-secondary);
}
</style>
