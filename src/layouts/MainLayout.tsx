import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
    <main className="mx-10 my-8 md:mx-20">
        <Navbar isHome={isHome} />
        <Outlet />
    </main>
    )
}

export default MainLayout;