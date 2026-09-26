import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

type SelectDateProps = {
  date: string | null;
  isLoading?: boolean;
  onChange?: (val: string) => void;
};

function parseBirthdayDate(value: string | null | undefined) {
  if (!value) return undefined;

  const [year, month, day] = value.slice(0, 10).split("-").map(Number);

  if (!year || !month || !day) return undefined;

  return new Date(year, month - 1, day);
}

function formatBirthday(value: string | null | undefined) {
  if (!value) return "Select date";

  const [year, month, day] = value.slice(0, 10).split("-");

  if (!year || !month || !day) return "Select date";

  return `${month}/${day}/${year}`;
}

const SelectDate = ({ date, onChange, isLoading }: SelectDateProps) => {
  const [open, setOpen] = useState(false);

  const dateValue = parseBirthdayDate(date);

  return (
    <div>
      <Field className="w-[calc(100dvw-80px)] md:w-100">
        <FieldLabel htmlFor="date" className="text-primary text-sm">
          Birthday
        </FieldLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            {isLoading ? (
              <Skeleton className={cn("h-13 rounded-lg")} />
            ) : (
              <Button
                type="button"
                variant="outline"
                id="date"
                className="bg-background! border-primary h-13 justify-start rounded-lg border p-6 text-base outline-none md:w-100"
              >
                {formatBirthday(date)}
              </Button>
            )}
          </PopoverTrigger>

          <PopoverContent
            className="w-fit overflow-hidden p-0 text-xs"
            align="start"
          >
            <Calendar
              mode="single"
              selected={dateValue}
              defaultMonth={dateValue}
              captionLayout="dropdown"
              className="w-80"
              onSelect={(selectedDate) => {
                if (selectedDate) {
                  const year = selectedDate.getFullYear();
                  const month = String(selectedDate.getMonth() + 1).padStart(
                    2,
                    "0",
                  );
                  const day = String(selectedDate.getDate()).padStart(2, "0");

                  const localDateString = `${year}-${month}-${day}`;

                  onChange?.(localDateString);
                } else {
                  onChange?.("");
                }
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </Field>
    </div>
  );
};

export default SelectDate;
