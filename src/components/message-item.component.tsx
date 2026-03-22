type MessageItemProps = {
  author: string;
  message: string;
  createdAt: string;
  isOwnMessage: boolean;
};

function MessageItem({
  author,
  message,
  createdAt,
  isOwnMessage,
}: MessageItemProps) {
  return (
    <li className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <article
        className={[
          "max-w-[85%] rounded-lg px-3 py-2 shadow-sm sm:max-w-[70%]",
          isOwnMessage ? "bg-[#d9fdd3]" : "bg-white",
        ].join(" ")}
      >
        {!isOwnMessage && (
          <p className="mb-1 text-xs font-semibold text-[#667781]">{author}</p>
        )}

        <p className="text-sm leading-5 whitespace-pre-wrap text-[#111b21]">
          {message}
        </p>

        <div className="mt-1 flex justify-end">
          <time className="text-[11px] text-[#667781]">{createdAt}</time>
        </div>
      </article>
    </li>
  );
}

export default MessageItem;