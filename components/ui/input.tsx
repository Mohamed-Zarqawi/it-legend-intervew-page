// import { cn } from "cn";
// import * as React from "react";

// function Input({ className, type, ...props }: React.ComponentProps<"input">) {
//   return (
//     <input
//       type={type}
//       data-slot="input"
//       className={cn(
//         "bg-input/50 file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 h-8 w-full min-w-0 rounded-2xl border border-transparent px-2.5 py-1 text-base transition-[color,box-shadow] duration-200 outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm",
//         className,
//       )}
//       {...props}
//     />
//   );
// }

// export { Input };

import { cn } from "cn";
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
            "bg-input/50 file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 h-8 w-full min-w-0 rounded-2xl border border-transparent px-2.5 py-1 text-base transition-[color,box-shadow] duration-200 outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm",
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
