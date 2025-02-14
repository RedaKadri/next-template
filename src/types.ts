import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  remember: z.boolean(),
});

export const RegisterSchema = z
  .object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters long" }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters long" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    password_confirmation: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords must match",
    path: ["password_confirmation"],
  });

export const ForgetPasswordSchema = z.object({ email: z.string().email({ message: "Invalid email" }) });

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    password_confirmation: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords must match",
    path: ["password_confirmation"],
  });
