import { supabase } from "@/lib/supabase";
import { reqUpdateProfile } from "@/types/auth/profile";
// -------------- update profile --------------

export const updateProfile = async (userId: string, body: reqUpdateProfile) => {
  const { data, error } = await supabase
    .from("users")
    .update(body)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};

// -------------- get profile --------------

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("* , addresses(*)")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
};
