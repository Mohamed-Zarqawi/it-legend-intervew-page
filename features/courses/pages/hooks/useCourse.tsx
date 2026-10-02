import {
  getAllCourses,
  getOneCourse,
} from "@/services/coursesServices/courses.service";
import { Database } from "@/types/database.types";
import { useQuery } from "@tanstack/react-query";

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
