import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";
import { FileText, Lock } from "lucide-react";

const Topics = ({ fullScreen }: { fullScreen?: boolean }) => {
  const courseDetailsMenu = [
    {
      week: "1 - 4",
      description:
        "Advanced story telling techniques for writers: Persons, Charachters & Plots",
      items: [
        { item: "Introduction" },
        { item: "Course Overview" },
        {
          item: "Course Exercise | Reference Files",
          exersise: {
            question: "1",
            time: "10",
          },
        },
        { item: "Code Editor Installation" },
        { item: "Embedding PHP in HTML" },
      ],
    },

    {
      week: "5 - 8",
      description:
        "Advanced story telling techniques for writers: Persons, Charachters & Plots",
      items: [
        { item: "Defining Functions" },
        { item: "Function Parameters" },
        {
          item: "Global variable and Scope",
          exersise: {
            question: "2",
            time: "15",
          },
        },
        { item: "Newer Way of creating a constant" },
        { item: "Constants" },
      ],
    },
    {
      week: "9 - 12",
      description:
        "Advanced story telling techniques for writers: Persons, Charachters & Plots",
      items: [
        { item: "Defining Functions" },
        { item: "Function Parameters" },
        {
          item: "Global variable and Scope",
          exersise: {
            question: "3",
            time: "20",
          },
        },
        { item: "Newer Way of creating a constant" },
        { item: "Constants" },
      ],
    },
  ];

  return (
    <div>
      {/* Right Side */}
      <div
        className={`hidden w-full max-w-fit min-w-fit md:pl-14 ${fullScreen == true ? "md:hidden" : "md:block"} `}
      >
        {/* header */}
        <div>
          <div className="text-xl font-medium">Topics for This Course</div>

          <Slider
            defaultValue={[63]}
            disabled
            max={100}
            className="mx-auto mt-10 w-full min-w-xs"
          />
        </div>

        {/* Card */}
        {courseDetailsMenu.map((card, i) => {
          return (
            <div
              key={i}
              className="bg-card border-chart-1 mt-12 w-sm rounded-4xl border px-4 py-6"
            >
              <div className="flex flex-col gap-2">
                <div className="font-medium">Week {card.week}</div>
                <div className="text-chart-2 text-sm">{card.description}</div>
              </div>

              <div className="mt-6 flex flex-col pb-2">
                {card.items.map((item, j) => {
                  return (
                    <div
                      key={j}
                      className={`border-chart-1 flex justify-between border-b py-4 ${item.exersise?.question ? "items-start" : "items-center"}`}
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="size-4" />
                        <div className="text-sm">{item.item}</div>
                      </div>
                      {item.exersise?.question ? (
                        <div className="flex flex-col gap-2">
                          <Badge
                            variant={"default"}
                            className="min-w-20 bg-emerald-500/10 text-emerald-500"
                          >
                            {item.exersise.question} QUESTIONS
                          </Badge>
                          <Badge variant={"destructive"} className="min-w-20">
                            {item.exersise.time} MINUTES
                          </Badge>
                        </div>
                      ) : (
                        <Lock className="size-4" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Topics;
