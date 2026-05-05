import { useHttpApi } from "~/config/httpApi";

interface ChatRequest {
  message: string;
  sessionId?: string;
}

interface ChatResponse {
  reply: string;
}

export const chatService = () => {
  const $api = useHttpApi("backend");

  const sendMessage = async (message: string, sessionId?: string) => {
    const payload: ChatRequest = { message }
    if (sessionId) {
      payload.sessionId = sessionId
    }

    return $api.post<ChatResponse>("/chat", {
      body: payload,
    });
  };

  return {
    sendMessage,
  };
};