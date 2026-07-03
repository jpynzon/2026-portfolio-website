import { RATE_LIMIT } from '~/types/community'

export interface RateLimitVerdict {
  allowed: boolean
  retryAfterMs: number
  nextCooldownMs: number
}

export interface ChatRateLimiter {
  attempt: (now: number) => RateLimitVerdict
}

/**
 * Client-side mirror of the server rate limiter (api rate-limit.service.ts).
 * Drives the send-button countdown for instant feedback; the server stays the
 * source of truth and will still reject anything that slips past this.
 */
export function createChatRateLimiter(): ChatRateLimiter {
  let lastMessageAt = 0
  let burstCount = 0

  const cooldownFor = (count: number): number =>
    count >= RATE_LIMIT.BURST_LIMIT
      ? RATE_LIMIT.BURST_COOLDOWN_MS
      : RATE_LIMIT.MESSAGE_COOLDOWN_MS

  return {
    attempt(now: number): RateLimitVerdict {
      const requiredGap = cooldownFor(burstCount)
      const elapsed = now - lastMessageAt

      if (lastMessageAt !== 0 && elapsed < requiredGap) {
        return { allowed: false, retryAfterMs: requiredGap - elapsed, nextCooldownMs: 0 }
      }

      if (burstCount >= RATE_LIMIT.BURST_LIMIT) burstCount = 0
      burstCount++
      lastMessageAt = now

      return { allowed: true, retryAfterMs: 0, nextCooldownMs: cooldownFor(burstCount) }
    }
  }
}
