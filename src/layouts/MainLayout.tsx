import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <main className="mx-10 my-8 md:mx-20">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default MainLayout;
