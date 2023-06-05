import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
const Layout = ({}) => {
  return (
    <div className="h-screen min-h-screen overflow-x-hidden bg-primary">
      <div className="mx-auto flex h-full max-w-[85rem] flex-col">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
