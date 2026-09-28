import { Progress } from "@/components/myComponents/progress";
import { Database } from "@/types/database.types";
import {
  IconAwardFilled,
  IconCategoryFilled,
  IconClockFilled,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Course = Database["public"]["Tables"]["courses"]["Row"] & {
  lessons: Pick<Database["public"]["Tables"]["lessons"]["Row"], "id">[];
};
type CourseCardProps = {
  course: Course;
};

const CourseCard = ({ course }: CourseCardProps) => {
  const router = useRouter();
  return (
    <div
      className="bg-card border-border text-card-foreground flex h-117 w-100 flex-col justify-between rounded-4xl border p-4"
      // onClick={() => {
      //   router.push(`/courses/${course?.id}`);
      // }}
    >
      <div>
        <div className="group overflow-hidden rounded-2xl hover:cursor-pointer">
          <Image
            src={String(course?.thumbnail_url)}
            alt={course?.title}
            width={300}
            height={300}
            className="inset-0 h-fit w-100 rounded-2xl object-cover object-center transition-transform duration-500 group-hover:scale-103"
          />
        </div>
        <div className="mt-3 flex flex-col justify-between gap-4 rounded-2xl">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-0.5">
              <div className="text-card-foreground text-lg font-medium">
                {course?.title}
              </div>
              <div className="text-muted-foreground line-clamp-2 w-xs text-sm">
                {course?.description}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-end gap-3">
        <div className="flex flex-col gap-2">
          <div className="text-foreground flex items-center gap-1.5">
            <IconCategoryFilled className="text-muted-foreground size-3.5" />
            <span className="text-xs">{course?.category}</span>
          </div>
          <div className="flex gap-14">
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
                <span className="text-muted-foreground ml-1">remmaining</span>
              </span>
            </div>
          </div>
        </div>

        <Progress
          value={66}
          href={`/courses/${course?.id}`}
          id="progress-upload"
          label={`Continue Learning`}
          className="bg-card w-full"
        >
          <Link href={`/${course?.id}`}></Link>
        </Progress>
      </div>
    </div>
  );
};

export default CourseCard;
