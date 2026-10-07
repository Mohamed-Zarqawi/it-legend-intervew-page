import * as y from "yup";
const forbiddenWord = "احا";

export const CreateCommentSchema = y.object({
  comment: y
    .string()
    .test(
      "no-forbidden-word",
      "التعليق يحتوي على كلمات غير مسموح بها",
      (value) => {
        if (!value) return true;
        return !value.toLowerCase().includes(forbiddenWord.toLowerCase());
      },
    ),
  user_name: y.string().notRequired(),
  user_avatar: y.string().notRequired(),
});

export type ReqCreateCommentType = y.InferType<typeof CreateCommentSchema>;

export type Comments = {
  user_name: string;
  comment: string;
  user_avatar: string;
  id: number;
  created_at: string;
};
