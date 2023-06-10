import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
const Layout = ({}) => {
  return (
    <div className="h-screen overflow-x-hidden bg-primary">
      <div className=" flex h-full flex-col ">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
