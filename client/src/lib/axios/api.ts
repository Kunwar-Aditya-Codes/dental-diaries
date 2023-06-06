import { axiosInstance } from "./axios";
import { z } from "zod";
import { registerUserSchema } from "../validations/registerSchema";

type RegisterUserData = z.infer<typeof registerUserSchema>;

export const registerUser = async (user: RegisterUserData) => {
  try {
    const response = await axiosInstance.post("/auth/register_user", user);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
