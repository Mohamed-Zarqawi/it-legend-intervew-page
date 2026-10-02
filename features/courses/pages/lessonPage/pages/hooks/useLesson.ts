import {
  getAllCourseLessons,
  getCourseLesson,
  getCourseProgress,
  toggleLessonProgress,
} from "@/services/lessonServices/lesson.service";
import { useQuery } from "@tanstack/react-query";

import { useMutation, useQueryClient } from "@tanstack/react-query";

// ------------------- get course lessons -------------------

export const useGetAllCourseLessons = (courseId: string) => {
  return useQuery({
    queryKey: ["courses", courseId],
    queryFn: () => getAllCourseLessons(courseId),
    enabled: !!courseId,
  });
};

// ------------------- Get lesson  -------------------

export const useGetCourseLesson = (lessonId: string) => {
  return useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: () => getCourseLesson(lessonId),
    enabled: !!lessonId,
  });
};

// ------------------- get Course Progress -------------------

export const useGetCourseProgress = (courseId: string, userId?: string) => {
  return useQuery({
    queryKey: ["course-progress", courseId, userId],
    queryFn: () => getCourseProgress(courseId, userId!),
    enabled: !!courseId && !!userId,
  });
};

// ------------------- toggle Lesson Progress -------------------

export const useToggleLessonProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleLessonProgress,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["course-progress", variables.courseId],
      });
    },
  });
};
