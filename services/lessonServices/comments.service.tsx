import { supabase } from "@/lib/supabase";
import { ReqCreateCommentType } from "@/types/courses/CommentType";

export const getComments = async () => {
  const { data: comments, error } = await supabase.from("comments").select("*");

  if (error) throw error;
  return comments;
};

export const createComment = async (values: ReqCreateCommentType) => {
  const { data, error } = await supabase
    .from("comments")
    .insert([values])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteComment = async (commentId: number) => {
  const { data, error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateComment = async (
  commentId: number,
  values: ReqCreateCommentType,
) => {
  const { data, error } = await supabase
    .from("comments")
    .update(values)
    .eq("id", commentId)
    .select()
    .single();

  if (error) throw error;
  return data;
};
