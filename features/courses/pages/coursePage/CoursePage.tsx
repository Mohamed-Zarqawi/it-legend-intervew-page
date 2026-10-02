"use client";

import { Database } from "@/types/database.types";
import LessonCard from "../lessonPage/components/LessonCard";
import { useGetAllCourseLessons } from "../lessonPage/pages/hooks/useLesson";

interface LessonListProps {
  courseId: Database["public"]["Tables"]["courses"]["Row"]["id"];
}

type Lesson = Database["public"]["Tables"]["lessons"]["Row"];

export function CoursePage({ courseId }: LessonListProps) {
  const { data: lessons, isLoading, error } = useGetAllCourseLessons(courseId);

  const groupedLessons = (lessons ?? []).reduce<Record<string, Lesson[]>>(
    (acc, lesson) => {
      const weekKey = lesson.week ? `${lesson.week}` : "Other Lessons";

      if (!acc[weekKey]) {
        acc[weekKey] = [];
      }
      acc[weekKey].push(lesson);
      return acc;
    },
    {},
  );

  return (
    <div className="my-10 space-y-8 md:mx-10">
      <div className="text-xl font-bold">Course Content</div>

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
