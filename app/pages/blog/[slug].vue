<script setup lang="ts">
const { navLinks } = usePortfolioPage()
const route = useRoute()

// `route.path` (e.g. /blog/hello-world) matches the collection's stored page path.
const { data: post } = await useAsyncData(`blog-${route.path}`, () =>
  queryCollection('blog').path(route.path).first()
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

const formattedDate = computed(() => {
  const value = post.value?.date
  if (!value) return ''
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? value : dateFormatter.format(parsed)
})

useSeoMeta({
  title: () => post.value?.title ?? 'Blog',
  description: () => post.value?.description ?? undefined
})
</script>

<template>
  <main class="blog-post">
    <div class="bg-orb bg-orb--one" />
    <div class="bg-orb bg-orb--two" />

    <AppHeader :links="navLinks" />

    <article v-if="post" class="blog-post__body">
      <NuxtLink to="/blog" class="blog-post__back">← Back to blog</NuxtLink>

      <header class="blog-post__header">
        <time v-if="post.date" class="blog-post__date" :datetime="post.date">
          {{ formattedDate }}
        </time>
        <h1 class="blog-post__title">{{ post.title }}</h1>
        <p v-if="post.description" class="blog-post__lede">{{ post.description }}</p>
        <ul v-if="post.tags?.length" class="blog-post__tags">
          <li v-for="tag in post.tags" :key="tag" class="blog-post__tag">#{{ tag }}</li>
        </ul>
      </header>

      <div class="blog-post__content">
        <ContentRenderer :value="post" />
      </div>
    </article>
  </main>
</template>

<style scoped>
.blog-post {
  position: relative;
  width: min(1180px, calc(100% - 2.5rem));
  margin: 0 auto;
  padding-bottom: var(--space-7);
}

.blog-post__body {
  margin-top: var(--space-5);
  width: min(760px, 100%);
  margin-inline: auto;
}

.blog-post__back {
  display: inline-block;
  margin-bottom: var(--space-4);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
}

.blog-post__back:hover {
  text-decoration: underline;
}

.blog-post__header {
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--line);
  margin-bottom: var(--space-5);
}

.blog-post__date {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  color: var(--text-muted);
}

.blog-post__title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4.5vw, 2.8rem);
  line-height: 1.1;
  color: var(--text-primary);
  margin: var(--space-1) 0 0;
}

.blog-post__lede {
  margin: var(--space-3) 0 0;
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.blog-post__tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  margin: var(--space-4) 0 0;
  padding: 0;
}

.blog-post__tag {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-secondary);
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-radius: var(--radius-pill);
  padding: 0.2rem 0.6rem;
}

/* Prose — style the markdown rendered by <ContentRenderer>. */
.blog-post__content {
  color: var(--text-secondary);
  line-height: 1.75;
  font-size: 1.02rem;
}

.blog-post__content :deep(h2) {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  line-height: 1.25;
  color: var(--text-primary);
  margin: var(--space-6) 0 var(--space-3);
}

.blog-post__content :deep(h3) {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  color: var(--text-primary);
  margin: var(--space-5) 0 var(--space-2);
}

.blog-post__content :deep(p) {
  margin: 0 0 var(--space-4);
}

.blog-post__content :deep(a) {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.blog-post__content :deep(ul),
.blog-post__content :deep(ol) {
  margin: 0 0 var(--space-4);
  padding-left: 1.4rem;
}

.blog-post__content :deep(li) {
  margin: 0 0 var(--space-1);
}

.blog-post__content :deep(strong) {
  color: var(--text-primary);
  font-weight: 600;
}

.blog-post__content :deep(blockquote) {
  margin: var(--space-5) 0;
  padding: var(--space-2) var(--space-4);
  border-left: 3px solid var(--accent);
  background: var(--surface-2);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  color: var(--text-secondary);
  font-style: italic;
}

.blog-post__content :deep(blockquote p:last-child) {
  margin-bottom: 0;
}

.blog-post__content :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.88em;
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 0.12em 0.4em;
}

.blog-post__content :deep(pre) {
  margin: 0 0 var(--space-4);
  padding: var(--space-4);
  overflow-x: auto;
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
}

.blog-post__content :deep(pre code) {
  background: none;
  border: none;
  padding: 0;
  font-size: 0.85rem;
  color: var(--text-primary);
}

.blog-post__content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-md);
}

.blog-post__content :deep(hr) {
  border: none;
  border-top: 1px solid var(--line);
  margin: var(--space-6) 0;
}
</style>
