import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../lib/axios/userApi";
import useAxiosInstance from "../../hooks/useAxiosInstance";

interface DashboardProps {}

const Dashboard = ({}) => {
  const axiosInstance = useAxiosInstance();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(axiosInstance),
  });

  if (isLoading) {
    console.log("Loading...");
  }

  if (isError) {
    console.log(error);
  }

  console.log(data);

  return <div>Dashboard</div>;
};

export default Dashboard;
