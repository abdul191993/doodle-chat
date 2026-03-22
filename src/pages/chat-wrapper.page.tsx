import { useMemo } from "react";

import bgImage from "@/assets/background.png";
import { useUser } from "@/context/user.context";
import MessagesWrapper from "../components/messages-wrapper.component";
import MessageComposer from "../components/message-composer.component";
import NameModal from "../components/name.modal";
import { useMessagesInfiniteQuery } from "../services/messages/messages.query";

import type { TMessage } from "../models/messages.model";

const LATEST_MESSAGES_LIMIT = 10;

const sortMessagesByCreatedAt = (messages: TMessage[]) =>
  [...messages].sort(
    (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

const mergeUniqueMessages = (
  currentMessages: TMessage[],
  incomingMessages: TMessage[]
) => {
  const merged = [...currentMessages, ...incomingMessages];

  const uniqueMessages = merged.filter((message, index, self) => {
    return index === self.findIndex((item) => item._id === message._id);
  });

  return sortMessagesByCreatedAt(uniqueMessages);
};

function ChatPage() {
  const { name } = useUser();

  const { data, isLoading, isError, error, refetch } = useMessagesInfiniteQuery({
    limit: LATEST_MESSAGES_LIMIT,
  });

  const messages = useMemo(() => {
    const allMessages = data?.pages.flatMap((page) => page) ?? [];
    return mergeUniqueMessages([], allMessages);
  }, [data]);

  const handleMessageSent = () => {
    void refetch();
  };

  const content = (() => {
    if (isLoading && !messages.length) {
      return (
        <div className="flex flex-1 items-center justify-center" role="status">
          <p className="text-sm text-slate-600">Loading messages...</p>
        </div>
      );
    }

    if (isError && !messages.length) {
      return (
        <div className="flex flex-1 items-center justify-center" role="alert">
          <p className="text-sm text-red-600">
            {error instanceof Error ? error.message : "Failed to load messages."}
          </p>
        </div>
      );
    }

    return <MessagesWrapper messages={messages} name={name} />;
  })();

  return (
    <main
      aria-label="Doodle Chat conversation"
      className="flex h-screen flex-col bg-[#efeae2] bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h1 className="sr-only">Doodle Chat</h1>

      <header className="border-b border-black/10 bg-[#f0f2f5] px-4 py-3">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dfe5e7] text-sm font-semibold text-slate-700">
            DC
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#111b21]">
              Doodle Chat
            </p>
            <p className="text-xs text-[#667781]">
              {name ? `Chatting as ${name}` : "Frontend challenge"}
            </p>
          </div>
        </div>
      </header>

      <NameModal />
      {content}
      <MessageComposer name={name} onMessageSent={handleMessageSent} />
    </main>
  );
}

export default ChatPage;