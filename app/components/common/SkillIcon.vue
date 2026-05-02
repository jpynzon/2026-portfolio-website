<script setup lang="ts">
const props = defineProps<{
  icon: string
  label: string
}>()

const hasError = ref(false)

const fallbackLabel = computed(() => {
  const initials = props.label
    .split(/[\s./+-]+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return initials.slice(0, 2) || '?'
})

function onError() {
  hasError.value = true
}
</script>

<template>
  <span class="skill-icon" aria-hidden="true">
    <img
      v-if="icon && !hasError"
      class="skill-icon__image"
      :src="icon"
      alt=""
      loading="lazy"
      decoding="async"
      @error="onError"
    />
    <span v-else class="skill-icon__fallback">{{ fallbackLabel }}</span>
  </span>
</template>
