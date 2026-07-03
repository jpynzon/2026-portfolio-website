<script setup lang="ts">
import { computed } from 'vue'
import type { ConnectionStatus } from '~/types/community'

const props = defineProps<{
  status: ConnectionStatus
}>()

const label = computed(
  () =>
    ({
      connecting: 'Connecting…',
      connected: 'Connected',
      reconnecting: 'Reconnecting…',
      disconnected: 'Disconnected'
    })[props.status]
)
</script>

<template>
  <span :class="['conn-status', `conn-status--${props.status}`]">
    <span class="conn-status__dot" />
    {{ label }}
  </span>
</template>

<style scoped>
.conn-status {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  color: var(--text-secondary);
}

.conn-status__dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: var(--text-muted);
}

.conn-status--connected .conn-status__dot {
  background: var(--success);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--success) 25%, transparent);
}

.conn-status--connecting .conn-status__dot,
.conn-status--reconnecting .conn-status__dot {
  background: var(--warm);
  animation: conn-pulse 1.1s ease-in-out infinite;
}

.conn-status--disconnected .conn-status__dot {
  background: var(--danger);
}

@keyframes conn-pulse {
  0%,
  100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
}
</style>
