import { supabase } from "@/lib/supabase";
import { ReqLoginType } from "@/types/auth/login";
import { ReqSignUpType } from "@/types/auth/signup";

// -------------- get current user --------------
export const getCurrentUser = async () => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw authError;
  }

  if (!user) {
    return null;
  }

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    throw profileError;
  }

  return {
    ...user,
    ...profile,
  };
};

// -------------- login --------------

export const login = async ({ email, password }: ReqLoginType) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log(data);

  if (error) {
    throw error;
  }

  return data;
};

// -------------- sign up --------------

export const signUp = async ({
  email,
  password,
  firstName,
  lastName,
}: ReqSignUpType) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    throw error;
  }

  return data;
};

// -------------- forgot password --------------

export const forgotPassword = async (body: { email: string }) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(
    body.email,
    {
      redirectTo: `${window.location.origin}/resetPassword`,
    },
  );

  console.log(data);
  if (error) {
    throw error;
  }

  return data;
};

// -------------- reset password --------------

export const resetPassword = async (password: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password: password,
  });
  if (error) {
    throw error;
  }
  return data;
};
