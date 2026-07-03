import { chatService } from '~/services/chat/api.service'
import { nextTick, onMounted, ref } from 'vue'

export interface ChatMessage {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export function useChatbot() {
  const messages = ref<ChatMessage[]>([
    {
      id: '1',
      text: 'Hi! Welcome to my site. I\'m here to answer your questions about coding, building web apps, and working in tech. Just type whatever you\'d like to know.',
      isUser: false,
      timestamp: new Date()
    }
  ])

  const newMessage = ref('')
  const isLoading = ref(false)
  const isOpen = ref(false)
  const chatContainer = ref<HTMLElement | null>(null)

  const chatSessionId = useCookie<string>('chatSessionId', {
    path: '/',
    maxAge: 60 * 60 * 24 * 3650,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  const { sendMessage } = chatService()

  const scrollToBottom = () => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  }

  const formatMessageText = (text: string) => {
    const escapeHtml = (value: string) =>
      value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')

    return escapeHtml(text)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.+?)__/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/_(.+?)_/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br />')
  }

  const getOrCreateSessionId = () => {
    if (!chatSessionId.value) {
      const generated =
        typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
          ? crypto.randomUUID()
          : `chat-${Math.random().toString(36).slice(2)}-${Date.now()}`
      chatSessionId.value = generated
    }
    return chatSessionId.value
  }

  const sendChatMessage = async () => {
    if (!newMessage.value.trim() || isLoading.value) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: formatMessageText(newMessage.value.trim()),
      isUser: true,
      timestamp: new Date()
    }

    messages.value.push(userMessage)
    nextTick(scrollToBottom)

    const currentMessage = newMessage.value.trim()
    newMessage.value = ''
    isLoading.value = true
    const sessionId = getOrCreateSessionId()

    try {
      const response = await sendMessage(currentMessage, sessionId)
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: formatMessageText(response.reply),
        isUser: false,
        timestamp: new Date()
      }
      messages.value.push(botMessage)
      nextTick(scrollToBottom)
    } catch (error) {
      const status = (error as { status?: number; statusCode?: number })?.status
        ?? (error as { statusCode?: number })?.statusCode
      const errorText = status === 429
        ? 'You\'re sending messages a bit too fast. Please wait a moment and try again.'
        : status === 400
          ? 'That message couldn\'t be sent. Please keep it under 1000 characters.'
          : 'Sorry, I\'m having trouble connecting. Please try again later.'
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: errorText,
        isUser: false,
        timestamp: new Date()
      }
      messages.value.push(errorMessage)
      nextTick(scrollToBottom)
    } finally {
      isLoading.value = false
    }
  }

  const toggleOpen = () => {
    isOpen.value = !isOpen.value
    if (isOpen.value) {
      nextTick(scrollToBottom)
    }
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendChatMessage()
    }
  }

  onMounted(() => {
    getOrCreateSessionId()
    nextTick(scrollToBottom)
  })

  return {
    messages,
    newMessage,
    isLoading,
    isOpen,
    chatContainer,
    sendChatMessage,
    handleKeyPress,
    toggleOpen
  }
}
