import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";

import { Database } from "@/types/database.types";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";
import { CheckCircle2, FileText, Lock, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useGetAllCourseLessons } from "../pages/hooks/useLesson";

interface TopicsProps {
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

const Topics = ({
  fullScreen,
  courseId,
  currentLessonId,
  progressData,
}: TopicsProps) => {
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

  const percentage = progressData?.progress_percentage || 0;
  const completedIds = progressData?.completed_lesson_ids || [];
  return (
    <div>
      {/* Right Side */}
      <div
        className={`hidden w-full max-w-fit min-w-fit md:pl-14 ${fullScreen == true ? "md:hidden" : "md:block"} `}
      >
        {/* header */}
        <div>
          <div className="text-foreground text-xl font-medium">
            Topics for This Course
          </div>

          <Field className="mx-auto mt-10 w-full">
            <FieldLabel htmlFor="progress-upload">
              <span>Your progress</span>
              <span className="ml-auto">{percentage}%</span>
            </FieldLabel>
            <Progress value={percentage} id="lesson-progress" />
          </Field>
        </div>

        {/* Card */}

        {Object.entries(groupedLessons).map(([week, weekLessons], i) => {
          return (
            <div
              key={i}
              className="bg-card text-card-foreground border-border mt-12 w-sm rounded-4xl border px-4 py-6"
            >
              <div className="flex flex-col gap-2">
                <div className="text-foreground font-semibold">{week}</div>
                <div className="text-muted-foreground text-sm">
                  Course lessons and materials for week {week}
                </div>
              </div>

              <div className="mt-6 flex flex-col divide-y pb-2">
                {weekLessons.map((lesson) => {
                  const isCurrent = lesson.id === currentLessonId;
                  const isCompleted = completedIds.includes(lesson.id);

                  return (
                    <Link
                      key={lesson.id}
                      href={`/courses/${courseId}/${lesson.id}`}
                      className={`border-border hover:bg-muted/50 flex items-center justify-between gap-2 px-2 py-4 transition-colors ${
                        isCurrent ? "bg-accent/50 font-medium" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isCompleted ? (
                          <CheckCircle2 className="size-4 text-emerald-500" />
                        ) : isCurrent ? (
                          <PlayCircle className="text-primary size-4" />
                        ) : (
                          <FileText className="text-muted-foreground size-4" />
                        )}
                        <div
                          className={`line-clamp-1 text-sm ${
                            isCurrent
                              ? "text-primary font-semibold"
                              : "text-card-foreground"
                          }`}
                        >
                          {lesson.title}
                        </div>
                      </div>

                      {isCompleted ? (
                        <span className="text-xs font-medium text-emerald-500">
                          Completed
                        </span>
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
    </div>
  );
};

export default Topics;
