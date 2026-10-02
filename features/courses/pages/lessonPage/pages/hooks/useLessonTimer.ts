import { useEffect, useState } from "react";

const FIFTEEN_MINUTES = 15 * 60; // 15 دقيقة بالثواني

export const useLessonTimer = (lessonId: string) => {
  const storageKey = `lesson_timer_${lessonId}`;

  const [timeLeft, setTimeLeft] = useState<number>(() => {
    if (typeof window === "undefined") return FIFTEEN_MINUTES;
    const saved = localStorage.getItem(storageKey);
    return saved ? parseInt(saved, 10) : FIFTEEN_MINUTES;
  });

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        localStorage.setItem(storageKey, next.toString());
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, storageKey]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return { timeLeft, formattedTime, isFinished: timeLeft === 0 };
};
