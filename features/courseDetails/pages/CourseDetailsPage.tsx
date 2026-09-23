"use client";

import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

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
  LaptopMinimal,
  MessageCircleQuestionMark,
  MessageSquarePlus,
  Podium,
} from "lucide-react";
import Comments from "../components/Coments";
import Materials from "../components/Materials";
import MobileTopics from "../components/MobileTopics";
import Topics from "../components/Topics";

const CourseDetailsPage = () => {
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const mobileTopicsRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  console.log(fullScreen);
  return (
    <div className="mt-4">
      <div className="flex flex-col gap-6 px-2 md:mx-50 md:px-0">
        <div className="text-chart-3 flex items-end">
          Home <ChevronRight className="size-5" /> Courses{" "}
          <ChevronRight className="size-5" /> Course Details
        </div>
        <div className="text-3xl font-medium md:text-4xl md:font-semibold">
          Starting SEO as your Home
        </div>
      </div>

      <div
        className={`bg-secondary mt-3 flex flex-col justify-between rounded-3xl md:mx-50 md:mt-8 md:pb-4 ${fullScreen == true ? "md:flex-col" : "md:flex-row"}`}
      >
        {/* Left Side */}
        <div className="relative mb-25 w-full">
          {/* Video */}
          <div className="sticky top-0 z-10 overflow-hidden! rounded-none! border-0! md:static md:rounded-lg!">
            <MediaPlayer
              title="Course Video"
              src="youtube/https://www.youtube.com/watch?v=BB49x_uMlGA"
              load="visible"
              posterLoad="visible"
              playsInline
              className="relative aspect-video! w-full overflow-hidden! rounded-none! border-0! md:rounded-sm!"
            >
              <MediaProvider className="overflow-hidden! rounded-none! border-0! md:rounded-sm!" />

              <DefaultVideoLayout
                icons={defaultLayoutIcons}
                className="overflow-hidden! rounded-none! border-0! md:rounded-sm!"
              />

              <Button
                size={"icon-lg"}
                className="bg-chart-4 absolute top-5 right-5 z-20 hidden cursor-pointer rounded-full! p-4.5! backdrop-blur-md md:flex"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setFullScreen(!fullScreen);
                }}
              >
                <LaptopMinimal />
              </Button>
            </MediaPlayer>
          </div>

          {/* Icons / Action Buttons */}
          <div className="mt-3 flex gap-3 px-6 md:mt-6 md:px-0">
            <Button
              variant={"ghost"}
              size={"icon-lg"}
              className="bg-card border-border rounded-full! border"
              onClick={() => scrollToSection(commentsRef)}
              aria-label="go to comments"
            >
              <MessageSquarePlus />
            </Button>

            <Button
              variant={"ghost"}
              size={"icon-lg"}
              className="bg-card border-border rounded-full!"
              onClick={() => {
                scrollToSection(mobileTopicsRef);
              }}
              aria-label="go to comments"
            >
              <Info />
            </Button>

            <Button
              variant={"ghost"}
              size={"icon-lg"}
              className="bg-card border-border rounded-full!"
            >
              <MessageCircleQuestionMark strokeWidth={2} />
            </Button>

            <Button
              variant={"ghost"}
              size={"icon-lg"}
              className="bg-card border-border rounded-full!"
              // onClick={}
            >
              <Podium strokeWidth={2} />
            </Button>
          </div>

          {/* Course Materials */}
          <Materials />

          <div ref={mobileTopicsRef} className="scroll-mt-60 md:scroll-mt-6">
            <MobileTopics fullScreen={fullScreen} />
          </div>

          {/* Comments Section */}

          <div ref={commentsRef} className="scroll-mt-59 md:scroll-mt-0">
            <Comments />
          </div>
        </div>

        {/* Right Side */}

        <Topics fullScreen={fullScreen} />
      </div>
    </div>
  );
};

export default CourseDetailsPage;
