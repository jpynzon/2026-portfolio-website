<script setup lang="ts">
import type { JourneyItem } from '~/types/portfolio'

const props = defineProps<{
  item: JourneyItem
}>()

const isViewerOpen = ref(false)
const activeImageIndex = ref(0)

const experienceImages = computed(() => [
  ...(props.item.media.banner ? [{
    src: props.item.media.banner,
    alt: props.item.media.alt
  }] : []),
  ...props.item.media.gallery.filter(src => src).map((src, index) => ({
    src,
    alt: `${props.item.company} image ${index + 1}`
  }))
])

const activeImage = computed(() => experienceImages.value[activeImageIndex.value] ?? null)
const hasMultipleImages = computed(() => experienceImages.value.length > 1)

function openViewer(index: number) {
  const total = experienceImages.value.length
  if (!total) return

  activeImageIndex.value = ((index % total) + total) % total
  isViewerOpen.value = true
}

function closeViewer() {
  isViewerOpen.value = false
}

function showPreviousImage() {
  const total = experienceImages.value.length
  if (!total) return
  activeImageIndex.value = (activeImageIndex.value - 1 + total) % total
}

function showNextImage() {
  const total = experienceImages.value.length
  if (!total) return
  activeImageIndex.value = (activeImageIndex.value + 1) % total
}

function onKeydown(event: KeyboardEvent) {
  if (!isViewerOpen.value) return

  if (event.key === 'Escape') {
    closeViewer()
    return
  }

  if (event.key === 'ArrowLeft') {
    showPreviousImage()
    return
  }

  if (event.key === 'ArrowRight') {
    showNextImage()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

watch(isViewerOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
})
</script>

<template>
  <article class="timeline-item">
    <p class="timeline-item__period">{{ item.period }}</p>
    <h3 class="timeline-item__role">{{ item.role }}</h3>
    <p class="timeline-item__company">{{ item.company }}</p>
    <p class="timeline-item__summary">{{ item.summary }}</p>
    <ul class="timeline-item__highlights">
      <li v-for="highlight in item.highlights" :key="highlight">{{ highlight }}</li>
    </ul>

    <div v-if="experienceImages.length > 0" class="timeline-item__media">
      <p class="timeline-item__media-label">Snapshots</p>
      <ul class="timeline-item__thumbnails">
        <li
          v-for="(image, index) in experienceImages"
          :key="`${item.company}-${item.period}-${image.src}`"
        >
          <button
            type="button"
            class="timeline-item__thumbnail-button"
            :aria-label="`Open image ${index + 1}`"
            @click="openViewer(index)"
          >
            <NuxtImg
              class="timeline-item__thumbnail-image"
              :src="image.src"
              :alt="image.alt"
              width="160"
              height="110"
              sizes="(max-width: 980px) 25vw, 11vw"
              loading="lazy"
            />
          </button>
        </li>
      </ul>
    </div>

    <Teleport to="body">
      <div
        v-if="isViewerOpen && activeImage"
        class="timeline-lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="`${item.company} image viewer`"
        @click.self="closeViewer"
      >
        <button type="button" class="timeline-lightbox__close" aria-label="Close viewer" @click="closeViewer">
          Close
        </button>

        <button
          v-if="hasMultipleImages"
          type="button"
          class="timeline-lightbox__nav timeline-lightbox__nav--prev"
          aria-label="Previous image"
          @click="showPreviousImage"
        >
          &lsaquo;
        </button>

        <figure class="timeline-lightbox__figure">
          <NuxtImg
            class="timeline-lightbox__image"
            :src="activeImage.src"
            :alt="activeImage.alt"
            width="1400"
            height="900"
            sizes="90vw"
            fit="contain"
            loading="eager"
          />
          <figcaption class="timeline-lightbox__caption">
            {{ activeImageIndex + 1 }} / {{ experienceImages.length }}
          </figcaption>
        </figure>

        <button
          v-if="hasMultipleImages"
          type="button"
          class="timeline-lightbox__nav timeline-lightbox__nav--next"
          aria-label="Next image"
          @click="showNextImage"
        >
          &rsaquo;
        </button>
      </div>
    </Teleport>
  </article>
</template>
