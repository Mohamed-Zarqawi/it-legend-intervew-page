import {
  createComment,
  getComments,
} from "@/services/lessonServices/comments.service";
import { Comments, ReqCreateCommentType } from "@/types/courses/CommentType";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetComments = () => {
  return useQuery<Comments[]>({
    queryKey: ["comments"],
    queryFn: () => getComments(),
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: ReqCreateCommentType) => createComment(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};
