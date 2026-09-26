import { Button } from "@/components/ui/button";

import { Field, FieldLabel } from "@/components/ui/field";
import { Skeleton } from "../ui/skeleton";

export type SelectOption = {
  label: string;
  value: string;
  Icon?: React.ElementType;
};

type ButtonSelectProps = {
  variant?:
    | "default"
    | "outline"
    | "destructive"
    | "ghost"
    | "link"
    | "secondary"
    | "none";

  label?: string;
  options: SelectOption[];

  size?:
    | "default"
    | "lg"
    | "sm"
    | "xs"
    | "icon-lg"
    | "icon-sm"
    | "icon-xs"
    | "none"
    | "rounded-xs"
    | "rounded-sm"
    | "rounded-lg"
    | "rounded-icon-xs"
    | "rounded-icon-sm"
    | "rounded-icon-lg";
  value?: string;
  activeClassName?: string;
  isRequired?: boolean;
  className?: string;
  isLoading?: boolean;
  skeletonClassName?: string;
  iconClassName?: string;
  onChange?: (value: string) => void;
};

const ButtonsSelect = ({
  variant,
  size = "default",
  className = "border-primary w-full flex-1 gap-2 rounded-lg p-6 text-base transition-all outline-none hover:cursor-pointer md:w-35 md:flex-initial ",
  label,
  options,
  isRequired,
  iconClassName = "size-5",
  skeletonClassName = "h-12.5 w-full rounded-lg md:h-13 md:w-35",
  isLoading,
  value,
  activeClassName = "ring-secondary! bg-secondary/10! ring-1!",
  onChange,
}: ButtonSelectProps) => {
  return (
    <div>
      <Field>
        {label && (
          <FieldLabel className="text-primary text-sm">
            {label}
            {isRequired && <span className="text-destructive">*</span>}
          </FieldLabel>
        )}
        <div className="flex w-full gap-3 md:gap-2">
          {options?.map((option, i) =>
            isLoading ? (
              <Skeleton key={i} className={skeletonClassName} />
            ) : (
              <Button
                key={i}
                variant={variant}
                size={size}
                type="button"
                onClick={() => onChange?.(option.value)}
                // دمج كلاسات التحديد إذا كانت قيمة الزر تساوي القيمة المحددة حالياً
                className={`${className} ${
                  value === option.value ? activeClassName : ""
                }`}
              >
                {option.Icon && <option.Icon className={iconClassName} />}
                {option.label}
              </Button>
            ),
          )}
        </div>
      </Field>
    </div>
  );
};

export default ButtonsSelect;
