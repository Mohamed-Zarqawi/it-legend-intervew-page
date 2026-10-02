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
        className="group text-card-foreground hover:bg-primary/80 flex w-full rounded-2xl px-4 py-3.5 duration-300 md:h-fit"
      >
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-4">
            {isCompleted ? (
              <CircleCheck className="size-4 text-emerald-500" />
            ) : (
              <TvMinimalPlay className="text-muted-foreground size-4" />
            )}
            <div className="text-card-foreground">{lesson.title}</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-card-foreground"> {lesson.duration}</div>
            <ChevronRight className="text-muted-foreground size-5" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LessonCard;
