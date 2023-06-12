import { FC } from "react";
import Logo from "/logo.png";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const { id } = useAuth();

  return (
    <header className="mx-auto w-full max-w-[85rem] px-10 py-4">
      <nav className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div
          className={`${id && "w-full"}
         flex  items-center justify-center`}
        >
          <Link to="/">
            <img src={Logo} alt="logo" className="h-[4rem] w-[4rem]" />
          </Link>
        </div>
        <div className="text-secondary">
          <ul className="flex items-center font-light sm:space-x-8 md:space-x-12">
            {!id && (
              <>
                <Link to="/login">
                  <li className="rounded-sm px-5 py-2 tracking-wider ring-offset-2 ring-offset-primary transition ease-out hover:bg-secondary/10 active:ring-2 active:ring-secondary md:text-lg">
                    Login
                  </li>
                </Link>
                <Link to="/admin_login">
                  <li className="rounded-sm px-5 py-2 tracking-wider ring-offset-2 ring-offset-primary transition ease-out hover:bg-secondary/10 active:ring-2 active:ring-secondary md:text-lg">
                    Admin Login
                  </li>
                </Link>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
