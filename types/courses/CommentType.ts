import * as y from "yup";

export const CreateCommentSchema = y.object({
  comment: y.string().required(),
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
