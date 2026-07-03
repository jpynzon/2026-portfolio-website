// Community Chat contract. Mirrors api/src/types/community.types.ts and
// api/src/websocket/events/chat.events.ts — keep both sides in sync.

export interface CommunityMessage {
  id: string
  userId: string
  username: string
  text: string
  timestamp: string // ISO-8601
}

export interface PresenceUser {
  userId: string
  username: string
}

export type ConnectionStatus =
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'disconnected'

// Join/leave/rename notices rendered inline in the message stream.
export interface SystemNotice {
  id: string
  type: 'join' | 'leave' | 'rename'
  username: string
  previousUsername?: string
  timestamp: string
}

// A unified feed item so the list can render messages and notices in order.
export type ChatFeedItem =
  | ({ kind: 'message' } & CommunityMessage)
  | ({ kind: 'system' } & SystemNotice)

export const CLIENT_EVENT = {
  Message: 'chat:message',
  Rename: 'chat:rename',
} as const

export const SERVER_EVENT = {
  Welcome: 'session:welcome',
  Message: 'chat:message',
  PresenceState: 'presence:state',
  PresenceJoin: 'presence:join',
  PresenceLeave: 'presence:leave',
  PresenceRename: 'presence:rename',
  Error: 'chat:error',
} as const

export const CHAT_LIMITS = {
  MAX_MESSAGE_LENGTH: 500,
} as const

export const USERNAME_LIMITS = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 20,
} as const

export interface WelcomePayload {
  user: PresenceUser
}

export interface PresenceStatePayload {
  users: PresenceUser[]
  onlineCount: number
}

export interface PresenceChangePayload {
  user: PresenceUser
  onlineCount: number
}

export interface PresenceRenamePayload {
  user: PresenceUser
  previousUsername: string
}

export interface ChatErrorPayload {
  message: string
}
