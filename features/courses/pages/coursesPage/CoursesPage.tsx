"use client";

import CourseCard from "../../components/CourseCard";
import { useGetAllCourses } from "../hooks/useCourse";

const CoursesPage = () => {
  const { data: courses, isLoading } = useGetAllCourses();

  if (isLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="mx-3 mt-4 mb-23 md:mx-10 md:my-10">
      <div className="text-foreground text-2xl md:text-3xl">Courses</div>
      <div className="mt-6 grid w-full grid-cols-2 gap-3 md:grid-cols-[repeat(auto-fill,minmax(400px,1fr))] md:gap-6">
        {courses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};
export default CoursesPage;
