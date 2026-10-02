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
