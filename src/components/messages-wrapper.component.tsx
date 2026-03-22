import MessageItem from "@/components/message-item.component";

type Message = {
  _id: string;
  author: string;
  message: string;
  createdAt: string;
};

type MessagesWrapperProps = {
  messages: Message[];
  currentUser: string;
};

function MessagesWrapper({
  messages,
  currentUser,
}: MessagesWrapperProps) {
  return (
    <section
      aria-label="Messages"
      className="flex-1 overflow-y-auto px-4 py-6 sm:px-6"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
        <ol className="flex flex-col gap-2" role="list">
          {messages.map((item) => (
            <MessageItem
              key={item._id}
              author={item.author}
              message={item.message}
              createdAt={item.createdAt}
              isOwnMessage={item.author === currentUser}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

export default MessagesWrapper;