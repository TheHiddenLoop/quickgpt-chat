import { useState } from "react";
import { Outlet, } from "react-router";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { selectAuthUser } from "../fetures/authentication/authSelector";
import { useSelector } from "react-redux";
import Signup from "./Signup";
import SearchModal from "../components/SearchModal";
import { selectAiBotConversations } from "../fetures/chat/chatSelector";


export default function Layout() {
  const [sidebar, setSidebar] = useState(false);
  const user = useSelector(selectAuthUser);
  const [showModal, setShowModal] = useState(false);
  const conversations = useSelector(selectAiBotConversations);

  if (!user) {
    return <Signup />;
  }

  return (
    <div className="flex flex-col h-screen bg-bgPrimary text-textPrimary">
      <Navbar sidebar={sidebar} setSidebar={setSidebar}/>

      {showModal && <SearchModal conversations={conversations} setShowModal={setShowModal}/>}

      <div className="flex flex-1 min-h-[calc(100vh-56px)]">
        <Sidebar setShowModal={setShowModal} sidebar = {sidebar} setSidebar={setSidebar}/>
        <main className="flex-1 bg-bgSecondary overflow-y-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
