<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    description?: string
    align?: 'left' | 'center'
  }>(),
  {
    eyebrow: '',
    description: '',
    align: 'left'
  }
)
</script>

<template>
  <header class="section-title" :class="`section-title--${align}`">
    <p v-if="eyebrow" class="section-title__eyebrow">{{ eyebrow }}</p>
    <h2 class="section-title__headline">{{ title }}</h2>
    <p v-if="description" class="section-title__description">{{ description }}</p>
  </header>
</template>

