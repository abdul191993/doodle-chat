import bgImage from "@/assets/background.png";
import MessageComposer from "@/components/message-composer.component";
import MessagesWrapper from "@/components/messages-wrapper.component";
import NameModal from "@/components/name.modal";
import { useUser } from "@/context/user.context";

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
    author: "Ahsan",
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

function ChatWrapperPage() {
  const { name } = useUser();

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

      <MessagesWrapper messages={dummyMessages} currentUser={name} />

      <MessageComposer currentUser={name} />
    </main>
  );
}

export default ChatWrapperPage;