import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { Database } from "@/types/database.types";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";
import { CircleCheck, FileText, Lock, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useGetAllCourseLessons } from "../pages/hooks/useLesson";

interface MobileTopicsProps {
  fullScreen?: boolean;
  courseId: string;
  currentLessonId: string;
  progressData?: {
    completed_lesson_ids?: string[];
    completed_count?: number;
    total_lessons?: number;
    progress_percentage?: number;
  };
}

type Lesson = Database["public"]["Tables"]["lessons"]["Row"];

const MobileTopics = ({
  fullScreen,
  courseId,
  currentLessonId,
  progressData,
}: MobileTopicsProps) => {
  const { data: lessons } = useGetAllCourseLessons(courseId);

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

  const percentage = progressData?.progress_percentage || 0;
  const completedIds = progressData?.completed_lesson_ids || [];

  return (
    <div
      className={`mt-8 block w-full px-4 md:px-0 ${fullScreen == true ? "md:block" : "md:hidden"}`}
    >
      {/* header */}
      <div>
        <div className="text-foreground text-xl font-medium md:text-2xl">
          Topics for This Course
        </div>

        <Field className="mx-auto mt-12 w-full md:mt-10">
          <FieldLabel htmlFor="progress-upload">
            <span>Your progress</span>
            <span className="ml-auto">{percentage}%</span>
          </FieldLabel>
          <Progress value={percentage} id="progress-upload" />
        </Field>
      </div>

      {/* Card */}
      {Object.entries(groupedLessons).map(([week, weekLessons], i) => {
        return (
          <div
            key={i}
            className="bg-card text-card-foreground border-border mt-9 rounded-4xl border px-4 py-6 md:mt-8 md:border-0"
          >
            <div className="flex flex-col gap-2">
              <div className="text-foreground font-semibold">{week}</div>
            </div>

            <div className="mt-4 flex flex-col divide-y pb-2">
              {weekLessons.map((lesson) => {
                const isCurrent = lesson.id === currentLessonId;
                const isCompleted = completedIds.includes(lesson.id);

                return (
                  <Link
                    key={lesson.id}
                    href={`/courses/${courseId}/${lesson.id}`}
                    className={`hover:bg-muted/50 flex items-center justify-between gap-2 px-2 py-4 transition-colors ${
                      isCurrent ? "bg-accent/50 font-medium" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isCurrent ? (
                        <PlayCircle className="text-foreground size-4" />
                      ) : (
                        <FileText className="text-muted-foreground size-4" />
                      )}
                      <div
                        className={`line-clamp-1 text-sm ${
                          isCurrent
                            ? "text-card-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {lesson.title}
                      </div>
                    </div>

                    {isCompleted ? (
                      <CircleCheck className="size-4 text-emerald-500" />
                    ) : (
                      <Lock className="text-muted-foreground size-4" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MobileTopics;
