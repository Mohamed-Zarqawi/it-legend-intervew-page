import {
  enrollCourse,
  getAllCourses,
  getEnrolledCourses,
  getOneCourse,
} from "@/services/coursesServices/courses.service";
import { Database } from "@/types/database.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: () => getAllCourses(),
  });
};

// ------------------- Get lesson  -------------------

type Course = Database["public"]["Tables"]["courses"]["Row"] & {
  lessons: Pick<Database["public"]["Tables"]["lessons"]["Row"], "id">[];
};

export const useGetOneCourse = (courseId: string) => {
  return useQuery<Course[]>({
    queryKey: ["course", courseId],
    queryFn: () => getOneCourse(courseId),
    enabled: !!courseId,
  });
};

// ------------------- get enrolled courses by userId -------------------

export const useGetEnrolledCourses = (userId: string) => {
  return useQuery({
    queryKey: ["enrolledCourses", userId],
    queryFn: () => getEnrolledCourses(userId),
    enabled: !!userId,
  });
};

// ------------------- enroll course by userId -------------------

export const useEnrollCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, userId }: { courseId: string; userId: string }) =>
      enrollCourse(courseId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrolledCourses"] });
    },
  });
};
