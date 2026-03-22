import type { TMessage } from "../models/messages.model";
import { formatMessageTime } from "@/utils/format-message-time";
import { parseMessageContent } from "@/utils/parse-message-content";
import { normalizeUserName } from "@/utils/user-name";

type TMessageItemProps = {
  message: TMessage;
  name: string;
};

const MessageItem = ({ message, name }: TMessageItemProps) => {
  const normalizedName = normalizeUserName(name);
  const normalizedAuthor = normalizeUserName(message.author);
  const isOwnMessage =
    Boolean(normalizedName) && normalizedAuthor === normalizedName;

  const parsedMessage = parseMessageContent(message.message);
  const formattedTime = formatMessageTime(message.createdAt);

  return (
    <li className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <article
        className={[
          "max-w-[85%] rounded-lg px-3 py-2 shadow-sm sm:max-w-[70%]",
          isOwnMessage ? "bg-[#d9fdd3]" : "bg-white",
        ].join(" ")}
      >
        {!isOwnMessage && (
          <p className="mb-1 text-xs font-semibold text-[#667781]">
            {message.author}
          </p>
        )}

        <p className="whitespace-pre-wrap wrap-break-word text-sm leading-5 text-[#111b21]">
          {parsedMessage}
        </p>

        <div className="mt-1 flex justify-end">
          <time
            className="text-[11px] text-[#667781]"
            dateTime={message.createdAt}
          >
            {formattedTime}
          </time>
        </div>
      </article>
    </li>
  );
};

export default MessageItem;