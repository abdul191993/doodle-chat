import { useEffect, useRef, type UIEvent } from "react";

import MessageItem from "./message-item.component";
import type { TMessage } from "../models/messages.model";

type TMessagesWrapperProps = {
  messages: TMessage[];
  name: string;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadOlderMessages: () => void;
  scrollToBottomSignal: number;
};

const SCROLL_TOP_THRESHOLD = 60;

const MessagesWrapper = ({
  messages,
  name,
  hasNextPage,
  isFetchingNextPage,
  onLoadOlderMessages,
  scrollToBottomSignal,
}: TMessagesWrapperProps) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const initialScrollDoneRef = useRef(false);
  const previousScrollHeightRef = useRef<number | null>(null);

  const handleScroll = (event: UIEvent<HTMLElement>) => {
    const container = event.currentTarget;

    if (!initialScrollDoneRef.current || isFetchingNextPage || !hasNextPage) {
      return;
    }

    if (container.scrollTop <= SCROLL_TOP_THRESHOLD) {
      previousScrollHeightRef.current = container.scrollHeight;
      onLoadOlderMessages();
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    if (!container || messages.length === 0) {
      return;
    }

    if (!initialScrollDoneRef.current) {
      container.scrollTop = container.scrollHeight;
      initialScrollDoneRef.current = true;
      return;
    }

    if (!isFetchingNextPage && previousScrollHeightRef.current !== null) {
      const previousHeight = previousScrollHeightRef.current;
      const nextHeight = container.scrollHeight;

      container.scrollTop = nextHeight - previousHeight + container.scrollTop;
      previousScrollHeightRef.current = null;
    }
  }, [messages, isFetchingNextPage]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    container.scrollTop = container.scrollHeight;
  }, [scrollToBottomSignal]);

  return (
    <section
      ref={containerRef}
      aria-label="Messages"
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto px-4 py-6 sm:px-6"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
        {isFetchingNextPage ? (
          <p className="text-center text-xs text-slate-500">
            Loading older messages...
          </p>
        ) : null}

        {!hasNextPage && messages.length > 0 ? (
          <p className="text-center text-xs text-slate-400">
            Beginning of conversation
          </p>
        ) : null}

        <ol className="flex flex-col gap-2" role="list">
          {messages.map((message) => (
            <MessageItem key={message._id} message={message} name={name} />
          ))}
        </ol>

        {messages.length === 0 ? (
          <p className="text-center text-sm text-slate-500">
            No messages yet. Start the conversation.
          </p>
        ) : null}
      </div>
    </section>
  );
};

export default MessagesWrapper;