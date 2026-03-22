import MessageItem from "./message-item.component";
import type { TMessage } from "../models/messages.model";

type TMessagesWrapperProps = {
  messages: TMessage[];
  name: string;
};

const MessagesWrapper = ({ messages, name }: TMessagesWrapperProps) => {
  return (
    <section
      aria-label="Messages"
      className="flex-1 overflow-y-auto px-4 py-6 sm:px-6"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
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