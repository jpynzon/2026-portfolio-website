<script setup lang="ts">
import type { ProjectItem } from '~/types/portfolio'

const props = defineProps<{
  project: ProjectItem
}>()

const hasLinks = computed(() => props.project.links.length > 0)
</script>

<template>
  <article class="project-card">
    <figure class="project-card__banner-wrap">
      <NuxtImg
        class="project-card__banner"
        :src="project.media.banner"
        :alt="project.media.alt"
        width="1200"
        height="675"
        sizes="(max-width: 980px) 100vw, 50vw"
        loading="lazy"
      />
    </figure>

    <ul class="project-card__gallery">
      <li v-for="(image, index) in project.media.gallery" :key="`${project.id}-gallery-${index}`">
        <NuxtImg
          class="project-card__gallery-image"
          :src="image"
          :alt="`${project.title} gallery image ${index + 1}`"
          width="420"
          height="280"
          sizes="(max-width: 980px) 33vw, 16vw"
          loading="lazy"
        />
      </li>
    </ul>

    <div class="project-card__header">
      <p class="project-card__period">{{ project.period }}</p>
      <h3 class="project-card__title">{{ project.title }}</h3>
      <p class="project-card__summary">{{ project.summary }}</p>
    </div>

    <ul class="project-card__highlights">
      <li v-for="highlight in project.highlights" :key="highlight">
        {{ highlight }}
      </li>
    </ul>

    <div class="project-card__meta">
      <ul class="project-card__stack">
        <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
      </ul>

      <div v-if="hasLinks" class="project-card__links">
        <a
          v-for="link in project.links"
          :key="link.href"
          :href="link.href"
          class="project-card__link"
          target="_blank"
          rel="noreferrer"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
  </article>
</template>
