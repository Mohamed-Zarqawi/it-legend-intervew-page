import * as React from "react";

import { cn } from "@/lib/utils";
import { FormikErrors, FormikTouched, getIn } from "formik";
import { Field, FieldError, FieldLabel } from "./field";
import { Skeleton } from "./skeleton";

type InputProps = {
  label?: string;
  errors?: FormikErrors<any>;
  touched?: FormikTouched<any>;
  isLoading?: boolean;
  isRequired?: boolean;
};

function capitalizeFirstLetter(val: string | undefined) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function handleErrors(error: string) {
  return capitalizeFirstLetter(error);
}

function Input({
  className,
  type,
  errors,
  touched,
  isLoading,
  isRequired,
  label,
  ...props
}: React.ComponentProps<"input"> & InputProps) {
  return (
    <Field>
      {label && (
        <FieldLabel htmlFor="name" className="text-primary text-sm">
          {label}
          {isRequired ? <span className="text-destructive">*</span> : null}
        </FieldLabel>
      )}
      {isLoading ? (
        <Skeleton className={cn("h-12.5 rounded-lg md:h-13", className)} />
      ) : (
        <input
          type={type}
          data-slot="input"
          className={cn(
            "bg-input/20 dark:bg-input border-primary aria-invalid:border-destructive focus-visible:border-ring dark:aria-invalid:border-destructive/50 aria-invalid:ring-destructive/20 focus-visible:ring-ring/30 dark:aria-invalid:ring-destructive/40 placeholder:text-muted-foreground file:text-foreground w-full min-w-0 rounded-lg border px-4 py-3 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-xs/relaxed file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-2 md:text-base/relaxed",
            className,
          )}
          {...props}
        />
      )}
      {props.name &&
        getIn(errors, props.name) &&
        getIn(touched, props.name) && (
          <FieldError>{handleErrors(getIn(errors, props.name))}</FieldError>
        )}
    </Field>
  );
}

export { Input };
