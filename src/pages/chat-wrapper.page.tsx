import bgImage from "@/assets/background.png";

const currentUser = "Ahsan";

const dummyMessages = [
  {
    _id: "1",
    author: "John",
    message: "Hey, welcome to Doodle Chat.",
    createdAt: "22 Mar 2026 10:10",
  },
  {
    _id: "2",
    author: "Sarah",
    message: "We need the frontend version to match exactly.",
    createdAt: "22 Mar 2026 10:11",
  },
  {
    _id: "3",
    author: currentUser,
    message: "Got it. I’ll rebuild the UI first.",
    createdAt: "22 Mar 2026 10:12",
  },
  {
    _id: "4",
    author: "John",
    message: "Perfect. Then we can wire up the API step by step.",
    createdAt: "22 Mar 2026 10:13",
  },
];

function ChatPage() {
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
              Frontend challenge preview
            </p>
          </div>
        </div>
      </header>

      <section
        aria-label="Messages"
        className="flex-1 overflow-y-auto px-4 py-6 sm:px-6"
      >
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
          <ol className="flex flex-col gap-2" role="list">
            {dummyMessages.map((message) => {
              const isOwnMessage = message.author === currentUser;

              return (
                <li
                  key={message._id}
                  className={`flex ${
                    isOwnMessage ? "justify-end" : "justify-start"
                  }`}
                >
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

                    <p className="text-sm leading-5 text-[#111b21]">
                      {message.message}
                    </p>

                    <div className="mt-1 flex justify-end">
                      <time className="text-[11px] text-[#667781]">
                        {message.createdAt}
                      </time>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

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
              placeholder="Message as Ahsan"
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
    </main>
  );
}

export default ChatPage;