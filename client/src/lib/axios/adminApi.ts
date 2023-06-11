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

export const updateForm = async ({
  axiosInstance,
  formId,
  formStatus,
}: {
  axiosInstance: any;
  formId: string;
  formStatus: string;
}) => {
  const response = await axiosInstance.patch(`/admin/view_forms/${formId}`, {
    formStatus,
  });
  return response;
};

export const newAdmin = async ({
  axiosInstance,
  adminName,
  adminEmail,
  adminPassword,
  adminRole,
}: {
  axiosInstance: any;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
  adminRole: string;
}) => {
  const response = await axiosInstance.post("/auth/register_admin", {
    adminName,
    adminEmail,
    adminPassword,
    adminRole,
  });
  return response;
};

export const viewAdmins = async (axiosInstance: any) => {
  const response = await axiosInstance.get("/admin/view_admins");
  return response;
};

export const deleteAdmin = async ({
  axiosInstance,
  adminId,
}: {
  axiosInstance: any;
  adminId: string;
}) => {
  const response = await axiosInstance.delete(`/admin/delete_admin/${adminId}`);

  return response;
};
