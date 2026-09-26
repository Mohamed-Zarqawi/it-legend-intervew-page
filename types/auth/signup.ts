import * as y from "yup";

export const singUpSchema = y.object({
  firstName: y.string().required(),
  lastName: y.string(),
  email: y.string().email().required(),
  password: y.string().min(6).required(),
});

export type ReqSignUpType = y.InferType<typeof singUpSchema>;

export type ResSignUpType = {
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
