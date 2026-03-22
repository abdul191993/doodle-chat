import type { TMessage } from "../models/messages.model";

export const sortMessagesByCreatedAt = (messages: TMessage[]) =>
  [...messages].sort(
    (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

export const mergeUniqueMessages = (
  currentMessages: TMessage[],
  incomingMessages: TMessage[]
) => {
  const merged = [...currentMessages, ...incomingMessages];

  const uniqueMessages = merged.filter((message, index, self) => {
    return index === self.findIndex((item) => item._id === message._id);
  });

  return sortMessagesByCreatedAt(uniqueMessages);
};