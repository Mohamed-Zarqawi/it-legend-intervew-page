import { Progress } from "@/components/myComponents/progress";
import { Button } from "@/components/ui/button";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import { Database } from "@/types/database.types";
import {
  IconAwardFilled,
  IconCategoryFilled,
  IconClockFilled,
} from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useEnrollCourse,
  useGetEnrolledCourses,
} from "../pages/hooks/useCourse";
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

  const router = useRouter();

  const { data: enrolledCourses, isLoading } = useGetEnrolledCourses(
    currentUser?.id,
  );

  const { mutateAsync: handleEnroll, isPending: isEnrolling } =
    useEnrollCourse();
  const percentage = progressData?.progress_percentage || 0;

  return (
    <div className="group bg-card border-border text-card-foreground flex h-80 w-full flex-col justify-between rounded-4xl border md:h-auto md:p-4">
      <div>
        <div className="group overflow-hidden rounded-t-2xl hover:cursor-pointer md:rounded-2xl">
          <Image
            src={String(course?.thumbnail_url)}
            alt={course?.title}
            width={300}
            height={300}
            className="inset-0 h-46 w-full rounded-t-2xl object-cover object-center transition-transform duration-500 group-hover:scale-103 md:h-90 md:min-w-100 md:rounded-2xl"
          />
        </div>

        <div className="mt-3 flex flex-col px-2 md:gap-0.5 md:px-0">
          <div className="text-card-foreground line-clamp-1 text-xs font-medium md:line-clamp-none md:text-lg">
            {course?.title}
          </div>
          <div className="text-muted-foreground line-clamp-2 hidden w-full text-sm md:block">
            {course?.description}
          </div>
        </div>
      </div>
      <div className="mt-3 flex w-full flex-col justify-end gap-2 p-2 md:gap-3 md:p-0">
        <div className="flex w-full flex-col gap-2 px-1">
          <div className="text-foreground flex items-center gap-1.5">
            <IconCategoryFilled className="text-muted-foreground size-3.5" />
            <span className="text-xs">{course?.category}</span>
          </div>
          <div className="flex justify-between">
            <div className="text-foreground hidden items-center gap-1.5 md:flex">
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

        {enrolledCourses?.some(
          (enrolledCourse) => enrolledCourse.courseId === course.id,
        ) ? (
          <Progress
            value={percentage}
            href={`courses/${course?.id}`}
            id="progress-upload"
            label={`${percentage == 0 ? "Start Learning" : percentage == 100 ? "Completed" : `${percentage}% Completed`}`}
            className="bg-card w-full"
          />
        ) : (
          <Button
            onClick={() => {
              if (!currentUser) {
                router.push(`courses/${course?.id}`);
              }
              handleEnroll({ courseId: course?.id, userId: currentUser?.id });
            }}
          >
            {currentUser ? "Enroll to your courses" : "View Course"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
