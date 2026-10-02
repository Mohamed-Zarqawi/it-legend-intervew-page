import { Database } from "@/types/database.types";
import { ChevronRight, TvMinimalPlay } from "lucide-react";
import Link from "next/link";

type Lesson = Database["public"]["Tables"]["lessons"]["Row"];

type LessonCardProps = {
  lesson: Lesson;
};

const LessonCard = ({ lesson }: LessonCardProps) => {
  return (
    <div>
      <Link
        href={`/courses/${lesson.course_id}/${lesson.id}`}
        className="group text-card-foreground hover:bg-primary/80 flex w-full rounded-2xl px-4 py-3.5 duration-300 md:h-fit"
      >
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-4">
            <TvMinimalPlay className="text-muted-foreground size-4" />
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
