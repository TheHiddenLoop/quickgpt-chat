import logo from "../assets/logo_full.svg";
import {useSelector} from "react-redux"
import { selectAuthUser } from "../fetures/authentication/authSelector";
import { Menu, X } from "lucide-react";

function Navbar({ sidebar, setSidebar }) {

  const {user} = useSelector(selectAuthUser);

  console.log(user);
  

  return (
    <header className="bg-bgPrimary px-3 md:px-10 border-b border-border h-16 flex items-center justify-between shadow-sm z-100">
      
      <div className="flex items-center h-10">
        <img
          src={logo}
          alt="Logo"
          className="h-full w-auto object-contain"
        />
      </div>
        {sidebar? <X onClick={()=>setSidebar(false)} className='w-6 h-6 text-primary sm:hidden'/> : <Menu onClick={()=>setSidebar(true)} className='w-6 h-6 text-primary sm:hidden'/>}

    </header>
  );
}

export default Navbar;
