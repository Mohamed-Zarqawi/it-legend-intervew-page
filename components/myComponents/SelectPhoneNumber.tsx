"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/types/auth/user";
import { Country } from "country-state-city";
import { FormikErrors, FormikTouched } from "formik";

const ALL_COUNTRIES = Country.getAllCountries();

type SelectPhoneNumberProps = {
  phoneNumberName: string;
  phoneCodeName: string;
  phoneNumberValue: string;
  phoneCodeValue: string;
  currentUser?: User;
  isLoading?: boolean;
  errors?: FormikErrors<any>;
  touched?: FormikTouched<any>;
  // دوال Formik الضرورية
  onChange: (e: React.ChangeEvent<any>) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  setFieldTouched: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean,
  ) => void;
};

const SelectPhoneNumber = ({
  phoneNumberName,
  phoneCodeName,
  currentUser,
  errors,
  touched,
  isLoading,
  phoneNumberValue,
  phoneCodeValue,
  onChange,
  setFieldValue,
  setFieldTouched,
}: SelectPhoneNumberProps) => {
  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
          {/* نستخدم div أو أي غلاف هنا لأن DialogTrigger أحياناً يعترض على وجود Input كابن مباشر بدون asChild، تأكد منها حسب إعداداتك */}
          <div className="w-full md:w-100">
            <Input
              label="Phone Number"
              errors={errors}
              touched={touched}
              isLoading={isLoading}
              readOnly
              value={
                phoneCodeValue && phoneNumberValue
                  ? "+" + phoneCodeValue + "-" + phoneNumberValue
                  : ""
              }
              placeholder="Add phone number"
              className="w-full hover:cursor-pointer"
              aria-invalid={
                !!errors?.[phoneNumberName] && !!touched?.[phoneNumberName]
              }
            />
          </div>
        </DialogTrigger>
        <DialogContent className="w-full! min-w-fit!">
          <DialogTitle>
            {!currentUser?.phoneNumber
              ? "Add phone number"
              : "Update phone number"}
          </DialogTitle>
          <div className="my-3 flex w-full items-center gap-2">
            <Select
              value={
                ALL_COUNTRIES.find(
                  (c) =>
                    c.phonecode.replace("+", "") ===
                    String(phoneCodeValue).replace("+", ""),
                )?.isoCode || ""
              }
              onValueChange={(selectedIso) => {
                const selectedCountry = ALL_COUNTRIES.find(
                  (c) => c.isoCode === selectedIso,
                );
                if (selectedCountry) {
                  // استخدام الاسم الديناميكي
                  setFieldValue(
                    phoneCodeName,
                    selectedCountry.phonecode.replace("+", ""),
                  );
                }
              }}
              onOpenChange={(open) => {
                if (!open) setFieldTouched(phoneCodeName, true);
              }}
            >
              <SelectTrigger className="w-fit min-w-18 shrink-0">
                <SelectValue placeholder="+" />
              </SelectTrigger>
              <SelectContent className="w-fit">
                <SelectGroup className="w-fit">
                  {ALL_COUNTRIES.map((country) => {
                    const cleanCode = country.phonecode.replace("+", "");
                    return (
                      <SelectItem
                        key={country.isoCode}
                        className="flex w-full"
                        value={country.isoCode}
                      >
                        <div className="flex w-full justify-between">
                          + {cleanCode} ({country.isoCode})
                          <span className="ml-2 text-xl">{country.flag}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* حقل إدخال الرقم */}
            <div className="flex-1">
              <Input
                id={phoneNumberName}
                name={phoneNumberName}
                type="tel"
                isRequired={true}
                errors={errors}
                touched={touched}
                value={phoneNumberValue}
                placeholder="Phone Number"
                onChange={onChange}
                className="w-full"
                aria-invalid={
                  !!errors?.[phoneNumberName] && !!touched?.[phoneNumberName]
                }
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button className="h-11" variant="default" type="button">
                Update Phone Number
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SelectPhoneNumber;
