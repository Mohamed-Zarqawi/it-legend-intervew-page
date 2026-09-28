import { getAllCourses } from "@/services/coursesServices/courses.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: () => getAllCourses(),
  });
};
