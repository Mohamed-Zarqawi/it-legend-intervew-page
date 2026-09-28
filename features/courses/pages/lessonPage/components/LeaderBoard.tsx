import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Podium } from "lucide-react";

const LeaderBoard = () => {
  const leaderBoardMenu = [
    {
      number: "1",
      name: "Ahmed Mohsen",
      points: "940",
    },

    {
      number: "2",
      name: "Yara Khaled",
      points: "940",
    },
    {
      number: "3",
      name: "You",
      points: "940",
    },
    {
      number: "4",
      name: "Nada Yaser",
      points: "940",
    },
    {
      number: "5",
      name: "Mohamed Ahmed",
      points: "940",
    },
    {
      number: "6",
      name: "Mortada Mansor",
      points: "940",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon-lg"}
          className="bg-card text-card-foreground border-border hover:bg-accent hover:text-accent-foreground rounded-full! border transition-colors"
          // onClick={}
        >
          <Podium strokeWidth={2} />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-popover text-popover-foreground border-border">
        <DialogHeader>
          <DialogTitle className={"text-foreground text-2xl"}>
            Leaderboard
          </DialogTitle>
          <DialogDescription
            className={
              "bg-muted text-muted-foreground mt-2 rounded-2xl p-3 text-base"
            }
          >
            You're doing great! Your answers in this course beat 90% of the
            other students. Check your rank below. 💪🏻
          </DialogDescription>
        </DialogHeader>
        <div className="no-scrollbar mx-1 flex max-h-[50vh] flex-col gap-2 overflow-y-auto">
          {leaderBoardMenu.map((item, index) => {
            return (
              <div
                key={index}
                className={`flex items-center justify-between rounded-2xl border px-3 py-3 text-lg transition-colors ${
                  item.name === "You"
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "border-border bg-card text-card-foreground"
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full border text-sm font-medium ${
                      item.name === "You"
                        ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                        : "border-border bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.number}
                  </div>
                  <div className="text-sm font-medium">{item.name}</div>
                </div>
                <div className="text-muted-foreground text-sm font-medium">
                  {item.points} pts
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeaderBoard;
