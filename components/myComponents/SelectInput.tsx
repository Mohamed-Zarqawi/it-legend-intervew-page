import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
// استورد Field, FieldLabel, FieldError من مسارها الصحيح لديك
import { FormikErrors, FormikTouched, getIn } from "formik";
import { Field, FieldError, FieldLabel } from "../ui/field";

type SelectInputProps = {
  label?: string;
  placeholder: string;
  options: string[];
  value?: string;
  isRequired?: boolean;
  errors?: FormikErrors<any>;
  touched?: FormikTouched<any>;
  name?: string;
  onValueChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
};

function capitalizeFirstLetter(val: string | undefined) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function handleErrors(error: string) {
  return capitalizeFirstLetter(error);
}

const SelectInput = ({
  label,
  placeholder,
  options,
  value,
  isRequired = false,
  errors,
  touched,
  name,
  onValueChange,
  onOpenChange,
}: SelectInputProps) => {
  return (
    <Field>
      {label && (
        <FieldLabel className="text-primary text-sm">
          {label}
          {isRequired && <span className="text-destructive">*</span>}
        </FieldLabel>
      )}

      <Select
        key={value}
        value={value}
        onValueChange={onValueChange}
        onOpenChange={onOpenChange}
      >
        <SelectTrigger className="w-full max-w-96 capitalize">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem className="capitalize" key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {name && getIn(errors, name) && getIn(touched, name) && (
        <FieldError>{handleErrors(getIn(errors, name))}</FieldError>
      )}
    </Field>
  );
};

export default SelectInput;
