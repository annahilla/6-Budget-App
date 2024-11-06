import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { PriceProvider } from "../context/PriceContext";

const MainLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <PriceProvider>
      <main className="mx-10 my-8 md:mx-20">
        <Navbar isHome={isHome} />
        <Outlet />
      </main>
    </PriceProvider>
  );
};

export default MainLayout;
