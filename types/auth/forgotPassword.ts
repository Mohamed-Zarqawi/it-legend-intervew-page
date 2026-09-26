import * as y from "yup";

export const forgotPasswordSchema = y.object({
  email: y.string().required(),
});

export type reqForgotPassword = y.InferType<typeof forgotPasswordSchema>;

export const resetPasswordSchema = y.object({
  password: y.string().required(),
});

export type reqResetPassword = y.InferType<typeof resetPasswordSchema>;
