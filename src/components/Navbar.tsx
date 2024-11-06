import Button from "./Button";

const Navbar = ({ isHome }: { isHome: boolean }) => {
  return (
    <nav className="flex justify-between">
      <div className="font-bold flex items-center gap-7">
      <div className="flex items-center relative">
        <div className="bg-orange absolute rounded-2xl w-1 h-5 rotate-[-20deg]"></div>
        <div className="bg-brown absolute rounded-2xl w-1 h-4 rotate-[-20deg] left-[0.5rem] translate-y-1/4"></div>
        <div className="bg-orange absolute rounded-2xl w-1 h-3.5 rotate-[-20deg] left-[0.8rem]"></div>
      </div>
      Frontender.itacademy
    </div>
    {isHome ? '' : <Button text="Torna" link="/" />}
    </nav>
  );
};

export default Navbar;
