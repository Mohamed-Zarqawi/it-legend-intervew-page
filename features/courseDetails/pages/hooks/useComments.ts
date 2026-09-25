import { createComment, getComments } from "@/services/comments.service";
import { Comments, ReqCreateCommentType } from "@/types/CommentType";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useGetComments = () => {
  return useQuery<Comments[]>({
    queryKey: ["comments"],
    queryFn: () => getComments(),
  });
};

export const useAddComment = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: ReqCreateCommentType) => createComment(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Address Added Successfully!");
    },
  });
};
