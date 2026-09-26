import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/lib/supabase";
import {
  forgotPassword,
  getCurrentUser,
  login,
  resetPassword,
  signUp,
} from "@/services/authServices/auth.service";
// import { deleteAccount } from "@/services/authServices/deleteAccount.service";
import { reqForgotPassword } from "@/types/auth/forgotPassword";
import { ReqLoginType } from "@/types/auth/login";
import { User } from "@/types/auth/user";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

// toast.error(`${getErrorMessage(error)}`, {
//   action: {
//     label: "Register",
//     onClick: () => router.push("/auth/signup"),
//   },
// });
const AUTH_TOKEN_CHANGED_EVENT = "auth-token-changed";

const notifyAuthTokenChanged = () => {
  window.dispatchEvent(new Event(AUTH_TOKEN_CHANGED_EVENT));
};

type ApiError = {
  code?: string;
  message?: string;
};

const getErrorMessage = (
  error: ApiError,
  router: ReturnType<typeof useRouter>,
) => {
  switch (error.code) {
    case "user_banned":
      return toast.warning("Your account is banned");

    case "invalid_credentials":
      return toast.error("Email or password is not correct", {
        description: "If you don't have an account register first.",
        action: {
          label: "Register",
          onClick: () => router.push("/auth/signup"),
        },
      });

    case "403":
    case "FORBIDDEN":
      return "Forbidden: You do not have permission to perform this action.";

    case "404":
    case "NOT_FOUND":
      return "Not Found: The requested resource could not be found.";

    case "500":
    case "INTERNAL_SERVER_ERROR":
      return "Server Error: Something went wrong on our end. Please try again later.";

    default:
      // في حال لم يتطابق الكود، نعرض الرسالة القادمة من الـ API إن وُجدت، أو رسالة عامة
      return error.message || "An unexpected error occurred. Please try again.";
  }
};

export const useGetCurrentUser = () => {
  return useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (body: ReqLoginType) => login(body),
    onSuccess: (res) => {
      notifyAuthTokenChanged();
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Login Successfully", {});
      // router.push("/shop");
    },
    onError: (error: ApiError) => {
      getErrorMessage(error, router);
    },
  });
};

interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      firstName,
      lastName,
      email,
      password,
    }: SignUpParams) => {
      // const username = kebabCase(
      //   `${firstName} ${lastName} ${random(1000, 9000)}`,
      // );
      return signUp({ firstName, lastName, email, password });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Account Created Successfully", {});
      // router.push("/shop");
    },
    onError: () => {
      toast.error("This account already exists, please login", {
        action: {
          label: "Login",
          onClick: () => router.push("/auth/login"),
        },
      });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return async () => {
    const { error } = await supabase.auth.signOut();
    notifyAuthTokenChanged();
    queryClient.clear();
    router.push("/auth/login");
  };
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: reqForgotPassword) => forgotPassword(email),
    onSuccess: (_, variables) => {
      toast.success(`Please check your email ${variables.email}`, {});
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to send recovery email. Please try again.";

      toast.error(message, {});
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (password: string) => resetPassword(password),
    onSuccess: () => {
      toast.success("Password updated successfully!", {});
    },
    onError: (error: unknown) => {
      console.log(error);
      toast.error("Failed to update password", {});
    },
  });
};

// export const useDeleteAccount = () => {
//   const queryClient = useQueryClient();
//   const router = useRouter();

//   return useMutation({
//     mutationFn: async () => {
//       return await deleteAccount();
//     },
//     onSuccess: () => {
//       queryClient.clear();
//       toast.success("Account deleted successfully.", { richColors: true });
//       router.push("/auth/login");
//       router.refresh();
//     },
//     onError: (error: Error) => {
//       toast.error(error.message || "Failed to delete account.", {});
//     },
//   });
// };
