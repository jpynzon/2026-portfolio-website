<template>
  <div
    class="cf-turnstile"
    :data-sitekey="siteKey"
    data-callback="onTurnstileSuccess"
    data-error-callback="onTurnstileError"
    data-expired-callback="onTurnstileExpired"
  ></div>
</template>

<script setup lang="ts">
interface Props {
  siteKey: string
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// Expose global callbacks for Turnstile
if (typeof window !== 'undefined') {
  (window as any).onTurnstileSuccess = (token: string) => {
    emit('update:modelValue', token)
  }

  (window as any).onTurnstileError = () => {
    emit('update:modelValue', '')
  }

  (window as any).onTurnstileExpired = () => {
    emit('update:modelValue', '')
  }
}

onMounted(() => {
  // Re-render Turnstile if needed
  if ((window as any).turnstile) {
    (window as any).turnstile.render('.cf-turnstile')
  }
})
</script>