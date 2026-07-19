<script setup lang="ts">
const { navLinks } = usePortfolioPage()

const {
  feed,
  onlineCount,
  currentUser,
  status,
  isLoadingHistory,
  historyError,
  sendError,
  cooldownRemaining,
  sendMessage,
  setUsername
} = useCommunityChat()

useSeoMeta({
  title: 'Community Chat',
  description:
    'Join the live community chat — a real-time room to say hello and talk shop.'
})

function handleSend(text: string) {
  sendMessage(text)
}

function handleRename(name: string) {
  setUsername(name)
}
</script>

<template>
  <main class="community-page">
    <div class="bg-orb bg-orb--one" />
    <div class="bg-orb bg-orb--two" />

    <AppHeader :links="navLinks" />

    <div class="community-page__body">
      <ChatWindow
        :feed="feed"
        :current-user="currentUser"
        :status="status"
        :online-count="onlineCount"
        :is-loading-history="isLoadingHistory"
        :history-error="historyError"
        :send-error="sendError"
        :cooldown-remaining="cooldownRemaining"
        @send="handleSend"
        @rename="handleRename"
      />
    </div>
  </main>
</template>

<style scoped>
.community-page {
  position: relative;
  width: min(1180px, calc(100% - 2.5rem));
  margin: 0 auto;
  padding-bottom: var(--space-7);
}

.community-page__body {
  margin-top: var(--space-5);
}
</style>
