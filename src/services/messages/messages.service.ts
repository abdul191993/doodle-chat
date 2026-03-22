import { api } from "../api";
import type {
  TCreateMessagePayload,
  TGetMessagesParams,
  TMessage,
} from "../../models/messages.model";

export const getMessages = async (
  params?: TGetMessagesParams
): Promise<TMessage[]> => {
  const response = await api.get<TMessage[]>("/messages", {
    params,
  });

  return response.data;
};

export const createMessage = async (
  payload: TCreateMessagePayload
): Promise<TMessage> => {
  const response = await api.post<TMessage>("/messages", payload);
  return response.data;
};