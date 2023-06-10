import { z } from "zod";
import { loginUserSchema } from "../validations/formSchema";
import { axiosInstance } from "./axios";
import { useQuery } from "@tanstack/react-query";

type AdminLoginData = z.infer<typeof loginUserSchema>;

export const loginAdmin = async (adminData: AdminLoginData) => {
  const response = await axiosInstance.post("/admin/login", {
    adminEmail: adminData.email,
    adminPassword: adminData.password,
  });
  return response;
};

export const viewForms = (axiosInstance: any) => {
  const { data, isLoading, error } = useQuery(
    ["viewForms"],
    async () => {
      const response = await axiosInstance.get("/admin/view_forms");
      return response;
    },
    {
      refetchOnWindowFocus: false,
      refetchInterval: 5000,
    }
  );

  return { data, isLoading, error };
};
