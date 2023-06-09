import { FC, useEffect, useState } from "react";
import { selectToken } from "../app/slices/authSlice";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import useRefresh from "../hooks/useRefresh";
import usePersist from "../hooks/usePersist";

interface PersistLoginProps {}

const PersistLogin: FC<PersistLoginProps> = ({}) => {
  const token = useSelector(selectToken);
  const refresh = useRefresh();
  const [persist] = usePersist();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      console.log("verifyRefreshToken");
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    !token && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;
