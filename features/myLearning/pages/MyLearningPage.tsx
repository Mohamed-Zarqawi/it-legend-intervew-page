"use client";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import CourseCard from "@/features/courses/components/CourseCard";
import { useGetEnrolledCourses } from "@/features/courses/pages/hooks/useCourse";

const MyLearningPage = () => {
  const { data: currentUser } = useGetCurrentUser();
  const { data: enrolledCourses, isLoading } = useGetEnrolledCourses(
    currentUser?.id,
  );

  if (isLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (enrolledCourses?.length === 0) {
    return <div className="p-10 text-center">No enrolled courses found.</div>;
  }

  if (!currentUser) {
    return (
      <div className="p-10 text-center">
        Please log in to view your courses.
      </div>
    );
  }

  return (
    <div className="mx-3 mt-4 mb-23 md:mx-10 md:my-10">
      <div className="text-foreground text-2xl md:text-3xl">Your Courses</div>
      <div className="mt-6 grid w-full grid-cols-2 gap-3 md:grid-cols-[repeat(auto-fill,minmax(400px,1fr))] md:gap-6">
        {enrolledCourses?.map((course) => (
          <CourseCard key={course.id} course={course.course} />
        ))}
      </div>
    </div>
  );
};

export default MyLearningPage;
