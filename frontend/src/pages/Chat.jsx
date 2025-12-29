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
  const [mode, setMode] = useState("text");

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
    dispatch(addMessage({ sender: "user", content: message, type: mode }));
    dispatch(sendMessage({ question: message, conversationId, type: mode }));
    setMessage("");
  };

  console.log(messages);


  return (
    <div className="h-full flex flex-col bg-bgPrimary text-textPrimary font-robot">

      <div className="flex-1 overflow-y-auto p-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "bot" && (
              <div className="p-2 rounded-full bg-accentBg text-accent flex-shrink-0">
                <Bot size={18} />
              </div>
            )}

            <div
              className={`rounded-xl text-sm leading-relaxed mb-3
                ${msg.sender === "user"
                  ? "bg-primary text-white rounded-tr-none px-4 py-2 max-w-full md:max-w-[70%]"
                  : msg.type === "image"
                    ? "bg-secondaryBg rounded-tl-none p-2 max-w-[250px] sm:max-w-[300px] md:max-w-[350px]"
                    : "bg-secondaryBg text-textPrimary rounded-tl-none px-4 py-2 max-w-full md:max-w-[70%]"
                }`}
            >
              {msg.sender === "user" ? (
                msg.content
              ) : msg.type === "image" ? (
                <img
                  src={msg.content}
                  alt="AI generated"
                  className="rounded-lg w-full h-auto object-contain"
                />
              ) : (
                <div className="reset-tw">
                  <Markdown>{msg.content}</Markdown>
                </div>
              )}
            </div>

            {msg.sender === "user" && (
              <div className="p-2 rounded-full bg-primaryBg text-primary flex-shrink-0">
                <User size={18} />
              </div>
            )}
          </div>
        ))}

        {loading === "loading" && (
          <div className="flex items-start gap-3 justify-start">
            <div className="p-2 rounded-full bg-accentBg text-accent flex-shrink-0">
              <Bot size={18} />
            </div>
            <div className="bg-secondaryBg text-textPrimary rounded-xl rounded-tl-none px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-textPrimary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 bg-textPrimary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 bg-textPrimary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="border-t border-border p-2 bg-bgSecondary">
        <div className="flex items-center gap-2">

          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="px-2 py-3 rounded-lg bg-bgPrimary border border-border
            text-sm font-medium cursor-pointer
            appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
          >

            <option value="text">Text</option>
            <option value="image">Image</option>
          </select>

          <input
            type="text"
            placeholder={
              mode === "image"
                ? "Describe the image you want..."
                : "Type your message..."
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            readOnly={mode === "image" && loading === "loading"}
            className="flex-1 px-4 py-3 rounded-lg bg-bgPrimary border border-border
              focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />

          <button
            onClick={handleSend}
            disabled={loading === "loading"}
            aria-label="Send message"
            className="p-3 rounded-lg bg-gradient-to-tr from-sky-500 via-cyan-500 to-blue-600
        text-white hover:opacity-90 transition
        disabled:animate-pulse disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

    </div>
  );
}

export default Chat;