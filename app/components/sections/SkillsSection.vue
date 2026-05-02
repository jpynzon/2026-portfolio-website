<script setup lang="ts">
import type { SkillGroup } from '~/types/portfolio'

defineProps<{
  groups: SkillGroup[]
}>()
</script>

<template>
  <section
    id="skills"
    class="section"
    v-motion
    :initial="{ opacity: 0, y: 24 }"
    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 560 } }"
  >
    <SectionTitle
      eyebrow="Tech Stack"
      title="Practical tools for shipping reliable products."
      description="Full-stack execution with strong backend foundations, production readiness, and clean architecture practices."
    />

    <div class="skills-grid">
      <article v-for="group in groups" :key="group.title" class="skills-group">
        <h3>{{ group.title }}</h3>
        <ul>
          <li v-for="item in group.items" :key="item.label">
            <SkillIcon :icon="item.icon" :label="item.label" />
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>
