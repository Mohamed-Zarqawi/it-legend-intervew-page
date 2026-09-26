import * as y from "yup";

export const loginSchema = y.object({
  email: y.string().email().required("Email is required"),
  password: y
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export type ReqLoginType = y.InferType<typeof loginSchema>;

export type ResLoginType = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    firstName: string;
    lastName: string;
    gender: "male" | "female";
    birthday: string;
  };
};
