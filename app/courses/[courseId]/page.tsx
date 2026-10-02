"use client";

import CoursePage from "@/features/courses/pages/coursePage/CoursePage";
import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  const courseId = params.courseId;

  return (
    <div>
      <CoursePage courseId={courseId as string} />
    </div>
  );
};

export default page;
