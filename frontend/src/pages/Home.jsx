import { Send, Sparkles } from "lucide-react";
import { useState } from "react";
import logo from "../assets/LOGO.svg";
import { useDispatch } from "react-redux";
import { addMessage, sendMessage } from "../fetures/chat/chatSlice";
import { useNavigate } from "react-router";
import generateConversationId from "../libs/generateId";

function Home() {
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState("text");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSend = () => {
    if (!message.trim()) return;

    const conversationId = generateConversationId();
    dispatch(addMessage({ sender: "user", content: message, type:mode }));
    navigate(`/c/${conversationId}`, {state: { sender: "user", content: message, type:mode }});
    dispatch(
      sendMessage({
        question: message,
        conversationId,
      })
    );
    setMessage("");
  };

  const suggestedPrompts = [
    "Tell me a joke",
    "How can you help me?",
    "What's the weather like?",
    "Explain quantum computing",
  ];

  const handlePromptClick = (prompt) => {
    setMessage(prompt);
  };

  return (
    <div className="h-full flex flex-col bg-bgPrimary text-textPrimary font-robot">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="h-full flex flex-col items-center justify-center space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-2 rounded-xl bg-accentBg text-accent overflow-hidden">
              <img
                src={logo}
                alt="logo"
                className="size-10 transition-transform duration-300 hover:scale-105"
              />
            </div>

            <h1 className="text-3xl text-primary font-bold">
              Welcome to AI Chat
            </h1>

            <p className="text-textSecondary text-center max-w-md">
              Start a conversation by typing a message below or try one of these suggestions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="flex items-center gap-3 p-4 rounded-lg bg-secondaryBg border border-border hover:border-primary hover:bg-bgSecondary transition-all text-left group"
              >
                <Sparkles
                  size={18}
                  className="text-accent group-hover:text-primary transition"
                />
                <span className="text-sm">{prompt}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border p-2 bg-bgSecondary">
        <div className="flex items-center gap-2">

          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="px-2 py-3 rounded-lg bg-bgPrimary border border-border
          text-sm cursor-pointer appearance-none
          focus:outline-none focus:ring-2 focus:ring-primary"
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
            className="flex-1 px-4 py-3 rounded-lg bg-bgPrimary border border-border
        focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />

          {/* Send */}
          <button
            onClick={handleSend}
            aria-label="Send message"
            className="p-3 rounded-lg bg-gradient-to-tr from-sky-500 via-cyan-500 to-blue-600
        text-white hover:opacity-90 transition"
          >
            <Send size={18} />
          </button>

        </div>
      </div>

    </div>
  );
}

export default Home;
