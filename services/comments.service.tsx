import { supabase } from "@/lib/supabase";
import { ReqCreateCommentType } from "@/types/CommentType";

export const getComments = async () => {
  const { data, error } = await supabase.from("comments").select("*");

  if (data) {
    console.log(data);
  }
  if (error) throw error;
  return data;
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
