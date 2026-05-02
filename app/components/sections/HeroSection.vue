<script setup lang="ts">
import type { HeroContent } from "~/types/portfolio";

defineProps<{
  hero: HeroContent;
}>();
</script>

<template>
  <section
    id="home"
    class="section hero"
    v-motion
    :initial="{ opacity: 0, y: 24 }"
    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 620 } }"
  >
    <div class="hero__content">
      <p class="hero__role">{{ hero.role }}</p>
      <h1 class="hero__headline">{{ hero.headline }}</h1>
      <p class="hero__summary">{{ hero.summary }}</p>

      <div class="hero__meta">
        <span>{{ hero.location }}</span>
        <span>{{ hero.availability }}</span>
      </div>

      <div class="hero__actions">
        <a :href="hero.ctaPrimary.href" class="button button--primary">
          {{ hero.ctaPrimary.label }}
        </a>
        <a :href="hero.ctaSecondary.href" class="button button--ghost">
          {{ hero.ctaSecondary.label }}
        </a>
      </div>
    </div>

    <aside class="hero__aside">
      <figure class="hero__photo-card">
        <NuxtImg
          class="hero__photo"
          :src="hero.photo.src"
          :alt="hero.photo.alt"
          width="720"
          height="900"
          sizes="(max-width: 980px) 70vw, 24vw"
          loading="eager"
        />
      </figure>
    </aside>
  </section>
</template>