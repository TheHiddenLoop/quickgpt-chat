import logo from "../assets/LOGO.svg";
import {useSelector} from "react-redux"
import { selectAuthUser } from "../fetures/authentication/authSelector";

function Navbar() {

  const {user} = useSelector(selectAuthUser);

  console.log(user);
  

  return (
    <header className="bg-bgPrimary px-6 md:px-[15%] h-16 flex items-center justify-between shadow-sm">
      
      <div className="flex items-center h-8">
        <img
          src={logo}
          alt="Logo"
          className="h-full w-auto object-contain"
        />
      </div>

      <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary cursor-pointer hover:ring-2 hover:ring-primary transition">
        <img
          src={user.profileImage}
          alt="User avatar"
          className="h-full w-full object-cover"
        />
      </div>

    </header>
  );
}

export default Navbar;
