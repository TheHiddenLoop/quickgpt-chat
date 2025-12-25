import { Send, User, Bot, MessageSquare, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.svg";
import {useSelector, useDispatch} from "react-redux"
import { sendMessage } from "../fetures/chat/chatSlice";
import { selectAiBotMessage, selectAiBotStatus } from "../fetures/chat/chatSelector";

function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messages2 = useSelector(selectAiBotMessage);
  const dispatch = useDispatch();
  
  console.log(messages2);
  

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    dispatch(sendMessage({question: message}));
    
  };

  // const handleSend = () => {
  //   if (!message.trim()) return;

  //   setMessages((prev) => [...prev, { sender: "user", text: message }]);
  //   setMessage("");

  //   setTimeout(() => {
  //     setMessages((prev) => [
  //       ...prev,
  //       { sender: "bot", text: "This is a sample response from the bot." },
  //     ]);
  //   }, 800);
  // };

  const suggestedPrompts = [
    "Tell me a joke",
    "How can you help me?",
    "What's the weather like?",
    "Explain quantum computing"
  ];

  const handlePromptClick = (prompt) => {
    setMessage(prompt);
  };

  return (
    <div className="h-full flex flex-col bg-bgPrimary text-textPrimary font-robot">
      
      <div className="flex-1 overflow-y-auto p-6 ">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center space-y-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-2 rounded-xl bg-accentBg text-accent overflow-hidden">
                <img src={logo} alt="" className="size-10 transition-transform duration-300 hover:scale-105"/>
              </div>
              <h1 className="text-3xl font-bold text-textPrimary">
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
                  <Sparkles size={18} className="text-accent flex-shrink-0 group-hover:text-primary transition" />
                  <span className="text-sm text-textPrimary">{prompt}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="p-2 rounded-full bg-accentBg text-accent">
                    <Bot size={18} />
                  </div>
                )}

                <div
                  className={`max-w-[70%] px-4 py-2 rounded-xl text-sm leading-relaxed
                    ${
                      msg.sender === "user"
                        ? "bg-primary text-white rounded-br-none mb-3"
                        : "bg-secondaryBg text-textPrimary rounded-tl-none mb-3"
                    }`}
                >
                  {msg.text}
                </div>

                {msg.sender === "user" && (
                  <div className="p-2 rounded-full bg-primaryBg text-primary">
                    <User size={18} />
                  </div>
                )}
              </div>
            ))}
          </>
        )}

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
            disabled = {selectAiBotStatus === "loading"}
            className="p-3 rounded-lg bg-primary text-white hover:opacity-90 transition"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;