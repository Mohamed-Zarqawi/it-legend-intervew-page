import { Progress } from "@/components/myComponents/progress";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import { Database } from "@/types/database.types";
import {
  IconAwardFilled,
  IconCategoryFilled,
  IconClockFilled,
} from "@tabler/icons-react";
import Image from "next/image";
import { useGetCourseProgress } from "../pages/lessonPage/pages/hooks/useLesson";

type Course = Database["public"]["Tables"]["courses"]["Row"] & {
  lessons: Pick<Database["public"]["Tables"]["lessons"]["Row"], "id">[];
};
type CourseCardProps = {
  course: Course;
};

const CourseCard = ({ course }: CourseCardProps) => {
  const { data: currentUser } = useGetCurrentUser();
  const { data: progressData } = useGetCourseProgress(
    course.id,
    currentUser?.id,
  );
  const percentage = progressData?.progress_percentage || 0;

  return (
    <div className="group bg-card border-border text-card-foreground md:h- flex w-full flex-col justify-between rounded-4xl border p-4">
      <div>
        <div className="group overflow-hidden rounded-2xl hover:cursor-pointer">
          <Image
            src={String(course?.thumbnail_url)}
            alt={course?.title}
            width={300}
            height={300}
            className="inset-0 h-90 w-full rounded-2xl object-cover object-center transition-transform duration-500 group-hover:scale-103 md:min-w-100"
          />
        </div>

        <div className="mt-3 flex flex-col gap-0.5">
          <div className="text-card-foreground text-lg font-medium">
            {course?.title}
          </div>
          <div className="text-muted-foreground line-clamp-2 w-full text-sm">
            {course?.description}
          </div>
        </div>
      </div>
      <div className="mt-3 flex w-full flex-col justify-end gap-3">
        <div className="flex w-full flex-col gap-2 px-1">
          <div className="text-foreground flex items-center gap-1.5">
            <IconCategoryFilled className="text-muted-foreground size-3.5" />
            <span className="text-xs">{course?.category}</span>
          </div>
          <div className="flex justify-between">
            <div className="text-foreground flex items-center gap-1.5">
              <IconAwardFilled className="text-muted-foreground size-3.5" />
              <span className="text-xs">
                1/{course?.certificate}
                <span className="text-muted-foreground ml-1">Certificates</span>
              </span>
            </div>
            <div className="text-foreground flex items-center gap-1.5">
              <IconClockFilled className="text-muted-foreground size-3.5" />
              <span className="text-xs">
                {course?.lessons.length} Lesson
                {/* <span className="text-muted-foreground ml-1">remmaining</span> */}
              </span>
            </div>
          </div>
        </div>

        <Progress
          value={percentage}
          href={!currentUser ? "/auth/login" : `courses/${course?.id}`}
          id="progress-upload"
          label={`${percentage == 0 ? "Start Learning" : "Continue Learning"}`}
          className="bg-card w-full"
        />
      </div>
    </div>
  );
};

export default CourseCard;
