import React from "react";
import {
  Image,
  LogOut,
  Youtube,
  Instagram,
  Facebook,
  Twitter,
  Music,
  LayoutDashboard,
} from "lucide-react";
import { NavLink } from "react-router";
import {useSelector} from "react-redux"
import { selectAuthUser } from "../fetures/authentication/authSelector";


const navItems = [
  { to: "", label: "Dashboard", Icon: LayoutDashboard },
  { to: "/vid/downloader/youtube", label: "YouTube Downloader", Icon: Youtube },
  { to: "/vid/downloader/instagram", label: "Instagram Downloader", Icon: Instagram },
  { to: "/vid/downloader/facebook", label: "Facebook Downloader", Icon: Facebook },
  { to: "/vid/downloader/twitter", label: "Twitter / X Downloader", Icon: Twitter },
  { to: "/vid/downloader/tiktok", label: "TikTok Downloader", Icon: Music },
  { to: "/vid/downloader/pinterest", label: "Pinterest Downloader", Icon: Image },
];


function Sidebar({ sidebar, setSidebar }) {

  const user = useSelector(selectAuthUser);
  return (
    <aside
      className={`w-60 bg-bgPrimary border-r border-border flex flex-col justify-between
      max-sm:absolute max-sm:top-14 max-sm:bottom-0 z-50
      ${sidebar ? "translate-x-0" : "max-sm:-translate-x-full"}
      transition-all duration-300`}
    >
      <div className="my-6 w-full">

        <nav className="mt-4 px-4 text-sm font-medium text-textSecondary space-y-1">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-3 py-2.5 rounded-lg transition
                 ${
                   isActive
                     ? "bg-accentBg text-accent"
                     : "hover:bg-bgSecondary"
                 }`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-t border-border p-4 flex items-center justify-between">
        <div className="flex items-start gap-3">
          <img
            src={user?.user.profileImage}
            alt=""
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <h2 className="text-sm font-medium text-textPrimary">
              Angesh Chauhan
            </h2>
          </div>
        </div>

        <LogOut className="w-4 h-4 text-textSecondary hover:text-error transition cursor-pointer" />
      </div>
    </aside>
  );
}

export default Sidebar;
