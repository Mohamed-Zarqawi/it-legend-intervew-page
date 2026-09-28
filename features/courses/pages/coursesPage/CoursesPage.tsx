"use client";

import CourseCard from "../../components/CourseCard";
import { useGetAllCourses } from "../hooks/useCourse";

const CoursesPage = () => {
  const { data: courses } = useGetAllCourses();

  return (
    <div className="mx-10 my-10">
      <div className="flex gap-4">
        {courses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};
export default CoursesPage;
