import { FC, useEffect } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface RequireAuthProps {
  role?: string;
}

const RequireAuth: FC<RequireAuthProps> = ({ role }) => {
  const { role: authRole, id: authId } = useAuth();

  const location = useLocation();

  

  return authId ? (
    role && authRole === role && <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
};

export default RequireAuth;