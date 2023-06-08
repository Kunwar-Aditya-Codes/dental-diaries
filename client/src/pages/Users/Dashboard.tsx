import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../lib/axios/userApi";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface DashboardProps {}

const Dashboard = ({}) => {
  const axiosInstance = useAxiosInstance();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(axiosInstance),
  });

  let user;

  if (data !== undefined) {
    user = data.data.user.firstName + " " + data.data.user.lastName;
  }

  return (
    <div className="flex h-full items-center justify-center ">
      {isLoading ? (
        <AiOutlineLoading3Quarters className="animate-spin text-6xl text-secondary" />
      ) : (
        <h1 className="text-center font-custom text-2xl tracking-wider text-secondary drop-shadow-[3px_5px_50px_rgba(182,236,255,1)] md:text-4xl lg:text-6xl">
          Welcome Back, {user}
        </h1>
      )}
    </div>
  );
};

export default Dashboard;
