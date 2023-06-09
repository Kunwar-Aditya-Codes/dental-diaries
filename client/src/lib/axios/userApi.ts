import { axiosInstance } from "./axios";
import { z } from "zod";
import {
  registerUserSchema,
  loginUserSchema,
  healthFormSchema,
} from "../validations/formSchema";

type RegisterUserData = z.infer<typeof registerUserSchema>;
type LoginUserData = z.infer<typeof loginUserSchema>;
type HealthFormData = z.infer<typeof healthFormSchema>;

export const registerUser = async (user: RegisterUserData) => {
  const response = await axiosInstance.post("/auth/register_user", user);
  return response;
};

export const loginUser = async (user: LoginUserData) => {
  const response = await axiosInstance.post("/user/login", user);
  return response;
};

export const submitHealthForm = async ({
  data,
  privateAxiosInstance,
}: {
  data: HealthFormData;
  privateAxiosInstance: any;
}) => {
  const response = await privateAxiosInstance.post("/user/submit_form", data);
  return response;
};

export const getProfile = async (axiosInstance: any) => {
  const response = await axiosInstance.get("/user/view_profile");
  return response;
};

export const viewHistory = async (axiosInstance: any) => {
  const response = await axiosInstance.get("/user/view_history");
  return response;
};
