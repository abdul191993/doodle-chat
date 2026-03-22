import type { TGetMessagesParams } from "../../models/messages.model";

export const messageKeys = {
  all: ["messages"] as const,
  list: (params?: TGetMessagesParams) =>
    [...messageKeys.all, "list", params] as const,
  infiniteList: (params?: TGetMessagesParams) =>
    [...messageKeys.all, "infinite-list", params] as const,
};