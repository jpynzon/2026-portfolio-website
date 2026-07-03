import { useHttpApi } from '~/config/httpApi'
import type { CommunityMessage } from '~/types/community'

interface HistoryResponse {
  messages: CommunityMessage[]
}

/**
 * REST access for community chat data. Kept separate from the websocket
 * layer — used to hydrate history on page load.
 */
export const communityService = () => {
  const $api = useHttpApi('backend')

  const fetchHistory = () => $api.get<HistoryResponse>('/community/messages')

  return { fetchHistory }
}
