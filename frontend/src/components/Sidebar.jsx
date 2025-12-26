import { ChevronDown, ChevronRight, LogOut, Plus, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "../fetures/authentication/authSelector";
import { useEffect, useState } from "react";
import { selectAiBotConversations } from "../fetures/chat/chatSelector";
import { getConversations } from "../fetures/chat/chatSlice";
import {Link } from "react-router";

function Sidebar({ sidebar }) {
  const dispatch = useDispatch();

  const conversations = useSelector(selectAiBotConversations) || [];
  const [chatShow, setChatShow] = useState(true);

  const user = useSelector(selectAuthUser);

  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);

  return (
    <aside
      className={`w-72 md:w-[290px] bg-bgPrimary border-r border-border flex flex-col
      max-sm:absolute max-sm:top-14 max-sm:bottom-0 z-50
      ${sidebar ? "translate-x-0" : "max-sm:-translate-x-full"}
      transition-all duration-300`}
    >
      <div className="my-6 w-full px-4 flex flex-col gap-3 flex-none">
        <div className="bg-accentBg flex items-center justify-center gap-1 text-sm py-2.5 rounded-md text-text cursor-pointer border border-border hover:border-primary hover:bg-bgSecondary transition-colors duration-200">
          <Plus />
          <h3>New Chat</h3>
        </div>

        <div className="bg-accentBg flex items-center justify-center gap-1 text-sm py-2.5 rounded-md text-text cursor-pointer border border-border hover:border-primary hover:bg-bgSecondary transition-colors duration-200">
          <Search size={18} />
          <h3>Search Chat</h3>
        </div>
      </div>

      <div className="px-4 flex-1 overflow-y-auto">
        <h2
          onClick={() => setChatShow(!chatShow)}
          className="mb-2 text-sm text-textSecondary flex items-center cursor-pointer select-none"
        >
          Your chats{" "}
          {chatShow ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </h2>

        {chatShow && (
          <div className="flex flex-col">
            {conversations.map((chat) => (
              <Link to={`/c/${chat.conversationId}`}
                className="text-sm text-textPrimary py-2 hover:bg-accentBg pl-3 rounded-lg cursor-pointer transition-colors duration-200"
                key={chat._id}
              >
                {chat.title}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border p-4 flex-none flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={user?.user.profileImage}
            alt=""
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <h2 className="text-sm font-medium text-textPrimary">
              {user?.user.name}
            </h2>
          </div>
        </div>

        <LogOut className="w-4 h-4 text-textSecondary hover:text-error transition cursor-pointer" />
      </div>
    </aside>
  );
}

export default Sidebar;
