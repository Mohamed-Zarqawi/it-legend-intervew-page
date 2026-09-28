"use client";

import CourseCard from "../../components/CourseCard";
import { useGetAllCourses } from "../hooks/useCourse";

const CoursesPage = () => {
  const { data: courses } = useGetAllCourses();

  return (
    <div className="my-10 md:mx-10">
      <div className="grid grid-cols-1 gap-4">
        {courses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};
export default CoursesPage;
