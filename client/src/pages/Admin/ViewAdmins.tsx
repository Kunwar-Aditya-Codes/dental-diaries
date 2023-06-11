import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { viewAdmins } from "../../lib/axios/adminApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useAxiosInstance from "../../hooks/useAxiosInstance";

type Admin = {
  adminId: string;
  adminName: string;
  adminEmail: string;
  adminRole: string;
  createdAt: string;
};

const ViewAdmins: FC = ({}) => {
  const axiosInstance = useAxiosInstance();
  const { data, isLoading } = useQuery({
    queryKey: ["admins"],
    queryFn: () => viewAdmins(axiosInstance),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
    refetchInterval: 10000,
  });

  const admins = data?.data?.admins;

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <table className="table max-h-[32rem] overflow-y-scroll">
          <thead>
            <tr className="border-none text-center font-custom text-lg uppercase tracking-wider text-secondary">
              <th> Name</th>
              <th> Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins?.map((admin: Admin) => (
              <tr key={admin.adminId} className="border-none text-center">
                <td>{admin.adminName}</td>
                <td>{admin.adminEmail}</td>
                <td>{admin.adminRole}</td>
                <td>{new Date(admin.createdAt).toLocaleString()}</td>
                <td>
                  <button className="">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewAdmins;
