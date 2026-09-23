"use client";

import { Button } from "@/components/ui/button";
import { useRef } from "react";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";
import {
  ChevronRight,
  Info,
  MessageCircleQuestionMark,
  MessageSquarePlus,
  Podium,
} from "lucide-react";
import Comments from "../components/Coments";
import Materials from "../components/Materials";
import MobileTopics from "../components/MobileTopics";
import Topics from "../components/Topics";

const CourseDetailsPage = () => {
  const mobileTopicsRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-6 px-4 md:px-8">
        <div className="text-chart-3 flex items-end">
          Home <ChevronRight className="size-5" /> Courses{" "}
          <ChevronRight className="size-5" /> Course Details
        </div>
        <div className="text-3xl font-medium md:text-4xl md:font-semibold">
          Starting SEO as your Home
        </div>
      </div>

      <div className="bg-secondary mt-3 flex flex-col justify-between md:flex-row md:px-8 md:py-4">
        {/* Left Side */}
        <div className="mb-20 w-full">
          {/* Video */}
          <div className="sticky top-0 z-10 overflow-hidden! rounded-none! border-0! md:static md:rounded-lg!">
            <MediaPlayer
              title="Course Video"
              src="/videos/video.mp4"
              load="visible"
              posterLoad="visible"
              playsInline
              className="aspect-video! w-full overflow-hidden! rounded-none! border-0! md:rounded-sm!"
            >
              <MediaProvider className="overflow-hidden! rounded-none! border-0! md:rounded-sm!" />

              <DefaultVideoLayout
                icons={defaultLayoutIcons}
                className="overflow-hidden! rounded-none! border-0! md:rounded-sm!"
              />
            </MediaPlayer>
          </div>

          {/* Icons / Action Buttons */}
          <div className="mt-3 flex gap-3 px-4 md:mt-8 md:px-0">
            <Button
              variant={"outline"}
              size={"icon-lg"}
              className="border-chart-1 rounded-full!"
              onClick={() => scrollToSection(commentsRef)}
              aria-label="go to comments"
            >
              <MessageSquarePlus />
            </Button>

            <Button
              variant={"outline"}
              size={"icon-lg"}
              className="border-chart-1 rounded-full!"
            >
              <Podium strokeWidth={2} />
            </Button>

            <Button
              variant={"outline"}
              size={"icon-lg"}
              className="border-chart-1 rounded-full!"
              onClick={() => scrollToSection(mobileTopicsRef)}
              aria-label="go to comments"
            >
              <Info />
            </Button>

            <Button
              variant={"outline"}
              size={"icon-lg"}
              className="border-chart-1 rounded-full!"
            >
              <MessageCircleQuestionMark strokeWidth={2} />
            </Button>
          </div>

          {/* Course Materials */}
          <Materials />

          <div ref={mobileTopicsRef} className="scroll-mt-60 md:scroll-mt-6">
            <MobileTopics />
          </div>

          {/* Comments Section */}

          <div ref={commentsRef} className="scroll-mt-60 md:scroll-mt-6">
            <Comments />
          </div>
        </div>

        {/* Right Side */}
        <Topics />
      </div>
    </div>
  );
};

export default CourseDetailsPage;
