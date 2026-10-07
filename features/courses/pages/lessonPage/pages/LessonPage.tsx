"use client";

import { Button } from "@/components/ui/button";
import { Database } from "@/types/database.types";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";
import {
  ChevronRight,
  Info,
  LaptopMinimal,
  MessageCircleQuestionMark,
  MessageSquarePlus,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useGetOneCourse } from "../../hooks/useCourse";
import Comments from "../components/Comments";
import CourseInfo from "../components/CourseInfo";
import LeaderBoard from "../components/LeaderBoard";
import MobileTopics from "../components/MobileTopics";
import Topics from "../components/Topics";
import {
  useGetCourseLesson,
  useGetCourseProgress,
  useToggleLessonProgress,
} from "./hooks/useLesson";

interface LessonPageProps {
  courseId: string;
  lessonId: string;
  userId: string;
}
type Lesson = Database["public"]["Tables"]["lessons"]["Row"]["video_url"];
type Course = Database["public"]["Tables"]["courses"]["Row"];

const LessonPage = ({ courseId, lessonId, userId }: LessonPageProps) => {
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const mobileTopicsRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  const { data: lesson, isLoading: isLessonLoading } =
    useGetCourseLesson(lessonId);
  const { data: course, isLoading: isCourseLoading } =
    useGetOneCourse(courseId);

  const { data: progressData } = useGetCourseProgress(courseId, userId);

  const { mutate: toggleProgress, isPending: isToggling } =
    useToggleLessonProgress();

  if (isLessonLoading) {
    return <div className="p-10 text-center">Loading lesson...</div>;
  }

  if (!lesson) {
    return <div className="p-10 text-center">Lesson not found.</div>;
  }

  const isCompleted =
    progressData?.completed_lesson_ids?.includes(lessonId) ?? false;

  const handleToggleComplete = () => {
    if (!userId) return;
    toggleProgress({
      userId,
      lessonId,
      courseId,
      isCompleted: !isCompleted,
    });
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="text-foreground mt-5 md:mt-10">
      <div className="flex flex-col gap-6 px-2 md:mx-10 md:px-0">
        <div className="text-muted-foreground line-clamp-1 flex items-center gap-1 text-sm">
          <Link href={`/courses`}>Courses</Link>
          <ChevronRight className="size-4" />
          <Link href={`/courses/${lesson.course_id}`} className="line-clamp-1">
            {course?.[0].title}
          </Link>
          <ChevronRight className="size-4" />
          <span className="text-foreground line-clamp-1 font-medium">
            {lesson?.title || "Lesson Details"}
          </span>
        </div>
      </div>

      <div
        className={`bg-background mt-3 flex flex-col justify-between rounded-3xl md:mx-10 md:mt-8 md:pb-4 ${fullScreen == true ? "md:flex-col" : "md:flex-row"}`}
      >
        {/* Left Side */}
        <div className="relative mb-25 w-full">
          {/* Video */}
          <div className="sticky top-18 z-10 overflow-hidden! rounded-none! border-0! md:static md:rounded-lg!">
            <ReactPlayer
              src={
                lesson.video_url ||
                "https://www.youtube.com/watch?v=wm5gMKuwSYk"
              }

              className="relative aspect-video! h-full! w-full! overflow-hidden! rounded-none! border-0! md:rounded-4xl!"
              controls
              onPlay={() => {
                if (!isCompleted) handleToggleComplete();
              }}
              // onEnded={() => {}}
            />
            <Button
              size={"icon-lg"}
              className="bg-primary/80 text-primary-foreground hover:bg-primary absolute top-13 right-7 z-20 hidden cursor-pointer rounded-full! p-4.5! backdrop-blur-md transition-colors md:flex"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setFullScreen(!fullScreen);
              }}
            >
              <LaptopMinimal />
            </Button>
          </div>

          {/* Icons / Action Buttons */}
          <div className="mt-4 flex flex-col justify-between gap-3 px-6 md:mt-6 md:flex-row md:px-0">
            <div className="text-foreground text-xl font-medium md:text-4xl md:font-semibold">
              {lesson?.title}
            </div>
            <div className="flex gap-2 md:gap-3">
              <Button
                variant={"ghost"}
                size={"icon-lg"}
                className="bg-card text-card-foreground border-border hover:bg-accent hover:text-accent-foreground rounded-full! border transition-colors"
                onClick={() => scrollToSection(commentsRef)}
                aria-label="go to comments"
              >
                <MessageSquarePlus />
              </Button>

              <Button
                variant={"ghost"}
                size={"icon-lg"}
                className="bg-card text-card-foreground border-border hover:bg-accent hover:text-accent-foreground rounded-full! border transition-colors"
                onClick={() => {
                  scrollToSection(mobileTopicsRef);
                }}
                aria-label="go to info"
              >
                <Info />
              </Button>

              <Button
                variant={"ghost"}
                size={"icon-lg"}
                className="bg-card text-card-foreground border-border hover:bg-accent hover:text-accent-foreground rounded-full! border transition-colors"
              >
                <MessageCircleQuestionMark strokeWidth={2} />
              </Button>

              <LeaderBoard />
            </div>
          </div>

          <div className="flex">
            <div>
              {/* Course Materials */}
              <div
                ref={mobileTopicsRef}
                // className="scroll-mt-60 md:scroll-mt-6"
              >
                <CourseInfo course={course?.[0]} />
              </div>
              <div
                ref={mobileTopicsRef}
                className="scroll-mt-60 md:hidden md:scroll-mt-6"
              >
                <MobileTopics
                  fullScreen={fullScreen}
                  courseId={courseId}
                  currentLessonId={lessonId}
                  lessonWeek={lesson.week}
                  progressData={progressData}
                />
              </div>

              {/* Comments Section */}

              <div ref={commentsRef} className="scroll-mt-59 md:scroll-mt-0">
                <Comments />
              </div>
            </div>

            <div className={`mt-10 ${fullScreen ? "block" : "hidden"}`}>
              <Topics
                fullScreen={fullScreen}
                courseId={courseId}
                currentLessonId={lessonId}
                lessonWeek={lesson.week}
                progressData={progressData}
              />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className={` ${fullScreen ? "hidden" : "block"}`}>
          <Topics
            fullScreen={fullScreen}
            courseId={courseId}
            currentLessonId={lessonId}
            lessonWeek={lesson.week}
            progressData={progressData}
          />
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
