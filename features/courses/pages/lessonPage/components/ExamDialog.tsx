"use client";

import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import { useEffect, useState } from "react";
import {
  useExam,
  useSubmitExam,
  useUserExamResult,
} from "../pages/hooks/useExams";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Award } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ExamDialogProps {
  courseId: string;
  week: string;
}

export const ExamDialog = ({ courseId, week }: ExamDialogProps) => {
  const router = useRouter();
  const { data: exam, isLoading: isExamLoading } = useExam(courseId, week);
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();
  const { data: userResults, isLoading: isUserExamLoading } = useUserExamResult(
    currentUser?.id,
    exam?.id,
  );

  const { mutate: submitExam, isPending } = useSubmitExam();

  const storageKey = `exam_draft_${courseId}_week_${week}`;
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    if (userResults?.score !== undefined && userResults?.score !== null) {
      setScore(userResults.score);
    }
  }, [userResults]);

  useEffect(() => {
    const savedDraft = localStorage.getItem(storageKey);
    if (savedDraft) {
      try {
        setAnswers(JSON.parse(savedDraft));
      } catch (e) {
        console.error(e);
      }
    }
  }, [storageKey]);

  const handleSelect = (questionId: string, optionIndex: number) => {
    const updated = { ...answers, [questionId]: optionIndex };
    setAnswers(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const handleSubmit = () => {
    if (!currentUser || !exam?.exam_questions) return;

    let correctCount = 0;
    exam.exam_questions.forEach((question) => {
      if (answers[question.id] === question.correct_answer) correctCount++;
    });

    const calculatedScore = Math.round(
      (correctCount / exam.exam_questions.length) * 100,
    );
    const isPassed = calculatedScore >= exam.passing_score;

    submitExam(
      {
        userId: currentUser.id,
        examId: exam.id,
        score: calculatedScore,
        isPassed,
      },
      {
        onSuccess: () => {
          setScore(calculatedScore);
          localStorage.removeItem(storageKey);
        },
      },
    );
  };

  const isLoading = isCurrentUserLoading || isExamLoading || isUserExamLoading;

  return (
    <div className="pt-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">
            <Award className="mr-2 size-4" />
            Take Week {week} Exam
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Week {week} Exam</DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <div className="text-muted-foreground py-12 text-center text-sm">
              Loading exam...
            </div>
          ) : !exam ||
            !exam.exam_questions ||
            exam.exam_questions.length === 0 ? (
            <div className="text-muted-foreground py-12 text-center text-sm">
              No exam for this week yet.
            </div>
          ) : score !== null ? (
            <div className="space-y-4 py-8 text-center">
              <div className="text-2xl font-bold">Exam Submitted!</div>
              <div className="text-lg">
                Your Score:{" "}
                <span className="text-primary font-bold">{score}%</span>
              </div>
              {score >= (exam?.passing_score || 0) ? (
                <div className="text-sm font-medium text-emerald-500">
                  Congratulations! You passed.
                </div>
              ) : (
                <div className="text-destructive text-sm font-medium">
                  You didn't pass this time.
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
                {exam.exam_questions.map((question, idx) => (
                  <div key={question.id} className="space-y-3 border-b py-4">
                    <div className="text-sm font-medium">
                      {idx + 1}. {question.question}
                    </div>
                    <div className="grid gap-2">
                      {question.options.map((opt, optIdx) => (
                        <FieldGroup
                          key={optIdx}
                          onClick={() => handleSelect(question.id, optIdx)}
                          className={`border-border mx-auto flex w-full cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition-all ${
                            answers[question.id] === optIdx
                              ? "border-primary bg-primary/5"
                              : "border-border hover:bg-muted/50"
                          }`}
                        >
                          <Field
                            orientation="horizontal"
                            className="pointer-events-none"
                          >
                            <Checkbox
                              id={`q_${question.id}_opt_${optIdx}`}
                              name={`q_${question.id}`}
                              checked={answers[question.id] === optIdx}
                              onCheckedChange={() =>
                                handleSelect(question.id, optIdx)
                              }
                              className="accent-primary"
                            />
                            <FieldLabel
                              htmlFor={`q_${question.id}_opt_${optIdx}`}
                              className="w-full cursor-pointer"
                            >
                              {opt}
                            </FieldLabel>
                          </Field>
                        </FieldGroup>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
                <Button
                  onClick={
                    currentUser
                      ? handleSubmit
                      : () => {
                          toast.warning("Login required to submit", {
                            description: "Your selections have been saved.",
                            action: {
                              label: "Log in",
                              onClick: () => router.push("/auth/login"),
                            },
                          });
                        }
                  }
                  disabled={isPending}
                  variant="default"
                  pendingText="Submitting"
                  isPending={isPending}
                >
                  Submit
                </Button>
              </DialogFooter>
            </>
          )}

          {score !== null && !isLoading && (
            <DialogFooter className="flex gap-2">
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
              <Button onClick={() => setScore(null)} variant="default">
                Start Again
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
