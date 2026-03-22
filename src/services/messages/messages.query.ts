import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessages } from "./messages.service";
import { messageKeys } from "./messages.keys";
import { sortMessagesByCreatedAt } from "../../utils/message-helpers";
import type { TGetMessagesParams, TMessage } from "../../models/messages.model";

const INITIAL_MESSAGES_CURSOR = null;

const getNextPageParam = (lastPage: TMessage[], limit?: number) => {
  if (!lastPage.length) {
    return undefined;
  }

  if (limit && lastPage.length < limit) {
    return undefined;
  }

  return lastPage[0]?.createdAt;
};

export const useMessagesInfiniteQuery = (params?: TGetMessagesParams) => {
  return useInfiniteQuery({
    queryKey: messageKeys.infiniteList(params),
    initialPageParam: INITIAL_MESSAGES_CURSOR as string | null,
    queryFn: ({ pageParam }) =>
      getMessages({
        ...params,
        before: pageParam ?? new Date().toISOString(),
      }).then(sortMessagesByCreatedAt),
    getNextPageParam: (lastPage) => getNextPageParam(lastPage, params?.limit),
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });
};