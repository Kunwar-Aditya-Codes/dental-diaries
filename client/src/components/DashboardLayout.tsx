import { FC, useEffect, useState } from "react";
import { dashboardOptions } from "../lib/dashboardOptions";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { removeToken } from "../app/slices/authSlice";
import { FiLogOut } from "react-icons/fi";
import { axiosInstance } from "../lib/axios/axios";

interface DashboardLayoutProps {}

const DashboardLayout: FC<DashboardLayoutProps> = ({}) => {
  const userOptions = dashboardOptions.users;
  const adminOptions = dashboardOptions.admin;
  const superOptions = dashboardOptions.superAdmin;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await axiosInstance.post("/auth/logout");
    dispatch(removeToken());
    navigate("/login");
  };

  const { role } = useAuth();

  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    const defaultTab =
      role === "user"
        ? userOptions[0].path
        : role === "admin" || role === "super"
        ? adminOptions[0].path
        : null;
    setActiveTab(location.pathname || defaultTab);
  }, [role, userOptions, adminOptions, location.pathname]);

  const handleTabClick = (path: string) => {
    setActiveTab(path);
  };

  return (
    <div className=" relative mx-auto flex w-full max-w-[85rem] flex-grow flex-col space-y-6">
      <nav className="rounded-sm bg-secondary/10 shadow-lg">
        <ul className="flex h-[3rem] items-center justify-between uppercase tracking-wider">
          <ul className="flex h-full items-center uppercase tracking-wider">
            {role === "user" ? (
              <>
                {userOptions.map((option) => (
                  <Link
                    key={option.path}
                    to={option.path}
                    onClick={() => handleTabClick(option.path)}
                    className={` ${
                      activeTab === option.path
                        ? "bg-secondary  text-primary"
                        : "text-secondary"
                    }
                  flex h-full items-center rounded-sm px-4 transition-all duration-200 ease-in-out hover:scale-105`}
                  >
                    <li className="">{option.title}</li>
                  </Link>
                ))}
              </>
            ) : role === "admin" || role === "super" ? (
              <>
                {adminOptions.map((option) => (
                  <Link
                    key={option.path}
                    to={option.path}
                    onClick={() => setActiveTab(option.path)}
                    className={` ${
                      activeTab === option.path
                        ? "bg-secondary  text-primary"
                        : "text-secondary"
                    }
                flex h-full items-center rounded-sm px-4 transition-all duration-200 ease-in-out hover:scale-105`}
                  >
                    <li className="">{option.title}</li>
                  </Link>
                ))}

                {role === "super" && (
                  <>
                    {superOptions.map((option) => (
                      <Link
                        key={option.path}
                        to={option.path}
                        onClick={() => setActiveTab(option.path)}
                        className={` ${
                          activeTab === option.path
                            ? "bg-secondary  text-primary"
                            : "text-secondary"
                        }
                  flex h-full items-center rounded-sm px-4 transition-all duration-200 ease-in-out hover:scale-105`}
                      >
                        <li className="">{option.title}</li>
                      </Link>
                    ))}
                  </>
                )}
              </>
            ) : null}
          </ul>

          <li className="h-full ">
            <button
              onClick={handleLogout}
              className={`flex h-full  items-center justify-center rounded-sm px-4 text-secondary transition-all duration-200 ease-in-out hover:scale-105 hover:bg-secondary hover:text-primary`}
            >
              <FiLogOut />
            </button>
          </li>
        </ul>
      </nav>
      <Outlet />

      <h1 className="absolute bottom-8 right-2 text-sm text-white lg:right-0">
        &copy; {new Date().getFullYear()}{" "}
        <span>
          <a
            href="https://kunwar-aditya-portfolio.vercel.app/"
            rel="noreferrer"
            target="_blank"
            className="font-medium tracking-wider text-secondary"
          >
            Kunwar Aditya
          </a>
        </span>
        .
      </h1>
    </div>
  );
};

export default DashboardLayout;
