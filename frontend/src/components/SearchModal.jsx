import { MessageCircleMore, PenSquare, X } from "lucide-react";
import { Link } from "react-router";
import useDebounce from "../hooks/useDebounce";
import { useState, useMemo } from "react";

const isToday = (date) => {
  const today = new Date();
  const d = new Date(date);
  return d.toDateString() === today.toDateString();
};

const isYesterday = (date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const d = new Date(date);
  return d.toDateString() === yesterday.toDateString();
};

const isPrevious = (date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const d = new Date(date);
  return d < yesterday;
};

const Section = ({ title, chats, setShowModal }) => {
  if (chats.length === 0) return null;

  return (
    <div className="space-y-0.5">
      <p className="px-3 py-1 text-xs text-textSecondary uppercase">
        {title}
      </p>

      {chats.map((chat) => (
        <Link
          key={chat._id}
          to={`/c/${chat.conversationId}`}
          onClick={() => setShowModal(false)}
          className="flex text-sm items-center gap-2 py-3 hover:bg-accentBg px-3 rounded-lg text-textPrimary cursor-pointer"
        >
          <MessageCircleMore size={17} />
          <span className="truncate">{chat.title}</span>
        </Link>
      ))}
    </div>
  );
};

export default function SearchModal({ setShowModal, conversations }) {
  const [input, setInput] = useState("");

  const debouncedInput = useDebounce(input, 300);

  const {
    todayChats,
    yesterdayChats,
    previousChats,
  } = useMemo(() => {
    const filtered = conversations.filter((chat) =>
      chat.title.toLowerCase().includes(debouncedInput.toLowerCase())
    );

    return {
      todayChats: filtered.filter((c) => isToday(c.createdAt)),
      yesterdayChats: filtered.filter((c) => isYesterday(c.createdAt)),
      previousChats: filtered.filter((c) => isPrevious(c.createdAt)),
    };
  }, [conversations, debouncedInput]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
      <div className="w-full max-w-[650px] h-full max-h-[450px] rounded-lg bg-bgSecondary shadow-md border border-border flex flex-col mx-2">

        <div className="border-b border-border px-4 py-2 flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search chat..."
            className="w-full rounded-md p-2 outline-none bg-bgSecondary flex-1"
          />

          <div
            onClick={() => setShowModal(false)}
            className="text-accent hover:bg-accentBg rounded-full p-1 cursor-pointer transition-transform duration-300 hover:rotate-90"
          >
            <X />
          </div>
        </div>

        <div className="px-4 py-4 overflow-y-auto flex-1 space-y-4">

          <Link
            to={"/"}
            onClick={() => setShowModal(false)}
            className="flex items-center gap-2 text-sm py-3 hover:bg-accentBg px-3 rounded-lg text-textPrimary"
          >
            <PenSquare size={17} />
            <span>New Chat</span>
          </Link>

          <Section title="Today" chats={todayChats} setShowModal={setShowModal} />
          <Section title="Yesterday" chats={yesterdayChats} setShowModal={setShowModal} />
          <Section title="Previous Chat" chats={previousChats} setShowModal={setShowModal} />

          {todayChats.length === 0 &&
            yesterdayChats.length === 0 &&
            previousChats.length === 0 && (
              <p className="text-sm text-textSecondary px-3 py-4">
                No conversations found
              </p>
            )}
        </div>
      </div>
    </div>
  );
}
