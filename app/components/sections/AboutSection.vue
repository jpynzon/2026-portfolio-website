<script setup lang="ts">
import type { AboutContent } from '~/types/portfolio'

defineProps<{
  about: AboutContent
}>()
</script>

<template>
  <section
    id="about"
    class="section"
    v-motion
    :initial="{ opacity: 0, y: 24 }"
    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 560 } }"
  >
    <SectionTitle
      eyebrow="About"
      title="Hi, I'm Joshua. I build software that solves real operational problems."
      :description="about.intro"
    />

    <div class="about-grid">
      <div class="about-grid__story">
        <p v-for="paragraph in about.paragraphs" :key="paragraph">
          {{ paragraph }}
        </p>
      </div>

      <aside class="about-grid__strengths-block">
        <p class="about-grid__strengths-title">What I bring</p>
        <ul class="about-grid__strengths">
          <li v-for="strength in about.strengths" :key="strength">{{ strength }}</li>
        </ul>
      </aside>
    </div>
  </section>
</template>