import { z } from "zod";
import { loginUserSchema } from "../validations/formSchema";
import { axiosInstance } from "./axios";

type AdminLoginData = z.infer<typeof loginUserSchema>;

export const loginAdmin = async (adminData: AdminLoginData) => {
  const response = await axiosInstance.post("/admin/login", {
    adminEmail: adminData.email,
    adminPassword: adminData.password,
  });

  return response;
};
