import {
  getExamByWeek,
  getUserExamResult,
  submitExamResult,
} from "@/services/examServices/exam.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useExam = (courseId: string, week: string) => {
  return useQuery({
    queryKey: ["exam", courseId, week],
    queryFn: () => getExamByWeek(courseId, week),
    enabled: !!courseId && !!week,
  });
};

export const useUserExamResult = (
  userId: string | undefined,
  examId: string | undefined,
) => {
  return useQuery({
    queryKey: ["userExamResult", userId, examId],
    queryFn: () => getUserExamResult(userId!, examId!),
    enabled: !!userId && !!examId,
  });
};

export const useSubmitExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitExamResult,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["userExamResult", variables.userId, variables.examId],
      });
    },
  });
};
