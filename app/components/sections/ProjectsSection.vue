<script setup lang="ts">
import type { ProjectItem } from '~/types/portfolio'

defineProps<{
  projects: ProjectItem[]
}>()
</script>

<template>
  <section
    id="projects"
    class="section"
    v-motion
    :initial="{ opacity: 0, y: 24 }"
    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 560 } }"
  >
    <SectionTitle
      eyebrow="Featured Projects"
      title="Selected work focused on product outcomes."
      description="Each project highlights how I approach architecture, UX clarity, and implementation under real-world constraints."
    />

    <div class="projects-grid">
      <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
    </div>
  </section>
</template>

