import { FC, useState } from "react";
import { dashboardOptions } from "../lib/dashboardOptions";
import { Link, Outlet } from "react-router-dom";

interface DashboardLayoutProps {}

const DashboardLayout: FC<DashboardLayoutProps> = ({}) => {
  const userOptions = dashboardOptions.users;
  const adminOptions = dashboardOptions.admin;

  const role = "user";

  const [activeTab, setActiveTab] = useState(
    role === "user" ? userOptions[0].path : adminOptions[0].path
  );

  return (
    <div className="mt-6 flex flex-col space-y-6">
      <nav className="rounded-sm bg-secondary/10 shadow-lg">
        <ul className="flex h-[3rem] items-center uppercase tracking-wider">
          {userOptions.map((option) => (
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
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
