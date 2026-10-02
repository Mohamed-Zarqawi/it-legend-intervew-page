import {
  getProfile,
  updateProfile,
} from "@/services/profileServices/profile.service";
import { reqUpdateProfile } from "@/types/auth/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateProfileParams {
  userId: string;
  body: reqUpdateProfile;
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, body }: UpdateProfileParams) => {
      return updateProfile(userId, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Profile Updated Successfully !", {});
    },
    onError: () => {
      toast.error("Could not update profile, please try again later.", {});
    },
  });
};

export const useGetProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      return getProfile(userId);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error: unknown) => {
      toast.error("Could not get profile", {});
    },
  });
};
