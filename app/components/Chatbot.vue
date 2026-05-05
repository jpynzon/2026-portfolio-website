<script setup lang="ts">
import { useChatbot } from "~/composables/useChatbot";
const props = defineProps<{
  avatarSrc?: string
  avatarAlt?: string
}>()
const {
  messages,
  newMessage,
  isLoading,
  isOpen,
  chatContainer,
  sendChatMessage,
  handleKeyPress,
  toggleOpen,
} = useChatbot();
</script>

<template>
  <div class="chatbot-widget">
    <button type="button" class="chatbot-launcher" @click="toggleOpen">
      <img
        v-if="props.avatarSrc"
        :src="props.avatarSrc"
        :alt="props.avatarAlt || 'Chat avatar'"
        class="chatbot-launcher-avatar"
      />
      <span class="chatbot-launcher-label">Chat with Joshua</span>
      <span class="chatbot-launcher-badge">AI</span>
    </button>

    <transition name="chatbot-panel">
      <div v-if="isOpen" class="chatbot">
        <div class="chatbot-header">
          <div class="chatbot-header-meta">
            <img
              v-if="props.avatarSrc"
              :src="props.avatarSrc"
              :alt="props.avatarAlt || 'Chat avatar'"
              class="chatbot-header-avatar"
            />
            <div>
              <h3>Joshua Paulo</h3>
              <p class="chatbot-status"><span class="chatbot-status-dot"></span>Online</p>
            </div>
          </div>
          <button type="button" class="chatbot-close" @click="toggleOpen">
            ×
          </button>
        </div>

        <div ref="chatContainer" class="chatbot-messages">
          <div
            v-for="message in messages"
            :key="message.id"
            :class="[
              'message',
              {
                'message-user': message.isUser,
                'message-bot': !message.isUser,
              },
            ]"
          >
            <div class="message-content" v-html="message.text"></div>
          </div>

          <div v-if="isLoading" class="message message-bot">
            <div class="message-content">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>

        <div class="chatbot-input">
          <form @submit.prevent="sendChatMessage">
            <div class="input-group">
              <input
                v-model="newMessage"
                type="text"
                placeholder="Type your message..."
                :disabled="isLoading"
                @keypress="handleKeyPress"
              />
              <button
                type="submit"
                :disabled="!newMessage.trim() || isLoading"
                class="send-button"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 21L23 12L2 3V10L17 12L2 14V21Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.chatbot-widget {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.chatbot-launcher {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  border: none;
  border-radius: 999px;
  background: var(--accent);
  color: white;
  font-family: var(--font-body);
  font-size: 0.95rem;
  box-shadow: var(--shadow-soft);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.chatbot-launcher:hover {
  transform: translateY(-1px);
}

.chatbot-launcher-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.35);
}

.chatbot-launcher-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
}

.chatbot-panel-enter-active,
.chatbot-panel-leave-active {
  transition: all 0.18s ease;
}

.chatbot-panel-enter-from,
.chatbot-panel-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

.chatbot {
  display: flex;
  flex-direction: column;
  width: min(380px, calc(100vw - 2rem));
  height: 520px;
  background: var(--bg-elevated);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  overflow: hidden;
}

.chatbot-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-4);
  border-bottom: 1px solid var(--line);
  background: var(--bg-elevated);
}

.chatbot-header-meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.chatbot-header-meta > div {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.chatbot-header-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--line);
}

.chatbot-close {
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  padding: 0;
}

.chatbot-close:hover {
  color: var(--text-primary);
}

.chatbot-header h3 {
  margin: 0;
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.chatbot-status {
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.3;
  color: var(--text-secondary);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.chatbot-status-dot {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 0 2px rgba(52, 211, 153, 0.18);
}

.chatbot-messages {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.message {
  display: flex;
  margin-bottom: var(--space-2);
}

.message-user {
  justify-content: flex-end;
}

.message-bot {
  justify-content: flex-start;
}

.message-content {
  max-width: 70%;
  padding: var(--space-3);
  border-radius: var(--radius-sm);
  word-wrap: break-word;
}

.message-user .message-content {
  background: var(--accent);
  color: white;
  border-bottom-right-radius: 4px;
}

.message-bot .message-content {
  background: var(--bg);
  color: var(--text-primary);
  border-bottom-left-radius: 4px;
}

.message-content p {
  margin: 0;
  line-height: 1.5;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  align-items: center;
}

.typing-indicator span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-secondary);
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) {
  animation-delay: -0.32s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes typing {
  0%,
  80%,
  100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  40% {
    opacity: 1;
    transform: scale(1);
  }
}

.chatbot-input {
  padding: var(--space-4);
  border-top: 1px solid var(--line);
  background: var(--bg-elevated);
}

.input-group {
  display: flex;
  gap: var(--space-2);
  align-items: center;
}

.input-group input {
  flex: 1;
  padding: var(--space-3);
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 0.875rem;
  background: var(--bg);
  color: var(--text-primary);
  outline: none;
  transition: border-color 0.2s ease;
}

.input-group input:focus {
  border-color: var(--accent);
}

.input-group input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.send-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: var(--radius-sm);
  background: var(--accent);
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.send-button:hover:not(:disabled) {
  background: var(--accent-soft);
}

.send-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.send-button svg {
  transform: translateX(1px);
}
</style>
