import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";
import { BookUser, Clock, Globe, LibraryBig } from "lucide-react";

const Materials = () => {
  const courseMaterialsMenu = [
    {
      section: [
        {
          title: "Duration",
          data: "3 weeks",
          icon: Clock,
        },

        {
          title: "Lessons",
          data: "8",
          icon: LibraryBig,
        },
        {
          title: "Enrolled",
          data: "65 students",
          icon: BookUser,
        },
        {
          title: "Language",
          data: "English",
          icon: Globe,
        },
      ],
    },
  ];
  return (
    <div className="mt-8 flex flex-col gap-2 px-4 md:mt-8 md:gap-5 md:px-0">
      <div className="text-xl font-medium md:text-2xl">Course Materials</div>
      <div className="bg-card flex gap-3 rounded-sm px-4 py-3 md:px-7">
        {courseMaterialsMenu.map((sections, i) => {
          return (
            <div key={i} className="flex w-full flex-col divide-y">
              {sections.section.map((section, j) => {
                return (
                  <div
                    key={j}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center gap-2">
                      <section.icon className="size-5" />
                      <span className="text-chart-4">{section.title}:</span>
                    </div>
                    <div className="text-end">{section.data}</div>
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

export default Materials;
