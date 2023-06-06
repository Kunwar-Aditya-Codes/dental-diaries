import { axiosInstance } from "./axios";
import { z } from "zod";
import { registerUserSchema, loginUserSchema } from "../validations/formSchema";

type RegisterUserData = z.infer<typeof registerUserSchema>;
type LoginUserData = z.infer<typeof loginUserSchema>;

export const registerUser = async (user: RegisterUserData) => {
  try {
    const response = await axiosInstance.post("/auth/register_user", user);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginUser = async (user: LoginUserData) => {
  try {
    const response = await axiosInstance.post("/user/login", user);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
