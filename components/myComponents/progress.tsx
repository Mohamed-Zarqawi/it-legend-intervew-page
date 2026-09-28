"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { cn } from "cn";
import Link from "next/link";
import { Progress as ProgressPrimitive } from "radix-ui";
import * as React from "react";
import type { UrlObject } from "url";

type ProgressProps = {
  label?: string;
  percentige?: string;
  href: string | UrlObject;
};

function Progress({
  className,
  value,
  label,
  percentige,
  href,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & ProgressProps) {
  return (
    <Link href={href} className="duration-300 hover:opacity-80">
      <ProgressPrimitive.Root
        id="progress"
        data-slot="progress"
        className={cn(
          "bg-muted! relative flex h-8 w-full items-center justify-center overflow-x-hidden rounded-2xl",
          className,
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="bg-primary size-full flex-1 transition-all"
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
        <div className="absolute bottom-1.5 flex items-center text-sm">
          <div className="">{label}</div>
          <IconArrowNarrowRight className="-mb-0.75 ml-1 size-4" />
        </div>
      </ProgressPrimitive.Root>
    </Link>
  );
}

export { Progress };
