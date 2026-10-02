"use client";

import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import LessonPage from "@/features/courses/pages/lessonPage/pages/LessonPage";
import { useParams } from "next/navigation";

const CourseDetails = () => {
  const params = useParams();
  const courseId = params.courseId;
  const lessonId = params.lessonId;
  const { data: currentUser } = useGetCurrentUser();

  return (
    <div>
      <LessonPage
        lessonId={lessonId as string}
        courseId={courseId as string}
        userId={currentUser?.id as string}
      />
    </div>
  );
};

export default CourseDetails;
