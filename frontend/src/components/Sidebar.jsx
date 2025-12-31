import { ChevronDown, ChevronRight, LogOut, Plus, Search, User, CreditCard, ChevronUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "../fetures/authentication/authSelector";
import { useEffect, useState, useRef } from "react";
import { selectAiBotConversations } from "../fetures/chat/chatSelector";
import { getConversations } from "../fetures/chat/chatSlice";
import { Link } from "react-router";
import { logoutAuth } from "../fetures/authentication/authSlice";

function Sidebar({ sidebar, setShowModal, setSidebar }) {
  const dispatch = useDispatch();

  const conversations = useSelector(selectAiBotConversations) || [];
  const [chatShow, setChatShow] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  const user = useSelector(selectAuthUser);

  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const userType =
    user?.user?.userType?.charAt(0).toUpperCase() +
    user?.user?.userType?.slice(1);

  const handleLogout = () => {
    dispatch(logoutAuth());
    navigate("/login");
  };

  return (
    <aside
      className={`w-72 md:w-[290px] bg-bgPrimary border-r border-border flex flex-col
      max-sm:absolute max-sm:top-14 max-sm:bottom-0 z-50
      ${sidebar ? "translate-x-0" : "max-sm:-translate-x-full"}
      transition-all duration-300`}
    >
      <div className="my-6 w-full px-4 flex flex-col gap-3 flex-none">
        <Link to={"/"} onClick={() => setSidebar(false)} className="bg-accentBg flex items-center justify-center gap-1 text-sm py-2.5 rounded-md text-text cursor-pointer border border-border hover:border-primary hover:bg-bgSecondary transition-colors duration-200">
          <Plus />
          <h3>New Chat</h3>
        </Link>

        <div onClick={() => {
          setShowModal(true);
          setSidebar(false);
        }} className="bg-accentBg flex items-center justify-center gap-1 text-sm py-2.5 rounded-md text-text cursor-pointer border border-border hover:border-primary hover:bg-bgSecondary transition-colors duration-200">
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
                {chat.title.length <= 30
                  ? chat.title
                  : chat.title.slice(0, 30) + "..."}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="relative border-t border-border px-4 py-3 flex-none" ref={menuRef}>
        {showUserMenu && (
          <div className="absolute bottom-full left-4 right-4 mb-2 bg-bgPrimary border border-border rounded-lg shadow-lg overflow-hidden">
            <Link 
              to="/profile" 
              onClick={() => {
                setShowUserMenu(false);
                setSidebar(false);
              }}
              className="flex items-center gap-3 px-4 py-3 text-sm text-textPrimary hover:bg-accentBg transition-colors duration-200 cursor-pointer"
            >
              <User size={16} />
              <span>Edit Profile</span>
            </Link>
            
            <Link 
              to="/pricing" 
              onClick={() => {
                setShowUserMenu(false);
                setSidebar(false);
              }}
              className="flex items-center gap-3 px-4 py-3 text-sm text-textPrimary hover:bg-accentBg transition-colors duration-200 cursor-pointer"
            >
              <CreditCard size={16} />
              <span>Purchase Plan</span>
            </Link>
            
            <div 
              onClick={() => {
                handleLogout();
                setShowUserMenu(false);
              }}
              className="flex items-center gap-3 px-4 py-3 text-sm text-error hover:bg-accentBg transition-colors duration-200 cursor-pointer border-t border-border"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </div>
          </div>
        )}

        <div 
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center justify-between cursor-pointer hover:bg-accentBg -mx-2 px-2 py-1 rounded-lg transition-colors duration-200"
        >
          <div className="flex items-center gap-3">
            <img
              src={user?.user?.profileImage || ""}
              alt=""
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="space-y-0.5">
              <h2 className="text-sm font-medium text-textPrimary">
                {user?.user?.name}
              </h2>
              <p className="text-xs font-medium text-primary">{userType} user</p>
            </div>
          </div>

          <ChevronUp 
            className={`w-4 h-4 text-textSecondary transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`}
          />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;