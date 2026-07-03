import type { Socket } from 'socket.io-client'
import { createCommunitySocket } from '~/services/community/socket.service'
import { communityService } from '~/services/community/community.api.service'
import {
  CLIENT_EVENT,
  SERVER_EVENT,
  CHAT_LIMITS,
  USERNAME_LIMITS,
  type ChatErrorPayload,
  type ChatFeedItem,
  type CommunityMessage,
  type ConnectionStatus,
  type PresenceChangePayload,
  type PresenceRenamePayload,
  type PresenceStatePayload,
  type PresenceUser,
  type SystemNotice,
  type WelcomePayload
} from '~/types/community'

/**
 * Owns the entire community chat lifecycle: history hydration, socket
 * connection, presence, deduplicated message feed and connection status.
 * Components consume the returned reactive state — no chat logic lives in the
 * view layer.
 */
export function useCommunityChat() {
  const { public: publicConfig } = useRuntimeConfig()

  // Prefer an explicit socket origin; otherwise derive it from the REST base
  // by stripping the trailing "/api" segment. Never hardcode the host.
  const socketUrl = (publicConfig.apiBase as string).replace(/\/api\/?$/, '')

  // Preferred display name, persisted across visits/reconnects.
  const usernameCookie = useCookie<string>('communityUsername', {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax'
  })

  const feed = ref<ChatFeedItem[]>([])
  const onlineUsers = ref<PresenceUser[]>([])
  const onlineCount = ref(0)
  const currentUser = ref<PresenceUser | null>(null)
  const status = ref<ConnectionStatus>('connecting')
  const isLoadingHistory = ref(false)
  const historyError = ref<string | null>(null)
  const sendError = ref<string | null>(null)

  // Guards against rendering the same message twice (history vs. live echo,
  // or any accidental re-emit on reconnect).
  const seenMessageIds = new Set<string>()

  let socket: Socket | null = null

  const addMessage = (message: CommunityMessage) => {
    if (seenMessageIds.has(message.id)) return
    seenMessageIds.add(message.id)
    feed.value.push({ kind: 'message', ...message })
  }

  const addSystemNotice = (
    notice: Omit<SystemNotice, 'id' | 'timestamp'>
  ) => {
    feed.value.push({
      kind: 'system',
      id: `system-${notice.type}-${feed.value.length}-${performance.now()}`,
      timestamp: new Date().toISOString(),
      ...notice
    })
  }

  async function loadHistory() {
    isLoadingHistory.value = true
    historyError.value = null
    try {
      const { messages } = await communityService().fetchHistory()
      messages.forEach(addMessage)
    } catch {
      historyError.value = 'Could not load chat history.'
    } finally {
      isLoadingHistory.value = false
    }
  }

  function registerSocketListeners(activeSocket: Socket) {
    // --- Connection lifecycle → status ---
    activeSocket.on('connect', () => {
      status.value = 'connected'
    })
    activeSocket.on('disconnect', () => {
      status.value = 'disconnected'
    })
    activeSocket.io.on('reconnect_attempt', () => {
      status.value = 'reconnecting'
    })
    activeSocket.on('connect_error', () => {
      // Still inside the automatic retry loop.
      if (status.value !== 'connected') status.value = 'reconnecting'
    })

    // --- Session identity ---
    activeSocket.on(SERVER_EVENT.Welcome, (payload: WelcomePayload) => {
      currentUser.value = payload.user
    })

    // --- Presence ---
    activeSocket.on(SERVER_EVENT.PresenceState, (payload: PresenceStatePayload) => {
      onlineUsers.value = payload.users
      onlineCount.value = payload.onlineCount
    })
    activeSocket.on(SERVER_EVENT.PresenceJoin, (payload: PresenceChangePayload) => {
      onlineUsers.value = [...onlineUsers.value, payload.user]
      onlineCount.value = payload.onlineCount
      addSystemNotice({ type: 'join', username: payload.user.username })
    })
    activeSocket.on(SERVER_EVENT.PresenceLeave, (payload: PresenceChangePayload) => {
      onlineUsers.value = onlineUsers.value.filter(
        (user) => user.userId !== payload.user.userId
      )
      onlineCount.value = payload.onlineCount
      addSystemNotice({ type: 'leave', username: payload.user.username })
    })
    activeSocket.on(SERVER_EVENT.PresenceRename, (payload: PresenceRenamePayload) => {
      onlineUsers.value = onlineUsers.value.map((user) =>
        user.userId === payload.user.userId ? payload.user : user
      )
      if (currentUser.value?.userId === payload.user.userId) {
        currentUser.value = payload.user
      }
      addSystemNotice({
        type: 'rename',
        username: payload.user.username,
        previousUsername: payload.previousUsername
      })
    })

    // --- Messages ---
    activeSocket.on(SERVER_EVENT.Message, addMessage)
    activeSocket.on(SERVER_EVENT.Error, (payload: ChatErrorPayload) => {
      sendError.value = payload.message
    })
  }

  function connect() {
    if (socket) return // never create a second socket / duplicate listeners
    status.value = 'connecting'
    socket = createCommunitySocket(socketUrl, {
      username: usernameCookie.value || undefined
    })
    registerSocketListeners(socket)
    socket.connect()
  }

  function disconnect() {
    if (!socket) return
    socket.removeAllListeners()
    socket.io.removeAllListeners()
    socket.disconnect()
    socket = null
  }

  /** Client-side guard mirrors the server rules for instant feedback. */
  function sendMessage(rawText: string): boolean {
    const text = rawText.trim()
    sendError.value = null

    if (!text) return false
    if (text.length > CHAT_LIMITS.MAX_MESSAGE_LENGTH) {
      sendError.value = `Message cannot exceed ${CHAT_LIMITS.MAX_MESSAGE_LENGTH} characters.`
      return false
    }
    if (!socket || status.value !== 'connected') {
      sendError.value = 'You are not connected. Please wait for reconnection.'
      return false
    }

    socket.emit(CLIENT_EVENT.Message, { text })
    return true
  }

  /**
   * Sets the preferred display name. Persists it (so it survives reloads and
   * is reused on reconnect), and applies it live if already connected.
   */
  function setUsername(rawName: string): boolean {
    const name = rawName.trim()
    sendError.value = null

    if (
      name.length < USERNAME_LIMITS.MIN_LENGTH ||
      name.length > USERNAME_LIMITS.MAX_LENGTH
    ) {
      sendError.value = `Name must be ${USERNAME_LIMITS.MIN_LENGTH}-${USERNAME_LIMITS.MAX_LENGTH} characters.`
      return false
    }

    usernameCookie.value = name

    if (socket) {
      // Keep the handshake auth current so reconnects retain the new name.
      socket.auth = { username: name }
      if (status.value === 'connected') {
        socket.emit(CLIENT_EVENT.Rename, { username: name })
      }
    }
    return true
  }

  // Client-only lifecycle: hydrate history, then open the live connection.
  onMounted(() => {
    loadHistory()
    connect()
  })
  onBeforeUnmount(disconnect)

  return {
    feed,
    onlineUsers,
    onlineCount,
    currentUser,
    status,
    isLoadingHistory,
    historyError,
    sendError,
    sendMessage,
    setUsername
  }
}
