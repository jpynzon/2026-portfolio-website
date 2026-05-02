<script setup lang="ts">
import type { HeroContent } from "~/types/portfolio";

defineProps<{
  hero: HeroContent;
}>();
</script>

<template>
  <section
    id="home"
    class="section stats"
    v-motion
    :initial="{ opacity: 0, y: 24 }"
    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 620 } }"
  >
    <div class="hero__stats">
      <article
        v-for="stat in hero.stats"
        :key="stat.label"
        class="hero__stat-card"
      >
        <p class="hero__stat-value">{{ stat.value }}</p>
        <p class="hero__stat-label">{{ stat.label }}</p>
      </article>
    </div>
  </section>
</template>