const Navbar = () => {
  return (
    <nav className="font-bold flex items-center gap-7">
      <div className="flex items-center relative">
        <div className="bg-orange absolute rounded-2xl w-1 h-5 rotate-[-20deg]"></div>
        <div className="bg-brown absolute rounded-2xl w-1 h-4 rotate-[-20deg] left-[0.5rem] translate-y-1/4"></div>
        <div className="bg-orange absolute rounded-2xl w-1 h-3.5 rotate-[-20deg] left-[0.8rem]"></div>
      </div>
      Frontender.itacademy
    </nav>
  );
};

export default Navbar;
