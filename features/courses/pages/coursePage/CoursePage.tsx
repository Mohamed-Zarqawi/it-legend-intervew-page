"use client";

import { Database } from "@/types/database.types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useGetOneCourse } from "../hooks/useCourse";
import LessonCard from "../lessonPage/components/LessonCard";
import { useGetAllCourseLessons } from "../lessonPage/pages/hooks/useLesson";

interface LessonListProps {
  courseId: Database["public"]["Tables"]["courses"]["Row"]["id"];
}

type Lesson = Database["public"]["Tables"]["lessons"]["Row"];

export function CoursePage({ courseId }: LessonListProps) {
  const { data: lessons, isLoading, error } = useGetAllCourseLessons(courseId);
  const { data: course, isLoading: isCourseLoading } =
    useGetOneCourse(courseId);

  const groupedLessons = (lessons ?? []).reduce<Record<string, Lesson[]>>(
    (acc, lesson) => {
      const weekKey = lesson.week ? `Week ${lesson.week}` : "Other Lessons";

      if (!acc[weekKey]) {
        acc[weekKey] = [];
      }
      acc[weekKey].push(lesson);
      return acc;
    },
    {},
  );

  if (isLoading) {
    return <div className="p-10 text-center">Loading Course...</div>;
  }

  return (
    <div className="mx-4 my-6 space-y-8 md:mx-10 md:my-10">
      <div className="text-muted-foreground flex items-center gap-1 text-sm">
        <Link href={`/courses`}>Courses</Link>
        <ChevronRight className="size-4" />
        <Link className="text-foreground" href={`/courses/${courseId}`}>
          {course?.[0].title}
        </Link>
      </div>

      <div className="text-foreground text-2xl md:text-3xl">Course Content</div>

      {Object.entries(groupedLessons).map(([weekName, weekLessons]) => (
        <div key={weekName} className="space-y-3">
          <h3 className="text-primary px-2 text-lg font-semibold capitalize">
            {weekName.startsWith("week") ? weekName : `${weekName}`}
          </h3>

          <div className="bg-card grid w-full grid-cols-1 gap-3 rounded-4xl border p-4">
            {weekLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CoursePage;
