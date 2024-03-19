import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { FooterCentered } from "./Footer";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
        <FooterCentered />
      </main>
    </div>
  );
};

export default Layout;
