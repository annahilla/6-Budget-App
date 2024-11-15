const Header = ({ title }: { title: string }) => {
  return (
    <header className="my-8 px-5 flex items-center justify-center text-center border-3xl h-80 bg-header bg-center bg-cover rounded-3xl">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{title}</h1>
    </header>
  );
};

export default Header;
