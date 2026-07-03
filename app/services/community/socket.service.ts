import { io, type Socket } from 'socket.io-client'

/**
 * Isolates socket.io-client construction so composables/components stay
 * transport-agnostic. `autoConnect` is off so the caller can attach all
 * listeners before connecting (prevents missed events and duplicate handlers).
 * Reconnection is delegated to socket.io's built-in, backoff-based manager.
 * `auth` carries the preferred display name through the handshake (and any
 * later reconnects, once the caller updates `socket.auth`).
 */
export function createCommunitySocket(
  url: string,
  auth: { username?: string } = {}
): Socket {
  return io(url, {
    path: '/socket.io',
    transports: ['websocket', 'polling'],
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 10000,
    auth
  })
}
