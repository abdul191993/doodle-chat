import { useState, type FormEvent } from "react";
import { useCreateMessageMutation } from "@/services/messages/messages.mutations";
import { normalizeUserName } from "@/utils/user-name";

type TMessageComposerProps = {
  name: string;
  onMessageSent: () => void;
};

const SEND_ERROR_ID = "message-composer-error";
const MESSAGE_HINT_ID = "message-composer-hint";

const MessageComposer = ({ name, onMessageSent }: TMessageComposerProps) => {
  const [message, setMessage] = useState("");
  const { mutate, isPending, isError } = useCreateMessageMutation();

  const trimmedMessage = message.trim();
  const trimmedName = normalizeUserName(name);
  const isComposerDisabled = isPending || !trimmedName || !trimmedMessage;
  const describedBy = isError
    ? `${MESSAGE_HINT_ID} ${SEND_ERROR_ID}`
    : MESSAGE_HINT_ID;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isComposerDisabled) {
      return;
    }

    mutate(
      {
        author: trimmedName,
        message: trimmedMessage,
      },
      {
        onSuccess: () => {
          setMessage("");
          onMessageSent();
        },
      }
    );
  };

  return (
    <section
      aria-label="Compose a message"
      className="border-t border-black/10 bg-[#f0f2f5] px-3 py-3 sm:px-4"
    >
      <div className="mx-auto w-full max-w-3xl">
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <label htmlFor="message-input" className="sr-only">
            Type your message
          </label>
          <p id={MESSAGE_HINT_ID} className="sr-only">
            Press the send button to post your message to the chat.
          </p>

          <input
            id="message-input"
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={`Message as ${trimmedName || "guest"}`}
            autoComplete="off"
            aria-describedby={describedBy}
            aria-invalid={isError}
            enterKeyHint="send"
            disabled={isPending || !trimmedName}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100"
          />

          <button
            type="submit"
            aria-label="Send message"
            disabled={isComposerDisabled}
            className="rounded-lg bg-[#f59e0b] px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Sending..." : "Send"}
          </button>
        </form>

        {isError ? (
          <p
            id={SEND_ERROR_ID}
            className="mt-2 text-sm text-red-600"
            aria-live="assertive"
          >
            Failed to send message. Please try again.
          </p>
        ) : null}
      </div>
    </section>
  );
};

export default MessageComposer;