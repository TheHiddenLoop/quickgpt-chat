import logo from "../assets/logo_full.svg";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../fetures/authentication/authSelector";
import { Menu, X, Coins } from "lucide-react";

function Navbar({ sidebar, setSidebar }) {
  const { user } = useSelector(selectAuthUser);

  return (
    <header className="bg-bgPrimary px-4 md:px-6 border-b border-border h-16 flex items-center justify-between shadow-sm sticky top-0 z-50 font-robot">
      
      <div className="flex items-center h-10">
        <img
          src={logo}
          alt="Logo"
          className="h-full w-auto object-contain"
        />
      </div>

      <div className="hidden sm:flex items-center gap-2 bg-gradient-to-tr from-sky-500 via-cyan-500 to-blue-600 px-4 py-2 rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all">
        <Coins size={16} className="text-white" />
        <span className="text-white font-semibold text-sm">
          {user.credits? user.credits: 0}
        </span>
        <span className="text-white/80 text-xs font-medium">Credits</span>
      </div>

      <div className="flex items-center gap-3 sm:hidden">
        <div className="flex items-center gap-1.5 bg-gradient-to-tr from-sky-500 via-cyan-500 to-blue-600 px-3 py-1.5 rounded-full shadow-md shadow-blue-500/20">
          <Coins size={14} className="text-white" />
          <span className="text-white font-semibold text-xs">
            {user.credits? user.credits: 0}
          </span>
        </div>

        <button
          onClick={() => setSidebar(!sidebar)}
          className="p-2 rounded-lg hover:bg-secondaryBg transition-colors"
          aria-label={sidebar ? "Close menu" : "Open menu"}
        >
          {sidebar ? (
            <X className="w-6 h-6 text-primary" />
          ) : (
            <Menu className="w-6 h-6 text-primary" />
          )}
        </button>
      </div>
    </header>
  );
}

export default Navbar;