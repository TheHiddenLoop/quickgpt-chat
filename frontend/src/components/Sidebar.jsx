import React from "react";
import {
  Hash,
  House,
  SquarePen,
  Image,
  Eraser,
  Scissors,
  FileText,
  Users,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router";

const navItems = [
  { to: "", label: "Dashboard", Icon: House },
  { to: "/vid/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/vid/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/vid/generate-images", label: "Generate Images", Icon: Image },
  { to: "/vid/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/vid/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/vid/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/vid/community", label: "Community", Icon: Users },
];

function Sidebar({ sidebar, setSidebar }) {
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
            src="https://i.pinimg.com/736x/3a/70/1a/3a701a406737e17d3dcaac322205e850.jpg"
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
