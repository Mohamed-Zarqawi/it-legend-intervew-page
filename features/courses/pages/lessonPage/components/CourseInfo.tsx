import { Database } from "@/types/database.types";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";
import { BookUser, Clock, Globe, LibraryBig } from "lucide-react";

type Course = Database["public"]["Tables"]["courses"]["Row"] & {
  lessons: Pick<Database["public"]["Tables"]["lessons"]["Row"], "id">[];
};

interface CourseInfo {
  course?: Course;
}

const CourseInfo = ({ course }: CourseInfo) => {
  const courseMaterialsMenu = [
    {
      section: [
        {
          title: "Duration",
          data: `${course?.weeks} Weeks`,
          icon: Clock,
        },

        {
          title: "Lessons",
          data: `${course?.lessons.length} Lesson`,
          icon: LibraryBig,
        },
        {
          title: "Enrolled",
          data: "65 students",
          icon: BookUser,
        },
        {
          title: "Language",
          data: `${course?.language}`,
          icon: Globe,
        },
      ],
    },
  ];

  return (
    <div className="mt-8 flex flex-col gap-2 px-4 md:mt-10 md:gap-5 md:px-0">
      <div className="text-foreground text-xl font-medium md:text-2xl">
        Course Information
      </div>
      <div className="bg-card text-card-foreground border-border flex gap-3 rounded-4xl border px-4 py-3 md:px-7">
        {courseMaterialsMenu.map((sections, i) => {
          return (
            <div
              key={i}
              className="border-border divide-border flex w-full flex-col divide-y"
            >
              {sections.section.map((section, j) => {
                return (
                  <div
                    key={j}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center gap-3">
                      <section.icon className="text-muted-foreground size-5" />
                      <span className="text-foreground font-medium">
                        {section.title}:
                      </span>
                    </div>
                    <div className="text-muted-foreground text-end">
                      {section.data}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseInfo;
