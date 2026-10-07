import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Database } from "@/types/database.types";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";
import {
  ChevronDownIcon,
  CircleCheck,
  FileText,
  Lock,
  PlayCircle,
} from "lucide-react";
import Link from "next/link";
import { useGetAllCourseLessons } from "../pages/hooks/useLesson";
import { ExamDialog } from "./ExamDialog";

interface TopicsProps {
  fullScreen?: boolean;
  courseId: string;
  currentLessonId: string;
  lessonWeek?: string;
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
  lessonWeek,
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
        className={`hidden w-full max-w-fit min-w-fit md:block ${fullScreen ? "md:pl-10" : "md:pl-14"} `}
      >
        {/* header */}
        <div>
          <div className="text-foreground text-xl font-medium md:text-2xl">
            Topics for this course
          </div>

          <Field className="mx-auto mt-6 w-full">
            <FieldLabel htmlFor="progress-upload">
              <span>Your progress</span>
              <span className="ml-auto">{percentage || 68}%</span>
            </FieldLabel>
            <Progress value={percentage || 68} id="lesson-progress" />
          </Field>
        </div>

        {/* Card */}

        <div className="bg-card text-card-foreground border-border mt-10 flex w-sm flex-col gap-5 rounded-4xl border px-4 py-6">
          {Object.entries(groupedLessons).map(([week, weekLessons], i) => {
            return (
              // <div
              // key={i}
              // className="bg-card text-card-foreground border-border mt-12 w-sm rounded-4xl border px-4 py-6"
              // >
              //   <div className="flex flex-col gap-2">
              //     <div className="text-foreground font-semibold">Week {week}</div>
              //   </div>

              // <div className="mt-6 flex flex-col divide-y pb-2">
              //   {weekLessons.map((lesson) => {
              //     const isCurrent = lesson.id === currentLessonId;
              //     const isCompleted = completedIds.includes(lesson.id);

              //     return (
              //       <Link
              //         key={lesson.id}
              //         href={`/courses/${courseId}/${lesson.id}`}
              //         className={`border-border hover:bg-muted/50 flex items-center justify-between gap-2 px-2 py-4 transition-colors ${
              //           isCurrent ? "bg-accent/50" : ""
              //         }`}
              //       >
              //         <div className="flex items-center gap-3">
              //           {isCurrent ? (
              //             <PlayCircle className="text-foreground size-4" />
              //           ) : (
              //             <FileText className="text-muted-foreground size-4" />
              //           )}
              //           <div
              //             className={`line-clamp-1 text-sm ${
              //               isCurrent
              //                 ? "text-card-foreground"
              //                 : "text-muted-foreground"
              //             }`}
              //           >
              //             {lesson.title}
              //           </div>
              //         </div>

              //         {isCompleted ? (
              //           <CircleCheck className="size-4 text-emerald-500" />
              //         ) : (
              //           <Lock className="text-muted-foreground size-4" />
              //         )}
              //       </Link>
              //     );
              //   })}

              //   <ExamDialog week={week} courseId={courseId} />
              // </div>
              // </div>

              <Collapsible
                className="data-[state=open]:bg-muted bg-muted rounded-2xl"
                key={i}
                defaultOpen={lessonWeek === week}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant={"none"}
                    className="group bg-muted w-full px-4 py-6"
                  >
                    <div className="text-foreground font-semibold">
                      Week {week}
                    </div>
                    <ChevronDownIcon className="ml-auto duration-300 group-data-[state=open]:rotate-180" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down flex flex-col divide-y overflow-hidden px-4 pb-4">
                  {weekLessons.map((lesson) => {
                    const isCurrent = lesson.id === currentLessonId;

                    // if (isCurrent) {
                    //   setCurrentWeekLesson(lesson.week);
                    // }
                    const isCompleted = completedIds.includes(lesson.id);

                    return (
                      <Link
                        key={lesson.id}
                        href={`/courses/${courseId}/${lesson.id}`}
                        className={`border-border hover:bg-muted/50 flex items-center justify-between gap-2 px-2 py-4 transition-colors ${
                          isCurrent ? "bg-accent/50" : ""
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

                  <ExamDialog week={week} courseId={courseId} />
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Topics;
