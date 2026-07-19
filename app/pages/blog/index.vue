<script setup lang="ts">
const { navLinks } = usePortfolioPage()

const { data: posts } = await useAsyncData('blog-list', () =>
  queryCollection('blog').order('date', 'DESC').all()
)

// Hide drafts from the public list.
const publishedPosts = computed(() =>
  (posts.value ?? []).filter((post) => post.draft !== true)
)

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
})

function formatDate(value: string) {
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? value : dateFormatter.format(parsed)
}

useSeoMeta({
  title: 'Blog',
  description:
    'Occasional writing from Joshua Ynzon — notes on building software, decisions, and tradeoffs.'
})
</script>

<template>
  <main class="blog-page">
    <div class="bg-orb bg-orb--one" />
    <div class="bg-orb bg-orb--two" />

    <AppHeader :links="navLinks" />

    <section class="blog-page__body">
      <header class="blog-page__intro">
        <p class="blog-page__eyebrow">Writing</p>
        <h1 class="blog-page__title">Blog</h1>
        <p class="blog-page__lede">
          An occasional corner for notes on building software — problems, decisions, and
          the tradeoffs behind them.
        </p>
      </header>

      <p v-if="!publishedPosts.length" class="blog-page__empty">
        No posts yet — check back soon.
      </p>

      <ul v-else class="blog-list">
        <li v-for="post in publishedPosts" :key="post.path" class="blog-list__item">
          <NuxtLink :to="post.path" class="post-card">
            <time v-if="post.date" class="post-card__date" :datetime="post.date">
              {{ formatDate(post.date) }}
            </time>
            <h2 class="post-card__title">{{ post.title }}</h2>
            <p v-if="post.description" class="post-card__desc">{{ post.description }}</p>
            <ul v-if="post.tags?.length" class="post-card__tags">
              <li v-for="tag in post.tags" :key="tag" class="post-card__tag">#{{ tag }}</li>
            </ul>
            <span class="post-card__more">Read post →</span>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.blog-page {
  position: relative;
  width: min(1180px, calc(100% - 2.5rem));
  margin: 0 auto;
  padding-bottom: var(--space-7);
}

.blog-page__body {
  margin-top: var(--space-5);
}

.blog-page__intro {
  margin-bottom: var(--space-6);
}

.blog-page__eyebrow {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: var(--space-1);
}

.blog-page__title {
  font-family: var(--font-heading);
  font-size: clamp(2.2rem, 5vw, 3rem);
  line-height: 1.05;
  color: var(--text-primary);
  margin: 0;
}

.blog-page__lede {
  margin-top: var(--space-2);
  max-width: 48ch;
  color: var(--text-secondary);
  line-height: 1.6;
}

.blog-page__empty {
  color: var(--text-muted);
  padding: var(--space-5) 0;
}

.blog-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-4);
}

.post-card {
  display: block;
  padding: var(--space-4);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--surface);
  box-shadow: var(--shadow-card);
  text-decoration: none;
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.post-card:hover,
.post-card:focus-visible {
  transform: translateY(-3px);
  border-color: var(--line-strong);
  box-shadow: var(--shadow-pop);
}

.post-card__date {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  color: var(--text-muted);
}

.post-card__title {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  line-height: 1.2;
  color: var(--text-primary);
  margin: var(--space-1) 0 0;
}

.post-card__desc {
  margin: var(--space-2) 0 0;
  color: var(--text-secondary);
  line-height: 1.6;
}

.post-card__tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  margin: var(--space-3) 0 0;
  padding: 0;
}

.post-card__tag {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-secondary);
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-radius: var(--radius-pill);
  padding: 0.2rem 0.6rem;
}

.post-card__more {
  display: inline-block;
  margin-top: var(--space-3);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent);
}
</style>
