import {LogOut} from "lucide-react";
import {useSelector} from "react-redux"
import { selectAuthUser } from "../fetures/authentication/authSelector";


function Sidebar({ sidebar }) {

  const user = useSelector(selectAuthUser);
  return (
    <aside
      className={`w-72 md:w-64 bg-bgPrimary border-r border-border flex flex-col justify-between
      max-sm:absolute max-sm:top-14 max-sm:bottom-0 z-50
      ${sidebar ? "translate-x-0" : "max-sm:-translate-x-full"}
      transition-all duration-300`}
    >
      <div className="my-6 w-full">
        <h2>Hii There</h2>
      </div>

      <div className="border-t border-border p-4 flex items-center justify-between">
        <div className="flex items-start gap-3">
          <img
            src={user?.user.profileImage}
            alt=""
            className="size-[30px] rounded-full object-cover"
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
