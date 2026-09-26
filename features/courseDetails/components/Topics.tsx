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
          <div className="text-foreground text-xl font-medium">
            Topics for This Course
          </div>

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
              className="bg-card text-card-foreground border-border mt-12 w-sm rounded-4xl border px-4 py-6"
            >
              <div className="flex flex-col gap-2">
                <div className="text-foreground font-semibold">
                  Week {card.week}
                </div>
                <div className="text-muted-foreground text-sm">
                  {card.description}
                </div>
              </div>

              <div className="mt-6 flex flex-col pb-2">
                {card.items.map((item, j) => {
                  return (
                    <div
                      key={j}
                      className={`border-border flex justify-between border-b py-4 ${item.exersise?.question ? "items-start" : "items-center"}`}
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="text-muted-foreground size-4" />
                        <div className="text-card-foreground text-sm">
                          {item.item}
                        </div>
                      </div>
                      {item.exersise?.question ? (
                        <div className="flex flex-col gap-2">
                          <Badge
                            variant={"outline"}
                            className="min-w-20 border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          >
                            {item.exersise.question} QUESTIONS
                          </Badge>
                          <Badge
                            variant={"destructive"}
                            className="min-w-20 justify-center"
                          >
                            {item.exersise.time} MINUTES
                          </Badge>
                        </div>
                      ) : (
                        <Lock className="text-muted-foreground size-4" />
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
