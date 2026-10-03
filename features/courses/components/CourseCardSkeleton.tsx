import { Skeleton } from "@/components/ui/skeleton";

export const CourseCardSkeleton = () => {
  return (
    <div className="group bg-card border-border text-card-foreground flex h-80 w-full flex-col justify-between rounded-4xl border md:h-auto md:p-4">
      <div>
        {/* صورة الكورس */}
        <div className="overflow-hidden rounded-t-2xl md:rounded-2xl">
          <Skeleton className="h-46 w-full rounded-t-2xl md:h-90 md:rounded-2xl" />
        </div>

        {/* النصوص والعناوين */}
        <div className="mt-3 flex flex-col px-2 md:gap-2 md:px-0">
          <Skeleton className="h-4 w-3/4 rounded-md" />
          <div className="hidden flex-col gap-1.5 md:flex">
            <Skeleton className="h-3.5 w-full rounded-md" />
            <Skeleton className="h-3.5 w-2/3 rounded-md" />
          </div>
        </div>
      </div>

      {/* تفاصيل الكورس السفلية والزر */}
      <div className="mt-3 flex w-full flex-col justify-end gap-2 p-2 md:gap-3 md:p-0">
        <div className="flex w-full flex-col gap-2 px-1">
          {/* التصنيف */}
          <Skeleton className="h-3.5 w-24 rounded-md" />

          {/* الشهادات والدروس */}
          <div className="flex justify-between">
            <Skeleton className="hidden h-3.5 w-20 rounded-md md:block" />
            <Skeleton className="h-3.5 w-16 rounded-md" />
          </div>
        </div>

        {/* زر التسجيل أو شريط التقدم */}
        <Skeleton className="h-8 w-full rounded-full" />
      </div>
    </div>
  );
};
