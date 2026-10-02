import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import { Database } from "@/types/database.types";
import { ChevronRight, CircleCheck, TvMinimalPlay } from "lucide-react";
import Link from "next/link";
import { useGetCourseProgress } from "../pages/hooks/useLesson";

type Lesson = Database["public"]["Tables"]["lessons"]["Row"];

type LessonCardProps = {
  lesson: Lesson;
};

const LessonCard = ({ lesson }: LessonCardProps) => {
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();
  const { data: progressData } = useGetCourseProgress(
    lesson?.course_id as string,
    currentUser?.id,
  );

  const isCompleted =
    progressData?.completed_lesson_ids?.includes(lesson.id) ?? false;

  return (
    <div>
      <Link
        href={`/courses/${lesson.course_id}/${lesson.id}`}
        className="group text-card-foreground hover:bg-muted/50 flex w-full rounded-2xl px-1 py-2 duration-300 md:h-fit md:px-4 md:py-3.5"
      >
        <div className="flex w-full justify-between gap-2">
          <div className="flex items-center gap-4 md:gap-4">
            {isCompleted ? (
              <div>
                <CircleCheck className="size-4 text-emerald-500" />
              </div>
            ) : (
              <div>
                <TvMinimalPlay className="text-muted-foreground size-4" />
              </div>
            )}
            <div className="text-card-foreground line-clamp-1 text-sm md:line-clamp-none md:text-base">
              {lesson.title}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 md:gap-3">
            <div className="text-card-foreground text-xs md:text-base">
              {lesson.duration}
            </div>
            <div>
              <ChevronRight className="text-muted-foreground size-4 md:size-5" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LessonCard;
