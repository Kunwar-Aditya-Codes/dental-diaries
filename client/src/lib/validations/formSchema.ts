import { z } from "zod";

export const registerUserSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  age: z.string(),
  phoneNumber: z.string().min(10).max(10),
});

export const loginUserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

export const healthFormSchema = z.object({
  description: z
    .string()
    .min(20, { message: "Description is too short" })
    .trim(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  pincode: z.string(),
});

export const adminFormSchema = z.object({
  adminName: z.string().min(2, { message: "Name is too short" }).trim(),
  adminEmail: z.string().email({ message: "Invalid email address" }),
  adminPassword: z.string().min(6, { message: "Password is too short" }),
  adminRole: z.string(),
});
