import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import logo from "../assets/LOGO.svg";

export default function Layout() {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-bgPrimary text-textPrimary">

      <nav className="w-full px-6 sm:px-8 h-16 flex items-center justify-between border-b border-border">
        <img
          src={logo}
          alt="logo"
          onClick={() => navigate("/")}
          className="cursor-pointer h-8 w-32 sm:w-44"
        />

        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="w-6 h-6 text-textSecondary sm:hidden cursor-pointer"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="w-6 h-6 text-textSecondary sm:hidden cursor-pointer"
          />
        )}
      </nav>

      <div className="flex flex-1 h-[calc(100vh-56px)]">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

        <main className="flex-1 bg-bgSecondary overflow-y-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
