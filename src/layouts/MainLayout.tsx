import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { PriceProvider } from "../context/PriceContext";

const MainLayout = () => {
  return (
    <PriceProvider>
      <main className="mx-10 my-8 md:mx-20">
        <Navbar />
        <Outlet />
      </main>
    </PriceProvider>
  );
};

export default MainLayout;
