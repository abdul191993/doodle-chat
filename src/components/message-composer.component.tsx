type MessageComposerProps = {
  currentUser: string;
};

function MessageComposer({ currentUser }: MessageComposerProps) {
  return (
    <section
      aria-label="Compose a message"
      className="border-t border-black/10 bg-[#f0f2f5] px-3 py-3 sm:px-4"
    >
      <div className="mx-auto w-full max-w-3xl">
        <form className="flex items-end gap-2">
          <label htmlFor="message-input" className="sr-only">
            Type your message
          </label>

          <input
            id="message-input"
            type="text"
            placeholder={`Message as ${currentUser}`}
            autoComplete="off"
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-gray-400"
          />

          <button
            type="button"
            className="rounded-lg bg-[#f59e0b] px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}

export default MessageComposer;