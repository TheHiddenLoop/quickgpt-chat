import { Send, User, Bot } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendMessage, getMessage, addMessage } from "../fetures/chat/chatSlice";
import { selectAiBotMessage, selectAiBotStatus } from "../fetures/chat/chatSelector";
import { useParams } from "react-router";
import Markdown from "react-markdown"

function Chat() {
  const [message, setMessage] = useState("");
  const { conversationId } = useParams();

  const messages = useSelector(selectAiBotMessage);
  const loading = useSelector(selectAiBotStatus);
  const dispatch = useDispatch();

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!conversationId) return;
    dispatch(getMessage(conversationId));
  }, [dispatch, conversationId]);

  const handleSend = () => {
    if (!message.trim()) return;
    dispatch(addMessage({ sender: "user", content: message }));
    dispatch(sendMessage({ question: message, conversationId }));
    setMessage("");
  };

  const suggestedPrompts = [
    "Tell me a joke",
    "How can you help me?",
    "What's the weather like?",
    "Explain quantum computing"
  ];

  return (
    <div className="h-full flex flex-col bg-bgPrimary text-textPrimary font-robot">

      <div className="flex-1 overflow-y-auto p-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "bot" && (
              <div className="p-2 rounded-full bg-accentBg text-accent">
                <Bot size={18} />
              </div>
            )}

            <div
              className={` max-w-full md:max-w-[70%] px-4 py-2 rounded-xl  text-sm leading-relaxed
                ${msg.sender === "user"
                  ? "bg-primary text-white rounded-br-none mb-3"
                  : "bg-secondaryBg text-textPrimary rounded-tl-none mb-3"
                }`}
            >
              {msg.sender === "user" ? msg.content : (
                <div className="reset-tw"><Markdown>{msg.content}</Markdown></div>
              )}
            </div>

            {msg.sender === "user" && (
              <div className="p-2 rounded-full bg-primaryBg text-primary">
                <User size={18} />
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-border p-2 bg-bgSecondary">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 px-4 py-3 rounded-lg bg-bgPrimary border border-border
              focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />

          <button
            onClick={handleSend}
            disabled={loading === "loading"}
            aria-label="Send message"
            className={`p-3 rounded-lg bg-primary text-white hover:opacity-90 transition disabled:animate-pulse disabled:cursor-not-allowed`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
