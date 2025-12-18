import logo from "../assets/LOGO.svg";

function Navbar() {
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
          src="https://i.pinimg.com/736x/3a/70/1a/3a701a406737e17d3dcaac322205e850.jpg"
          alt="User avatar"
          className="h-full w-full object-cover"
        />
      </div>

    </header>
  );
}

export default Navbar;
