import type { ContactFormInput } from "~/types/portfolio";
import { useHttpApi } from "~/config/httpApi";

interface ContactResponse {
  success: boolean;
  message: string;
}

export const contactService = () => {
  const $api = useHttpApi("backend");

  const sendContact = async (payload: ContactFormInput) => {
    return $api.post<ContactResponse>("/contact", {
      body: payload,
    });
  };

  return {
    sendContact,
  };
};
