import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Layout() {
  const [sidebar, setSidebar] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-bgPrimary text-textPrimary">
      <Navbar sidebar={sidebar} setSidebar={setSidebar}/>
      <div className="flex flex-1 min-h-[calc(100vh-56px)]">
        <Sidebar  sidebar = {sidebar}/>

        <main className="flex-1 bg-bgSecondary overflow-y-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
