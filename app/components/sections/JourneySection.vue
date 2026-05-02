<script setup lang="ts">
import type { JourneyItem } from '~/types/portfolio'

defineProps<{
  items: JourneyItem[]
}>()
</script>

<template>
  <section
    id="journey"
    class="section"
    v-motion
    :initial="{ opacity: 0, y: 24 }"
    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 560 } }"
  >
    <SectionTitle
      eyebrow="Experience"
      title="From internship to production ownership."
      description="A journey grounded in execution, collaboration, and continuous improvement."
    />

    <div class="journey-list">
      <TimelineItem v-for="item in items" :key="`${item.company}-${item.period}`" :item="item" />
    </div>
  </section>
</template>

